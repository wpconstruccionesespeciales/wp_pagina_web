import { useEffect } from 'react'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'

const generalConditions = [
  {
    icon: 'description',
    title: 'Alcance del Servicio',
    desc: 'Todo proyecto comienza con una evaluación técnica detallada. El alcance final se define en el presupuesto aprobado por ambas partes, incluyendo especificaciones de materiales, plazos de ejecución y costos.',
  },
  {
    icon: 'gavel',
    title: 'Aceptación del Contrato',
    desc: 'La aceptación del presupuesto implica la conformidad del cliente con todos los términos aquí descritos. Cualquier modificación al proyecto deberá ser acordada por escrito.',
  },
  {
    icon: 'calendar_today',
    title: 'Plazos de Ejecución',
    desc: 'Los plazos estimados son aproximados y pueden variar según condiciones climáticas, disponibilidad de materiales y complejidad del proyecto. WP notificará al cliente sobre cualquier demora significativa.',
  },
  {
    icon: 'architecture',
    title: 'Especificaciones Técnicas',
    desc: 'El cliente recibe documentación técnica completa incluyendo memorias descriptivas, planos y especificaciones de materiales. Es responsabilidad del cliente revisar y aprobar dicha documentación.',
  },
]

const paymentSteps = [
  {
    step: '01',
    title: 'Anticipo',
    desc: 'Se requiere un anticipo del 30% del valor total del proyecto para comenzar la fase de ingeniería y pedido de materiales.',
  },
  {
    step: '02',
    title: 'Avance de Obra',
    desc: 'Pagos intermedios según hitos de avance, definidos en el contrato. Generalmente en intervalos de 30% del valor restante.',
  },
  {
    step: '03',
    title: 'Entrega Final',
    desc: 'El 10% restante se abona al momento de la entrega final del proyecto, una vez verificada la correcta ejecución.',
  },
]

