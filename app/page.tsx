"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Gift,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const CHECKOUT_URL =
  "https://payhip.com/buy?s=1&cart_links%5B%5D=guU0w&qty%5BguU0w%5D=1";

interface ProductTemplate {
  id: string;
  tag: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  color: string;
  border: string;
  shadow: string;
  bgGradient: string;
  checkoutUrl: string;
  specs: string;
}

const PRODUCT_DATA: ProductTemplate[] = [
  {
    id: "retirement",
    tag: "Retiro Seguro & FIRE",
    title: "Planificador de Jubilación Perú 2026 (v4)",
    description:
      "Modelo editable para proyectar tu independencia financiera con escenarios de inflación, tipo de cambio, rentabilidad, stress tests y retiros mensuales sostenibles.",
    price: 9,
    features: [
      "Simulador Monte Carlo con 200+ corridas estadísticas",
      "Stress tests para inflación, devaluación y baja rentabilidad",
      "Calculadora SWR adaptada a Latinoamérica",
      "Módulo de gastos hormiga y optimización mensual",
    ],
    color: "text-emerald-400",
    border: "hover:border-emerald-500/50",
    shadow: "shadow-emerald-500/10",
    bgGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    checkoutUrl: CHECKOUT_URL,
    specs: "Compatible con Excel 2021+ y Google Sheets. Configurado en Soles (S/) y USD.",
  },
];

const trustItems = [
  "Pago único y descarga inmediata",
  "Guía de uso incluida como regalo",
  "Editable en Excel y Google Sheets",
  "Modelo educativo, no asesoría financiera",
];

const previewRows = [
  ["Prob. éxito", "58%", "Monte Carlo"],
  ["Meta retiro", "S/ 1.65M", "Regla 4%"],
  ["Tipo cambio", "S/ 3.75", "USD/PEN"],
  ["Retiro 4%", "S/ 8,682", "Mensual"],
];

const excelModules = [
  {
    name: "Dashboard",
    title: "Resumen ejecutivo",
    description:
      "Muestra capital final, edad de jubilación, probabilidad de éxito, capital real, retiro mensual y años restantes.",
  },
  {
    name: "Supuestos",
    title: "Inputs editables",
    description:
      "Centraliza edad, capital inicial, aporte mensual, inflación, tipo de cambio, gasto esperado y distribución del portafolio.",
  },
  {
    name: "Proyección",
    title: "Evolución año por año",
    description:
      "Calcula aporte anual, capital inicial, retorno nominal, capital final, inflación acumulada y capital real.",
  },
  {
    name: "MonteCarlo",
    title: "Probabilidad de éxito",
    description:
      "Simula 200 escenarios y resume percentiles pesimista, mediana, optimista, media y desviación estándar.",
  },
  {
    name: "SWR",
    title: "Retiro mensual seguro",
    description:
      "Compara tasas de retiro 3.5%, 4% y 5%, y calcula cuánto capital necesitas para distintos gastos mensuales.",
  },
  {
    name: "StressTests",
    title: "Crisis y escenarios extremos",
    description:
      "Evalúa hiperinflación, devaluación, crisis 2008, shock COVID, crisis bancaria y estancamiento.",
  },
];

const templateMockups = [
  {
    name: "Dashboard",
    title: "Resumen general de tu plan",
    description:
      "Vista principal con capital estimado, edad objetivo, retiro mensual y lectura rápida del avance.",
    image: "/mockups/dashboardmockup.png",
  },
  {
    name: "Gastos Mensuales",
    title: "Control de ingresos, gastos e inversión",
    description:
      "Muestra cuánto ganas, cuánto gastas, cuánto inviertes y cuánto queda libre cada mes.",
    image: "/mockups/gastosmockup.png",
  },
  {
    name: "Proyección",
    title: "Evolución año por año",
    description:
      "Calcula cómo crece tu capital con aportes, retorno esperado, inflación y valor real en el tiempo.",
    image: "/mockups/proyeccionmockup.png",
  },
  {
    name: "Supuestos",
    title: "Inputs que tú editas",
    description:
      "Centraliza edad, aporte mensual, inflación, tipo de cambio, gasto esperado y datos base del modelo.",
    image: "/mockups/supuestosmockup.png",
  },
];

