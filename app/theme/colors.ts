type SolidColor = {
  tailwind: string;
  hex: string;
  description: string;
};

type GradientToken = {
  tailwind: string;
  stops: string[];
  description: string;
};

export const palette: Record<string, SolidColor> = {
  backgroundBase: {
    tailwind: "slate-950",
    hex: "#06111f",
    description: "Base principal del producto, profunda y técnica.",
  },
  backgroundCanvas: {
    tailwind: "slate-950",
    hex: "#08182b",
    description: "Plano inferior para fondos atmosféricos y overlays amplios.",
  },
  backgroundHighlight: {
    tailwind: "slate-900",
    hex: "#0e2238",
    description: "Bloques secundarios y fondos de tarjetas internas.",
  },
  surface: {
    tailwind: "slate-900/80",
    hex: "rgba(14, 34, 56, 0.78)",
    description: "Superficies principales tipo panel con transparencia controlada.",
  },
  surfaceStrong: {
    tailwind: "slate-900",
    hex: "#10263d",
    description: "Paneles de mayor jerarquía para áreas críticas.",
  },
  borderSoft: {
    tailwind: "cyan-950",
    hex: "rgba(104, 184, 255, 0.18)",
    description: "Borde suave para separar paneles sin romper el fondo oscuro.",
  },
  borderStrong: {
    tailwind: "cyan-700",
    hex: "rgba(96, 205, 255, 0.38)",
    description: "Borde destacado para foco y énfasis técnico.",
  },
  textPrimary: {
    tailwind: "slate-50",
    hex: "#edf6ff",
    description: "Texto principal y métricas críticas.",
  },
  textSecondary: {
    tailwind: "slate-300",
    hex: "#8ea8c2",
    description: "Texto de soporte, etiquetas y microcopy.",
  },
  textMuted: {
    tailwind: "slate-400",
    hex: "#6f86a0",
    description: "Texto de menor jerarquía para metadatos y ejes.",
  },
  textInverse: {
    tailwind: "slate-950",
    hex: "#05101d",
    description: "Texto sobre acentos claros y badges activos.",
  },
  accentPrimary: {
    tailwind: "cyan-400",
    hex: "#56e0ff",
    description: "Acento principal para CTAs y elementos vivos.",
  },
  accentPrimarySoft: {
    tailwind: "cyan-300",
    hex: "#7be7ff",
    description: "Variante suave para destellos, hover y trazos secundarios.",
  },
  accentSecondary: {
    tailwind: "teal-300",
    hex: "#5eead4",
    description: "Acento complementario para sensores estables y highlights.",
  },
  accentSecondarySoft: {
    tailwind: "teal-200",
    hex: "#99f6e4",
    description: "Relleno translúcido para estados favorables.",
  },
  overlay: {
    tailwind: "cyan-400/10",
    hex: "rgba(86, 224, 255, 0.1)",
    description: "Capa translúcida para zonas destacadas.",
  },
  success: {
    tailwind: "emerald-400",
    hex: "#34d399",
    description: "Estado normal o estable.",
  },
  warning: {
    tailwind: "amber-400",
    hex: "#fbbf24",
    description: "Estado de atención o monitoreo.",
  },
  danger: {
    tailwind: "rose-400",
    hex: "#fb7185",
    description: "Alarma o condición crítica.",
  },
  neutral: {
    tailwind: "slate-500",
    hex: "#64748b",
    description: "Estado desconectado o neutro.",
  },
};

export const gradients: Record<string, GradientToken> = {
  siteBackground: {
    tailwind: "from-slate-950 via-slate-950 to-cyan-950/40",
    stops: ["#06111f 0%", "#07182c 45%", "#0b2840 100%"],
    description: "Gradiente principal del sitio con base azul profunda.",
  },
  heroGlow: {
    tailwind: "from-cyan-400/20 via-teal-300/10 to-transparent",
    stops: ["rgba(86, 224, 255, 0.22)", "rgba(94, 234, 212, 0.12)", "rgba(0, 0, 0, 0)"],
    description: "Brillo atmosférico para hero y paneles destacados.",
  },
  panelGlow: {
    tailwind: "from-cyan-400/12 to-transparent",
    stops: ["rgba(86, 224, 255, 0.12)", "rgba(0, 0, 0, 0)"],
    description: "Iluminación suave para tarjetas operativas.",
  },
};

export const statusPalette = {
  normal: {
    label: "Normal",
    color: palette.success.hex,
    background: "rgba(52, 211, 153, 0.12)",
  },
  stable: {
    label: "Estable",
    color: palette.accentSecondary.hex,
    background: "rgba(94, 234, 212, 0.12)",
  },
  warning: {
    label: "Atención",
    color: palette.warning.hex,
    background: "rgba(251, 191, 36, 0.12)",
  },
  alert: {
    label: "Alarma",
    color: palette.danger.hex,
    background: "rgba(251, 113, 133, 0.12)",
  },
  offline: {
    label: "Desconectado",
    color: palette.neutral.hex,
    background: "rgba(100, 116, 139, 0.14)",
  },
  syncing: {
    label: "Sincronizando",
    color: palette.accentPrimary.hex,
    background: "rgba(86, 224, 255, 0.12)",
  },
} as const;

export type PaletteToken = keyof typeof palette;
