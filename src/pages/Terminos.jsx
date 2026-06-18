import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'

export default function Terminos() {
  const [heroRef, heroVisible] = useInView()
  const [conditionsRef, conditionsVisible] = useInView()
  const [paymentsRef, paymentsVisible] = useInView()
  const [warrantyRef, warrantyVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Términos de Servicio | STEEL CORE - WP Construcciones Especiales"
  }, [])

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <NavBar />

      <main className="pt-20">

        <section className="px-8 lg:px-16 py-24 md:py-32 max-w-screen-2xl mx-auto" ref={heroRef}>
          <div className={`animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Contrato de Servicio
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8 text-primary font-headline">
              Términos de Servicio
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed mb-8 max-w-3xl">
              Al contratar nuestros servicios, usted acepta los siguientes términos y
              condiciones que rigen la relación entre WP Construcciones Especiales y sus clientes.
            </p>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-1 bg-primary flex-shrink-0" />
              <p className="text-on-surface-variant font-medium italic">
                Última actualización: Mayo 2026
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 lg:px-16" ref={conditionsRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${conditionsVisible ? 'visible' : ''}`}>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4">
                Condiciones Generales
              </h2>
              <p className="text-secondary text-lg max-w-2xl">
                Los siguientes términos aplican a todos los proyectos de construcción
                y servicios prestados por WP Construcciones Especiales.
              </p>
            </div>

            <div className={`space-y-6 animate-on-scroll ${conditionsVisible ? 'visible' : ''}`}>
              {[
                {
                  icon: 'description',
                  title: 'Alcance del Servicio',
                  desc: 'Todo proyecto comienza con una evaluación técnica detallada. El alcance final se define en el presupuesto aprobado por ambas partes, incluyendo especificaciones de materiales, plazos de ejecución y costos.'
                },
                {
                  icon: 'gavel',
                  title: 'Aceptación del Contrato',
                  desc: 'La aceptación del presupuesto implica la conformidad del cliente con todos los términos aquí descritos. Cualquier modificación al proyecto deberá ser acordada por escrito.'
                },
                {
                  icon: 'calendar_today',
                  title: 'Plazos de Ejecución',
                  desc: 'Los plazos estimados son aproximados y pueden variar según condiciones climáticas, disponibilidad de materiales y complejidad del proyecto. WP notificará al cliente sobre cualquier demora significativa.'
                },
                {
                  icon: 'architecture',
                  title: 'Especificaciones Técnicas',
                  desc: 'El cliente recibe documentación técnica completa incluyendo memorias descriptivas, planos y especificaciones de materiales. Es responsabilidad del cliente revisar y aprobar dicha documentación.'
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-surface-container-lowest p-8 rounded-xl border border-outline/10">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-4xl flex-shrink-0">{icon}</span>
                    <div>
                      <h4 className="font-headline text-xl font-bold text-primary mb-3">{title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-8 lg:px-16" ref={paymentsRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${paymentsVisible ? 'visible' : ''}`}>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4">
                Condiciones de Pago
              </h2>
              <p className="text-secondary text-lg max-w-2xl">
                Nuestros pagos se estructuran en etapas para proteger ambas partes
                y garantizar la transparencia durante todo el proyecto.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll ${paymentsVisible ? 'visible' : ''}`}>
              {[
                {
                  step: '01',
                  title: 'Anticipo',
                  desc: 'Se requiere un anticipo del 30% del valor total del proyecto para comenzar la fase de ingeniería y pedido de materiales.'
                },
                {
                  step: '02',
                  title: 'Avance de Obra',
                  desc: 'Pagos intermedios según hitos de avance, definidos en el contrato. Generalmente en intervalos de 30% del valor restante.'
                },
                {
                  step: '03',
                  title: 'Entrega Final',
                  desc: 'El 10% restante se abona al momento de la entrega final del proyecto, una vez verificada la correcta ejecución.'
                },
              ].map(({ step, title, desc }) => (
                <div key={title} className="bg-surface-container-low p-8 rounded-xl border border-outline/10">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                    <span className="font-headline font-black text-white text-xl">{step}</span>
                  </div>
                  <h4 className="font-headline text-xl font-bold text-primary mb-3">{title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 lg:px-16" ref={warrantyRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`animate-on-scroll ${warrantyVisible ? 'visible' : ''}`}>
              <div className="bg-primary p-10 md:p-16 rounded-2xl text-white">
                <span className="material-symbols-outlined text-6xl mb-8 block">verified_user</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  Garantía y Responsabilidad
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h4 className="font-headline text-lg font-bold mb-3">Garantía Estructural</h4>
                    <p className="text-white/80 leading-relaxed">
                      WP Construcciones Especiales garantiza la integridad estructural
                      de sus obras por el período indicado en el contrato específico
                      de cada proyecto.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-bold mb-3">Materiales</h4>
                    <p className="text-white/80 leading-relaxed">
                      Todos los materiales utilizados cumplen con estándares de calidad
                      certificados. Los componentes de acero cuentan con garantía
                      de fabricante según specifications.
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-8">
                  <h4 className="font-headline text-lg font-bold mb-4">Limitaciones</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    La garantía no cubre daños causados por uso inadecuado, modificaciones
                    realizadas por terceros, fuerza mayor o condiciones climáticas
                    extremas. Se recomienda mantener el programa de mantenimiento
                    especificado para cada tipo de estructura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 lg:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="bg-surface-container-low p-10 rounded-xl border border-outline/10">
              <h3 className="font-headline text-2xl font-bold text-primary mb-4">Consultas sobre Términos</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Si tiene preguntas sobre estos términos de servicio, puede contactarnos
                a través de los medios indicados en la sección de contacto de nuestro sitio web.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                WP Construcciones Especiales se reserva el derecho de modificar estos
                términos con previo aviso a los clientes activos.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}