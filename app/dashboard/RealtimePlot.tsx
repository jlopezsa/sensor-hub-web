'use client';

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type SeriesPoint = {
  time: string;
  value: number;
};

type SensorMessage = {
  sensor_id?: string | number;
  value?: number;
  time?: string;
  timestamp?: string | number;
};

type RealtimePlotProps = {
  temperature: SeriesPoint[];
  humidity: SeriesPoint[];
  wsUrl?: string;
  maxPoints?: number;
  colors: {
    background: string;
    grid: string;
    temperature: string;
    humidity: string;
    text: string;
  };
};

const DEFAULT_WS_URL = process.env.NEXT_PUBLIC_SENSORS_WS_URL ?? "ws://localhost:8000/api/sensors/ws?sensor_id=4";
const DEFAULT_MAX_POINTS = 60;

export function RealtimePlot({
  temperature,
  humidity,
  colors,
  wsUrl = DEFAULT_WS_URL,
  maxPoints = DEFAULT_MAX_POINTS,
}: RealtimePlotProps) {
  // Seed state with las series iniciales (mock) y luego se alimenta solo con el WS
  // const [series, setSeries] = useState({ temperature, humidity });
  const [series, setSeries] = useState<{ temperature: SeriesPoint[]; humidity: SeriesPoint[] }>({ temperature: [], humidity: [] });
  const [lastMessage, setLastMessage] = useState<SensorMessage | null>(null);
  const [connectionState, setConnectionState] = useState<"connecting" | "open" | "error" | "closed">("connecting");

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    let isMounted = true;

    const formatTime = (value?: string | number) => {
      const normalizedValue = typeof value === "number" && value < 1e12 ? value * 1000 : value;
      const date = normalizedValue ? new Date(normalizedValue) : new Date();
      const fallback = date.toISOString();

      // Return a short, readable time
      return isNaN(date.getTime()) ? fallback : date.toLocaleTimeString([], { hour12: false });
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
          let hasChanges = false;
          const next = { ...prev };

          if (typeof payload.value === "number") {
            next.temperature = [...prev.temperature, { time: timeLabel, value: payload.value }].slice(-maxPoints);
            hasChanges = true;
          }

          return hasChanges ? next : prev;
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
    const traces: Partial<Plotly.PlotData>[] = [];

    if (series.temperature.length) {
      traces.push({
        type: "scatter",
        mode: "lines+markers",
        name: "Lectura",
        x: series.temperature.map((point) => point.time),
        y: series.temperature.map((point) => point.value),
        line: {
          color: colors.temperature,
          shape: "spline",
          smoothing: 1.3,
          width: 3,
        },
        marker: { color: colors.temperature, size: 6 },
      });
    }

    if (series.humidity.length) {
      traces.push({
        type: "scatter",
        mode: "lines+markers",
        name: "Humedad",
        x: series.humidity.map((point) => point.time),
        y: series.humidity.map((point) => point.value),
        line: {
          color: colors.humidity,
          shape: "spline",
          smoothing: 1.3,
          width: 3,
        },
        marker: { color: colors.humidity, size: 6 },
      });
    }

    return traces;
  }, [colors.humidity, colors.temperature, series.humidity, series.temperature]);

  const layout: Partial<Plotly.Layout> = useMemo(
    () => ({
      autosize: true,
      paper_bgcolor: colors.background,
      plot_bgcolor: colors.background,
      font: {
        color: colors.text,
        family: "Inter, 'SF Pro Display', system-ui, sans-serif",
      },
      margin: { t: 20, r: 20, b: 40, l: 50 },
      xaxis: {
        title: { text: "Tiempo" },
        gridcolor: colors.grid,
        zerolinecolor: colors.grid,
      },
      yaxis: {
        title: { text: "Valor sincronizado" },
        gridcolor: colors.grid,
        zerolinecolor: colors.grid,
      },
      legend: {
        orientation: "h",
        x: 0,
        y: 1.2,
      },
    }),
    [colors.background, colors.grid, colors.text],
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

  const statusColor = {
    connecting: colors.grid,
    open: colors.temperature,
    error: "#f87171",
    closed: colors.text,
  }[connectionState];

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between text-xs" style={{ color: colors.text }}>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: statusColor,
              boxShadow: `0 0 0 4px ${colors.grid}`,
            }}
          />
          <span>{connectionState === "open" ? "En vivo" : `WS: ${connectionState}`}</span>
        </div>
        <span className="truncate text-[11px]" style={{ color: colors.text, maxWidth: "60%" }} title={wsUrl}>
          {wsUrl}
        </span>
      </div>

      <div className="min-h-0 flex-1">
        <Plot data={data} layout={layout} config={config} useResizeHandler style={{ width: "100%", height: "100%" }} />
      </div>

      {lastMessage && (
        <div
          className="rounded-lg border px-3 py-2 text-xs"
          style={{ borderColor: colors.grid, color: colors.text, backgroundColor: colors.background }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">Ultimo payload</span>
            <span style={{ color: colors.text }}>{lastMessage.time}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-3">
            {typeof lastMessage.value === "number" && <span>Valor: {lastMessage.value}</span>}
            {lastMessage.sensor_id !== undefined && <span>Sensor: {lastMessage.sensor_id}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
