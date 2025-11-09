import { palette } from "../theme/colors";

const sensors = [
  {
    id: "temp-01",
    name: "Sensor de temperatura",
    location: "Linea 3 - Reactor A",
    value: "24.3 C",
    target: "22.0 C",
    trend: "+0.4 C vs 1h",
    status: "Estable",
  },
  {
    id: "hum-04",
    name: "Sensor de humedad",
    location: "Almacen de materias primas",
    value: "48 %",
    target: "45 %",
    trend: "-1.2 % vs 1h",
    status: "Dentro de rango",
  },
];

const temperatureSeries = [
  { label: "08:00", value: 22.8 },
  { label: "09:00", value: 23.1 },
  { label: "10:00", value: 23.6 },
  { label: "11:00", value: 24.1 },
  { label: "12:00", value: 24.3 },
];

const humiditySeries = [
  { label: "08:00", value: 52 },
  { label: "09:00", value: 51 },
  { label: "10:00", value: 49 },
  { label: "11:00", value: 48 },
  { label: "12:00", value: 48 },
];

const realtimeSeries = {
  temperature: [
    { time: "12:00:05", value: 24.1 },
    { time: "12:00:10", value: 24.2 },
    { time: "12:00:15", value: 24.2 },
    { time: "12:00:20", value: 24.3 },
    { time: "12:00:25", value: 24.4 },
    { time: "12:00:30", value: 24.3 },
    { time: "12:00:35", value: 24.5 },
  ],
  humidity: [
    { time: "12:00:05", value: 48 },
    { time: "12:00:10", value: 48.2 },
    { time: "12:00:15", value: 47.9 },
    { time: "12:00:20", value: 48.1 },
    { time: "12:00:25", value: 48.4 },
    { time: "12:00:30", value: 48.3 },
    { time: "12:00:35", value: 48.2 },
  ],
};

const buildPolyline = (data: { value: number }[], min: number, max: number) => {
  if (data.length <= 1) return "";
  return data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const normalized = (point.value - min) / (max - min || 1);
      const y = 100 - normalized * 100;
      return `${x},${y}`;
    })
    .join(" ");
};

const allRealtimeValues = [
  ...realtimeSeries.temperature.map((point) => point.value),
  ...realtimeSeries.humidity.map((point) => point.value),
];

const realtimeMin = Math.min(...allRealtimeValues);
const realtimeMax = Math.max(...allRealtimeValues);

const realtimePolylines = {
  temperature: buildPolyline(realtimeSeries.temperature, realtimeMin, realtimeMax),
  humidity: buildPolyline(realtimeSeries.humidity, realtimeMin, realtimeMax),
};

