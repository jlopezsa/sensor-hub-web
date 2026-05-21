import { RealtimePlot } from "./components/RealtimePlot";
import { palette, statusPalette } from "../theme/colors";

const reactorMetrics = [
  {
    id: "temperature",
    label: "Temperatura de mezcla",
    value: "24.8 °C",
    drift: "+0.3 °C / 10 min",
    setpoint: "Objetivo 24 - 25 °C",
    status: statusPalette.normal,
    color: palette.accentPrimary.hex,
    series: [24.1, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8],
  },
  {
    id: "ph",
    label: "pH en línea",
    value: "6.82",
    drift: "-0.04 / 15 min",
    setpoint: "Ventana 6.5 - 7.1",
    status: statusPalette.warning,
    color: palette.warning.hex,
    series: [6.92, 6.9, 6.88, 6.86, 6.84, 6.83, 6.82],
  },
  {
    id: "level",
    label: "Nivel de reactor",
    value: "82 %",
    drift: "-3 % / 30 min",
    setpoint: "Setpoint 85 %",
    status: statusPalette.stable,
    color: palette.accentSecondary.hex,
    series: [87, 86, 85, 84, 83, 82, 82],
  },
  {
    id: "turbidity",
    label: "Turbidez",
    value: "180 NTU",
    drift: "+4 NTU / 10 min",
    setpoint: "Alarma 220 NTU",
    status: statusPalette.warning,
    color: palette.warning.hex,
    series: [162, 166, 170, 173, 176, 178, 180],
  },
];

const auxiliarySensors = [
  {
    id: "humidity",
    label: "Humedad de cabina",
    value: "48 %",
    note: "Zona de control 45 - 55 %",
    progress: 48,
    color: palette.accentPrimary.hex,
  },
  {
    id: "agitation",
    label: "Velocidad de agitación",
    value: "320 rpm",
    note: "Consigna 320 rpm",
    progress: 80,
    color: palette.accentSecondary.hex,
  },
  {
    id: "solids",
    label: "Sólidos suspendidos",
    value: "0.72 g/L",
    note: "Límite crítico 0.90 g/L",
    progress: 64,
    color: palette.warning.hex,
  },
  {
    id: "conductivity",
    label: "Conductividad",
    value: "1.14 mS/cm",
    note: "Tendencia estable",
    progress: 57,
    color: palette.accentPrimarySoft.hex,
  },
];

const processPanels = [
  {
    title: "Fase del lote",
    value: "Homogeneización",
    detail: "Tiempo de etapa: 18 min",
    status: statusPalette.stable,
  },
  {
    title: "Carga térmica",
    value: "74 %",
    detail: "Chiller con 26 % de margen",
    status: statusPalette.normal,
  },
  {
    title: "Salud del canal",
    value: "5 / 6 sensores online",
    detail: "Un canal en reintento de enlace",
    status: statusPalette.syncing,
  },
];

const eventStream = [
  {
    time: "12:35:14",
    title: "Ajuste correctivo de pH",
    description: "Se inició una dosificación fina para recentrar la mezcla en la ventana 6.5 - 7.1.",
    status: statusPalette.warning,
  },
  {
    time: "12:28:02",
    title: "Autocalibración de turbidez",
    description: "El sensor óptico actualizó su referencia con estándar local antes de continuar la lectura.",
    status: statusPalette.stable,
  },
  {
    time: "12:12:45",
    title: "Purga automática completada",
    description: "El nivel descendió desde 92 % y volvió a rango seguro sin detener la mezcla.",
    status: statusPalette.alert,
  },
];

const actionQueue = [
  {
    title: "Validar dosificación de base",
    owner: "Operador turno B",
    eta: "En 5 min",
    status: "Pendiente",
  },
  {
    title: "Tomar muestra para laboratorio",
    owner: "QA · Andrea Rivera",
    eta: "13:00",
    status: "Programado",
  },
  {
    title: "Confirmar tendencia de turbidez",
    owner: "Sistema de reglas",
    eta: "En análisis",
    status: "Abierto",
  },
];

