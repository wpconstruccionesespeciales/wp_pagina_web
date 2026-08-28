import { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'
import SEO from '../components/SEO'
import wpLogo from '../assets/WP.png'
import { BUSINESS, BUSINESS_ID, canonicalUrl, whatsappUrl } from '../config/site'


/* ──────────────── BEFORE / AFTER SLIDER ──────────────── */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const containerRef = useRef(null)

  const move = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  useEffect(() => {
    const onUp = () => { dragging.current = false }
    const onMove = (e) => { if (dragging.current) move(e.clientX) }
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
    }
  }, [move])

  return (
    <div
      ref={containerRef}
      className="before-after-slider relative mx-auto w-full max-w-5xl aspect-[4/5] sm:aspect-[2/1] overflow-hidden select-none cursor-col-resize rounded-[1.25rem] sm:rounded-3xl"
      onMouseDown={(e) => { e.preventDefault(); dragging.current = true; move(e.clientX) }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
    >
      {/* VISTA B — full size, clipped from left */}
      <img
        src="/wp/after.webp"
        alt="Vista arquitectónica de referencia B"
        width="935"
        height="457"
        className="before-after-image before-after-image--after absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* VISTA A — full size, clipped from right */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src="/wp/before.webp"
          alt="Vista arquitectónica de referencia A"
          width="906"
          height="448"
          className="before-after-image before-after-image--before w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Divisor */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-px h-full bg-white/80 mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl sm:text-3xl">compare</span>
        </div>
      </div>

      {/* Labels fijos */}
      <div className="absolute top-3 left-3 sm:top-8 sm:left-8 z-10 bg-black/60 backdrop-blur-md px-3 py-1 sm:px-6 sm:py-2 text-white font-headline font-bold uppercase tracking-widest text-[10px] sm:text-sm pointer-events-none rounded-full">
        Vista A
      </div>
      <div className="absolute top-3 right-3 sm:top-8 sm:right-8 z-10 bg-primary/90 backdrop-blur-md px-3 py-1 sm:px-6 sm:py-2 text-white font-headline font-bold uppercase tracking-widest text-[10px] sm:text-sm pointer-events-none rounded-full">
        Vista B
      </div>

      {/* Info box VISTA A */}
      <div className="absolute bottom-3 left-3 sm:bottom-8 sm:left-8 z-10 w-36 sm:w-72 bg-black/50 backdrop-blur-lg p-2.5 sm:p-6 border border-white/10 pointer-events-none rounded-2xl">
        <p className="hidden sm:block text-white text-sm font-body uppercase tracking-tighter opacity-80 mb-2">Referencia visual</p>
        <h3 className="text-white text-xs sm:text-2xl font-headline font-bold leading-tight">Configuración A</h3>
      </div>

      {/* Info box VISTA B */}
      <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-8 z-10 w-36 sm:w-72 bg-primary/90 backdrop-blur-lg p-2.5 sm:p-6 border border-white/5 pointer-events-none rounded-2xl">
        <p className="hidden sm:block text-white/70 text-sm font-body uppercase tracking-tighter mb-2">Referencia visual</p>
        <h3 className="text-white text-xs sm:text-2xl font-headline font-bold leading-tight">Configuración B</h3>
      </div>
    </div>
  )
}

const metaStats = [
  { value: 'CNC', label: 'Perfilado controlado' },
  { value: 'SECO', label: 'Sistema constructivo' },
  { value: 'ACERO', label: 'Estructura portante' },
  { value: 'PROYECTO', label: 'Acero según cálculo' },
]

const processFeatures = [
  { icon: 'precision_manufacturing', title: 'Perfilado Controlado', desc: 'Cada perfil es cortado y perforado por control numérico.' },
  { icon: 'eco', title: 'Uso Optimizado', desc: 'Construcción en seco orientada a reducir recortes y residuos de obra.' },
  { icon: 'humidity_low', title: 'Protección del Acero', desc: 'Perfiles galvanizados integrados a una envolvente diseñada según el proyecto.' },
]

