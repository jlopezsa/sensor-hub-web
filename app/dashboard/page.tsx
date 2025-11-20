import { palette } from "../theme/colors";
import { RealtimePlot } from "./components/RealtimePlot";

const summaryCards = [
  {
    id: "temperature",
    label: "Temperatura",
    value: "24.6 °C",
    delta: "+0.4 °C vs 1h",
    status: "En rango",
    limit: "Objetivo 22° - 25°C",
    color: palette.accentPrimary.hex,
    series: [23.9, 24.1, 24.0, 24.2, 24.3, 24.5, 24.6],
  },
  {
    id: "humidity",
    label: "Humedad cabina",
    value: "48 %",
    delta: "-1.2 % vs 1h",
    status: "Estable",
    limit: "Objetivo 45% - 55%",
    color: palette.actionDark.hex,
    series: [52, 51, 50, 49, 48.6, 48.3, 48],
  },
  {
    id: "ph",
    label: "pH en línea",
    value: "6.8",
    delta: "-0.1 vs 15m",
    status: "Micro ajuste",
    limit: "Ventana 6.5 - 7.1",
    color: "#16a34a",
    series: [6.9, 6.9, 6.85, 6.82, 6.81, 6.8, 6.8],
  },
  {
    id: "turbidez",
    label: "Turbidez / NTU",
    value: "180 NTU",
    delta: "+4 NTU vs 10m",
    status: "Monitorear",
    limit: "Alarma 220 NTU",
    color: "#f97316",
    series: [160, 168, 170, 174, 176, 179, 180],
  },
];

const secondarySensors = [
  {
    id: "nivel",
    label: "Nivel de líquido",
    value: 82,
    unit: "%",
    change: "-3% vs 30m",
    range: "Setpoint 85 %",
    window: "Margen operacional 70% - 90%",
    utilization: 82,
    color: palette.accentPrimary.hex,
    series: [88, 87, 86, 85, 84, 83, 82],
  },
  {
    id: "agitacion",
    label: "Velocidad de agitación",
    value: 320,
    unit: "rpm",
    change: "+5 rpm vs 10m",
    range: "Objetivo 320 rpm",
    window: "Ajustable 300 - 340 rpm",
    utilization: 80,
    color: palette.actionDark.hex,
    series: [305, 308, 310, 315, 318, 320, 322],
  },
  {
    id: "turbidez-mini",
    label: "Sólidos en suspensión",
    value: 0.72,
    unit: "g/L",
    change: "+0.03 vs 1h",
    range: "Plan 0.60 g/L",
    window: "Límite crítico 0.90 g/L",
    utilization: 60,
    color: "#f97316",
    series: [0.56, 0.58, 0.6, 0.62, 0.65, 0.69, 0.72],
  },
  {
    id: "color",
    label: "Color / absorbancia",
    value: 0.38,
    unit: "ABS",
    change: "-0.02 vs 30m",
    range: "Ref 0.40 ABS",
    window: "Espectro 0.3 - 0.5 ABS",
    utilization: 55,
    color: palette.accentSecondary.hex,
    series: [0.44, 0.42, 0.4, 0.39, 0.38, 0.38, 0.38],
  },
];

const processInsights = [
  {
    id: "agitacion",
    title: "Velocidad de agitación",
    value: "320 rpm",
    status: "Estable",
    statusColor: "#22c55e",
    description: "Control PID manteniendo consigna ±3 rpm.",
    meta: "Último ajuste automático hace 2 min",
  },
  {
    id: "nivel",
    title: "Balance de nivel",
    value: "82 %",
    status: "Monitorear",
    statusColor: "#f97316",
    description: "Feed en 1.2 m³/h y descarga igualada.",
    meta: "Siguiente purga programada 13:10",
  },
  {
    id: "energia",
    title: "Carga térmica",
    value: "74 %",
    status: "Seguro",
    statusColor: palette.accentPrimary.hex,
    description: "Chiller disponible con 26% de margen.",
    meta: "Capacidad máxima 850 kW",
  },
];

