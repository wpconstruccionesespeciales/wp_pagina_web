import { useEffect } from 'react'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'
import { BUSINESS, BUSINESS_ID, canonicalUrl } from '../config/site'

/* ─── Data from old services page ─── */

const coreServices = [
  {
    icon: 'architecture',
    title: 'Arquitectura',
    desc: 'Traducimos necesidades, usos y contexto en una propuesta de arquitectura compatible con el sistema Steel Frame.',
  },
  {
    icon: 'engineering',
    title: 'Ingeniería',
    desc: 'Desarrollamos el cálculo y los detalles necesarios para definir la estructura de acuerdo con cada proyecto.',
  },
  {
    icon: 'construction',
    title: 'Construcción',
    desc: 'Coordinamos fabricación y montaje en seco con una secuencia de obra definida para cada alcance.',
  },
  {
    icon: 'assignment_turned_in',
    title: 'Dirección de Obra',
    desc: 'Supervisamos las etapas acordadas y registramos decisiones para dar seguimiento a calidad, plazos y presupuesto.',
  },
]

const projectTypes = [
  {
    img: '/wp/IMG_9133.webp',
    width: 1600,
    height: 2844,
    title: 'Edificios de mediana altura',
    desc: 'Estudiamos la estructura y la logística de montaje de desarrollos verticales según sus cargas, escala y emplazamiento.',
    tag: 'Desarrollo Vertical',
  },
  {
    img: '/wp/wp imagen.jpg',
    width: 800,
    height: 1080,
    title: 'Viviendas unifamiliares',
    desc: 'Proyectamos viviendas integrando estructura, distribución y soluciones de envolvente para el confort térmico y acústico previsto.',
    tag: 'Residencial',
  },
  {
    img: '/wp/project-comercial.webp',
    width: 1200,
    height: 900,
    title: 'Industriales | Locales comerciales',
    desc: 'Desarrollamos espacios industriales y comerciales atendiendo requerimientos de uso, luces estructurales, circulación y futuras adaptaciones.',
    tag: 'Comercial / Industrial',
  },
  {
    img: '/wp/after.jpg',
    width: 935,
    height: 457,
    title: 'Reformas y Ampliaciones',
    desc: 'Evaluamos la estructura existente y definimos intervenciones para ampliar o reorganizar ambientes con construcción en seco.',
    tag: 'Renovación',
  },
  {
    img: '/wp/service-especial.webp',
    width: 1400,
    height: 1050,
    title: 'Clínicas | Consultorios',
    desc: 'Proyectamos espacios de salud con foco en higiene, circulación y funcionalidad, sujetos a la normativa aplicable y al programa profesional.',
    tag: 'Salud',
  },
]

const differentiators = [
  { icon: 'speed', value: 'EN SECO', label: 'Montaje', desc: 'sin tiempos de fraguado propios de sistemas húmedos' },
  { icon: 'recycling', value: 'ACERO', label: 'Material', desc: 'perfiles dimensionados para cada estructura' },
  { icon: 'verified', value: 'CNC', label: 'Fabricación', desc: 'corte y perforado coordinados con el modelo' },
  { icon: 'shield_with_heart', value: 'CÁLCULO', label: 'Resistencia', desc: 'definida según cargas, normativa y emplazamiento' },
]