const timelineItems = [
  {
    year: '2005',
    label: 'Los Cimientos',
    subtitle: 'The Foundation',
    description:
      'Nuestra historia comienza en Paraná en 2005, con una práctica enfocada en estructuras y en el desarrollo técnico de cada proyecto.',
    highlighted: false,
  },
  {
    year: 'HOY',
    label: 'Especialización Steel Frame',
    subtitle: 'Modern Mastery',
    description:
      'Hoy concentramos nuestro enfoque en Steel Frame, integrando arquitectura, ingeniería de detalle, fabricación y ejecución para proyectos residenciales y comerciales.',
    highlighted: true,
  },
  {
    year: 'FUTURO',
    label: 'Ingeniería & Soluciones',
    subtitle: 'The Vision',
    description:
      'Seguimos explorando soluciones de ingeniería que aprovechen mejor los materiales, la construcción en seco y el desempeño de la envolvente.',
    highlighted: false,
  },
]

const bentoCards = [
  {
    span: 'md:col-span-8 md:row-span-2',
    type: 'image',
    img: '/wp/wp imagen.jpg',
    title: 'Edificios de mediana altura',
    desc: 'Soluciones verticales estudiadas según las cargas, la logística y las condiciones de cada proyecto.',
  },
  {
    span: 'md:col-span-4 md:row-span-1',
    type: 'icon-card',
    icon: 'home_work',
    title: 'Viviendas unifamiliares',
    bg: 'bg-primary-container',
    text: 'text-on-primary-container',
  },
  {
    span: 'md:col-span-4 md:row-span-1',
    type: 'image-light',
    img: '/wp/service-especial.webp',
    title: 'Industriales | Locales comerciales',
  },
  {
    span: 'md:col-span-4 md:row-span-2',
    type: 'reforma',
    title: 'Reformas y Ampliaciones',
    desc: 'La menor carga propia del sistema puede ser útil en ampliaciones, siempre después de evaluar la estructura y la cimentación existentes.',
    img: '/wp/after.jpg',
  },
  {
    span: 'md:col-span-4 md:row-span-1',
    type: 'icon-card',
    icon: 'medical_services',
    title: 'Clínicas | Consultorios',
    bg: 'bg-secondary',
    text: 'text-white',
  },
  {
    span: 'md:col-span-4 md:row-span-1',
    type: 'icon-card',
    icon: 'surround_sound',
    title: 'Estudios Acústicos',
    subtitle: 'High-end Soundproofing',
    bg: 'bg-white',
    text: 'text-primary',
    bordered: true,
  },
]