const eventsTimeline = [
  {
    id: "evt-01",
    time: "12:35:14",
    severity: "warning",
    title: "pH fuera del setpoint",
    description: "Lectura 7.4, dosificación correctiva en curso.",
  },
  {
    id: "evt-02",
    time: "12:28:02",
    severity: "info",
    title: "Calibración turbidez",
    description: "Sensor óptico autoajustado con estándar 180 NTU.",
  },
  {
    id: "evt-03",
    time: "12:12:45",
    severity: "critical",
    title: "Alarma nivel alto",
    description: "Se alcanzó 92%. Se ejecutó purga automática.",
  },
];

const operationalActions = [
  {
    id: "act-01",
    title: "Verificar dosificación de base",
    owner: "Operador · Turno B",
    due: "En 5 min",
    status: "Pendiente",
  },
  {
    id: "act-02",
    title: "Tomar muestra para laboratorio",
    owner: "QA · Andrea Rivera",
    due: "13:00",
    status: "Programado",
  },
  {
    id: "act-03",
    title: "Validar espectro de color",
    owner: "LIMS · Estación 4",
    due: "En progreso",
    status: "Analizando",
  },
];

const buildPolyline = (data: { value: number }[], min: number, max: number) => {
  if (data.length <= 1) return "";
  return data
    .map((point, index) => {
      const x = (index / (data.length - 1 || 1)) * 100;
      const normalized = (point.value - min) / (max - min || 1);
      const y = 100 - normalized * 100;
      return `${x},${y}`;
    })
    .join(" ");
};

const severityTokens = {
  info: {
    label: "Info",
    color: palette.accentPrimary.hex,
  },
  warning: {
    label: "Atención",
    color: "#f97316",
  },
  critical: {
    label: "Alarma",
    color: "#ef4444",
  },
};

const sparklineFromSeries = (series: number[]) =>
  buildPolyline(
    series.map((value) => ({ value })),
    Math.min(...series),
    Math.max(...series),
  );