export default function Dashboard() {
  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{ backgroundColor: palette.backgroundBase.hex, color: palette.textPrimary.hex }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="space-y-4 text-center md:text-left">
          <p
            className="text-sm font-semibold uppercase tracking-[0.3em]"
            style={{ color: palette.accentPrimary.hex }}
          >
            Sensor Hub
          </p>
          <h1 className="text-4xl font-semibold">Panel de control</h1>
          <p className="text-lg" style={{ color: palette.textSecondary.hex }}>
            Aqui veras tus widgets, alertas y reportes operativos. Puedes personalizar el tablero arrastrando
            tarjetas y conectando nuevas fuentes.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className="rounded-2xl border p-5 shadow-sm"
              style={{
                backgroundColor: palette.surface.hex,
                borderColor: palette.borderSoft.hex,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
                    {sensor.id}
                  </p>
                  <h3 className="text-xl font-semibold">{sensor.name}</h3>
                  <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                    {sensor.location}
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: palette.accentSecondary.hex,
                    color: palette.textInverse.hex,
                  }}
                >
                  {sensor.status}
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                    Valor actual
                  </p>
                  <p className="text-3xl font-semibold">{sensor.value}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                    Objetivo
                  </p>
                  <p className="text-3xl font-semibold" style={{ color: palette.accentPrimary.hex }}>
                    {sensor.target}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm" style={{ color: palette.textSecondary.hex }}>
                Tendencia: <span style={{ color: palette.textPrimary.hex }}>{sensor.trend}</span>
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div
            className="rounded-3xl border p-6 shadow-sm"
            style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
                  Temperatura
                </p>
                <h3 className="text-2xl font-semibold">Evolucion ultimas 4h</h3>
              </div>
              <span className="text-sm" style={{ color: palette.textSecondary.hex }}>
                Serie en C
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              {temperatureSeries.map((point) => (
                <div key={point.label} className="flex-1 text-center">
                  <div
                    className="mx-auto w-4 rounded-full"
                    style={{
                      height: `${point.value * 6}px`,
                      backgroundColor: palette.accentPrimary.hex,
                    }}
                  />
                  <p className="mt-2 text-sm font-semibold">{point.value.toFixed(1)}</p>
                  <p className="text-xs" style={{ color: palette.textSecondary.hex }}>
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-3xl border p-6 shadow-sm"
            style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
                  Humedad
                </p>
                <h3 className="text-2xl font-semibold">Evolucion ultimas 4h</h3>
              </div>
              <span className="text-sm" style={{ color: palette.textSecondary.hex }}>
                Serie en %
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              {humiditySeries.map((point) => (
                <div key={point.label} className="flex-1 text-center">
                  <div
                    className="mx-auto w-4 rounded-full"
                    style={{
                      height: `${point.value * 2}px`,
                      backgroundColor: palette.actionDark.hex,
                    }}
                  />
                  <p className="mt-2 text-sm font-semibold">{point.value.toFixed(0)}%</p>
                  <p className="text-xs" style={{ color: palette.textSecondary.hex }}>
                    {point.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="rounded-3xl border p-6 shadow-sm"
          style={{ backgroundColor: palette.surface.hex, borderColor: palette.borderSoft.hex }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
                Tiempo real
              </p>
              <h3 className="text-2xl font-semibold">Variacion instantanea</h3>
              <p className="text-sm" style={{ color: palette.textSecondary.hex }}>
                Actualiza cada 5 segundos y sincroniza temperatura y humedad en la misma escala.
              </p>
            </div>
            <div className="flex gap-4 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: palette.accentPrimary.hex }} />
                Temperatura
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: palette.actionDark.hex }} />
                Humedad
              </span>
            </div>
          </div>
          <div className="mt-6 h-64 w-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="temp-line" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={palette.accentPrimary.hex} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={palette.accentPrimary.hex} stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="hum-line" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={palette.actionDark.hex} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={palette.actionDark.hex} stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill="none" stroke={palette.borderSoft.hex} strokeWidth="0.2" />
              <polyline
                fill="none"
                stroke={palette.accentPrimary.hex}
                strokeWidth="1"
                points={realtimePolylines.temperature}
              />
              <polyline
                fill="none"
                stroke={palette.actionDark.hex}
                strokeWidth="1"
                points={realtimePolylines.humidity}
              />
            </svg>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm" style={{ color: palette.textSecondary.hex }}>
            {realtimeSeries.temperature.map((point, index) => (
              <div key={point.time} className="space-y-1">
                <p className="font-semibold">{point.time}</p>
                <p>Temp: {point.value.toFixed(1)} C</p>
                <p>Hum: {realtimeSeries.humidity[index]?.value.toFixed(1)} %</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-3xl border px-6 py-6" style={{ borderColor: palette.borderSoft.hex }}>
          <p className="text-sm uppercase tracking-[0.2em]" style={{ color: palette.textSecondary.hex }}>
            Proximo paso
          </p>
          <p className="mt-2 text-lg" style={{ color: palette.textPrimary.hex }}>
            Integra tu primera fuente de datos desde el menu lateral para comenzar a poblar el dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
