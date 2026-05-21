import { gradients, palette, statusPalette } from "./theme/colors";

const heroStats = [
  { label: "Sensores críticos activos", value: "06", note: "Temperatura, pH, nivel, agitación, turbidez, humedad" },
  { label: "Latencia de telemetría", value: "220 ms", note: "Canal WebSocket listo para streaming operativo" },
  { label: "Estado del lote", value: "En mezcla", note: "Fase de homogeneización con control fino" },
];

const sensorHighlights = [
  {
    name: "Temperatura del reactor",
    reading: "24.8 °C",
    trend: "+0.3 °C / 10 min",
    status: statusPalette.normal,
  },
  {
    name: "pH en línea",
    reading: "6.82",
    trend: "-0.04 / 15 min",
    status: statusPalette.warning,
  },
  {
    name: "Velocidad de agitación",
    reading: "320 rpm",
    trend: "Consigna estable",
    status: statusPalette.stable,
  },
];

const reactorCapabilities = [
  {
    title: "Monitoreo del proceso",
    description:
      "Visualiza en una sola vista las variables que realmente cambian la calidad de la mezcla: temperatura, pH, nivel, turbidez y régimen de agitación.",
  },
  {
    title: "Alertas con contexto",
    description:
      "Cada desviación se presenta con su setpoint, severidad y acción sugerida para que el operador responda rápido y con criterio.",
  },
  {
    title: "Evolución temporal",
    description:
      "Combina lecturas en vivo con tendencia reciente para detectar deriva, sobreimpulso o pérdida de estabilidad antes de afectar el lote.",
  },
];

const supportedSensors = [
  "Temperatura de camisa y producto",
  "pH con compensación en línea",
  "Nivel de líquido y caudal",
  "Velocidad de agitador",
  "Turbidez y sólidos suspendidos",
  "Conductividad, ORP y presión como expansión",
];

const operatingFlow = [
  {
    step: "01",
    title: "Conecta y etiqueta sensores",
    detail: "Cada canal queda asociado al reactor, unidad de medida y ventana segura de operación.",
  },
  {
    step: "02",
    title: "Observa el estado del lote",
    detail: "La consola prioriza variables críticas, estabilidad del proceso y alertas activas en tiempo real.",
  },
  {
    step: "03",
    title: "Intervén con criterio",
    detail: "Eventos, tareas y recomendaciones quedan anclados al momento exacto en que el proceso cambió.",
  },
];

const dashboardPreview = [
  { label: "Fase actual", value: "Homogeneización" },
  { label: "Ventana pH", value: "6.5 - 7.1" },
  { label: "Nivel operativo", value: "82 %" },
  { label: "Riesgo activo", value: "Turbidez en ascenso" },
];