const testimonials = [
  {
    name: "Andrea M.",
    role: "Analista de datos, Lima",
    quote:
      "Me ayudó a aterrizar mi meta FIRE en numeros reales. Antes tenía una idea suelta; ahora veo edad, aportes y retiro mensual en una sola hoja.",
    result: "Proyectó su retiro 7 años antes",
  },
  {
    name: "Carlos R.",
    role: "Emprendedor, Arequipa",
    quote:
      "Lo mejor es que considera inflación y tipo de cambio. Para quienes ganamos en soles pero invertimos una parte en USD, eso cambia bastante la lectura.",
    result: "Ordenó aportes en S/ y USD",
  },
  {
    name: "Valeria P.",
    role: "Arquitecta, Trujillo",
    quote:
      "La plantilla se siente profesional, pero no intimidante. La guia me llevo paso a paso y pude entender cuánto necesito invertir sin depender de formulas raras.",
    result: "Definió una meta mensual clara",
  },
  {
    name: "Miguel A.",
    role: "Ingeniero, Cusco",
    quote:
      "Me gusto que no vende humo. Cambie supuestos, probe escenarios malos y pude ver si mi plan seguia teniendo sentido.",
    result: "Creó 3 escenarios de retiro",
  },
];

export default function CompletePremiumLanding() {
  const [mounted, setMounted] = useState(false);
  const [edadActual, setEdadActual] = useState(28);
  const [ahorroMensual, setAhorroMensual] = useState(1000);
  const [edadRetiro, setEdadRetiro] = useState(55);
  const [tipoCambio, setTipoCambio] = useState(3.75);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projection = useMemo(() => {
    const inflacionEstimada = 0.035;
    const retornoPonderado = 0.0995;
    const crecimientoAporte = 0.05;
    const anosParaJubilarse = Math.max(edadRetiro - edadActual, 0);
    let capitalProyectado = 20000;
    let aporteAnual = ahorroMensual * 12;

    for (let year = 0; year < anosParaJubilarse; year += 1) {
      const retornoAnual = (capitalProyectado + aporteAnual / 2) * retornoPonderado;
      capitalProyectado = capitalProyectado + aporteAnual + retornoAnual;
      aporteAnual = aporteAnual * (1 + crecimientoAporte);
    }

    const capitalFinalNominal = Math.round(capitalProyectado);

    const capitalReal = Math.round(
      capitalFinalNominal / Math.pow(1 + inflacionEstimada, anosParaJubilarse),
    );

    return {
      anosParaJubilarse,
      capitalFinalNominal,
      capitalReal,
      capitalUsd: Math.round(capitalFinalNominal / tipoCambio),
      retiroMensual4Porciento: Math.round((capitalFinalNominal * 0.04) / 12),
    };
  }, [ahorroMensual, edadActual, edadRetiro, tipoCambio]);

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-slate-200 antialiased">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-12%] top-[-20%] h-[36rem] w-[36rem] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute right-[-16%] top-[28%] h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between gap-3 border-b border-white/5 px-4 py-4 backdrop-blur-sm sm:px-6 md:px-12 md:py-6">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 shadow-lg shadow-emerald-500/20 md:h-10 md:w-10">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-black tracking-tight md:text-xl">
              NEXUS
            </span>
            <span className="mt-0.5 text-[9px] font-extrabold tracking-[0.14em] text-emerald-400 md:text-xs">
              FINANCE <span className="text-emerald-400">LAB</span>
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-xs font-semibold text-slate-400 md:flex">
          <a href="#simulador" className="transition hover:text-white">
            Simulador
          </a>
          <a href="#producto" className="transition hover:text-white">
            Plantilla
          </a>
        </div>
        <a
          href={CHECKOUT_URL}
          className="buy-pulse promo-shine shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400 px-3 py-2 text-[11px] font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:px-5 sm:text-xs"
        >
          Comprar S/ 34
        </a>
      </nav>

      <div className="promo-pulse relative z-40 border-b border-emerald-400/10 bg-emerald-400/10 px-4 py-3 text-center text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-emerald-300 sm:px-6 md:text-sm md:tracking-[0.18em]">
        Oferta de lanzamiento: S/ 34 hoy · precio regular S/ 109 · guía de uso de regalo · 69% OFF
      </div>

      <header className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-14 sm:px-6 md:px-12 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-28">
        <div className="lg:col-span-7">
          <span className="promo-pulse mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[10px] font-black uppercase leading-5 tracking-[0.12em] text-amber-200 shadow-lg shadow-amber-500/10 sm:px-4 sm:text-xs sm:tracking-[0.16em]">
            <Zap className="h-3.5 w-3.5 text-emerald-300" />
            Precio lanzamiento S/ 34 · guía de uso de regalo · 69% OFF
          </span>
          <h1 className="max-w-4xl text-[2.55rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Proyecta tu jubilación en Perú con una plantilla financiera lista
            para usar.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Replica la lógica de tu archivo: supuestos editables, proyección año
            por año, Monte Carlo, tasa de retiro segura, stress tests y control
            de gastos en soles y dólares.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CHECKOUT_URL}
              className="buy-pulse promo-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <span className="flex flex-col items-start leading-none">
                <span>Comprar por S/ 34</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-700 line-through">
                  Precio regular S/ 109
                </span>
              </span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#simulador"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Ver demo interactiva
            </a>
          </div>
          <p className="promo-pulse mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
            Ahorra S/ 75 y recibe la guía completa de regalo
          </p>
          <p className="mt-3 text-xs font-semibold text-slate-500">
            Pago seguro con Mercado Pago · descarga enviada automáticamente por
            Payhip
          </p>
          <PaymentTrustLogos className="mt-4" />
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-xs leading-5 text-slate-400"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Dashboard real del Excel
                  </p>
                  <h2 className="mt-1 text-xl font-black text-white">
                    Planificador FIRE Perú
                  </h2>
                </div>
                <FileSpreadsheet className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/10 p-4">
                  <span className="text-[10px] uppercase text-emerald-300">
                    Retiro mensual
                  </span>
                  <strong className="mt-1 block font-mono text-2xl text-white">
                    S/ {projection.retiroMensual4Porciento.toLocaleString()}
                  </strong>
                </div>
                <div className="rounded-2xl border border-blue-500/10 bg-blue-500/10 p-4">
                  <span className="text-[10px] uppercase text-blue-300">
                    Años hasta retiro
                  </span>
                  <strong className="mt-1 block font-mono text-2xl text-white">
                    {projection.anosParaJubilarse} años
                  </strong>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/5">
                {previewRows.map(([label, value, note]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[1.1fr_0.7fr_0.8fr] border-b border-white/5 bg-slate-900/70 px-4 py-3 text-xs last:border-b-0"
                  >
                    <span className="text-slate-400">{label}</span>
                    <span className="font-mono text-white">{value}</span>
                    <span className="text-right text-slate-500">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        id="simulador"
        className="relative z-10 mx-auto mb-20 grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:mb-28 md:px-12 lg:grid-cols-12 lg:gap-12"
      >
        <div className="space-y-6 lg:col-span-5">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            Demo viva del modelo
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Audita el funcionamiento matemático antes de comprar.
          </h2>
          <p className="text-sm leading-7 text-slate-400">
            Esta demo usa los mismos inputs principales de la hoja Supuestos:
            edad actual, edad de retiro, aporte mensual y tipo de cambio. La
            plantilla completa agrega gastos, portafolio, Monte Carlo, SWR y
            stress tests.
          </p>
          <a
            href={CHECKOUT_URL}
            className="buy-pulse promo-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Comprar por S/ 34
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-4 shadow-2xl backdrop-blur-md sm:p-6 md:rounded-[32px] md:p-8 lg:col-span-7">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="ml-2 truncate font-mono text-xs text-slate-500">
                Planificador_Jubilacion_Peru_2026.xlsx
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <SliderField
              label="Edad actual"
              value={`${edadActual} años`}
              min={18}
              max={50}
              step={1}
              state={edadActual}
              onChange={setEdadActual}
            />
            <SliderField
              label="Ahorro mensual"
              value={`S/ ${ahorroMensual.toLocaleString()}`}
              min={200}
              max={5000}
              step={100}
              state={ahorroMensual}
              onChange={setAhorroMensual}
            />
            <SliderField
              label="Edad objetivo de retiro"
              value={`${edadRetiro} años`}
              min={40}
              max={70}
              step={1}
              state={edadRetiro}
              onChange={setEdadRetiro}
            />
            <SliderField
              label="Tipo de cambio proyectado"
              value={`S/ ${tipoCambio.toFixed(2)}`}
              min={3.2}
              max={4.6}
              step={0.05}
              state={tipoCambio}
              onChange={setTipoCambio}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Capital estimado"
              value={`S/ ${projection.capitalFinalNominal.toLocaleString()}`}
            />
            <MetricCard
              label="Valor en dinero de hoy"
              value={`S/ ${projection.capitalReal.toLocaleString()}`}
              className="border-blue-500/10 bg-blue-500/5 text-blue-400"
            />
            <MetricCard
              label="Capital en USD"
              value={`$${projection.capitalUsd.toLocaleString()}`}
              className="border-amber-500/10 bg-amber-500/5 text-amber-300"
            />
            <MetricCard
              label="Retiro mensual 4%"
              value={`S/ ${projection.retiroMensual4Porciento.toLocaleString()}`}
              className="border-emerald-500/10 bg-emerald-500/5 text-emerald-400"
            />
          </div>
        </div>
      </section>

      <section
        id="producto"
        className="relative z-10 mx-auto mb-20 max-w-7xl px-4 sm:px-6 md:mb-28 md:px-12"
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-emerald-500/20 bg-emerald-500/[0.04] shadow-2xl shadow-emerald-500/10 md:rounded-[32px] lg:grid-cols-12">
          <div className="p-5 sm:p-8 md:p-10 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Producto principal
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Planificador de Jubilación Perú 2026
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              Una plantilla editable basada en 10 hojas conectadas: Dashboard,
              Supuestos, Gastos Mensuales, Proyección, Comparativa, MonteCarlo,
              SWR, StressTests, DatosHistóricos e Instrucciones.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
              {PRODUCT_DATA[0].features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-950/50 p-4 text-sm text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between border-t border-white/5 bg-slate-950/70 p-5 sm:p-8 md:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
            <div>
              <div className="promo-pulse mb-5 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-amber-200">
                Oferta de lanzamiento
              </div>
              <p className="text-sm font-bold text-slate-400">
                Acceso inmediato
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <span className="text-5xl font-black text-white sm:text-6xl">S/ 34</span>
                <div className="pb-1 text-xs uppercase tracking-widest text-slate-500">
                  <span className="block text-sm font-bold text-slate-400 line-through">Precio regular S/ 109</span>
                  <span className="mt-2 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3 py-1.5 text-xs font-black text-emerald-300">
                    69% OFF
                  </span>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                {PRODUCT_DATA[0].specs}
              </p>
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-emerald-300">
                      Bono incluido
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      Guía de uso paso a paso de regalo
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Aprende qué llenar, cómo leer el Dashboard y cómo interpretar Monte Carlo, SWR y StressTests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <a
                href={PRODUCT_DATA[0].checkoutUrl}
                className="buy-pulse promo-shine flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
              <span className="flex flex-col items-start leading-none">
                <span>Comprar por S/ 34</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-700 line-through">
                  Precio regular S/ 109
                </span>
              </span>
              <ArrowRight className="h-4 w-4" />
            </a>
              <p className="text-center text-xs font-semibold text-slate-500">
                Pago seguro con Mercado Pago · entrega automática por Payhip
              </p>
              <PaymentTrustLogos className="justify-center" />
              <p className="text-center text-xs leading-5 text-slate-500">
                Modelo educativo de planificación. No reemplaza asesoría
                financiera personalizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mb-20 max-w-7xl px-4 sm:px-6 md:mb-28 md:px-12">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Vista previa
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Mira las hojas principales antes de comprar
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Estos mockups muestran las partes clave que recibes dentro del
              archivo: dashboard, gastos mensuales, proyección y supuestos.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
            Excel + guía incluida
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {templateMockups.map((mockup) => (
            <article
              key={mockup.name}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-transparent shadow-2xl shadow-black/20 backdrop-blur-xl md:rounded-[28px]"
            >
              <div className="border-b border-white/5 bg-slate-950/70 p-4 sm:p-5">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  {mockup.name}
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {mockup.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {mockup.description}
                </p>
              </div>
              <div className="bg-transparent p-3">
                <img
                  src={mockup.image}
                  alt={`Vista previa de la hoja ${mockup.name} del Planificador de Jubilación Perú 2026`}
                  className="aspect-[16/10] w-full rounded-2xl object-cover object-top"
                />
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="relative z-10 mx-auto mb-20 max-w-7xl px-4 sm:px-6 md:mb-28 md:px-12">
        <div className="mb-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Dentro del Excel
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Las partes de la plantilla convertidas en beneficios claros
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            La plantilla abre con un Dashboard de resultados,
            continúa con Supuestos como área editable y suma módulos avanzados
            como Proyección, Monte Carlo, SWR y StressTests.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {excelModules.map((module) => (
            <article
              key={module.name}
              className="rounded-[28px] border border-white/10 bg-slate-900/45 p-6 shadow-xl backdrop-blur-xl"
            >
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                {module.name}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {module.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <TestimonialsRibbon />
      <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center text-xs text-slate-500 sm:px-6 md:px-12">
        <p>
          Producto educativo. No constituye asesoría financiera, legal ni
          tributaria.
        </p>
        <a
          href="/terminos"
          className="mt-3 inline-flex font-bold text-emerald-300 transition hover:text-emerald-200"
        >
          Ver términos y condiciones
        </a>
      </footer>
      <style jsx>{`
        .promo-shine {
          position: relative;
          overflow: hidden;
        }

        .promo-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-130%);
          background: linear-gradient(
            110deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 45%,
            transparent 70%
          );
          animation: promo-shine 3.8s ease-in-out infinite;
        }

        .promo-pulse {
          animation: promo-pulse 2.8s ease-in-out infinite;
        }

        @keyframes promo-shine {
          0%, 55% {
            transform: translateX(-130%);
          }
          78%, 100% {
            transform: translateX(130%);
          }
        }

        @keyframes buy-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 28px rgba(52, 211, 153, 0.18);
          }
          50% {
            transform: scale(1.035);
            box-shadow: 0 16px 42px rgba(52, 211, 153, 0.34);
          }
        }

        @keyframes promo-pulse {
          0%, 100% {
            box-shadow: 0 0 0 rgba(52, 211, 153, 0);
          }
          50% {
            box-shadow: 0 0 28px rgba(52, 211, 153, 0.18);
          }
        }

      `}</style>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  state,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  state: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between gap-4 text-xs">
        <span className="text-slate-300">{label}</span>
        <strong className="font-mono text-white">{value}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={state}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-900 accent-emerald-500"
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  className = "border-white/5 bg-white/5 text-white",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <span className="mb-1 block text-[10px] uppercase text-slate-400">
        {label}
      </span>
      <span className="font-mono text-lg font-bold">{value}</span>
    </div>
  );
}

function PaymentTrustLogos({ className = "" }: { className?: string }) {
  return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="inline-flex h-11 w-[142px] items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white px-2 shadow-lg shadow-black/10 sm:h-12 sm:w-[158px]">
        <img
          src="/logos/mercado-pago.svg"
          alt="Mercado Pago"
          className="h-8 w-auto scale-[1.35] sm:h-9"
        />
      </span>
      <span className="inline-flex h-11 w-[124px] items-center justify-center rounded-full border border-white/10 bg-white px-4 shadow-lg shadow-black/10 sm:h-12 sm:w-[132px]">
        <img
          src="/logos/payhip.png"
          alt="Payhip"
          className="h-6 w-auto sm:h-7"
        />
      </span>
    </div>
  );
}

function TestimonialsRibbon() {
  const ribbonItems = [...testimonials, ...testimonials];

  return (
    <section className="relative z-10 overflow-hidden border-t border-white/5 pb-24 pt-16">
      <div className="mx-auto mb-10 flex max-w-7xl flex-col justify-between gap-4 px-6 md:flex-row md:items-end md:px-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Valoraciones
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Usuarios que ya pusieron sus números en orden
          </h2>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex text-amber-300">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-current"
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-white">4.9/5</span>
          <span className="text-xs text-slate-500">valoración promedio</span>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020617] to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020617] to-transparent md:w-40" />

        <motion.div
          className="flex w-max gap-6 px-6 md:px-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {ribbonItems.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="w-[20rem] shrink-0 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl md:w-[26rem]"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
                <div className="flex text-amber-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5 fill-current"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-300">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-5 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 text-xs font-bold text-emerald-300">
                {testimonial.result}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}