function TimelineItem({ item, index, isVisible, nodeRef }) {
  const isEven = index % 2 === 0
  const sideClass = isEven ? 'md:text-right' : 'md:text-left'
  const cardAlignment = isEven ? 'md:ml-auto' : 'md:mr-auto'
  const delayStyle = { transitionDelay: `${index * 150}ms` }

  return (
    <div className="relative grid md:grid-cols-2 gap-8 md:gap-0 items-center mb-20 last:mb-0">
      {/* Columna de año (desktop) */}
      <div className={`hidden md:block ${isEven ? 'pr-16 order-1' : 'pl-16 order-2'} ${sideClass}`}>
        <h3 className="text-5xl lg:text-6xl font-headline font-black text-primary leading-none mb-2">
          {item.year}
        </h3>
        <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
          {item.subtitle}
        </p>
      </div>

      {/* Nodo */}
      <div
        ref={nodeRef}
        className="absolute left-7 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low shadow-[0_0_0_1px_rgba(61,140,90,0.15)] ring-[10px] ring-primary/[0.06] transition-all duration-500 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={delayStyle}
        >
          {item.highlighted ? (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <span
                className="material-symbols-outlined text-white text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                domain
              </span>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full border border-primary/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(61,140,90,0.45)]" />
            </>
          )}
        </div>

        {/* Conector horizontal hacia la tarjeta (desktop) */}
        <div
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/25 to-transparent w-12 ${
            isEven ? 'left-full ml-4 origin-left' : 'right-full mr-4 origin-right'
          }`}
        />
      </div>

      {/* Tarjeta */}
      <div className={`pl-[4.5rem] md:pl-0 ${isEven ? 'md:pr-28 order-2' : 'md:pl-28 order-1'}`}>
        <div
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
          style={delayStyle}
        >
          <div
            className={`page-card bg-white p-8 md:p-10 rounded-[2rem] border border-outline/10 ${cardAlignment}`}
          >
            {/* Año y subtítulo mobile */}
            <div className="md:hidden mb-4">
              <h3 className="text-4xl font-headline font-black text-primary leading-none mb-1">
                {item.year}
              </h3>
              <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
                {item.subtitle}
              </p>
            </div>

            <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary mb-4">
              {item.label}
            </h4>
            <p className="text-on-surface-variant leading-relaxed font-medium">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────── PAGE ──────────────── */
export default function Nosotros() {
  const [heroRef, heroVisible] = useInView()
  const [historyRef, historyVisible] = useInView()
  const [beforeAfterRef, beforeAfterVisible] = useInView()
  const [processRef, processVisible] = useInView()
  const [bentoRef, bentoVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  const timelineRef = useRef(null)
  const nodeRefs = useRef([])
  const [lineStyle, setLineStyle] = useState({ opacity: 0 })

  const updateLine = useCallback(() => {
    const container = timelineRef.current
    const first = nodeRefs.current[0]
    const last = nodeRefs.current[nodeRefs.current.length - 1]
    if (!container || !first || !last) return

    const containerRect = container.getBoundingClientRect()
    const firstRect = first.getBoundingClientRect()
    const lastRect = last.getBoundingClientRect()

    const top = firstRect.top + firstRect.height / 2 - containerRect.top
    const height = lastRect.top + lastRect.height / 2 - (firstRect.top + firstRect.height / 2)

    setLineStyle({
      top: `${top}px`,
      height: `${Math.max(0, height)}px`,
      opacity: 1,
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!historyVisible) return
    updateLine()
    window.addEventListener('resize', updateLine)
    return () => window.removeEventListener('resize', updateLine)
  }, [historyVisible, updateLine])

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${canonicalUrl('/nosotros')}#webpage`,
        "url": canonicalUrl('/nosotros'),
        "name": "Nosotros | WP Construcciones Especiales",
        "description": "Conocé la trayectoria de WP Construcciones Especiales en Paraná, Entre Ríos. Desde 2005 desarrollando arquitectura, ingeniería de detalle y construcción en Steel Frame.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${canonicalUrl('/')}#website`,
          "url": canonicalUrl('/'),
          "name": BUSINESS.name
        }
      },
      {
        "@type": "Organization",
        "@id": BUSINESS_ID,
        "name": BUSINESS.name,
        "url": canonicalUrl('/'),
        "logo": {
          "@type": "ImageObject",
          "url": canonicalUrl(wpLogo)
        },
        "sameAs": Object.values(BUSINESS.social)
      }
    ]
  }

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <SEO 
        title="Nosotros | Trayectoria en Steel Frame y Construcción en Seco · WP"
        description="Conocé la trayectoria de WP Construcciones Especiales en Paraná, Entre Ríos. Desde 2005 desarrollando arquitectura, ingeniería de detalle y construcción en Steel Frame."
        keywords="nosotros, trayectoria, guillermo matteoda, steel frame parana, construccion en seco entre rios, fabrica de aberturas, historia steel frame, argentina"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Nosotros', url: '/nosotros' },
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify(aboutSchema)}
      </script>
      <NavBar />

      <main className="pt-20">

        {/* ═══════════════════════════════════════════════════════
            HERO — Quiénes Somos (premium, claro)
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-hero relative py-12 md:py-16 lg:py-20 xl:py-28 2xl:py-32 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={heroRef}>
          {/* Decoración geométrica sutil */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-geo-dots bg-geo-dots-left opacity-[0.08] top-20 left-20" />
            <div className="bg-geo-corners bg-geo-corners-left opacity-[0.18] bottom-24 left-12" />
            <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] top-28 right-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Columna de texto */}
              <div className={`lg:col-span-7 animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
                <div className="flex items-center gap-4 mb-5 lg:mb-6 xl:mb-8">
                  <div className="w-14 h-px bg-primary/30" />
                  <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">
                    WP Construcciones Especiales
                  </span>
                </div>

                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-5 lg:mb-6 xl:mb-8 text-primary">
                  Nuestra historia en <span className="gradient-text">arquitectura y acero</span>
                </h1>

                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-5 lg:mb-6 xl:mb-8 max-w-2xl font-medium">
                  En WP no solo construimos estructuras; ingeniamos el futuro de la arquitectura residencial
                  y comercial mediante soluciones de Steel Frame desarrolladas para cada proyecto.
                </p>

                <div className="flex items-center gap-4 max-w-xl">
                  <div className="w-12 h-px bg-primary/20" />
                  <p className="text-primary/60 text-base italic font-medium">
                    Trayectoria técnica iniciada en Paraná en 2005.
                  </p>
                </div>
              </div>

              {/* Columna de imagen */}
              <div className={`lg:col-span-5 lg:ml-auto relative animate-on-scroll flex justify-end ${heroVisible ? 'visible' : ''}`}>
                <div className="scale-90 origin-right">
                <div className="relative rounded-[2rem] overflow-hidden group border border-outline/10 shadow-2xl shadow-primary/5">
                  <img
                    alt="Vista de referencia de una estructura en Steel Frame"
                    width="800"
                    height="1080"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    src="/wp/wp imagen.webp"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

                  {/* Marco arquitectónico */}
                  <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/40 rounded-tl-2xl pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/40 rounded-br-2xl pointer-events-none" />
                </div>

                {/* Stat card flotante */}
                <div className="absolute -bottom-5 -left-5 lg:-left-10 bg-white p-5 lg:p-6 rounded-2xl shadow-xl shadow-primary/5 border border-outline/10 flex items-center gap-4 z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                  </div>
                  <div>
                    <p className="font-headline text-2xl lg:text-3xl font-black text-primary leading-none">Desde 2005</p>
                    <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mt-1">Trayectoria técnica</p>
                  </div>
                </div>

                {/* Badge icono */}
                <div className="hidden lg:flex absolute -top-4 -right-6 bg-primary text-white p-5 rounded-2xl shadow-2xl shadow-primary/30 items-center justify-center border border-primary-fixed-dim/20">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            NUESTRA HISTORIA — Timeline
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={historyRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.04)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="bg-geo-dots bg-geo-dots-right opacity-[0.1] top-12 right-12 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            {/* Header */}
            <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-8 animate-on-scroll ${historyVisible ? 'visible' : ''}`}>
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Trayectoria</span>
                </div>
                <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                  Nuestra Historia
                </h2>
                <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                  Un camino definido por la integridad estructural, evolucionando desde los cimientos
                  tradicionales hasta la vanguardia de la innovación en Steel Frame.
                </p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-8xl font-black text-outline/15 select-none font-headline">EST. 2005</span>
              </div>
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative pt-10">
              {/* Línea base */}
              <div
                className="absolute left-7 md:left-1/2 w-px bg-gradient-to-b from-transparent via-outline-variant/25 to-transparent -translate-x-1/2 transition-all duration-700"
                style={lineStyle}
              />

              {/* Línea de progreso */}
              <div
                className={`absolute left-7 md:left-1/2 w-px bg-gradient-to-b from-primary via-primary to-primary/40 origin-top -translate-x-1/2 shadow-[0_0_14px_rgba(61,140,90,0.28)] transition-all duration-1000 ease-out ${
                  historyVisible ? 'scale-y-100' : 'scale-y-0'
                }`}
                style={lineStyle}
              />

              {/* Items */}
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  item={item}
                  index={index}
                  isVisible={historyVisible}
                  nodeRef={(el) => { nodeRefs.current[index] = el }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            VISTAS DE REFERENCIA
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={beforeAfterRef}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.08] -top-12 left-10 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`text-center mb-16 animate-on-scroll ${beforeAfterVisible ? 'visible' : ''}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Exploración visual</span>
                <div className="w-12 h-px bg-primary/40" />
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Dos configuraciones de referencia
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                Las imágenes ilustran alternativas visuales sin afirmar una relación temporal entre ellas.
                Cada intervención real requiere relevamiento y un proyecto específico.
              </p>
            </div>

            <div className={`animate-on-scroll ${beforeAfterVisible ? 'visible' : ''}`}>
              <BeforeAfterSlider />
            </div>

            {/* Stats debajo del slider */}
            <div className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-on-scroll ${beforeAfterVisible ? 'visible' : ''}`}>
              {metaStats.map(({ value, label }) => (
                <div
                  key={label}
                  className="page-card group relative p-5 sm:p-6 lg:p-8 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim overflow-hidden"
                >
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/20 rounded-tl-xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/20 rounded-br-xl pointer-events-none" />
                  <p className="font-headline text-lg sm:text-2xl lg:text-4xl font-black leading-none break-words [overflow-wrap:anywhere] text-primary mb-2 relative z-10">{value}</p>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold relative z-10">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TRAE TU PROYECTO
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={processRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(61,140,90,0.04)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="bg-geo-corners bg-geo-corners-left opacity-[0.15] bottom-12 left-8 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
              <div className={`md:w-1/3 animate-on-scroll ${processVisible ? 'visible' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Traé tu Proyecto</span>
                </div>
                <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-6 leading-tight">
                  Trae tu proyecto
                </h2>
                <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed mb-8">
                  Nuestra metodología integra modelado y maquinaria de perfilado (roll-forming) para
                  coordinar piezas, anticipar encuentros y optimizar el uso de material.
                </p>

                <div className="space-y-5">
                  {processFeatures.map(({ icon, title, desc }) => (
                    <div key={title} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-fixed/40 to-primary-fixed/10 flex items-center justify-center border border-primary/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-primary text-base mb-1">{title}</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 animate-on-scroll ${processVisible ? 'visible' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                  <img
                    className="w-full h-full object-cover hover:grayscale transition-all duration-700"
                    src="/wp/IMG_9158.webp"
                    alt="Maquinaria roll-forming"
                    width="1600"
                    height="2845"
                  />
                </div>
                <div className="grid-rows-2 grid gap-4">
                  <div className="aspect-video overflow-hidden rounded-3xl">
                    <img
                      className="w-full h-full object-cover"
                      src="/wp/IMG_9135.webp"
                      alt="Ensamblaje estructura"
                      width="1600"
                      height="2844"
                    />
                  </div>
                  <div className="bg-primary p-8 flex flex-col justify-end text-white rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <p className="font-headline text-2xl lg:text-3xl font-bold tracking-tighter mb-3 italic relative z-10">
                      "La estructura es el alma de la arquitectura."
                    </p>
                    <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold relative z-10">
                      Enfoque WP: coordinación entre estructura y arquitectura
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            VERSATILIDAD ESTRUCTURAL — Bento
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={bentoRef}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.08] top-12 left-10 pointer-events-none" />
          <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] top-24 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${bentoVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Especializaciones</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Versatilidad Estructural
              </h2>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] animate-on-scroll ${bentoVisible ? 'visible' : ''}`}>
              {bentoCards[0] && (
                <div className={`${bentoCards[0].span} group relative overflow-hidden rounded-3xl bg-surface-container-high hover:shadow-xl transition-shadow duration-500`}>
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700"
                    src={bentoCards[0].img}
                    alt={bentoCards[0].title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/30 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/30 rounded-br-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-8 lg:p-10">
                    <h4 className="font-headline text-2xl lg:text-3xl font-bold text-white">{bentoCards[0].title}</h4>
                    <p className="text-white/70 mt-2 max-w-md text-sm leading-relaxed font-medium">{bentoCards[0].desc}</p>
                  </div>
                </div>
              )}

              {bentoCards[1] && (
                <div className={`${bentoCards[1].span} group relative overflow-hidden rounded-3xl ${bentoCards[1].bg} border border-outline/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}>
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/20 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/20 rounded-br-3xl pointer-events-none" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 group-hover:scale-110 transition-transform duration-500">
                      <span className={`material-symbols-outlined ${bentoCards[1].text} text-2xl`}>{bentoCards[1].icon}</span>
                    </div>
                    <h4 className={`font-headline text-xl font-bold ${bentoCards[1].text}`}>{bentoCards[1].title}</h4>
                  </div>
                </div>
              )}

              {bentoCards[2] && (
                <div className={`${bentoCards[2].span} group relative overflow-hidden rounded-3xl border border-outline/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-white`}>
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500"
                    src={bentoCards[2].img}
                    alt={bentoCards[2].title}
                  />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/20 rounded-br-3xl pointer-events-none" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h4 className="font-headline text-xl font-bold text-primary">{bentoCards[2].title}</h4>
                  </div>
                </div>
              )}

              {bentoCards[3] && (
                <div className={`${bentoCards[3].span} page-card group relative overflow-hidden rounded-3xl bg-white border border-outline/10`}>
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/20 rounded-br-3xl pointer-events-none" />
                  <div className="p-8 h-full flex flex-col">
                    <h4 className="font-headline text-2xl font-bold text-primary mb-3">{bentoCards[3].title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed font-medium flex-grow">{bentoCards[3].desc}</p>
                    <div className="mt-4 aspect-square rounded-2xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={bentoCards[3].img}
                        alt={bentoCards[3].title}
                      />
                    </div>
                  </div>
                </div>
              )}

              {bentoCards[4] && (
                <div className={`${bentoCards[4].span} group relative overflow-hidden rounded-3xl ${bentoCards[4].bg} hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}>
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/20 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/20 rounded-br-3xl pointer-events-none" />
                  <div className="absolute inset-0 p-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className={`material-symbols-outlined ${bentoCards[4].text} text-2xl`}>{bentoCards[4].icon}</span>
                    </div>
                    <h4 className={`font-headline text-xl font-bold ${bentoCards[4].text}`}>{bentoCards[4].title}</h4>
                  </div>
                </div>
              )}

              {bentoCards[5] && (
                <div className={`${bentoCards[5].span} group relative overflow-hidden rounded-3xl ${bentoCards[5].bg} ${bentoCards[5].bordered ? 'border border-outline/10' : ''} hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}>
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/20 rounded-br-3xl pointer-events-none" />
                  <div className="absolute inset-0 p-8 flex items-center justify-between">
                    <div>
                      <h4 className={`font-headline text-xl font-bold ${bentoCards[5].text}`}>{bentoCards[5].title}</h4>
                      {bentoCards[5].subtitle && (
                        <p className="text-xs text-outline tracking-wider uppercase mt-1 font-bold">{bentoCards[5].subtitle}</p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-fixed/40 to-primary-fixed/10 flex items-center justify-center border border-primary/5 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-primary text-2xl">{bentoCards[5].icon}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CTA FINAL
        ═══════════════════════════════════════════════════════ */}
        <section className="subpage-section relative py-28 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-surface-container-low via-[#eaf2ed] to-surface-container-low" ref={ctaRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(61,140,90,0.08)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="bg-geo-ring bg-geo-ring-left opacity-[0.06] top-6 pointer-events-none" />
          <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] bottom-6 pointer-events-none" />

          <div className={`relative max-w-4xl mx-auto text-center animate-on-scroll ${ctaVisible ? 'visible' : ''}`}>
            <div className="w-20 h-20 rounded-3xl bg-primary-fixed/50 flex items-center justify-center mx-auto mb-8 border border-primary-fixed-dim/20 shadow-md hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-primary text-5xl font-medium" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
            </div>

            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary mb-6 leading-tight">
              Transformá tu visión<br /><span className="text-[#3a7a4a]">en un proyecto bien coordinado.</span>
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-semibold">
              Nuestros ingenieros están listos para analizar tu proyecto y preparar una cotización técnica detallada.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href={whatsappUrl('Hola, quiero iniciar un proyecto con WP Construcciones.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-primary hover:bg-[#203728] text-white px-10 py-5 rounded-xl font-headline font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <span>Iniciá tu proyecto</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
              </a>
              <Link
                to="/servicios"
                className="group flex items-center gap-2 text-primary/70 hover:text-primary text-sm font-bold transition-colors py-5 px-4"
              >
                <span>Conocé nuestros servicios</span>
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