export default function Terminos() {
  const [heroRef, heroVisible] = useInView()
  const [conditionsRef, conditionsVisible] = useInView()
  const [paymentsRef, paymentsVisible] = useInView()
  const [warrantyRef, warrantyVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <SEO 
        title="Términos de Servicio | STEEL CORE - WP Construcciones Especiales"
        description="Leé nuestros Términos de Servicio. Detalles sobre plazos de obra, formas de pago, garantías y compromisos técnicos en WP."
        keywords="terminos de servicio, condiciones de contratacion, garantia steel frame, presupuesto construccion"
      />
      <NavBar />

      <main className="pt-20">
        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-hero relative py-24 lg:py-32 px-6 lg:px-16 overflow-hidden bg-background" ref={heroRef}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tertiary-fixed/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-70 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.15] top-12 left-12 pointer-events-none scale-110" />
          <div className="bg-geo-corners bg-geo-corners-left opacity-[0.25] bottom-16 left-8 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <div className={`grid items-end gap-12 lg:grid-cols-12 animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
              <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Contrato de Servicio</span>
              </div>

              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6 text-primary">
                Términos de Servicio
              </h1>

              <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-3xl font-medium">
                Al contratar nuestros servicios, usted acepta los siguientes términos y
                condiciones que rigen la relación entre WP Construcciones Especiales y sus clientes.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <p className="text-on-surface-variant/70 text-sm italic font-semibold">
                  Última actualización: Mayo 2026
                </p>
              </div>
              </div>

              <aside className="page-card relative overflow-hidden rounded-3xl border border-primary/10 bg-white/75 p-7 backdrop-blur-md lg:col-span-4" aria-label="Resumen del documento">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-fixed/35 blur-2xl" />
                <div className="relative">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                    <span className="material-symbols-outlined">contract</span>
                  </div>
                  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary/55">Documento vigente</p>
                  <h2 className="mb-5 font-headline text-2xl font-black text-primary">Un acuerdo claro</h2>
                  <div className="space-y-3 border-t border-primary/10 pt-5 text-sm font-semibold text-on-surface-variant">
                    <p className="flex justify-between gap-4"><span>Actualización</span><strong className="text-primary">Mayo 2026</strong></p>
                    <p className="flex justify-between gap-4"><span>Etapas de pago</span><strong className="text-primary">3 hitos</strong></p>
                    <p className="flex justify-between gap-4"><span>Documentación</span><strong className="text-primary">Por escrito</strong></p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CONDICIONES GENERALES
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={conditionsRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.04)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${conditionsVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Condiciones</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Condiciones Generales
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                Los siguientes términos aplican a todos los proyectos de construcción
                y servicios prestados por WP Construcciones Especiales.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 animate-on-scroll ${conditionsVisible ? 'visible' : ''}`}>
              {generalConditions.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="page-card group relative p-8 lg:p-10 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim overflow-hidden"
                >
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-xl pointer-events-none group-hover:border-primary-fixed-dim transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/20 rounded-br-xl pointer-events-none group-hover:border-primary-fixed-dim transition-colors duration-300" />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-fixed/40 to-primary-fixed/10 flex items-center justify-center border border-primary/5 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
                  </div>
                  <h4 className="font-headline text-xl lg:text-2xl font-black text-primary mb-3 relative z-10">{title}</h4>
                  <p className="text-on-surface-variant text-sm font-semibold leading-relaxed relative z-10">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CONDICIONES DE PAGO
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={paymentsRef}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.1] -top-12 left-10 pointer-events-none" />
          <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] top-24 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${paymentsVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Pagos</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Condiciones de Pago
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                Nuestros pagos se estructuran en etapas para proteger ambas partes
                y garantizar la transparencia durante todo el proyecto.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-on-scroll ${paymentsVisible ? 'visible' : ''}`}>
              {paymentSteps.map(({ step, title, desc }) => (
                <div
                  key={title}
                  className="page-card group relative p-8 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim overflow-hidden"
                >
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-xl pointer-events-none group-hover:border-primary-fixed-dim transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/20 rounded-br-xl pointer-events-none group-hover:border-primary-fixed-dim transition-colors duration-300" />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-fixed/40 to-primary-fixed/10 flex items-center justify-center border border-primary/5 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="font-headline text-2xl font-black text-primary">{step}</span>
                  </div>
                  <h4 className="font-headline text-xl lg:text-2xl font-black text-primary mb-3 relative z-10">{title}</h4>
                  <p className="text-on-surface-variant text-sm font-semibold leading-relaxed relative z-10">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            GARANTÍA Y RESPONSABILIDAD
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={warrantyRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(61,140,90,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

          <div className={`relative max-w-7xl mx-auto animate-on-scroll ${warrantyVisible ? 'visible' : ''}`}>
            <div className="rounded-3xl bg-primary p-10 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              <div className="bg-geo-dots bg-geo-dots-right opacity-[0.08] top-6 right-6 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8 border border-white/15">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-5xl font-medium" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>

                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                  Garantía y Responsabilidad
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="group p-7 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/12 transition-all duration-500">
                    <h4 className="font-headline text-lg font-bold mb-3">Garantía Estructural</h4>
                    <p className="text-white/70 leading-relaxed text-sm font-semibold">
                      WP Construcciones Especiales garantiza la integridad estructural
                      de sus obras por el período indicado en el contrato específico
                      de cada proyecto.
                    </p>
                  </div>
                  <div className="group p-7 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/12 transition-all duration-500">
                    <h4 className="font-headline text-lg font-bold mb-3">Materiales</h4>
                    <p className="text-white/70 leading-relaxed text-sm font-semibold">
                      Todos los materiales utilizados cumplen con estándares de calidad
                      certificados. Los componentes de acero cuentan con garantía
                      de fabricante según specifications.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/15">
                  <h4 className="font-headline text-lg font-bold mb-4">Limitaciones</h4>
                  <p className="text-white/70 text-sm leading-relaxed font-semibold">
                    La garantía no cubre daños causados por uso inadecuado, modificaciones
                    realizadas por terceros, fuerza mayor o condiciones climáticas
                    extremas. Se recomienda mantener el programa de mantenimiento
                    especificado para cada tipo de estructura.
                  </p>
                </div>

                <div className="mt-12 pt-10 border-t border-white/15">
                  <h3 className="font-headline text-2xl font-bold text-white mb-4">Consultas sobre Términos</h3>
                  <p className="text-white/70 text-sm leading-relaxed font-semibold">
                    Si tiene preguntas sobre estos términos de servicio, puede contactarnos
                    a través de los medios indicados en la sección de contacto de nuestro sitio web.
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed mt-4 font-semibold">
                    WP Construcciones Especiales se reserva el derecho de modificar estos
                    términos con previo aviso a los clientes activos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
