// Paleta centralizada para reutilizar colores en distintas paginas.
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
    tailwind: "zinc-50",
    hex: "#fafafa",
    description: "Base claro para secciones amplias y fondos de pagina.",
  },
  backgroundHighlight: {
    tailwind: "zinc-100",
    hex: "#f4f4f5",
    description: "Suaviza bloques destacados dentro del flujo de contenido.",
  },
  surface: {
    tailwind: "white",
    hex: "#ffffff",
    description: "Tarjetas, paneles y componentes con borde suave.",
  },
  borderSoft: {
    tailwind: "zinc-200",
    hex: "#e4e4e7",
    description: "Bordes y divisores con baja jerarquia visual.",
  },
  textPrimary: {
    tailwind: "zinc-900",
    hex: "#18181b",
    description: "Titulos, mensajes principales y botones oscuros.",
  },
  textSecondary: {
    tailwind: "zinc-600",
    hex: "#52525b",
    description: "Parrafos de soporte, descripciones y labels.",
  },
  textSubtle: {
    tailwind: "zinc-300",
    hex: "#d4d4d8",
    description: "Estadisticas y texto sobre fondos muy oscuros.",
  },
  textInverse: {
    tailwind: "white",
    hex: "#ffffff",
    description: "Texto sobre fondos oscuros en botones y banners.",
  },
  accentPrimary: {
    tailwind: "indigo-500",
    hex: "#6366f1",
    description: "CTA principal y elementos destacados.",
  },
  accentPrimaryHover: {
    tailwind: "indigo-400",
    hex: "#818cf8",
    description: "Estado hover para el CTA principal.",
  },
  accentSecondary: {
    tailwind: "indigo-300",
    hex: "#a5b4fc",
    description: "Etiquetas, microcopys y badges secundarios.",
  },
  actionDark: {
    tailwind: "zinc-900",
    hex: "#18181b",
    description: "Botones neutros con texto blanco.",
  },
  actionDarkHover: {
    tailwind: "zinc-700",
    hex: "#3f3f46",
    description: "Estado hover para botones neutros oscuros.",
  },
  overlay: {
    tailwind: "black/30",
    hex: "rgba(0, 0, 0, 0.3)",
    description: "Paneles con transparencia y tarjetas en fondos oscuros.",
  },
};

export const gradients: Record<string, GradientToken> = {
  heroBackground: {
    tailwind: "from-zinc-50 via-white to-zinc-100",
    stops: ["#fafafa", "#ffffff", "#f4f4f5"],
    description: "Gradiente utilizado en la cabecera principal de la landing.",
  },
};

export type PaletteToken = keyof typeof palette;
