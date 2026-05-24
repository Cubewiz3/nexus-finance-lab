import Link from "next/link";

const sections = [
  {
    title: "1. Naturaleza del producto",
    body: "Nexus Finance Lab ofrece una plantilla digital de planificación financiera para jubilación en Perú, junto con una guía de uso. El producto tiene fines educativos, informativos y de organización personal.",
  },
  {
    title: "2. No constituye asesoría financiera",
    body: "La plantilla, sus fórmulas, proyecciones, simulaciones, ejemplos y guía no constituyen asesoría financiera, tributaria, legal, contable ni recomendación personalizada de inversión. Cada usuario es responsable de evaluar su situación y, si lo necesita, consultar con un profesional autorizado.",
  },
  {
    title: "3. Proyecciones y resultados",
    body: "Los resultados generados dependen de los datos ingresados por el usuario y de supuestos como inflación, rentabilidad, tipo de cambio, aportes y edad de retiro. Las rentabilidades pasadas o estimadas no garantizan resultados futuros.",
  },
  {
    title: "4. Uso de la plantilla",
    body: "El usuario puede usar la plantilla para planificación personal. No está permitido revender, redistribuir, publicar, regalar, compartir masivamente, copiar o modificar el producto para venderlo como propio sin autorización escrita.",
  },
  {
    title: "5. Descarga digital y acceso",
    body: "Al tratarse de un producto digital, el acceso o descarga se entrega después de la compra según la plataforma de pago utilizada. El usuario es responsable de guardar una copia del archivo y verificar la compatibilidad con Excel o Google Sheets.",
  },
  {
    title: "6. Exactitud de la información",
    body: "Se procura que la información sea clara y útil, pero puede contener errores, quedar desactualizada o no ajustarse a todos los casos personales. El usuario debe revisar los supuestos antes de tomar decisiones financieras.",
  },
  {
    title: "7. Limitación de responsabilidad",
    body: "Nexus Finance Lab no se responsabiliza por pérdidas, decisiones de inversión, cambios de mercado, errores de ingreso de datos, interpretaciones incorrectas o consecuencias derivadas del uso de la plantilla o guía.",
  },
  {
    title: "8. Cambios en los términos",
    body: "Estos términos pueden actualizarse para reflejar mejoras del producto, cambios comerciales o ajustes legales. La versión publicada en esta página será la referencia vigente.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-12 text-slate-200 md:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-emerald-300 transition hover:bg-white/10"
        >
          Volver
        </Link>

        <header className="mt-10 border-b border-white/10 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            Nexus Finance Lab
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            Términos y condiciones
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Última actualización: 23 de mayo de 2026. Este documento resume las
            condiciones de uso de la plantilla Planificador de Jubilación Perú
            2026 y su guía de uso.
          </p>
        </header>

        <section className="mt-10 space-y-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6"
            >
              <h2 className="text-lg font-bold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <div className="mt-10 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-6">
          <h2 className="text-lg font-bold text-amber-100">
            Aviso importante
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Esta página no reemplaza asesoría legal profesional. Si vas a vender
            el producto a gran escala o usar una pasarela de pagos con políticas
            específicas, conviene revisar estos términos con un abogado.
          </p>
        </div>
      </div>
    </main>
  );
}