export default function Servicios() {
  const [heroRef, heroVisible] = useInView()
  const [coreRef, coreVisible] = useInView()
  const [projectsRef, projectsVisible] = useInView()
  const [diffRef, diffVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Construcción en Steel Frame y Arquitectura Modular",
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "@id": BUSINESS_ID,
      "name": BUSINESS.name,
      "url": canonicalUrl('/')
    },
    "areaServed": [
      { "@type": "State", "name": "Entre Ríos" },
      { "@type": "State", "name": "Santa Fe" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Construcción en Seco",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Arquitectura y Diseño",
            "description": "Planificación y diseño personalizado de planos adaptados al sistema constructivo Steel Frame."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ingeniería Estructural y Cálculo",
            "description": "Cálculo estructural e ingeniería de detalle definidos según cargas, normativa y condiciones del proyecto."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construcción en Seco y Montaje",
            "description": "Dirección y ejecución de obras residenciales, comerciales e industriales bajo el sistema Steel Frame."
          }
        }
      ]
    }
  }

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <SEO 
        title="Servicios de Steel Frame y Construcción en Seco | WP"
        description="Servicios de arquitectura, cálculo estructural, montaje en Steel Frame y dirección de obra con alcance definido para cada proyecto."
        keywords="servicios steel frame, calculo estructural, aberturas de aluminio, reformas en seco, ampliaciones planta alta, construccion steel frame argentina"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Servicios', url: '/servicios' },
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <NavBar />

      <main className="pt-20">

        {/* ═══════════════════════════════════════════════════════
            HERO — Compact premium services hero
        ═══════════════════════════════════════════════════════ */}
        <section
          className="relative py-20 lg:py-28 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-[#0a1510] via-[#111e16] to-[#0d1710]"
          ref={heroRef}
        >
          {/* Atmospheric background elements */}
          <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.06) 80px, rgba(255,255,255,0.06) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.06) 80px, rgba(255,255,255,0.06) 81px)' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(184,203,188,0.12)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(184,203,188,0.06)_0%,transparent_45%)]" />

          {/* Animated bottom line */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes svc-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
            .svc-shimmer-line { animation: svc-shimmer 8s cubic-bezier(0.4,0,0.2,1) infinite; }
          `}} />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent overflow-hidden">
            <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-primary-fixed-dim/30 to-transparent svc-shimmer-line" />
          </div>

          <div className="relative max-w-7xl mx-auto z-10">
            <div className={`animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-primary-fixed-dim/60" />
                <span className="text-primary-fixed-dim text-[11px] font-extrabold tracking-[0.35em] uppercase">WP Construcciones Especiales</span>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold tracking-tighter leading-[0.95] mb-6">
                    <span className="text-white">Nuestros </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-fixed-dim via-[#a4c7aa] to-primary-fixed-dim">Servicios</span>
                  </h1>
                  <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl font-medium mb-8">
                    Conocé qué podemos aportar en arquitectura, ingeniería, construcción y dirección de obra.
                    El alcance se define a partir del uso, el terreno, la ubicación y la documentación disponible.
                  </p>
                  <a
                    href="/#contact"
                    className="group inline-flex items-center gap-3 bg-white/6 hover:bg-white/10 border border-white/12 hover:border-primary-fixed-dim/40 text-white px-7 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>Agendar consulta</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
                  </a>
                </div>

                {/* Premium technical blueprint panel */}
                <div className="lg:col-span-5">
                  <div className="services-hero-panel">
                    <div className="services-hero-panel__grid" />
                    <div className="services-hero-panel__corners" />

                    <div className="relative z-10 p-5 lg:p-6">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-white/35">Especificaciones técnicas</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed-dim/10 border border-primary-fixed-dim/20 text-[9px] font-black tracking-widest uppercase text-primary-fixed-dim">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse" />
                          Steel Frame
                        </span>
                      </div>

                      <div className="relative aspect-[16/10] mb-5">
                        <svg className="services-hero-panel__wire" viewBox="0 0 320 200" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                          {/* Building frame */}
                          <rect x="40" y="20" width="240" height="160" rx="2" />
                          {/* Floor slabs */}
                          <line x1="40" y1="73" x2="280" y2="73" />
                          <line x1="40" y1="127" x2="280" y2="127" />
                          {/* Columns */}
                          <line x1="80" y1="20" x2="80" y2="180" />
                          <line x1="160" y1="20" x2="160" y2="180" />
                          <line x1="240" y1="20" x2="240" y2="180" />
                          {/* Bracing diagonals */}
                          <line x1="80" y1="73" x2="160" y2="127" />
                          <line x1="160" y1="73" x2="80" y2="127" />
                          <line x1="160" y1="73" x2="240" y2="127" />
                          <line x1="240" y1="73" x2="160" y2="127" />
                          <line x1="80" y1="127" x2="160" y2="180" />
                          <line x1="160" y1="127" x2="80" y2="180" />
                          <line x1="160" y1="127" x2="240" y2="180" />
                          <line x1="240" y1="127" x2="160" y2="180" />
                          {/* Foundation detail */}
                          <line x1="30" y1="180" x2="290" y2="180" strokeDasharray="4 4" />
                          <line x1="30" y1="186" x2="290" y2="186" />
                          {/* Dimension lines */}
                          <line x1="40" y1="8" x2="280" y2="8" />
                          <line x1="40" y1="4" x2="40" y2="12" />
                          <line x1="280" y1="4" x2="280" y2="12" />
                          <text x="160" y="16" textAnchor="middle" className="services-hero-panel__dim">24.00 m</text>
                          {/* Axis */}
                          <line x1="160" y1="20" x2="160" y2="8" strokeDasharray="2 2" />
                          {/* Nodes */}
                          <circle cx="80" cy="73" r="2.5" />
                          <circle cx="160" cy="73" r="2.5" />
                          <circle cx="240" cy="73" r="2.5" />
                          <circle cx="80" cy="127" r="2.5" />
                          <circle cx="160" cy="127" r="2.5" />
                          <circle cx="240" cy="127" r="2.5" />
                          <circle cx="80" cy="180" r="2.5" />
                          <circle cx="160" cy="180" r="2.5" />
                          <circle cx="240" cy="180" r="2.5" />
                        </svg>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: '4', label: 'Áreas' },
                          { value: '2005', label: 'Inicio' },
                          { value: 'A medida', label: 'Alcance' },
                        ].map(({ value, label }, i) => (
                          <div
                            key={label}
                            className="services-hero-panel__stat"
                            style={{ animationDelay: `${0.8 + i * 0.15}s` }}
                          >
                            <p className="font-headline text-xl lg:text-2xl font-black text-primary-fixed-dim leading-none mb-1">{value}</p>
                            <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/40">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CORE SERVICES — 4 Pillar cards with creative layout
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={coreRef}>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-fixed/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tertiary-fixed/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${coreVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Áreas de Expertise</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Cuatro pilares,<br /><span className="text-[#3a7a4a]">un equipo integral</span>
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                Las cuatro áreas se coordinan según el alcance contratado, desde la idea inicial hasta la documentación y la ejecución.
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll ${coreVisible ? 'visible' : ''}`}>
              {coreServices.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  className="page-card group relative p-8 rounded-3xl bg-white border border-outline/10 hover:border-primary overflow-hidden cursor-default"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-fixed/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Step number watermark */}
                  <span className="absolute top-4 right-5 font-headline text-5xl font-black text-primary/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/15 rounded-tl-xl pointer-events-none group-hover:border-primary/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/15 rounded-br-xl pointer-events-none group-hover:border-primary/40 transition-colors duration-300" />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-fixed/50 to-primary-fixed/15 flex items-center justify-center border border-primary/5 mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white transition-colors duration-500">{icon}</span>
                  </div>

                  <h3 className="font-headline text-xl font-black text-primary mb-3 relative z-10">{title}</h3>
                  <p className="text-on-surface-variant text-sm font-semibold leading-relaxed relative z-10">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            PROJECTS — "Lo que hacemos" — Masonry-inspired cards
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={projectsRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.04)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${projectsVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Tipologías</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Lo que hacemos
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                Abordamos una amplia variedad de tipologías constructivas, cada una adaptada a las necesidades específicas del proyecto.
              </p>
            </div>

            {/* Creative grid: 3 top + 2 bottom centered */}
            <div className={`animate-on-scroll ${projectsVisible ? 'visible' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                {projectTypes.slice(0, 3).map(({ img, width, height, title, desc, tag }, i) => (
                  <div
                    key={title}
                    className={`page-card group relative rounded-3xl overflow-hidden min-h-[390px] lg:min-h-[460px] cursor-pointer ${i === 0 ? 'md:col-span-6' : 'md:col-span-3'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <img
                      src={img}
                      alt={title}
                      width={width}
                      height={height}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay layers */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c08]/90 via-[#070c08]/30 to-transparent" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top tag */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-bold tracking-widest uppercase">
                        {tag}
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-headline text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{desc}</p>
                      <a
                        href="/#contact"
                        className="inline-flex items-center gap-2 text-white font-bold text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:gap-3"
                        aria-label={`Ver más detalles sobre nuestro servicio de ${title}`}
                      >
                        Ver más
                        <span className="material-symbols-outlined text-primary-fixed-dim text-base">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {projectTypes.slice(3).map(({ img, width, height, title, desc, tag }, i) => (
                  <div
                    key={title}
                    className="page-card group relative rounded-3xl overflow-hidden min-h-[390px] lg:min-h-[460px] cursor-pointer"
                    style={{ transitionDelay: `${(i + 3) * 100}ms` }}
                  >
                    <img
                      src={img}
                      alt={title}
                      width={width}
                      height={height}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c08]/90 via-[#070c08]/30 to-transparent" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-bold tracking-widest uppercase">
                        {tag}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-headline text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{desc}</p>
                      <a
                        href="/#contact"
                        className="inline-flex items-center gap-2 text-white font-bold text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:gap-3"
                        aria-label={`Ver más detalles sobre nuestro servicio de ${title}`}
                      >
                        Ver más
                        <span className="material-symbols-outlined text-primary-fixed-dim text-base">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            DIFFERENTIATORS — Stats strip
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-20 px-6 lg:px-16 overflow-hidden bg-background" ref={diffRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,203,188,0.08)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 animate-on-scroll ${diffVisible ? 'visible' : ''}`}>
              {differentiators.map(({ icon, value, label, desc }, i) => (
                <div
                  key={label}
                  className="page-card group relative p-5 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/90 hover:border-primary-fixed-dim overflow-hidden text-center"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />

                  <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 flex items-center justify-center mx-auto mb-5 border border-primary/5 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
                  </div>

                  <p className="font-headline text-lg sm:text-3xl lg:text-5xl font-black leading-none break-words [overflow-wrap:anywhere] bg-gradient-to-br from-primary to-[#2a5a3a] bg-clip-text text-transparent mb-2">{value}</p>
                  <p className="font-headline text-sm font-extrabold text-primary uppercase tracking-wider mb-2">{label}</p>
                  <p className="text-on-surface-variant text-xs font-semibold leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CTA — Contact
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-surface-container-low via-[#eaf2ed] to-surface-container-low" ref={ctaRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(61,140,90,0.06)_0%,transparent_55%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

          <div className={`relative max-w-4xl mx-auto text-center animate-on-scroll ${ctaVisible ? 'visible' : ''}`}>
            <div className="w-20 h-20 rounded-3xl bg-primary-fixed/50 flex items-center justify-center mx-auto mb-8 border border-primary-fixed-dim/20 shadow-md hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-primary text-5xl font-medium" style={{ fontVariationSettings: "'FILL' 1" }}>contact_mail</span>
            </div>

            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary mb-6 leading-tight">
              ¿Listo para tu<br /><span className="text-[#3a7a4a]">próximo proyecto?</span>
            </h2>

            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-semibold">
              Para cotizaciones, consultas sobre proyectos o servicios de construcción, escribinos o llamanos. Estamos para ayudarte.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href="/#contact"
                className="group flex items-center gap-3 bg-primary hover:bg-[#203728] text-white px-10 py-5 rounded-xl font-headline font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <span>Hablemos</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
              </a>
              <Link
                to="/steel-frame-parana"
                className="group flex items-center gap-2 text-primary/70 hover:text-primary text-sm font-bold transition-colors py-5 px-4"
              >
                <span>Ver Steel Frame en Paraná</span>
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