export default function Dashboard() {
  const summaryData = summaryCards.map((card) => ({
    ...card,
    sparkline: sparklineFromSeries(card.series),
  }));

  const secondaryData = secondarySensors.map((sensor) => ({
    ...sensor,
    sparkline: sparklineFromSeries(sensor.series),
  }));

  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{ backgroundColor: palette.backgroundBase.hex, color: palette.textPrimary.hex }}
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="space-y-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.4em]"
                style={{ color: palette.accentPrimary.hex }}
              >
                Sensor Hub · Reactor A
              </p>
              <h1 className="mt-3 text-4xl font-semibold">Tablero en tiempo real</h1>
            </div>
            <div
              className="flex items-center gap-3 rounded-full px-4 py-2 text-sm"
              style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex, borderWidth: 1 }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: palette.accentPrimary.hex }} />
              <span style={{ color: palette.textSecondary.hex }}>Transmisión WebSocket activa</span>
            </div>
          </div>
          <p className="text-lg" style={{ color: palette.textSecondary.hex }}>
            Visualiza métricas críticas del reactor, responde a alertas y comparte contexto operativo con mantenimiento y
            laboratorio. Todos los widgets están listos para conectar tus sensores en vivo.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryData.map((card) => (
            <article
              key={card.id}
              className="rounded-3xl border p-5 shadow-sm"
              style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.textSecondary.hex }}>
                    {card.id}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{card.label}</h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: palette.backgroundHighlight.hex, color: card.color }}
                >
                  {card.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-semibold">{card.value}</p>
                <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                  {card.delta}
                </p>
              </div>
              <div className="mt-6 h-16">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <polyline
                    fill="none"
                    stroke={card.color}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={card.sparkline}
                  />
                </svg>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs" style={{ color: palette.textSecondary.hex }}>
                <span>{card.limit}</span>
                <span>Últimas 4 h</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <article
            className="rounded-3xl border p-6 shadow-sm"
            style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.textSecondary.hex }}>
                  Plotly · Streaming
                </p>
                <h2 className="text-2xl font-semibold">Tendencias en tiempo real</h2>
                <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                  Temperatura vs. humedad ejes sincronizados · arrastra para inspeccionar.
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
                  Rango
                </p>
                <p className="text-sm font-semibold">Últimos 60 puntos</p>
              </div>
            </div>
            <div className="mt-6 h-[420px] w-full">
              <RealtimePlot
                wsUrl={process.env.NEXT_PUBLIC_WS_URL_TEMPERATURE_HUMIDITY!}
                maxPoints={60}
                colors={{
                  background: palette.surface.hex,
                  grid: palette.borderSoft.hex,
                  line: palette.accentPrimary.hex,
                  text: palette.textPrimary.hex,
                }}
              />
            </div>
          </article>

          <div className="flex flex-col gap-4">
            {processInsights.map((insight) => (
              <article
                key={insight.id}
                className="flex flex-col gap-2 rounded-3xl border p-4 shadow-sm"
                style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{insight.title}</h3>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: palette.backgroundHighlight.hex, color: insight.statusColor }}
                  >
                    {insight.status}
                  </span>
                </div>
                <p className="text-2xl font-semibold">{insight.value}</p>
                <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                  {insight.description}
                </p>
                <p className="text-xs" style={{ color: palette.textSecondary.hex }}>
                  {insight.meta}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.textSecondary.hex }}>
                Sensores secundarios
              </p>
              <h2 className="text-2xl font-semibold">Micro paneles con sparklines</h2>
            </div>
            <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
              Controla nivel, agitación, turbidez y colorimetría en un vistazo.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {secondaryData.map((sensor) => (
              <article
                key={sensor.id}
                className="rounded-3xl border p-4 shadow-sm"
                style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
              >
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
                      {sensor.id}
                    </p>
                    <p className="font-semibold">{sensor.label}</p>
                  </div>
                  <span className="text-xs" style={{ color: palette.textSecondary.hex }}>
                    {sensor.range}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <p className="text-2xl font-semibold">
                    {sensor.value}
                    <span className="text-sm font-normal" style={{ color: palette.textSecondary.hex }}>
                      {sensor.unit}
                    </span>
                  </p>
                  <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                    {sensor.change}
                  </p>
                </div>
                <div className="mt-4 h-14">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <polyline
                      fill="none"
                      stroke={sensor.color}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={sensor.sparkline}
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <div className="h-2 rounded-full" style={{ backgroundColor: palette.backgroundHighlight.hex }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: sensor.color, width: `${sensor.utilization}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs" style={{ color: palette.textSecondary.hex }}>
                    {sensor.window}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article
            className="rounded-3xl border p-6 shadow-sm"
            style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.textSecondary.hex }}>
                  Alertas y eventos
                </p>
                <h2 className="text-2xl font-semibold">Línea de tiempo del reactor</h2>
              </div>
              <span className="text-sm" style={{ color: palette.textSecondary.hex }}>
                Últimos 30 min
              </span>
            </div>
            <ul className="mt-6 space-y-5">
              {eventsTimeline.map((event, index) => {
                const badge = severityTokens[event.severity as keyof typeof severityTokens];
                const isLast = index === eventsTimeline.length - 1;
                return (
                  <li key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: badge.color }}
                      >
                        {badge.label}
                      </span>
                      {!isLast && <span className="mt-2 w-px flex-1" style={{ backgroundColor: palette.borderSoft.hex }} />}
                    </div>
                    <div
                      className="flex-1 rounded-2xl border p-4"
                      style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <p className="font-semibold">{event.title}</p>
                        <span style={{ color: palette.textSecondary.hex }}>{event.time}</span>
                      </div>
                      <p className="mt-2 text-sm" style={{ color: palette.textSecondary.hex }}>
                        {event.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>

          <article
            className="rounded-3xl border p-6 shadow-sm"
            style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.textSecondary.hex }}>
                  Plan de acción
                </p>
                <h2 className="text-2xl font-semibold">Checklist operativo</h2>
              </div>
              <button
                className="rounded-full px-4 py-2 text-xs font-semibold"
                style={{ backgroundColor: palette.actionDark.hex, color: palette.textInverse.hex }}
              >
                Registrar tarea
              </button>
            </div>
            <ul className="mt-6 space-y-4">
              {operationalActions.map((action) => (
                <li
                  key={action.id}
                  className="rounded-2xl border px-4 py-3"
                  style={{ borderColor: palette.borderSoft.hex }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{action.title}</p>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: palette.backgroundHighlight.hex, color: palette.textSecondary.hex }}
                    >
                      {action.status}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                    {action.owner}
                  </p>
                  <p className="text-xs" style={{ color: palette.textSecondary.hex }}>
                    {action.due}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
