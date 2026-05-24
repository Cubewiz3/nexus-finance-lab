import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Finance Lab | Planificador de Jubilación Perú 2026",
  description:
    "Plantilla Excel editable para proyectar tu jubilación en Perú con inflación, tipo de cambio, Monte Carlo, SWR, stress tests y guía incluida.",
  openGraph: {
    title: "Nexus Finance Lab | Planificador de Jubilación Perú 2026",
    description:
      "Plantilla Excel editable para proyectar tu jubilación en Perú con inflación, tipo de cambio, Monte Carlo, SWR, stress tests y guía incluida.",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Finance Lab | Planificador de Jubilación Perú 2026",
    description:
      "Plantilla Excel editable para proyectar tu jubilación en Perú con inflación, tipo de cambio, Monte Carlo, SWR, stress tests y guía incluida.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