export default function Home() {
  const siteGradient = `linear-gradient(180deg, ${gradients.siteBackground.stops.join(", ")})`;

  return (
    <main
      className="relative overflow-hidden"
      style={{
        backgroundImage: siteGradient,
        color: palette.textPrimary.hex,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] blur-3xl"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${palette.overlay.hex}, transparent 45%)`,
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header
          className="rounded-[32px] border px-6 py-6 backdrop-blur md:px-8"
          style={{
            borderColor: palette.borderSoft.hex,
            backgroundColor: "rgba(8, 24, 43, 0.68)",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span
                  className="rounded-full border px-3 py-1"
                  style={{
                    borderColor: palette.borderStrong.hex,
                    backgroundColor: palette.overlay.hex,
                    color: palette.accentPrimary.hex,
                  }}
                >
                  Sensor Hub Web
                </span>
                <span className="rounded-full px-3 py-1" style={{ backgroundColor: statusPalette.syncing.background, color: statusPalette.syncing.color }}>
                  Reactor principal sincronizando telemetría
                </span>
              </div>

              <div className="space-y-4">
                <p className="max-w-2xl text-sm uppercase tracking-[0.26em]" style={{ color: palette.textSecondary.hex }}>
                  Supervisión IoT para mezclas líquidas
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Una interfaz futurista para visualizar y monitorear cada variable crítica de tu reactor.
                </h1>
                <p className="max-w-2xl text-base leading-7 sm:text-lg" style={{ color: palette.textSecondary.hex }}>
                  Sensor Hub Web centraliza sensores IoT, tendencias en vivo y alertas operativas para que puedas controlar un reactor de bajo porte durante procesos de mezcla líquida con más visibilidad y menos incertidumbre.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/dashboard"
                  className="rounded-full px-6 py-3 text-center text-sm font-semibold sm:text-base"
                  style={{
                    backgroundColor: palette.accentPrimary.hex,
                    color: palette.textInverse.hex,
                    boxShadow: `0 0 30px ${palette.overlay.hex}`,
                  }}
                >
                  Abrir consola del reactor
                </a>
                <a
                  href="#sensores"
                  className="rounded-full border px-6 py-3 text-center text-sm font-semibold sm:text-base"
                  style={{
                    borderColor: palette.borderSoft.hex,
                    backgroundColor: palette.surface.hex,
                    color: palette.textPrimary.hex,
                  }}
                >
                  Ver sensores monitoreados
                </a>
              </div>
            </div>

            <div
              className="w-full max-w-xl rounded-[28px] border p-5 shadow-2xl"
              style={{
                borderColor: palette.borderStrong.hex,
                backgroundColor: palette.surface.hex,
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                    Reactor A-17
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Estado operacional</h2>
                </div>
                <span className="rounded-full px-3 py-1 text-sm" style={{ backgroundColor: statusPalette.normal.background, color: statusPalette.normal.color }}>
                  Lote estable
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                  >
                    <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6" style={{ color: palette.textSecondary.hex }}>
                      {stat.note}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-3xl border p-4" style={{ borderColor: palette.borderSoft.hex, backgroundColor: "rgba(5, 16, 29, 0.42)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                      Señales vivas
                    </p>
                    <p className="mt-2 text-lg font-semibold">Variables priorizadas del operador</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs" style={{ color: palette.textSecondary.hex }}>
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: palette.accentPrimary.hex }} />
                    WebSocket listo
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {sensorHighlights.map((sensor) => (
                    <div
                      key={sensor.name}
                      className="flex items-center justify-between rounded-2xl border px-4 py-3"
                      style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surfaceStrong.hex }}
                    >
                      <div>
                        <p className="font-medium">{sensor.name}</p>
                        <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                          {sensor.trend}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold">{sensor.reading}</p>
                        <span className="rounded-full px-2 py-1 text-xs" style={{ backgroundColor: sensor.status.background, color: sensor.status.color }}>
                          {sensor.status.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="grid gap-5 md:grid-cols-3">
            {reactorCapabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-[28px] border p-6 backdrop-blur"
                style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
              >
                <p className="text-sm uppercase tracking-[0.18em]" style={{ color: palette.accentPrimary.hex }}>
                  Capacidad
                </p>
                <h2 className="mt-4 text-xl font-semibold">{capability.title}</h2>
                <p className="mt-3 text-sm leading-7" style={{ color: palette.textSecondary.hex }}>
                  {capability.description}
                </p>
              </article>
            ))}
          </div>

          <aside
            className="rounded-[28px] border p-6"
            style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surfaceStrong.hex }}
          >
            <p className="text-sm uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
              Preview del dashboard
            </p>
            <h2 className="mt-3 text-2xl font-semibold">La consola prioriza el estado del proceso antes que el adorno.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {dashboardPreview.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border px-4 py-4"
                  style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                >
                  <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="sensores" className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <article
            className="rounded-[30px] border p-6"
            style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surface.hex }}
          >
            <p className="text-sm uppercase tracking-[0.22em]" style={{ color: palette.accentSecondary.hex }}>
              Sensores soportados
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Diseñado para el ecosistema real de un reactor de mezclas.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7" style={{ color: palette.textSecondary.hex }}>
              La plataforma parte de temperatura, pH y humedad, y se amplía con señales que suelen ser decisivas en microprocesos industriales: nivel, agitación, turbidez, conductividad y presión.
            </p>
            <div className="mt-6 grid gap-3">
              {supportedSensors.map((sensor) => (
                <div
                  key={sensor}
                  className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                  style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.backgroundHighlight.hex }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: palette.accentPrimary.hex }} />
                  <span>{sensor}</span>
                </div>
              ))}
            </div>
          </article>

          <article
            className="rounded-[30px] border p-6"
            style={{ borderColor: palette.borderSoft.hex, backgroundColor: palette.surfaceStrong.hex }}
          >
            <p className="text-sm uppercase tracking-[0.22em]" style={{ color: palette.textMuted.hex }}>
              Flujo operativo
            </p>
            <div className="mt-5 space-y-5">
              {operatingFlow.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold"
                    style={{ borderColor: palette.borderStrong.hex, backgroundColor: palette.overlay.hex, color: palette.accentPrimary.hex }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: palette.textSecondary.hex }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border p-5" style={{ borderColor: palette.borderSoft.hex, backgroundColor: "rgba(5, 16, 29, 0.42)" }}>
              <p className="text-sm uppercase tracking-[0.22em]" style={{ color: palette.warning.hex }}>
                Lógica de alertas
              </p>
              <p className="mt-3 text-base leading-7" style={{ color: palette.textSecondary.hex }}>
                Cuando una variable sale de su ventana segura, la interfaz eleva la severidad, muestra la desviación respecto al setpoint y conserva el contexto temporal para tomar decisiones sin perder trazabilidad.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
