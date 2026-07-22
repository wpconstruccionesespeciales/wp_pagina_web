import { useEffect } from 'react'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'

const environmentalStats = [
  { value: 'ACERO', label: 'Material recuperable', icon: 'recycling' },
  { value: 'CNC', label: 'Corte planificado', icon: 'delete' },
  { value: 'SECO', label: 'Montaje sin mezclas', icon: 'cloud' },
  { value: 'CAPAS', label: 'Envolvente adaptable', icon: 'water_drop' },
]

const impactCards = [
  {
    icon: 'recycling',
    title: 'Acero con potencial de recuperación',
    desc: 'Los componentes de acero pueden incorporarse a circuitos de recuperación y reciclaje cuando la separación y la gestión al final de su uso lo permiten.',
    highlight: 'ACERO',
  },
  {
    icon: 'water_drop',
    title: 'Montaje sin mezclas húmedas',
    desc: 'El montaje principal evita las mezclas propias de la mampostería; otros trabajos y terminaciones pueden requerir agua según el proyecto.',
    highlight: 'SECO',
  },
  {
    icon: 'construction',
    title: 'Residuos Reducidos en Obra',
    desc: 'El corte a medida con maquinaria CNC permite planificar piezas y orientar el proceso a reducir recortes y sobrantes.',
    highlight: 'CNC',
  },
  {
    icon: 'bolt',
    title: 'Eficiencia Energética',
    desc: 'El Steel Frame permite combinar capas de aislamiento; el desempeño final depende del diseño, los materiales, la ejecución y el uso del edificio.',
    highlight: 'CAPAS',
  },
]

const greenCards = [
  {
    icon: 'science',
    title: 'Proceso Limpio',
    desc: 'El montaje principal prescinde de cementos, cales y morteros; el impacto total depende del alcance, las terminaciones y la gestión de obra.',
  },
  {
    icon: 'straighten',
    title: 'Perfilado Controlado',
    desc: 'El perfilado CNC produce piezas coordinadas con el modelo y ayuda a reducir ajustes y recortes durante el montaje.',
  },
  {
    icon: 'air',
    title: 'Control de Humedad Interior',
    desc: 'Una envolvente correctamente diseñada y ejecutada puede contribuir al control de humedad; la ventilación y el uso también inciden en el ambiente interior.',
  },
  {
    icon: 'home',
    title: 'Protección y mantenimiento',
    desc: 'El galvanizado protege los perfiles; la durabilidad depende además del diseño de la envolvente, la ejecución, la exposición y el mantenimiento.',
  },
]

const methodSteps = [
  {
    icon: 'factory',
    title: 'Fabricación Controlada',
    desc: 'La fabricación coordinada permite verificar medidas y organizar el aprovechamiento de cada perfil antes del montaje.',
    number: '01',
  },
  {
    icon: 'local_shipping',
    title: 'Logística Eficiente',
    desc: 'La planificación de componentes y cargas permite ordenar los viajes a obra según la escala y la distancia de cada proyecto.',
    number: '02',
  },
  {
    icon: 'engineering',
    title: 'Diseño Optimizado',
    desc: 'Utilizamos modelado para dimensionar y coordinar perfiles de acuerdo con los requerimientos estructurales del proyecto.',
    number: '03',
  },
]

const futureCards = [
  {
    icon: 'verified',
    title: 'Materiales Estructurales',
    desc: 'Trabajamos con aceros de grado estructural y revisamos la documentación disponible para cada suministro.',
  },
  {
    icon: 'thermostat',
    title: 'Eficiencia Térmica',
    desc: 'Definimos capas de aislamiento según clima, uso y objetivos de desempeño del proyecto.',
  },
  {
    icon: 'handshake',
    title: 'Economía Regional',
    desc: 'Consideramos proveedores de cercanía cuando el alcance, la disponibilidad y las especificaciones del proyecto lo permiten.',
  },
]

