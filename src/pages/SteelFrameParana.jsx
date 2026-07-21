import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'
import { Link } from 'react-router-dom'
import { BUSINESS, BUSINESS_ID, canonicalUrl } from '../config/site'

// ─── Data local conceptual de la empresa (Paraná) ───
const hitosParana = [
  {
    ano: '2005',
    titulo: 'Fundación en Paraná',
    desc: 'WP Construcciones Especiales inicia su actividad en Paraná con foco en construcción industrializada en seco para la región del litoral.'
  },
  {
    ano: '2014',
    titulo: 'Proyecto en Altura',
    desc: 'WP proyecta y construye un edificio de mediana altura realizado íntegramente en Steel Frame en Paraná.'
  },
  {
    ano: '2026',
    titulo: 'Trayectoria en Desarrollo',
    desc: 'Continuamos trabajando en arquitectura residencial y comercial en Entre Ríos y Santa Fe, aplicando ingeniería de detalle a cada proyecto.'
  }
]

const ventajasGeoclimaticas = [
  {
    icon: 'landscape',
    title: 'Estabilidad en Suelos Complejos',
    desc: 'Los cambios de humedad y las características del suelo pueden condicionar las fundaciones. La menor carga propia del Steel Frame puede ser una ventaja, siempre sujeta al estudio de suelo y al cálculo del proyecto.'
  },
  {
    icon: 'water_drop',
    title: 'Comportamiento Higrotérmico Litoral',
    desc: 'La humedad del litoral requiere estudiar la secuencia de capas. Diseñamos envolventes con barreras de viento y agua y control de vapor según las condiciones de uso y exposición.'
  },
  {
    icon: 'thermostat',
    title: 'Eficiencia ante el Clima Extremo',
    desc: 'Los veranos calurosos y los inviernos húmedos orientan el diseño de muros y cubiertas. El desempeño térmico depende de la composición elegida, la ejecución y el uso del edificio.'
  }
]

const capasMuroConceptual = [
  {
    nombre: '1. Revestimiento Exterior Continuo',
    descripcion: 'Una envolvente de protección continua contra la intemperie que puede incorporar aislamiento térmico exterior y terminaciones definidas por el proyecto.',
    concept: 'Aislamiento Térmico y Terminación Exterior'
  },
  {
    nombre: '2. Barrera de Viento y Agua',
    descripcion: 'Membrana hidrófuga inteligente respirable. Protege el esqueleto de la casa contra lluvias y ráfagas de viento, a la vez que evacua el vapor interior.',
    concept: 'Defensa Activa contra la Humedad Litoral'
  },
  {
    nombre: '3. Estructura Portante & Núcleo Aislante',
    descripcion: 'El esqueleto de acero de alta resistencia que soporta las cargas del edificio, relleno en su interior con mantos de alta densidad para la amortiguación del frío, calor y ruidos.',
    concept: 'Alma de Acero y Confort Termoacústico'
  },
  {
    nombre: '4. Panelado Interior Terminado',
    descripcion: 'Placas de terminación interior que proveen superficies lisas, listas para pintar, que aportan estabilidad estructural interna y resistencia al fuego.',
    concept: 'Habitabilidad Inmediata y Calidez'
  }
]

const faqsParana = [
  {
    pregunta: '¿Cómo se gestiona el permiso de obra de Steel Frame en la Municipalidad de Paraná?',
    respuesta: 'La gestión depende de la normativa municipal vigente al momento de presentar, de las condiciones del terreno y del proyecto elaborado y firmado por profesionales habilitados. La documentación requerida puede incluir planos, cálculo estructural, estudio de suelo y otros antecedentes según el caso; debe confirmarse con la Municipalidad de Paraná antes de iniciar el trámite.'
  },
  {
    pregunta: '¿El Steel Frame es apto para terrenos inclinados o sobre las barrancas de Paraná?',
    respuesta: 'Puede ser una alternativa por su menor carga propia, pero la aptitud no puede definirse sin estudio de suelo, relevamiento topográfico, cálculo de fundaciones y proyecto profesional específico para el terreno.'
  },
  {
    pregunta: '¿Cuáles son los plazos de obra habituales para una vivienda en Paraná?',
    respuesta: 'El montaje en seco evita algunos tiempos de fraguado y permite preparar paneles con anticipación. El plazo final depende de superficie, complejidad, permisos, provisión de materiales, clima, logística y alcance contratado.'
  }
]

