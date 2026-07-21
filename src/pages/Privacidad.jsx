import { useEffect } from 'react'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'
import { BUSINESS } from '../config/site'

const dataCards = [
  {
    icon: 'person',
    title: 'Datos de Contacto',
    desc: 'Nombre, correo electrónico, número de teléfono y dirección postal cuando usted nos contacta voluntariamente.',
  },
  {
    icon: 'engineering',
    title: 'Datos del Proyecto',
    desc: 'Información sobre el proyecto de construcción que nos envía a través de formularios o consultas técnicas.',
  },
  {
    icon: 'web',
    title: 'Datos de Navegación',
    desc: 'Información técnica anónima sobre cómo interactúa con nuestro sitio web, incluyendo páginas visitadas y tiempo de sesión.',
  },
  {
    icon: 'mail',
    title: 'Comunicación',
    desc: 'Contenido de sus consultas, solicitudes de presupuesto y cualquier otra comunicación que nos envíe.',
  },
]

const rightCards = [
  {
    icon: 'visibility',
    title: 'Acceso',
    desc: 'Solicitar información sobre los datos personales que tenemos suyos y el uso que les damos.',
  },
  {
    icon: 'edit',
    title: 'Rectificación',
    desc: 'Corregir cualquier dato inexacto o incompleto que figure en nuestros registros.',
  },
  {
    icon: 'delete',
    title: 'Supresión',
    desc: 'Solicitar la eliminación de sus datos personales cuando ya no sean necesarios para los fines originales.',
  },
]

export default function Privacidad() {
  const [heroRef, heroVisible] = useInView()
  const [dataRef, dataVisible] = useInView()
  const [rightsRef, rightsVisible] = useInView()
  const [useRef, useVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <SEO 
        title="Política de Privacidad | WP Construcciones Especiales"
        description="Leé nuestra Política de Privacidad. Conocé cómo protegemos tus datos personales y del proyecto en WP Construcciones Especiales."
        keywords="politica de privacidad, proteccion de datos, wp construcciones, steel core"
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
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Protección de Datos</span>
              </div>

              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6 text-primary">
                Política de Privacidad
              </h1>

              <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-3xl font-medium">
                En WP Construcciones Especiales respetamos su privacidad y nos comprometemos
                a proteger sus datos personales. Esta política describe cómo recopilamos,
                usamos y salvaguardamos su información.
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
                    <span className="material-symbols-outlined">shield_lock</span>
                  </div>
                  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary/55">Documento vigente</p>
                  <h2 className="mb-5 font-headline text-2xl font-black text-primary">Privacidad por diseño</h2>
                  <div className="space-y-3 border-t border-primary/10 pt-5 text-sm font-semibold text-on-surface-variant">
                    <p className="flex justify-between gap-4"><span>Actualización</span><strong className="text-primary">Mayo 2026</strong></p>
                    <p className="flex justify-between gap-4"><span>Responsable</span><strong className="text-primary">WP</strong></p>
                    <p className="flex justify-between gap-4"><span>Consultas</span><strong className="text-primary">Contacto directo</strong></p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DATOS QUE RECOPILAMOS
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={dataRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.04)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${dataVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Información</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Datos que Recopilamos
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                Recopilamos únicamente la información necesaria para brindarle
                nuestros servicios y comunicarnos con usted de manera efectiva.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 animate-on-scroll ${dataVisible ? 'visible' : ''}`}>
              {dataCards.map(({ icon, title, desc }) => (
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
            SUS DERECHOS
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={rightsRef}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.1] -top-12 left-10 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${rightsVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Protección</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Sus Derechos
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                Usted tiene derecho a conocer, acceder, rectificar y suprimir sus datos
                personales, en cumplimiento con la Ley de Protección de Datos Personales.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 animate-on-scroll ${rightsVisible ? 'visible' : ''}`}>
              {rightCards.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="page-card group relative p-8 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim overflow-hidden"
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
            USO DE SUS DATOS
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={useRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(61,140,90,0.06)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

          <div className={`relative max-w-7xl mx-auto animate-on-scroll ${useVisible ? 'visible' : ''}`}>
            <div className="rounded-3xl bg-primary p-10 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              <div className="bg-geo-dots bg-geo-dots-right opacity-[0.08] top-6 right-6 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8 border border-white/15">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-5xl font-medium" style={{ fontVariationSettings: "'FILL' 1" }}>contact_mail</span>
                </div>

                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                  Uso de sus Datos
                </h2>
                <p className="font-body text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-10 font-semibold">
                  Utilizamos sus datos únicamente para responder sus consultas, procesar
                  solicitudes de presupuesto y mantenerlo informado sobre novedades de la
                  empresa. No compartimos su información con terceros con fines de marketing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                  <div className="group p-7 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/12 transition-all duration-500">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary-fixed-dim text-2xl">lock</span>
                    </div>
                    <h4 className="font-headline text-lg font-bold mb-2">Datos Protegidos</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-semibold">
                      Implementamos medidas de seguridad técnicas y organizativas para proteger su información.
                    </p>
                  </div>
                  <div className="group p-7 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/12 transition-all duration-500">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary-fixed-dim text-2xl">rule</span>
                    </div>
                    <h4 className="font-headline text-lg font-bold mb-2">Sin Terceros</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-semibold">
                      No vendemos, alquilamos ni transferimos sus datos personales a empresas externas.
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/15">
                  <h3 className="font-headline text-2xl font-bold text-white mb-4">Contacto para Ejercitar sus Derechos</h3>
                  <p className="text-white/70 text-sm leading-relaxed font-semibold">
                    Si desea ejercer cualquiera de sus derechos o tiene consultas sobre esta
                    política de privacidad, puede contactarnos a través de los medios
                    indicados en la sección de contacto de nuestro sitio web.
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed mt-4 uppercase tracking-widest font-bold">
                    Responsable: {BUSINESS.name} &nbsp;·&nbsp; Contacto: {BUSINESS.phoneDisplay} &nbsp;·&nbsp; {BUSINESS.email}
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
