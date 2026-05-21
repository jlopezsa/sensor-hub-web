import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sensor Hub Web | Monitoreo industrial para reactores IoT",
  description:
    "Consola web para visualizar, supervisar y responder a sensores IoT conectados a un reactor de mezclas líquidas en tiempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