// ─── Tarjeta individual con efecto tilt 3D y label conceptual ───
function ImageCard({ src, alt, label, motionStyle, className, width, height }) {
  const [isHovered, setIsHovered] = useState(false)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 15 })
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 15 })
  const hoverScale = useSpring(1.05, { stiffness: 200, damping: 20 })

  useEffect(() => {
    hoverScale.set(isHovered ? 1 : 1.05)
  }, [isHovered, hoverScale])

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    tiltX.set((y - 0.5) * 8)
    tiltY.set((x - 0.5) * -8)
  }

  const handleLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    setIsHovered(false)
  }

  return (
    <Motion.div
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        ...motionStyle,
        rotateX: springTiltX,
        rotateY: springTiltY,
        scale: hoverScale,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={`rounded-3xl overflow-hidden shadow-2xl border border-white/40 cursor-pointer ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
      <Motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-5"
      >
        <span className="text-white text-xs font-headline uppercase tracking-wider font-semibold drop-shadow-sm">{label}</span>
      </Motion.div>
    </Motion.div>
  )
}

// ─── Mosaico con Parallax Magnético 3D ───
function EditorialMosaic() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Capas con distinta profundidad y dirección de paralaje
  const img1X = useTransform(springX, [-0.5, 0.5], [10, -10])
  const img1Y = useTransform(springY, [-0.5, 0.5], [8, -8])
  const img2X = useTransform(springX, [-0.5, 0.5], [-15, 15])
  const img2Y = useTransform(springY, [-0.5, 0.5], [-12, 12])
  const img3X = useTransform(springX, [-0.5, 0.5], [18, -18])
  const img3Y = useTransform(springY, [-0.5, 0.5], [15, -15])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center select-none"
    >
      {/* Retícula decorativa de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%2315251b\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Imagen Principal - "El Espacio" */}
      <ImageCard
        src="/wp/wp imagen.jpg"
        alt="Obra Steel Frame Residencial en Paraná"
        label="El Espacio"
        width="800"
        height="1080"
        motionStyle={{ x: img1X, y: img1Y }}
        className="absolute w-[60%] h-[55%] left-[5%] top-[18%] z-10"
      />

      {/* Imagen Secundaria - "La Luz" */}
      <ImageCard
        src="/wp/IMG_9133.webp"
        alt="Edificio de Steel Frame en Paraná por WP"
        label="La Luz"
        width="1600"
        height="2844"
        motionStyle={{ x: img2X, y: img2Y }}
        className="absolute w-[45%] h-[40%] right-[5%] top-[5%] z-20"
      />

      {/* Imagen Terciaria - "El Acero" */}
      <ImageCard
        src="/wp/after.jpg"
        alt="Ingeniería y montaje de Steel Frame en Entre Ríos"
        label="El Acero"
        width="935"
        height="457"
        motionStyle={{ x: img3X, y: img3Y }}
        className="absolute w-[40%] h-[35%] right-[15%] bottom-[8%] z-30"
      />
    </div>
  )
}

export default function SteelFrameParana() {
  const [activeCapamuro, setActiveCapamuro] = useState(0)
  const [formStatus, setFormStatus] = useState('idle')
  const [selectedProjectType, setSelectedProjectType] = useState('')

  // Referencias de Scroll
  const [heroRef, heroVisible] = useInView()
  const [hitosRef, hitosVisible] = useInView()
  const [ventajasRef, ventajasVisible] = useInView()
  const [muroRef] = useInView()
  const [faqRef, faqVisible] = useInView()
  const [contactRef] = useInView()

  // Parallax magnético para la columna editorial izquierda
  const leftRef = useRef(null)
  const leftMouseX = useMotionValue(0)
  const leftMouseY = useMotionValue(0)
  const leftSpringX = useSpring(leftMouseX, { stiffness: 100, damping: 25, mass: 0.8 })
  const leftSpringY = useSpring(leftMouseY, { stiffness: 100, damping: 25, mass: 0.8 })
  const leftX = useTransform(leftSpringX, [-0.5, 0.5], [-6, 6])
  const leftY = useTransform(leftSpringY, [-0.5, 0.5], [-4, 4])

  const handleLeftMouseMove = (e) => {
    const rect = leftRef.current?.getBoundingClientRect()
    if (!rect) return
    leftMouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    leftMouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeftMouseLeave = () => {
    leftMouseX.set(0)
    leftMouseY.set(0)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // JSON-LD local
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    "name": BUSINESS.name,
    "url": canonicalUrl('/'),
    "telephone": BUSINESS.phoneE164,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BUSINESS.locality,
      "addressRegion": BUSINESS.region,
      "postalCode": "3100",
      "addressCountry": BUSINESS.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -31.73333,
      "longitude": -60.529806
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Paraná" },
      { "@type": "State", "name": "Entre Ríos" },
      { "@type": "State", "name": "Santa Fe" }
    ],
    "description": "Arquitectura, ingeniería y construcción en Steel Frame desde Paraná, con proyectos residenciales, comerciales y modulares definidos para cada emplazamiento.",
    "knowsAbout": [
      "Steel Framing en Paraná",
      "Construcción en Seco Paraná",
      "Arquitectura Modular en Entre Ríos",
      "Ingeniería de Detalle"
    ]
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
    }, 1500)
  }

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <SEO 
        title="Steel Frame en Paraná | WP Construcciones Especiales"
        description="Steel Frame en Paraná y el litoral: criterios de suelo, clima, envolvente, permisos y servicios para proyectos residenciales y comerciales."
        keywords="steel frame parana, construccion en seco parana, casas steel frame parana, constructora parana, steel framing entre rios, wp construcciones, steel frame oro verde, construccion en seco crespo"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Steel Frame en Paraná', url: '/steel-frame-parana' },
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <NavBar />

      <main className="relative z-10 pt-16">
        
        {/* ═══════════════════════════════════════════════════════
            1. HERO — "Arquitectura Flotante" (Cinético-Editorial con Parallax 3D)
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[92vh] flex items-center justify-center py-20 px-6 lg:px-16 overflow-hidden bg-[#fafaf9] text-on-surface"
        >
          {/* Animaciones del hero */}
          <style>{`
            @keyframes parana-grid-fade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes parana-line-draw { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
            .parana-grid { animation: parana-grid-fade 1.8s ease-out 0.2s forwards; opacity: 0; }
            .parana-line-anim { stroke-dasharray: 200; stroke-dashoffset: 200; animation: parana-line-draw 2s ease-out 0.6s forwards; }
          `}</style>

          {/* Retícula arquitectónica animada */}
          <div
            className="absolute inset-0 pointer-events-none z-0 parana-grid"
            style={{
              backgroundImage:
                'linear-gradient(rgba(21,37,27,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(21,37,27,0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 70%)',
            }}
          />

          {/* Auroras claras */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div
              className="absolute rounded-full w-[35rem] h-[35rem] opacity-35 blur-[120px]"
              style={{
                left: '-10%', top: '10%',
                background: 'radial-gradient(circle, rgba(184,203,188,0.55) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute rounded-full w-[40rem] h-[40rem] opacity-40 blur-[130px]"
              style={{
                right: '-5%', bottom: '-10%',
                background: 'radial-gradient(circle, rgba(212,231,216,0.6) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute rounded-full w-[25rem] h-[25rem] opacity-25 blur-[100px] left-[40%] top-[30%]"
              style={{
                background: 'radial-gradient(circle, rgba(230,225,200,0.5) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundSize: '256px 256px'
            }}
          />

          {/* SVG decorativo - Perfil de acero estructural animado */}
          <svg
            className="absolute bottom-12 left-12 w-28 h-28 opacity-[0.07] pointer-events-none z-0 hidden lg:block"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path
              d="M35,100 L35,20 L85,20"
              stroke="#15251b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="parana-line-anim"
            />
            <path
              d="M35,30 L35,38 M35,38 L85,38 M35,46 L35,54 M35,54 L85,54"
              stroke="#15251b"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="parana-line-anim"
              style={{ animationDelay: '1s' }}
            />
            <circle cx="35" cy="20" r="2" fill="#15251b" className="parana-line-anim" style={{ animationDelay: '1.4s' }} />
            <circle cx="85" cy="20" r="2" fill="#15251b" className="parana-line-anim" style={{ animationDelay: '1.4s' }} />
          </svg>

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            
            {/* Columna Editorial con parallax sutil + decoración */}
            <div
              ref={leftRef}
              onMouseMove={handleLeftMouseMove}
              onMouseLeave={handleLeftMouseLeave}
              className="relative"
            >
              {/* Gran marca de agua "2005" editorial */}
              <div className="absolute -top-8 -left-4 select-none pointer-events-none overflow-hidden">
                <Motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={heroVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-headline text-[10rem] sm:text-[14rem] lg:text-[18rem] font-black text-[#15251b]/[0.035] leading-[0.75] tracking-[-0.06em]"
                >
                  2005
                </Motion.span>
              </div>

              {/* Corchetes arquitectónicos esquina superior izquierda */}
              <div className="absolute -left-5 -top-3 w-10 h-10 pointer-events-none hidden sm:block">
                <Motion.div
                  initial={{ scaleX: 0 }}
                  animate={heroVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 w-8 h-px bg-[#15251b]/15 origin-left"
                />
                <Motion.div
                  initial={{ scaleY: 0 }}
                  animate={heroVisible ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 w-px h-8 bg-[#15251b]/15 origin-top"
                />
              </div>

              {/* Corchetes esquina inferior derecha */}
              <div className="absolute -right-5 -bottom-5 w-10 h-10 pointer-events-none hidden sm:block">
                <Motion.div
                  initial={{ scaleX: 0 }}
                  animate={heroVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 right-0 w-8 h-px bg-[#15251b]/15 origin-right"
                />
                <Motion.div
                  initial={{ scaleY: 0 }}
                  animate={heroVisible ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 right-0 w-px h-8 bg-[#15251b]/15 origin-bottom"
                />
              </div>

              <Motion.div
                style={{ x: leftX, y: leftY }}
                initial={{ opacity: 0, y: 30 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Eyebrow con línea animada */}
                <div className="flex items-center gap-3 mb-6">
                  <Motion.span
                    initial={{ scaleX: 0 }}
                    animate={heroVisible ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-8 bg-[#15251b]/45 origin-left"
                  />
                  <span className="text-[#15251b]/70 text-[0.65rem] sm:text-xs font-bold tracking-[0.3em] uppercase font-headline">
                    Experiencia local en Paraná y el Litoral
                  </span>
                </div>

                {/* H1 con stagger reveal por línea */}
                <h1 className="font-headline text-4xl sm:text-5xl lg:text-[4.2rem] font-bold text-[#15251b] leading-[1.05] tracking-[-0.04em] overflow-hidden">
                  <span className="block overflow-hidden">
                    <Motion.span
                      initial={{ y: '110%' }}
                      animate={heroVisible ? { y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      Steel Frame en{' '}
                      <span className="bg-gradient-to-r from-[#15251b] via-[#4d6c56] to-[#15251b] bg-clip-text text-transparent">
                        Paraná
                      </span>
                      :
                    </Motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <Motion.span
                      initial={{ y: '110%' }}
                      animate={heroVisible ? { y: 0 } : {}}
                      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      Habitar el Litoral
                    </Motion.span>
                  </span>
                </h1>

                {/* Línea de acento decorativa bajo el H1 */}
                <Motion.div
                  initial={{ scaleX: 0 }}
                  animate={heroVisible ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-gradient-to-r from-[#15251b]/25 via-[#4d6c56]/35 to-transparent origin-left mb-6 mt-4"
                />

                {/* Subtítulo */}
                <Motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-on-surface-variant text-base sm:text-lg leading-relaxed mb-4 font-light max-w-2xl"
                >
                  Desde 2005 desarrollamos proyectos residenciales y comerciales en Steel Frame. En esta página reunimos los criterios locales que conviene revisar antes de construir en Paraná y el litoral entrerriano.
                </Motion.p>

                {/* Presencia regional destacada */}
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center gap-1.5 text-[0.5rem] sm:text-[0.55rem] text-[#15251b]/35 font-bold tracking-[0.12em] uppercase font-headline mb-5"
                >
                  <span className="material-symbols-outlined text-[11px] text-[#15251b]/25" style={{ fontVariationSettings: "'FILL' 1" }}>near_me</span>
                  <span>Presencia regional</span>
                  <span className="w-1 h-1 rounded-full bg-[#15251b]/15" />
                  <span>Paraná</span>
                  <span className="w-1 h-1 rounded-full bg-[#15251b]/15" />
                  <span>Oro Verde</span>
                  <span className="w-1 h-1 rounded-full bg-[#15251b]/15" />
                  <span>Crespo</span>
                  <span className="w-1 h-1 rounded-full bg-[#15251b]/15" />
                  <span>Diamante</span>
                  <span className="w-1 h-1 rounded-full bg-[#15251b]/15" />
                  <span>Santa Fe</span>
                </Motion.div>

                {/* Stat pill flotante - Trayectoria local */}
                <Motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/70 backdrop-blur-sm border border-[#15251b]/10 rounded-full shadow-sm mb-8"
                >
                  <span className="material-symbols-outlined text-[#15251b]/60 text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[#15251b]/70 text-[0.6rem] font-bold tracking-[0.15em] font-headline uppercase whitespace-nowrap">
                    Desde 2005 · Paraná · Entre Ríos
                  </span>
                </Motion.div>

                {/* CTAs con hover mejorado */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#cotizar"
                    className="px-8 py-4 bg-[#15251b] text-white hover:bg-[#344a3c] hover:-translate-y-0.5 rounded-xl font-semibold text-xs tracking-widest transition-all duration-300 font-headline uppercase shadow-md hover:shadow-xl"
                  >
                    Cotizar mi Proyecto
                  </a>
                  <a
                    href="#ventajas"
                    className="px-8 py-4 border border-[#15251b]/20 hover:border-[#15251b] hover:-translate-y-0.5 text-[#15251b] hover:bg-[#15251b]/5 rounded-xl font-medium text-xs tracking-widest transition-all duration-300 font-headline uppercase"
                  >
                    Ver ventajas locales
                  </a>
                  <Link
                    to="/servicios"
                    className="px-8 py-4 text-[#15251b]/70 hover:text-[#15251b] font-medium text-xs tracking-widest transition-colors font-headline uppercase"
                  >
                    Conocer servicios
                  </Link>
                </div>
              </Motion.div>
            </div>

            {/* Interactive Editorial Mosaic con parallax */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <EditorialMosaic />
            </Motion.div>
          </div>

          {/* Indicador de scroll creativo */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-[#15251b]/30 text-[0.5rem] tracking-[0.25em] uppercase font-headline font-bold">Explorar</span>
            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="animate-bounce">
              <rect x="1" y="1" width="16" height="26" rx="8" stroke="#15251b" strokeOpacity="0.2" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="2" fill="#15251b" fillOpacity="0.25" />
            </svg>
          </Motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. HITOS — Local History (2005 & 2014)
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={hitosRef}
          className="relative py-24 px-6 lg:px-16 bg-[#fafaf9] text-on-surface"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-[#15251b]/70 uppercase font-headline">Trayectoria en Entre Ríos</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#15251b] leading-tight mt-3 mb-6">
                Una trayectoria iniciada en Paraná
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
                Estos hitos reúnen antecedentes de la práctica local y explican cómo se consolidó nuestro enfoque en Steel Frame e ingeniería de detalle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-[#15251b]/10 hidden md:block z-0" />
              
              {hitosParana.map((hito, i) => (
                <Motion.div
                  key={hito.ano}
                  initial={{ opacity: 0, y: 30 }}
                  animate={hitosVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 bg-white border border-[#15251b]/10 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#15251b] text-[#d4e7d8] flex items-center justify-center font-headline text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {hito.ano}
                  </div>
                  <h3 className="font-headline text-lg font-bold text-[#15251b] mb-3">
                    {hito.titulo}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                    {hito.desc}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. VENTAJAS — Geoclimatic benefits (SEO Core)
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={ventajasRef}
          id="ventajas"
          className="relative py-24 px-6 lg:px-16 bg-[#111e15] text-white"
        >
          {/* Subtle glowing orb */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: '35rem', height: '35rem',
                right: '5%', top: '10%',
                background: 'radial-gradient(circle, rgba(184,203,188,0.05) 0%, transparent 70%)',
                filter: 'blur(50px)'
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
              
              <Motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={ventajasVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:sticky lg:top-28"
              >
                <span className="text-xs font-bold tracking-[0.25em] text-[#b8cbbc]/70 uppercase font-headline">SEO Local & Adaptación</span>
                <h2 className="font-headline text-3xl sm:text-4xl font-bold leading-tight mt-3 mb-6">
                  Ventajas de Construir en Paraná y la Región del Litoral
                </h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  El entorno geográfico de Entre Ríos requiere estudiar suelo, fundaciones, humedad, orientación y envolvente antes de definir el sistema constructivo.
                </p>
                <div className="p-5 border border-[#b8cbbc]/15 rounded bg-white/[0.03] flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-2xl shrink-0">info</span>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    <strong>Evaluación higrotérmica:</strong> La composición de la envolvente debe verificarse según clima, uso y materiales para controlar riesgos de condensación.
                  </p>
                </div>
                <div className="p-5 border border-[#b8cbbc]/15 rounded bg-white/[0.03] flex gap-4 items-start mt-4">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-2xl shrink-0">globe</span>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    <strong>Experiencia regional:</strong> El material institucional destaca trabajos y atención en <strong>Paraná, Oro Verde, Crespo, Diamante y Santa Fe</strong>; la disponibilidad se confirma para cada proyecto.
                  </p>
                </div>
              </Motion.div>

              <div className="space-y-8">
                {ventajasGeoclimaticas.map((ventaja, i) => (
                  <Motion.div
                    key={ventaja.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={ventajasVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 border border-white/5 hover:border-[#b8cbbc]/20 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-fixed-dim">
                        <span className="material-symbols-outlined text-xl">{ventaja.icon}</span>
                      </div>
                      <h3 className="font-headline text-lg font-bold text-white">
                        {ventaja.title}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      {ventaja.desc}
                    </p>
                  </Motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. ANATOMÍA — Capas de Envolvente
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={muroRef}
          className="relative py-24 px-6 lg:px-16 bg-[#fafaf9] text-on-surface"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-[#15251b]/70 uppercase font-headline">Composición Arquitectónica</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#15251b] leading-tight mt-3 mb-6">
                Capas de la Envolvente
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed font-light">
                Conocé una composición conceptual de muro. Las capas y prestaciones definitivas se determinan en el proyecto técnico.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              
              {/* Dynamic Wall Visual Preview */}
              <div className="flex flex-col gap-3">
                <div className="relative h-64 sm:h-80 bg-white border border-[#15251b]/10 rounded-3xl overflow-hidden flex items-stretch shadow-md">
                  {capasMuroConceptual.map((capa, idx) => {
                    const isSelected = idx === activeCapamuro
                    
                    return (
                      <div
                        key={capa.nombre}
                        onClick={() => setActiveCapamuro(idx)}
                        className={`cursor-pointer transition-all duration-500 relative flex-1 flex items-center justify-center border-r border-[#fafaf9] select-none overflow-hidden ${
                          isSelected ? 'bg-[#15251b]/10 text-[#15251b] font-bold flex-[2.5]' : 'bg-[#e2e6e3] hover:bg-[#d5dad6] text-primary/60'
                        }`}
                      >
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#15251b]/15" />
                        <span className="font-headline text-xs sm:text-sm font-semibold whitespace-nowrap rotate-90 transform origin-center">
                          Capa {idx + 1}
                        </span>

                        {isSelected && (
                          <Motion.div 
                            layoutId="selectedBorderConceptual"
                            className="absolute inset-0 border-2 border-[#15251b] pointer-events-none rounded-sm" 
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="text-[0.65rem] text-on-surface-variant/70 text-right italic font-light">
                  *Hacé clic en las capas para conocer su función.
                </div>
              </div>

              {/* Layer Info card */}
              <Motion.div
                key={activeCapamuro}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#15251b]/10 rounded-2xl p-8 shadow-lg min-h-[260px] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-headline font-bold text-[#15251b] bg-[#15251b]/10 px-3 py-1 rounded-full w-fit mb-4">
                    CAPA: {activeCapamuro + 1} DE {capasMuroConceptual.length}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-[#15251b] mb-1">
                    {capasMuroConceptual[activeCapamuro].nombre}
                  </h3>
                  <div className="text-[10px] text-primary/50 uppercase tracking-widest font-mono mb-4">
                    {capasMuroConceptual[activeCapamuro].concept}
                  </div>
                  <p className="text-on-surface text-sm leading-relaxed font-light">
                    {capasMuroConceptual[activeCapamuro].descripcion}
                  </p>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t border-outline-variant/20">
                  <button
                    onClick={() => setActiveCapamuro(prev => Math.max(0, prev - 1))}
                    disabled={activeCapamuro === 0}
                    className="p-2 border border-[#15251b]/20 hover:border-[#15251b] disabled:opacity-40 disabled:hover:border-[#15251b]/20 rounded-xl transition-colors"
                    aria-label="Capa anterior"
                  >
                    <span className="material-symbols-outlined text-sm block">arrow_back</span>
                  </button>
                  <button
                    onClick={() => setActiveCapamuro(prev => Math.min(capasMuroConceptual.length - 1, prev + 1))}
                    disabled={activeCapamuro === capasMuroConceptual.length - 1}
                    className="p-2 border border-[#15251b]/20 hover:border-[#15251b] disabled:opacity-40 disabled:hover:border-[#15251b]/20 rounded-xl transition-colors"
                    aria-label="Capa siguiente"
                  >
                    <span className="material-symbols-outlined text-sm block">arrow_forward</span>
                  </button>
                </div>
              </Motion.div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. FAQS — Semantic FAQ
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={faqRef}
          className="relative py-24 px-6 lg:px-16 bg-[#111e15] text-white"
        >
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-[#b8cbbc]/70 uppercase font-headline">Preguntas Frecuentes</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold leading-tight mt-3 mb-6">
                Consultas de Obra en Paraná
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                Resolvemos las dudas recurrentes sobre el sistema de construcción en seco en la región.
              </p>
            </div>

            <div className="space-y-4">
              {faqsParana.map((faq, i) => (
                <FaqItem key={i} question={faq.pregunta} answer={faq.respuesta} index={i} isVisible={faqVisible} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. COTIZAR — Premium Quote Form
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={contactRef}
          id="cotizar"
          className="relative py-24 px-6 lg:px-16 bg-[#fafaf9] text-on-surface"
        >
          <div className="relative z-10 w-full max-w-3xl mx-auto bg-white border border-[#15251b]/10 rounded-3xl p-8 lg:p-12 shadow-lg">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-[0.25em] text-[#15251b]/70 uppercase font-headline">Tu Proyecto</span>
              <h2 className="font-headline text-3xl font-bold text-[#15251b] leading-tight mt-3 mb-4">
                Solicitá Presupuesto y Asesoramiento
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                Completá el formulario para que nos comuniquemos y analicemos tu idea de construcción en seco en Entre Ríos o Santa Fe.
              </p>
            </div>

            {formStatus === 'success' ? (
              <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4e7d8] text-[#15251b] flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">done</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#15251b] mb-2">¡Consulta Recibida!</h3>
                <p className="text-on-surface-variant text-sm max-w-md mx-auto leading-relaxed font-light">
                  Gracias por escribirnos. El equipo de WP revisará los datos para dar seguimiento a la consulta.
                </p>
              </Motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-headline font-bold text-[#15251b] uppercase mb-2">Nombre y Apellido *</label>
                    <input
                      type="text"
                      id="nombre"
                      required
                      className="w-full bg-[#fafaf9] border border-[#15251b]/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface font-light"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-xs font-headline font-bold text-[#15251b] uppercase mb-2">Teléfono de Contacto *</label>
                    <input
                      type="tel"
                      id="telefono"
                      required
                      className="w-full bg-[#fafaf9] border border-[#15251b]/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface font-light"
                      placeholder="Ej. +54 9 343 000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-headline font-bold text-[#15251b] uppercase mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-[#fafaf9] border border-[#15251b]/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface font-light"
                      placeholder="Ej. juan@correo.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="tipo" className="block text-xs font-headline font-bold text-[#15251b] uppercase mb-2">Tipo de Proyecto *</label>
                    <select
                      id="tipo"
                      required
                      value={selectedProjectType}
                      onChange={(e) => setSelectedProjectType(e.target.value)}
                      className="w-full bg-[#fafaf9] border border-[#15251b]/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface font-light"
                    >
                      <option value="" disabled>Seleccioná una opción</option>
                      <option value="vivienda">Vivienda Residencial</option>
                      <option value="ampliacion">Ampliación / Planta Alta</option>
                      <option value="wmu">Módulo WMU (Vivienda Modular)</option>
                      <option value="comercial">Comercial / Industrial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="ubicacion" className="block text-xs font-headline font-bold text-[#15251b] uppercase mb-2">Ubicación de la obra *</label>
                  <input
                    type="text"
                    id="ubicacion"
                    required
                    className="w-full bg-[#fafaf9] border border-[#15251b]/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface font-light"
                    placeholder="Ej. Paraná, Oro Verde, Crespo, Santa Fe, etc."
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-xs font-headline font-bold text-[#15251b] uppercase mb-2">Detalles de la Consulta</label>
                  <textarea
                    id="mensaje"
                    rows="4"
                    className="w-full bg-[#fafaf9] border border-[#15251b]/20 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface resize-none font-light"
                    placeholder="Escribí aquí tus dudas o detalles sobre las dimensiones o estado de tu proyecto..."
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="px-8 py-4 bg-[#15251b] text-white hover:bg-[#344a3c] rounded-xl font-semibold text-xs tracking-widest transition-all duration-300 font-headline uppercase disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? 'Enviando...' : 'Enviar Consulta'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

// Subcomponente Accordion Item para las FAQs
function FaqItem({ question, answer, index, isVisible }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/10 pb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 focus:outline-none group"
      >
        <span className="font-headline text-base sm:text-lg font-bold group-hover:text-primary-fixed-dim transition-colors">
          {question}
        </span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-fixed-dim' : 'text-white/40'}`}>
          keyboard_arrow_down
        </span>
      </button>
      
      <Motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-white/60 text-sm sm:text-base leading-relaxed pt-2 pb-4 font-light">
          {answer}
        </p>
      </Motion.div>
    </Motion.div>
  )
}
