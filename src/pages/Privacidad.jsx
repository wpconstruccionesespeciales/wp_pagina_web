import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'

export default function Privacidad() {
  const [heroRef, heroVisible] = useInView()
  const [dataRef, dataVisible] = useInView()
  const [rightsRef, rightsVisible] = useInView()
  const [contactRef, contactVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Política de Privacidad | STEEL CORE - WP Construcciones Especiales"
  }, [])

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <NavBar />

      <main className="pt-20">

        <section className="px-8 lg:px-16 py-24 md:py-32 max-w-screen-2xl mx-auto" ref={heroRef}>
          <div className={`animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Protección de Datos
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8 text-primary font-headline">
              Política de Privacidad
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed mb-8 max-w-3xl">
              En WP Construcciones Especiales respetamos su privacidad y nos comprometemos
              a proteger sus datos personales. Esta política describe cómo recopilamos,
              usamos y salvaguardamos su información.
            </p>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-1 bg-primary flex-shrink-0" />
              <p className="text-on-surface-variant font-medium italic">
                Última actualización: Mayo 2026
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 lg:px-16" ref={dataRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${dataVisible ? 'visible' : ''}`}>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4">
                Datos que Recopilamos
              </h2>
              <p className="text-secondary text-lg max-w-2xl">
                Recopilamos únicamente la información necesaria para brindarle
                nuestros servicios y comunicarnos con usted de manera efectiva.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 animate-on-scroll ${dataVisible ? 'visible' : ''}`}>
              {[
                {
                  icon: 'person',
                  title: 'Datos de Contacto',
                  desc: 'Nombre, correo electrónico, número de teléfono y dirección postal cuando usted nos contacta voluntariamente.'
                },
                {
                  icon: 'engineering',
                  title: 'Datos del Proyecto',
                  desc: 'Información sobre el proyecto de construcción que nos envía a través de formularios o consultas técnicas.'
                },
                {
                  icon: 'web',
                  title: 'Datos de Navegación',
                  desc: 'Información técnica anónima sobre cómo interactúa con nuestro sitio web, incluyendo páginas visitadas y tiempo de sesión.'
                },
                {
                  icon: 'mail',
                  title: 'Comunicación',
                  desc: 'Contenido de sus consultas, solicitudes de presupuesto y cualquier otra comunicación que nos envíe.'
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-surface-container-lowest p-8 rounded-xl border border-outline/10">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block">{icon}</span>
                  <h4 className="font-headline text-xl font-bold text-primary mb-3">{title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-8 lg:px-16" ref={rightsRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${rightsVisible ? 'visible' : ''}`}>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4">
                Sus Derechos
              </h2>
              <p className="text-secondary text-lg max-w-2xl">
                Usted tiene derecho a conocer, acceder, rectificar y suprimir sus datos
                personales, en cumplimiento con la Ley de Protección de Datos Personales.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll ${rightsVisible ? 'visible' : ''}`}>
              {[
                {
                  icon: 'visibility',
                  title: 'Acceso',
                  desc: 'Solicitar información sobre los datos personales que tenemos suyos y el uso que les damos.'
                },
                {
                  icon: 'edit',
                  title: 'Rectificación',
                  desc: 'Corregir cualquier dato inexacto o incompleto que figure en nuestros registros.'
                },
                {
                  icon: 'delete',
                  title: 'Supresión',
                  desc: 'Solicitar la eliminación de sus datos personales cuando ya no sean necesarios para los fines originales.'
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-surface-container-low p-8 rounded-xl border border-outline/10">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block">{icon}</span>
                  <h4 className="font-headline text-xl font-bold text-primary mb-3">{title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 lg:px-16" ref={contactRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`animate-on-scroll ${contactVisible ? 'visible' : ''}`}>
              <div className="bg-primary p-10 md:p-16 rounded-2xl text-white">
                <span className="material-symbols-outlined text-6xl mb-8 block">contact_mail</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  Uso de sus Datos
                </h2>
                <p className="font-body text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
                  Utilizamos sus datos únicamente para responder sus consultas, procesar
                  solicitudes de presupuesto y mantenerlo informado sobre novedades de la
                  empresa. No compartimos su información con terceros con fines de marketing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="bg-white/10 p-6 rounded-xl">
                    <span className="material-symbols-outlined text-3xl mb-4 block">lock</span>
                    <h4 className="font-headline text-lg font-bold mb-2">Datos Protegidos</h4>
                    <p className="text-white/70 text-sm">Implementamos medidas de seguridad técnicas y organizativas para proteger su información.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-xl">
                    <span className="material-symbols-outlined text-3xl mb-4 block">rule</span>
                    <h4 className="font-headline text-lg font-bold mb-2">Sin Terceros</h4>
                    <p className="text-white/70 text-sm">No vendemos, alquilamos ni transferimos sus datos personales a empresas externas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 lg:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="bg-surface-container-low p-10 rounded-xl border border-outline/10">
              <h3 className="font-headline text-2xl font-bold text-primary mb-4">Contacto para Ejercitar sus Derechos</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Si desea ejercer cualquiera de sus derechos o tiene consultas sobre esta
                política de privacidad, puede contactarnos a través de los medios
                indicados en la sección de contacto de nuestro sitio web.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Responsable: WP Construcciones Especiales | Contacto: +54 9 3435 05-6918 | wpsascentral@gmail.com
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}