const sensorRecommendations = [
  "ORP para reacciones sensibles a oxidación",
  "Presión de línea para detectar obstrucciones o cavitación",
  "Caudal de alimentación para balance de mezcla",
];

const buildPolyline = (series: number[]) => {
  if (series.length <= 1) return "";
  const min = Math.min(...series);
  const max = Math.max(...series);

  return series
    .map((point, index) => {
      const x = (index / (series.length - 1)) * 100;
      const normalized = (point - min) / (max - min || 1);
      const y = 100 - normalized * 100;
      return `${x},${y}`;
    })
    .join(" ");
};

export default function Dashboard() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8 lg:py-8" style={{ color: palette.textPrimary.hex }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section
          className="rounded-[32px] border p-5 shadow-2xl sm:p-6"
          style={{
            borderColor: palette.borderSoft.hex,
            backgroundColor: "rgba(8, 24, 43, 0.7)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span
                  className="rounded-full border px-3 py-1"
                  style={{ borderColor: palette.borderStrong.hex, backgroundColor: palette.overlay.hex, color: palette.accentPrimary.hex }}
                >
                  Reactor A-17
                </span>
                <span className="rounded-full px-3 py-1" style={{ backgroundColor: statusPalette.normal.background, color: statusPalette.normal.color }}>
                  Producción estable
                </span>
                <span className="rounded-full px-3 py-1" style={{ backgroundColor: statusPalette.syncing.background, color: statusPalette.syncing.color }}>
                  Telemetría en vivo
                </span>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.24em]" style={{ color: palette.textMuted.hex }}>
                  Consola operacional
                </p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Monitoreo del reactor de mezclas líquidas</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-base" style={{ color: palette.textSecondary.hex }}>
                  Supervisa variables críticas, estabilidad del lote y eventos operativos desde una sola interfaz preparada para sensores IoT y análisis en tiempo real.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {processPanels.map((panel) => (
                <article
                  key={panel.title}
                  className="rounded-2xl border px-4 py-4"
                  style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
                >
                  <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                    {panel.title}
                  </p>
                  <p className="mt-3 text-lg font-semibold">{panel.value}</p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-sm" style={{ color: palette.textSecondary.hex }}>
                      {panel.detail}
                    </span>
                    <span className="rounded-full px-2 py-1 text-xs" style={{ backgroundColor: panel.status.background, color: panel.status.color }}>
                      {panel.status.label}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reactorMetrics.map((metric) => (
            <article
              key={metric.id}
              className="rounded-[28px] border p-5"
              style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                    {metric.id}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">{metric.label}</h2>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: metric.status.background, color: metric.status.color }}>
                  {metric.status.label}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-3xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-sm" style={{ color: palette.textSecondary.hex }}>
                  {metric.drift}
                </p>
              </div>

              <div className="mt-5 h-16 rounded-2xl border px-2 py-2" style={{ borderColor: palette.borderSoft.hex, backgroundColor: "rgba(5, 16, 29, 0.34)" }}>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <polyline
                    fill="none"
                    stroke={metric.color}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={buildPolyline(metric.series)}
                  />
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 text-xs" style={{ color: palette.textSecondary.hex }}>
                <span>{metric.setpoint}</span>
                <span>Ventana reciente</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.65fr,0.95fr]">
          <article
            className="rounded-[32px] border p-5 sm:p-6"
            style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                  Tendencia principal
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Temperatura y estabilidad del lote</h2>
              </div>
              <div className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: palette.borderSoft.hex, backgroundColor: "rgba(5, 16, 29, 0.3)", color: palette.textSecondary.hex }}>
                Ventana de inspección operacional
              </div>
            </div>

            <div className="mt-6 h-[440px]">
              <RealtimePlot
                wsUrl={process.env.NEXT_PUBLIC_WS_URL_TEMPERATURE_HUMIDITY!}
                maxPoints={60}
                title="Streaming del canal prioritario"
                sensorLabel="Temperatura / humedad sincronizada"
                unit="u."
                timeRangeLabel="Últimos 60 mensajes"
                colors={{
                  background: palette.surfaceStrong.hex,
                  grid: palette.borderSoft.hex,
                  line: palette.accentSecondary.hex,
                  text: palette.textPrimary.hex,
                  muted: palette.textSecondary.hex,
                  accent: palette.accentPrimary.hex,
                }}
              />
            </div>
          </article>

          <div className="grid gap-6">
            <article
              className="rounded-[32px] border p-5"
              style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surfaceStrong.hex }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                    Alertas y eventos
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">Qué cambió en el proceso</h2>
                </div>
                <span className="text-xs" style={{ color: palette.textSecondary.hex }}>
                  Últimos 30 min
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {eventStream.map((event) => (
                  <article
                    key={`${event.time}-${event.title}`}
                    className="rounded-2xl border px-4 py-4"
                    style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold">{event.title}</h3>
                      <span className="rounded-full px-2 py-1 text-xs" style={{ backgroundColor: event.status.background, color: event.status.color }}>
                        {event.status.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6" style={{ color: palette.textSecondary.hex }}>
                      {event.description}
                    </p>
                    <p className="mt-3 text-xs" style={{ color: palette.textMuted.hex }}>
                      {event.time}
                    </p>
                  </article>
                ))}
              </div>
            </article>

            <article
              className="rounded-[32px] border p-5"
              style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                    Cola operativa
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">Intervenciones sugeridas</h2>
                </div>
                <button
                  className="rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: palette.accentPrimary.hex, color: palette.textInverse.hex }}
                >
                  Registrar tarea
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {actionQueue.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl border px-4 py-4"
                    style={{ borderColor: palette.borderSoft.hex, backgroundColor: "rgba(5, 16, 29, 0.28)" }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{action.title}</p>
                      <span className="rounded-full px-2 py-1 text-xs" style={{ backgroundColor: palette.overlay.hex, color: palette.accentPrimary.hex }}>
                        {action.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: palette.textSecondary.hex }}>
                      {action.owner}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: palette.textMuted.hex }}>
                      {action.eta}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <article
            className="rounded-[32px] border p-5 sm:p-6"
            style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                  Sensores auxiliares
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Paneles rápidos para variables de soporte</h2>
              </div>
              <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                Lectura inmediata del entorno y del comportamiento de mezcla.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {auxiliarySensors.map((sensor) => (
                <article
                  key={sensor.id}
                  className="rounded-[28px] border p-4"
                  style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                        {sensor.id}
                      </p>
                      <h3 className="mt-2 font-semibold">{sensor.label}</h3>
                    </div>
                    <span className="text-lg font-semibold">{sensor.value}</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full" style={{ backgroundColor: "rgba(86, 224, 255, 0.08)" }}>
                    <div className="h-2 rounded-full" style={{ width: `${sensor.progress}%`, backgroundColor: sensor.color }} />
                  </div>
                  <p className="mt-3 text-sm" style={{ color: palette.textSecondary.hex }}>
                    {sensor.note}
                  </p>
                </article>
              ))}
            </div>
          </article>

          <article
            className="rounded-[32px] border p-5 sm:p-6"
            style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surfaceStrong.hex }}
          >
            <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.accentSecondary.hex }}>
              Expansión del sistema
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Sensores recomendados para crecer la instrumentación</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: palette.textSecondary.hex }}>
              Además de temperatura, pH y humedad, un reactor pequeño gana mucha trazabilidad cuando incorpora señales adicionales para anticipar variaciones de calidad y detectar fallos de operación.
            </p>
            <div className="mt-6 space-y-3">
              {sensorRecommendations.map((recommendation) => (
                <div
                  key={recommendation}
                  className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                  style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: palette.accentPrimary.hex }} />
                  <span>{recommendation}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
