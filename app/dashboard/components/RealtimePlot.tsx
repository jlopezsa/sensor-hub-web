'use client';

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { RealtimePlotProps, SensorMessage, SeriesPoint } from "../interfaces/real-time-plot.interface";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function RealtimePlot({
  colors,
  wsUrl,
  maxPoints,
  title = "Tendencia principal",
  sensorLabel = "Canal principal",
  unit,
  timeRangeLabel = "Últimos 60 puntos",
}: RealtimePlotProps) {
  const [series, setSeries] = useState<{ data: SeriesPoint[] }>({ data: [] });
  const [lastMessage, setLastMessage] = useState<SensorMessage | null>(null);
  const [connectionState, setConnectionState] = useState<"connecting" | "open" | "error" | "closed">("connecting");

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    let isMounted = true;

    const formatTime = (value?: string | number) => {
      const normalizedValue = typeof value === "number" && value < 1e12 ? value * 1000 : value;
      const date = normalizedValue ? new Date(normalizedValue) : new Date();
      const fallback = date.toISOString();

      return Number.isNaN(date.getTime()) ? fallback : date.toLocaleTimeString([], { hour12: false });
    };

    socket.onopen = () => {
      if (isMounted) setConnectionState("open");
    };

    socket.onerror = () => {
      if (isMounted) setConnectionState("error");
    };

    socket.onclose = () => {
      if (isMounted) setConnectionState("closed");
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as SensorMessage;
        const timestamp = payload.time ?? payload.timestamp ?? Date.now();
        const timeLabel = formatTime(timestamp);

        setSeries((prev) => {
          if (typeof payload.value !== "number") return prev;
          return {
            data: [...prev.data, { time: timeLabel, value: payload.value }].slice(-maxPoints),
          };
        });

        setLastMessage({ ...payload, time: timeLabel });
      } catch (error) {
        console.warn("No se pudo parsear el mensaje del websocket", error);
      }
    };

    return () => {
      isMounted = false;
      socket.close();
    };
  }, [maxPoints, wsUrl]);

  const data: Partial<Plotly.PlotData>[] = useMemo(() => {
    if (!series.data.length) return [];

    return [
      {
        type: "scatter",
        mode: "lines+markers",
        name: sensorLabel,
        x: series.data.map((point) => point.time),
        y: series.data.map((point) => point.value),
        line: {
          color: colors.line,
          shape: "spline",
          smoothing: 1.15,
          width: 3,
        },
        marker: {
          color: colors.accent ?? colors.line,
          size: 6,
        },
        fill: "tozeroy",
        fillcolor: "rgba(86, 224, 255, 0.08)",
        hovertemplate: `%{y}${unit ? ` ${unit}` : ""}<extra>${sensorLabel}</extra>`,
      },
    ];
  }, [colors.accent, colors.line, sensorLabel, series.data, unit]);

  const layout: Partial<Plotly.Layout> = useMemo(
    () => ({
      autosize: true,
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: {
        color: colors.text,
        family: "var(--font-space-grotesk), system-ui, sans-serif",
      },
      margin: { t: 20, r: 16, b: 38, l: 48 },
      xaxis: {
        title: { text: "Tiempo" },
        color: colors.muted ?? colors.text,
        gridcolor: colors.grid,
        zerolinecolor: colors.grid,
        tickfont: { size: 11 },
      },
      yaxis: {
        title: { text: unit ? `Valor (${unit})` : "Valor" },
        color: colors.muted ?? colors.text,
        gridcolor: colors.grid,
        zerolinecolor: colors.grid,
        tickfont: { size: 11 },
      },
      legend: {
        orientation: "h",
        x: 0,
        y: 1.12,
        font: {
          color: colors.muted ?? colors.text,
          size: 12,
        },
      },
    }),
    [colors.grid, colors.muted, colors.text, unit],
  );

  const config: Partial<Plotly.Config> = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      "lasso2d",
      "select2d",
      "autoScale2d",
      "toggleSpikelines",
      "zoomIn2d",
      "zoomOut2d",
      "hoverClosestCartesian",
      "hoverCompareCartesian",
    ] as Plotly.ModeBarDefaultButtons[],
  };

  const statusConfig = {
    connecting: {
      label: "Sincronizando",
      color: colors.accent ?? colors.line,
      halo: "rgba(86, 224, 255, 0.18)",
    },
    open: {
      label: "En vivo",
      color: colors.line,
      halo: "rgba(94, 234, 212, 0.18)",
    },
    error: {
      label: "Error de canal",
      color: "#fb7185",
      halo: "rgba(251, 113, 133, 0.18)",
    },
    closed: {
      label: "Desconectado",
      color: colors.muted ?? colors.text,
      halo: "rgba(100, 116, 139, 0.18)",
    },
  }[connectionState];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-3xl border px-4 py-4 sm:flex-row sm:items-start sm:justify-between" style={{ borderColor: colors.grid, backgroundColor: "rgba(5, 16, 29, 0.36)" }}>
        <div>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: colors.muted ?? colors.text }}>
            {title}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{sensorLabel}</h3>
          <p className="mt-2 text-sm" style={{ color: colors.muted ?? colors.text }}>
            Ventana visible: {timeRangeLabel}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <span className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: statusConfig.color,
                boxShadow: `0 0 0 6px ${statusConfig.halo}`,
              }}
            />
            <span>{statusConfig.label}</span>
          </span>
          <span className="max-w-full truncate text-xs" style={{ color: colors.muted ?? colors.text }} title={wsUrl}>
            {wsUrl}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 rounded-[28px] border px-2 py-3" style={{ borderColor: colors.grid, backgroundColor: "rgba(5, 16, 29, 0.3)" }}>
        {series.data.length ? (
          <Plot data={data} layout={layout} config={config} useResizeHandler style={{ width: "100%", height: "100%" }} />
        ) : (
          <div className="flex h-full min-h-[260px] items-center justify-center rounded-[24px] border border-dashed text-center" style={{ borderColor: colors.grid, color: colors.muted ?? colors.text }}>
            <div className="max-w-sm space-y-2 px-6">
              <p className="text-sm uppercase tracking-[0.22em]">Esperando datos</p>
              <p className="text-sm leading-6">
                El panel está listo para recibir lecturas del sensor. Cuando llegue la primera muestra, la tendencia comenzará a dibujarse aquí.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr,auto]">
        <div
          className="rounded-2xl border px-4 py-3 text-sm"
          style={{ borderColor: colors.grid, color: colors.text, backgroundColor: "rgba(5, 16, 29, 0.38)" }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Última lectura</span>
            <span style={{ color: colors.muted ?? colors.text }}>{lastMessage?.time ?? "Sin muestras"}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2" style={{ color: colors.muted ?? colors.text }}>
            <span>Sensor: {lastMessage?.sensor_id ?? sensorLabel}</span>
            <span>
              Valor: {typeof lastMessage?.value === "number" ? `${lastMessage.value}${unit ? ` ${unit}` : ""}` : "Pendiente"}
            </span>
          </div>
        </div>

        <div
          className="rounded-2xl border px-4 py-3 text-sm"
          style={{ borderColor: colors.grid, color: colors.text, backgroundColor: "rgba(5, 16, 29, 0.38)" }}
        >
          <span className="block font-semibold">Modo</span>
          <span className="mt-2 block" style={{ color: colors.muted ?? colors.text }}>
            Streaming operacional
          </span>
        </div>
      </div>
    </div>
  );
}
