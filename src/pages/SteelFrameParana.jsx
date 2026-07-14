import { useEffect, useState, useRef } from 'react'
import { motion as Motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'

// ─── Data local conceptual de la empresa (Paraná) ───
const hitosParana = [
  {
    ano: '2005',
    titulo: 'Fundación en Paraná',
    desc: 'WP Construcciones Especiales nace en la ciudad de Paraná con la visión de introducir la construcción industrializada en seco de alta precisión en la región del litoral.'
  },
  {
    ano: '2014',
    titulo: 'Pioneros en Altura',
    desc: 'WP proyecta y construye el primer edificio de mediana altura realizado íntegramente en Steel Frame en Paraná, marcando un antes y un después en la región.'
  },
  {
    ano: '2026',
    titulo: '+20 Años de Trayectoria',
    desc: 'Consolidados como referentes en arquitectura residencial y comercial de alta gama en Entre Ríos y Santa Fe, aplicando ingeniería de detalle a cada proyecto.'
  }
]

const ventajasGeoclimaticas = [
  {
    icon: 'landscape',
    title: 'Estabilidad en Suelos Complejos',
    desc: 'Los terrenos y lomas de Paraná sufren expansiones mecánicas por los cambios de humedad de las arcillas locales. La mampostería tradicional rígida tiende a agrietarse. La flexibilidad controlada del Steel Frame absorbe los movimientos del terreno sin fisurarse, distribuyendo las cargas de forma óptima.'
  },
  {
    icon: 'water_drop',
    title: 'Comportamiento Higrotérmico Litoral',
    desc: 'La cercanía al Río Paraná genera un ambiente de alta humedad constante. Diseñamos envolventes multicapa con barreras activas de viento y agua que impiden la entrada de humedad exterior y permiten la evaporación interna, erradicando filtraciones y hongos.'
  },
  {
    icon: 'thermostat',
    title: 'Eficiencia ante el Clima Extremo',
    desc: 'El clima de Entre Ríos oscila entre veranos calurosos e inviernos muy húmedos y fríos. La estructura multicapa de muros y cubiertas actúa como un escudo de resistencia térmica superior, reduciendo significativamente la demanda energética para la climatización del hogar.'
  }
]

const capasMuroConceptual = [
  {
    nombre: '1. Revestimiento Exterior Continuo',
    descripcion: 'Una envolvente de protección continua contra la intemperie que proporciona aislamiento térmico exterior y un acabado de alta gama personalizable.',
    concept: 'Aislamiento Térmico y Estética Premium'
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
    respuesta: 'El Steel Frame está catalogado en Argentina como construcción tradicional. El proceso de aprobación ante los organismos municipales en Paraná y Entre Ríos es estándar. WP provee toda la documentación técnica de cálculo de ingeniería de detalle y planos de arquitectura requeridos para las presentaciones locales directas.'
  },
  {
    pregunta: '¿El Steel Frame es apto para terrenos inclinados o sobre las barrancas de Paraná?',
    respuesta: 'Es la solución ideal. Las barrancas de Paraná presentan desafíos de relieve y suelo. Al ser una estructura de acero considerablemente más liviana que la construcción tradicional en ladrillos, reduce la carga sobre los cimientos y muros de contención, disminuyendo la complejidad y costo de la obra civil.'
  },
  {
    pregunta: '¿Cuáles son los plazos de obra habituales para una vivienda en Paraná?',
    respuesta: 'Una de las grandes ventajas de la construcción en seco es la rapidez. Al eliminar los tiempos de fraguado húmedo de mezclas y pre-armar paneles estructurales, los plazos de entrega se reducen hasta en un 60% en comparación con los métodos tradicionales de construcción residencial.'
  }
]

// ─── Componente del Hero: Maqueta de Cristal 3D con Paralaje ───
function ArchitecturalModel() {
  const [hoveredConcept, setHoveredConcept] = useState(null)
  const containerRef = useRef(null)

  // Motion values de Framer Motion para paralaje 3D fluido sin forzar re-renders masivos
  const x = useMotionValue(200)
  const y = useMotionValue(200)

  // Mapeo del movimiento del cursor a rotación en grados
  const rotateX = useTransform(y, [0, 400], [12, -12])
  const rotateY = useTransform(x, [0, 400], [-12, 12])

  // Muelles suaves (springs) para amortiguar el movimiento
  const springX = useSpring(rotateY, { stiffness: 90, damping: 18 })
  const springY = useSpring(rotateX, { stiffness: 90, damping: 18 })

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalizar coordenadas respecto al centro del contenedor
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // Retornar suavemente al origen/centro
    x.set(200)
    y.set(200)
    setHoveredConcept(null)
  }

  const concepts = [
    {
      id: 0,
      title: 'Diseño y Confort Litoral',
      desc: 'Adaptación funcional y térmica a las condiciones específicas del entorno y el clima del litoral entrerriano.',
      x: 120, y: 150
    },
    {
      id: 1,
      title: 'Precisión de Ingeniería',
      desc: 'Cálculo de ingeniería de detalle con precisión milimétrica para una optimización total de materiales.',
      x: 220, y: 200
    },
    {
      id: 2,
      title: 'Arquitectura Sostenible',
      desc: 'Construcción limpia en seco con baja huella de carbono y máximo ahorro de energía certificado.',
      x: 160, y: 280
    }
  ]

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] lg:h-[480px] bg-white/20 border border-white/40 rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm select-none flex items-center justify-center cursor-pointer group"
    >
      {/* Retícula sutil CAD de fondo */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 24 0 L 0 0 0 24\' fill=\'none\' stroke=\'%23000\' stroke-width=\'0.75\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Contenedor 3D Rotativo con Framer Motion */}
      <Motion.div
        style={{
          rotateY: springX,
          rotateX: springY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[320px] h-[320px] flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Plano de suelo conceptual (Rombo) */}
          <polygon
            points="60,280 200,210 340,280 200,350"
            fill="rgba(21,37,27,0.03)"
            stroke="rgba(21,37,27,0.15)"
            strokeWidth="1"
          />

          {/* Líneas de cota arquitectónicas sutiles */}
          <line x1="200" y1="210" x2="200" y2="350" stroke="rgba(21,37,27,0.08)" strokeDasharray="3 3" />
          <line x1="60" y1="280" x2="340" y2="280" stroke="rgba(21,37,27,0.08)" strokeDasharray="3 3" />

          {/* Geometría 3D de la Casa Abstracta (Planos translúcidos de vidrio) */}
          
          {/* Muro posterior izquierdo */}
          <polygon
            points="100,160 200,110 200,250 100,300"
            fill="rgba(184,203,188,0.12)"
            stroke="rgba(21,37,27,0.2)"
            strokeWidth="0.75"
          />
          
          {/* Muro posterior derecho */}
          <polygon
            points="200,110 300,160 300,300 200,250"
            fill="rgba(184,203,188,0.08)"
            stroke="rgba(21,37,27,0.2)"
            strokeWidth="0.75"
          />

          {/* Plano de cubierta flotante (Techo) */}
          <polygon
            points="80,140 200,80 320,140 200,200"
            fill="rgba(21,37,27,0.04)"
            stroke="rgba(21,37,27,0.3)"
            strokeWidth="1"
          />

          {/* Columnas estructurales (Líneas finas de acero) */}
          <line x1="100" y1="160" x2="100" y2="300" stroke="rgba(21,37,27,0.4)" strokeWidth="1" />
          <line x1="200" y1="200" x2="200" y2="330" stroke="rgba(21,37,27,0.4)" strokeWidth="1" />
          <line x1="300" y1="160" x2="300" y2="300" stroke="rgba(21,37,27,0.4)" strokeWidth="1" />

          {/* Planos Interactivos (Hotspots Conceptuales) */}
          {concepts.map((concept) => {
            const isHovered = hoveredConcept === concept.id
            return (
              <g
                key={concept.id}
                onMouseEnter={() => setHoveredConcept(concept.id)}
                className="cursor-pointer"
              >
                {/* Plano flotante esmerilado */}
                <circle
                  cx={concept.x} cy={concept.y} r="14"
                  fill={isHovered ? "rgba(184,203,188,0.6)" : "rgba(21,37,27,0.05)"}
                  stroke="rgba(21,37,27,0.3)"
                  strokeWidth="0.75"
                  className="transition-colors duration-300"
                />
                {/* Punto central */}
                <circle
                  cx={concept.x} cy={concept.y} r="4"
                  fill="rgba(21,37,27,0.7)"
                  className="transition-transform duration-300"
                />
              </g>
            )
          })}
        </svg>
      </Motion.div>

      {/* Tooltip de Conceptos de la Maqueta */}
      {hoveredConcept !== null && (
        <Motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute left-6 right-6 bottom-6 bg-white/90 border border-white/80 rounded-2xl p-5 backdrop-blur-xl shadow-lg flex gap-4 items-center z-30"
        >
          <div className="w-10 h-10 rounded-xl bg-[#15251b]/10 flex items-center justify-center text-[#15251b] shrink-0">
            <span className="material-symbols-outlined text-lg">architecture</span>
          </div>
          <div>
            <h4 className="font-headline font-bold text-[#15251b] text-sm uppercase tracking-wide">
              {concepts[hoveredConcept].title}
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
              {concepts[hoveredConcept].desc}
            </p>
          </div>
        </Motion.div>
      )}
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
  const [muroRef, muroVisible] = useInView()
  const [faqRef, faqVisible] = useInView()
  const [contactRef, contactVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // JSON-LD local
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://wpconstrucciones.com/steel-frame-parana#business",
    "name": "WP Construcciones Especiales - Steel Frame Paraná",
    "url": "https://wpconstrucciones.com/steel-frame-parana",
    "telephone": "+5493435056918",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paraná",
      "addressRegion": "Entre Ríos",
      "postalCode": "3100",
      "addressCountry": "AR"
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
    "description": "Líderes en construcción en seco y steel frame de alta gama en Paraná, Entre Ríos. Proyectos modulares y a medida diseñados para el entorno local.",
    "knowsAbout": [
      "Steel Framing en Paraná",
      "Construcción en Seco Paraná",
      "Arquitectura Modular en Entre Ríos",
      "Ingeniería de Precisión"
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
        description="Líderes en construcción en seco, steel frame de alta gama y arquitectura modular en Paraná, Entre Ríos. Proyectos llave en mano con precisión milimétrica."
        keywords="steel frame parana, construccion en seco parana, casas steel frame parana, constructora parana, steel framing entre rios, wp construcciones"
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <NavBar />

      <main className="relative z-10 pt-16">
        
        {/* ═══════════════════════════════════════════════════════
            1. HERO — "El Espacio Arquitectónico Flotante" (Premium Light Liquid Hero)
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[92vh] flex items-center justify-center py-20 px-6 lg:px-16 overflow-hidden bg-[#fafaf9] text-on-surface"
        >
          {/* Fondo Líquido Difuso Interactuando (Auroras Claras) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Esfera Verde Salvia */}
            <div
              className="absolute rounded-full w-[35rem] h-[35rem] opacity-35 blur-[120px] transition-transform duration-1000"
              style={{
                left: '-10%', top: '10%',
                background: 'radial-gradient(circle, rgba(184,203,188,0.55) 0%, transparent 70%)',
              }}
            />
            {/* Esfera Crema/Dorado */}
            <div
              className="absolute rounded-full w-[40rem] h-[40rem] opacity-40 blur-[130px]"
              style={{
                right: '-5%', bottom: '-10%',
                background: 'radial-gradient(circle, rgba(212,231,216,0.6) 0%, transparent 70%)',
              }}
            />
            {/* Esfera Dorada sutil central */}
            <div
              className="absolute rounded-full w-[25rem] h-[25rem] opacity-25 blur-[100px] left-[40%] top-[30%]"
              style={{
                background: 'radial-gradient(circle, rgba(230,225,200,0.5) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundSize: '256px 256px'
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            
            {/* Glassmorphic Content Card */}
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/40 backdrop-blur-md border border-white/70 shadow-xl rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#15251b]/45" />
                <span className="text-[#15251b]/70 text-[0.65rem] sm:text-xs font-bold tracking-[0.3em] uppercase font-headline">
                  Arquitectura & Construcción de Vanguardia
                </span>
              </div>

              <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-[#15251b] leading-[1.08] tracking-[-0.03em] mb-6">
                Steel Frame en <span className="bg-gradient-to-r from-[#15251b] via-[#4d6c56] to-[#15251b] bg-clip-text text-transparent">Paraná</span>: El Futuro Sostenible
              </h1>

              <p className="text-on-surface-variant text-base sm:text-[1.05rem] leading-relaxed mb-8 font-light max-w-2xl">
                Desde 2005 diseñamos y edificamos residencias y estructuras a medida bajo el sistema de construcción en seco en Entre Ríos. Conectamos diseño creativo y precisión de ingeniería adaptada al clima de la región.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#cotizar"
                  className="px-6 py-3.5 bg-[#15251b] text-white hover:bg-[#344a3c] rounded-xl font-semibold text-xs tracking-wider transition-all duration-300 font-headline uppercase shadow-md hover:shadow-lg"
                >
                  Cotizar mi Proyecto
                </a>
                <a
                  href="#ventajas"
                  className="px-6 py-3.5 border border-[#15251b]/20 hover:border-[#15251b] text-[#15251b] hover:bg-[#15251b]/5 rounded-xl font-medium text-xs tracking-wider transition-all duration-300 font-headline uppercase"
                >
                  Ver ventajas técnicas
                </a>
              </div>
            </Motion.div>

            {/* Interactive 3D Crystal Architectural Model */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ArchitecturalModel />
            </Motion.div>
          </div>
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
                Pioneros en Construcción en Seco
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed font-light">
                Nuestra historia en Paraná avala el profesionalismo y el compromiso con cada obra que ejecutamos.
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
                  El entorno geográfico de Entre Ríos y los terrenos del litoral exigen un sistema constructivo eficiente que prevenga problemas habituales en edificaciones húmedas tradicionales.
                </p>
                <div className="p-5 border border-[#b8cbbc]/15 rounded bg-white/[0.03] flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-2xl shrink-0">info</span>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    <strong>Evaluación Higrotérmica:</strong> Todas nuestras envolventes son validadas contra condensaciones para responder a los altos índices de humedad del Río Paraná, asegurando el confort interior.
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
                Conocé la composición conceptual del muro que garantiza la aislación y el confort térmico de nuestras obras.
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
                  Gracias por escribirnos. Un especialista de WP se contactará en el transcurso de las próximas 24 horas hábiles.
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
