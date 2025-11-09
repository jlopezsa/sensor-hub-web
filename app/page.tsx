import { gradients, palette } from "./theme/colors";

const features = [
  {
    title: "Panel unificado",
    description:
      "Consolida sensores industriales, PLCs y dispositivos IoT en una sola vista sencilla de interpretar.",
  },
  {
    title: "Alertas inteligentes",
    description:
      "Define umbrales dinamicos y recibe avisos multicanal antes de que una incidencia afecte la operacion.",
  },
  {
    title: "Informes automaticos",
    description:
      "Genera reportes listos para compartir con tu equipo, clientes o stakeholders en segundos.",
  },
];

const stats = [
  { label: "Alertas automatizadas", value: "120+" },
  { label: "Integraciones listas", value: "35" },
  { label: "Reduccion de fallos", value: "32%" },
  { label: "Tiempo de respuesta", value: "< 5 min" },
];

const steps = [
  {
    number: "01",
    title: "Conecta tus fuentes",
    description: "Sensor Hub detecta y documenta cada dispositivo sin interrumpir la operacion actual.",
  },
  {
    number: "02",
    title: "Configura flujos",
    description:
      "Arrastra reglas, define responsables y crea vistas personalizadas para cada equipo.",
  },
  {
    number: "03",
    title: "Actua con datos",
    description: "Recibe recomendaciones en contexto y un historial completo para auditorias.",
  },
];

export default function Home() {
  const heroGradient = `linear-gradient(180deg, ${gradients.heroBackground.stops.join(", ")})`;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: heroGradient,
        color: palette.textPrimary.hex,
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12 lg:py-20">
        <header className="space-y-6 text-center md:text-left">
          <p
            className="text-sm font-semibold uppercase tracking-[0.3em]"
            style={{ color: palette.accentPrimary.hex }}
          >
            Sensor Hub
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Monitoriza, analiza y responde en tiempo real.
          </h1>
          <p className="text-lg md:mx-0 md:max-w-3xl" style={{ color: palette.textSecondary.hex }}>
            Centraliza todos tus sensores industriales en un dashboard claro, detecta anomalias antes de que
            se conviertan en averias y comparte insights con tu equipo en cuestion de minutos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              className="rounded-full px-6 py-3 text-center transition hover:opacity-90"
              style={{
                backgroundColor: palette.actionDark.hex,
                color: palette.textInverse.hex,
              }}
              href="#contacto"
            >
              Solicitar demo
            </a>
            <a
              className="rounded-full border px-6 py-3 text-center transition hover:opacity-80"
              style={{
                borderColor: palette.borderSoft.hex,
                color: palette.textPrimary.hex,
              }}
              href="#features"
            >
              Ver caracteristicas
            </a>
            <a
              className="rounded-full px-6 py-3 text-center transition hover:opacity-90"
              style={{
                backgroundColor: palette.accentPrimary.hex,
                color: palette.textInverse.hex,
              }}
              href="/dashboard"
            >
              Ir al dashboard
            </a>
          </div>
        </header>

        <section id="features" className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border p-6 shadow-sm"
              style={{
                backgroundColor: palette.surface.hex,
                borderColor: palette.borderSoft.hex,
              }}
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm" style={{ color: palette.textSecondary.hex }}>
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section
          className="grid gap-8 rounded-3xl px-8 py-10 md:grid-cols-2"
          style={{ backgroundColor: palette.actionDark.hex, color: palette.textInverse.hex }}
        >
          <div className="space-y-6" style={{ color: palette.textInverse.hex }}>
            <h2 className="text-3xl font-semibold leading-tight">Alertas claras, decisiones rapidas.</h2>
            <p style={{ color: palette.textSubtle.hex }}>
              Define umbrales y recibe avisos multicanal cuando se detecten anomalias. El equipo dispone de
              contexto, pasos recomendados y estado historico en segundos.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border px-4 py-5"
                  style={{ borderColor: palette.overlay.hex }}
                >
                  <div className="text-3xl font-semibold">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wide" style={{ color: palette.textSubtle.hex }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="space-y-5 rounded-3xl p-6"
            style={{ backgroundColor: palette.overlay.hex, color: palette.textInverse.hex }}
          >
            <p className="text-sm font-semibold" style={{ color: palette.accentSecondary.hex }}>
              Como funciona
            </p>
            <div className="space-y-5">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="text-sm font-semibold" style={{ color: palette.accentSecondary.hex }}>
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm" style={{ color: palette.textSubtle.hex }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="rounded-3xl border px-8 py-10 text-center shadow-sm md:text-left"
          style={{
            borderColor: palette.borderSoft.hex,
            backgroundColor: palette.surface.hex,
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-[0.3em]"
                style={{ color: palette.accentPrimary.hex }}
              >
                Comienza hoy
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Automatiza tu monitoreo en menos de una semana.
              </h2>
              <p className="mt-2" style={{ color: palette.textSecondary.hex }}>
                Configura flujos, integra equipos de campo y comparte reportes con toda la organizacion sin codigo.
              </p>
            </div>
            <a
              className="rounded-full px-8 py-3 text-white transition hover:opacity-90"
              style={{
                backgroundColor: palette.accentPrimary.hex,
                color: palette.textInverse.hex,
              }}
              href="mailto:hola@sensorhub.io"
            >
              Hablar con un especialista
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