export default function Sostenibilidad() {
  const [heroRef, heroVisible] = useInView()
  const [statsRef, statsVisible] = useInView()
  const [impactRef, impactVisible] = useInView()
  const [benefitsRef, benefitsVisible] = useInView()
  const [methodRef, methodVisible] = useInView()
  const [futureRef, futureVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <SEO 
        title="Criterios Ambientales en Steel Frame | WP"
        description="Materiales, fabricación, logística, envolvente y fin de vida: criterios para evaluar el desempeño ambiental de cada proyecto en Steel Frame."
        keywords="criterios ambientales steel frame, eficiencia energetica, construccion en seco, aislacion termica, materiales, gestion de residuos argentina"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Sostenibilidad', url: '/sostenibilidad' },
        ]}
      />
      <NavBar />

      <main className="pt-20">
        {/* Hero Section - Light Background with Elegant Accents */}
        <section className="subpage-hero relative py-24 lg:py-32 px-6 lg:px-16 overflow-hidden bg-background" ref={heroRef}>
          {/* Subtle Aesthetic Geometric Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tertiary-fixed/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-70 pointer-events-none" />
          
          {/* Architectural structural wireframe lines */}
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.15] top-12 left-12 pointer-events-none scale-110" />
          <div className="bg-geo-corners bg-geo-corners-left opacity-[0.25] bottom-16 left-8 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <div className={`grid lg:grid-cols-2 gap-16 items-center animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed/40 border border-primary/10 mb-6">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                  <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Compromiso Verde</span>
                </div>

                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6 text-primary">
                  Sostenibilidad
                </h1>

                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                  Esta página explica los criterios que consideramos al proyectar en Steel Frame:
                  uso de materiales, fabricación, logística, envolvente y posibilidades de recuperación.
                  El impacto final debe evaluarse para cada obra.
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-primary/30" />
                  <p className="text-on-surface-variant/70 text-sm italic font-semibold">
                    Construyendo hoy las estructuras del mañana
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="#impacto" className="group flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl hover:bg-[#203728] transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20">
                    <span className="font-bold text-sm tracking-wide">Ver impacto ambiental</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform duration-300">expand_more</span>
                  </a>
                  <Link to="/servicios" className="group flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all py-3 px-2">
                    Ver servicios
                    <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-fixed/40 to-transparent rounded-3xl blur-2xl" />
                {/* Structural wireframe overlapping background */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border border-primary/10 rounded-2xl pointer-events-none hidden md:block" />
                
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 border border-primary/5">
                  <img
                    alt="Vista de referencia de una construcción en Steel Frame"
                    width="1200"
                    height="900"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    src="/wp/project-comercial.webp"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                      </div>
                      <div>
                        <p className="text-white font-black text-sm tracking-wide">Steel Frame</p>
                        <p className="text-white/80 text-xs font-semibold">Aplicación de referencia</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Floating Glassmorphic Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white/85 backdrop-blur-md border border-white/70 shadow-xl shadow-primary/5 rounded-2xl p-4 max-w-[200px] z-20 hover:scale-105 transition-transform duration-500 hidden sm:block">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#5cb876] text-lg font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>recycling</span>
                    <span className="text-[#5cb876] text-[10px] font-extrabold tracking-widest uppercase">Fin de vida</span>
                  </div>
                  <p className="text-primary font-headline text-lg font-black leading-tight">Acero recuperable</p>
                  <p className="text-on-surface-variant text-[11px] font-semibold mt-1">Sujeto a separación y circuitos de gestión disponibles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Premium Light Sage Background */}
        <section className="subpage-section relative py-16 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-surface-container-low via-[#eaf2ed] to-surface-container-low" ref={statsRef}>
          {/* Subtle light organic glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.06)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          
          <div className="bg-geo-dots bg-geo-dots-right opacity-[0.12] -bottom-8 right-12 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll ${statsVisible ? 'visible' : ''}`}>
              {environmentalStats.map(({ value, label, icon }, i) => (
                <div key={label} className="page-card group relative p-5 sm:p-6 lg:p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/90 hover:border-primary-fixed-dim overflow-hidden">
                  {/* Hover green glow background inside the card */}
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center border border-primary/5">
                      <span className="material-symbols-outlined text-primary text-xl font-medium">{icon}</span>
                    </div>
                    <span className="text-primary/30 text-xs font-bold tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  
                  <p className="font-headline text-lg sm:text-3xl lg:text-5xl font-black leading-none break-words [overflow-wrap:anywhere] bg-gradient-to-br from-primary to-[#2a5a3a] bg-clip-text text-transparent mb-2 relative z-10">{value}</p>
                  <p className="text-on-surface-variant text-xs lg:text-sm font-bold tracking-tight relative z-10">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section - Light and Structurally Decorated */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" id="impacto" ref={impactRef}>
          {/* Decorative Blueprint Background Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.1] -top-12 left-10 pointer-events-none scale-100" />
          <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] top-24 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <div className={`mb-16 animate-on-scroll ${impactVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Impacto Ambiental</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Criterios para evaluar<br />el impacto del Steel Frame
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium">
                Materiales, fabricación, logística, envolvente y fin de vida deben analizarse
                en conjunto para entender el desempeño ambiental de cada obra.
              </p>
            </div>
 
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll ${impactVisible ? 'visible' : ''}`}>
              {impactCards.map(({ icon, title, desc, highlight }) => (
                <div key={title} className="group relative p-8 lg:p-10 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                  {/* Subtle hover green glow in top corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Decorative Steel-Profile Corners */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-xl pointer-events-none transition-colors duration-300 group-hover:border-primary-fixed-dim" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/20 rounded-br-xl pointer-events-none transition-colors duration-300 group-hover:border-primary-fixed-dim" />
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-fixed/40 to-primary-fixed/10 flex items-center justify-center border border-primary/5 transition-transform duration-500 group-hover:scale-110">
                      <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
                    </div>
                    <span className="font-headline text-3xl font-black text-primary/10 tracking-widest relative z-10 transition-colors duration-300 group-hover:text-primary-fixed-dim">{highlight}</span>
                  </div>
                  
                  <h4 className="font-headline text-xl lg:text-2xl font-black text-primary mb-3 relative z-10">{title}</h4>
                  <p className="text-on-surface-variant leading-relaxed text-sm font-semibold relative z-10">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Green Section - Premium Light Organic Background */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={benefitsRef}>
          {/* Subtle Organic Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(61,140,90,0.05)_0%,transparent_40%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

          {/* Architectural elements */}
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.1] top-12 left-12 pointer-events-none" />
          <div className="bg-geo-corners bg-geo-corners-right opacity-[0.15] bottom-12 right-12 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${benefitsVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/45" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Construcción Verde</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Construir en seco,<br /><span className="text-[#5cb876]">pensar en verde</span>
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium">
                La construcción en seco puede reducir tareas húmedas y ordenar la intervención;
                el resultado depende del proyecto, la logística y la gestión de residuos.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 animate-on-scroll ${benefitsVisible ? 'visible' : ''}`}>
              {/* Highlight Card: Sin Tala de Árboles */}
              <div className="page-card md:col-span-5 p-10 rounded-3xl bg-gradient-to-br from-primary-fixed/40 via-white/80 to-white/50 border border-primary/10 hover:border-primary-fixed-dim relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl opacity-50 pointer-events-none" />
                
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-md transition-transform duration-500 group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
                </div>
                
                <h3 className="font-headline text-2xl lg:text-3xl font-black text-primary mb-4">Elección de materiales</h3>
                <p className="text-on-surface-variant text-sm font-semibold leading-relaxed mb-6">
                  La estructura principal utiliza perfiles de acero. Su impacto debe evaluarse junto
                  con el origen de los materiales, la cantidad empleada, el transporte y las opciones
                  reales de recuperación disponibles al final de la vida útil.
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <span className="text-primary font-bold text-sm">Decisiones documentadas para cada proyecto</span>
                </div>
              </div>

              {/* Grid of complementary green cards */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {greenCards.map(({ icon, title, desc }) => (
                  <div key={title} className="page-card p-6 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim relative overflow-hidden group">
                    {/* Corner subtle hover glow */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary-fixed/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed/30 flex items-center justify-center border border-primary/5 mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="material-symbols-outlined text-primary text-xl font-bold">{icon}</span>
                    </div>
                    
                    <h4 className="font-headline text-lg font-black text-primary mb-2">{title}</h4>
                    <p className="text-on-surface-variant text-xs font-semibold leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Method Section - Light and Connected Timeline */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={methodRef}>
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
          
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.08] top-24 left-10 pointer-events-none scale-100" />

          <div className="max-w-7xl mx-auto relative">
            <div className={`mb-16 animate-on-scroll ${methodVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Nuestro Método</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Proceso y Criterios<br />Ambientales
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium">
                Nuestro enfoque busca usar la información del proyecto para optimizar materiales,
                fabricación y logística sin presentar un resultado ambiental único para todas las obras.
              </p>
            </div>

            {/* Timeline Layout */}
            <div className="relative mt-20">
              {/* Desktop horizontal connection line */}
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-primary-fixed/20 via-primary-fixed/80 to-primary-fixed/20 -translate-y-1/2 hidden md:block z-0 pointer-events-none" />
              
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 animate-on-scroll ${methodVisible ? 'visible' : ''}`}>
                {methodSteps.map(({ icon, title, desc, number }) => (
                  <div key={title} className="page-card group relative p-8 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim flex flex-col items-start overflow-hidden">
                    {/* Floating connected node indicator for desktop */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-primary-fixed-dim flex items-center justify-center shadow-md z-20 group-hover:border-primary transition-colors duration-500 hidden md:flex">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim group-hover:bg-primary transition-colors duration-500" />
                    </div>

                    <div className="flex items-center justify-between w-full mb-6 mt-2">
                      <span className="font-headline text-5xl font-black bg-gradient-to-br from-primary-fixed to-primary-fixed-dim bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary-fixed-dim transition-all duration-500">{number}</span>
                      <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 flex items-center justify-center border border-primary/5 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-primary text-xl font-bold">{icon}</span>
                      </div>
                    </div>

                    <h4 className="font-headline text-xl font-black text-primary mb-3">{title}</h4>
                    <p className="text-on-surface-variant leading-relaxed text-sm font-semibold">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Future Section - Premium Light Layout */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-primary text-white" ref={futureRef}>
          {/* Subtle Background Glows */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary-fixed/15 rounded-full blur-3xl pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-right opacity-[0.06] top-8 right-8 pointer-events-none scale-100" />

          <div className="max-w-7xl mx-auto relative">
            <div className={`mb-16 animate-on-scroll ${futureVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary-fixed-dim/60" />
                <span className="text-primary-fixed-dim text-xs font-extrabold tracking-[0.25em] uppercase">Visión Futura</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4 leading-tight">
                Compromiso con<br /><span className="text-primary-fixed-dim">el Futuro</span>
              </h2>
              <p className="text-white/65 text-lg max-w-xl font-medium">
                Apostamos por un modelo constructivo que beneficie tanto a nuestros clientes
                como al medio ambiente, siguiendo los principios de la economía circular.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll ${futureVisible ? 'visible' : ''}`}>
              {futureCards.map(({ icon, title, desc }) => (
                <div key={title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm transition-[transform,background-color,border-color] duration-200 hover:border-primary-fixed-dim/35 hover:bg-white/[0.09] motion-safe:hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10 transition-transform duration-200 group-hover:scale-105">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-2xl">{icon}</span>
                  </div>
                  <h4 className="font-headline text-xl font-black text-white mb-3">{title}</h4>
                  <p className="text-white/60 leading-relaxed text-sm font-semibold">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Premium Light Sage Organic Background */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-surface-container-low via-[#eaf2ed] to-surface-container-low" ref={ctaRef}>
          {/* Subtle Organic Radial Glow & Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(61,140,90,0.08)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

          {/* Decorative Blueprint Wireframes */}
          <div className="bg-geo-ring bg-geo-ring-left opacity-[0.06] top-6 pointer-events-none" />
          <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] bottom-6 pointer-events-none" />

          <div className={`relative max-w-4xl mx-auto text-center animate-on-scroll ${ctaVisible ? 'visible' : ''}`}>
            <div className="w-20 h-20 rounded-3xl bg-primary-fixed/50 flex items-center justify-center mx-auto mb-8 border border-primary-fixed-dim/20 shadow-md transition-transform duration-500 hover:scale-110">
              <span className="material-symbols-outlined text-primary text-5xl font-medium" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            </div>

            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary mb-6 leading-tight">
              Construya el futuro<br /><span className="text-[#5cb876]">que queremos.</span>
            </h2>

            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-semibold">
              Si querés incorporar criterios ambientales, podemos revisar materiales, envolvente,
              logística y alcance junto con las necesidades concretas de tu proyecto.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href="/#contact"
                className="group flex items-center gap-3 bg-primary hover:bg-[#203728] text-white px-10 py-5 rounded-xl font-headline font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <span>Solicitar Presupuesto</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
              </a>
              <Link
                to="/servicios"
                className="group flex items-center gap-2 text-primary/70 hover:text-primary text-sm font-bold transition-colors py-5 px-4"
              >
                <span>Ver Servicios Steel Frame</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer showCTA={false} />
    </div>
  )
}
