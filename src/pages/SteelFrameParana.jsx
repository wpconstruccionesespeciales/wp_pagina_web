import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'

// ─── Data local real de la empresa (Paraná) ───
const hitosParana = [
  {
    ano: '2005',
    titulo: 'Fundación en Paraná',
    desc: 'Nace WP Construcciones Especiales, introduciendo los estándares de construcción en seco en la región con la visión de industrializar la arquitectura.'
  },
  {
    ano: '2014',
    titulo: '1er Edificio Steel Frame de la Región',
    desc: 'Hito histórico: WP proyecta y construye el primer edificio de mediana altura realizado íntegramente en Steel Frame en Paraná, liderando la vanguardia del acero estructural en altura.'
  },
  {
    ano: '2026',
    titulo: '+20 Años de Trayectoria',
    desc: 'Consolidados como la constructora de referencia de alta gama en Entre Ríos y Santa Fe, con cientos de obras calculadas con precisión milimétrica.'
  }
]

const ventajasGeoclimaticas = [
  {
    icon: 'landscape',
    title: 'Suelos Arcillosos Expansivos',
    desc: 'Los terrenos de Paraná sufren contracciones y expansiones extremas por la humedad. La rigidez del ladrillo tradicional genera grietas constantes. El Steel Frame de WP aporta flexibilidad estructural y una óptima distribución de cargas sobre plateas de hormigón armado, absorbiendo tracciones sin fisurarse.'
  },
  {
    icon: 'water_drop',
    title: 'Humedad Fluvial del Litoral',
    desc: 'La cercanía al Río Paraná expone a las obras a una humedad ambiente permanente y a la capilaridad del suelo. Nuestro sistema de muro incluye doble barrera hidrófuga activa (de viento y agua) y terminación exterior tipo EIFS que detiene el agua exterior pero permite que el muro "respire", impidiendo hongos y humedad interna.'
  },
  {
    icon: 'thermostat',
    title: 'Eficiencia Térmica ante el Clima Extremo',
    desc: 'El clima entrerriano oscila entre veranos sofocantes e inviernos muy húmedos. La envolvente térmica multicapa de WP (acero + lana de vidrio o EPS en el núcleo + placas) ofrece un coeficiente R de aislamiento superior a la mampostería tradicional, disminuyendo hasta un 60% la demanda de gas y electricidad.'
  }
]

const capasMuro = [
  {
    nombre: '1. Acabado de Alta Gama (Sistema EIFS)',
    descripcion: 'Revestimiento exterior que proporciona aislamiento continuo térmico, resistencia a la intemperie y un acabado visual premium personalizable.',
    detalles: 'Base Coat elastomérica reforzada con malla de fibra de vidrio y terminación texturada acrílica.'
  },
  {
    nombre: '2. Placa de Aislamiento EPS',
    descripcion: 'Placa de poliestireno expandido de alta densidad que rompe el puente térmico desde el exterior.',
    detalles: 'Espesor variable de 30mm a 50mm según cálculo higrotérmico local.'
  },
  {
    nombre: '3. Barrera de Viento y Agua',
    descripcion: 'Membrana hidrófuga respirable que protege la estructura del ingreso de agua líquida y ráfagas de aire, permitiendo el escape del vapor interior.',
    detalles: 'Tecnología de membrana no tejida de alta performance, termosellada.'
  },
  {
    nombre: '4. Placa de rigidización (OSB)',
    descripcion: 'Paneles de virutas de madera orientada de alta resistencia mecánica que rigidizan la estructura frente a cargas horizontales de viento.',
    detalles: 'Espesor de 11.1mm a 15mm fijados con tornillos autorroscantes cincados.'
  },
  {
    nombre: '5. Perfilería de Acero Galvanizado',
    descripcion: 'El "alma de acero" de la edificación. Estructura portante de perfiles galvanizados pesados que resisten sismos y cargas estáticas.',
    detalles: 'Perfiles PGC y PGU de acero estructural grado 250 con recubrimiento de zinc Z275.'
  },
  {
    nombre: '6. Aislamiento termoacústico central',
    descripcion: 'Material de alta densidad que rellena el espacio entre perfiles, reduciendo la transmisión de calor y ruido entre ambientes.',
    detalles: 'Lana de vidrio con barrera de vapor o lana de roca mineral ignífuga de alta densidad.'
  },
  {
    nombre: '7. Placa de Yeso Interior',
    descripcion: 'Terminación interior lisa lista para pintar, que aporta resistencia al fuego y habitabilidad inmediata.',
    detalles: 'Placas estándar, resistentes a la humedad (verdes) o al fuego (rojas) según local.'
  }
]

const faqsParana = [
  {
    pregunta: '¿Cómo se gestiona el permiso de obra de Steel Frame en la Municipalidad de Paraná?',
    respuesta: 'El Steel Frame está catalogado oficialmente como construcción tradicional en Argentina. Por lo tanto, el proceso de aprobación en la Municipalidad de Paraná es estándar. Requiere la firma de un profesional matriculado, el plano de arquitectura y el plano de cálculo estructural de ingeniería de detalle. En WP elaboramos toda la ingeniería de precisión milimétrica necesaria para la presentación municipal directa.'
  },
  {
    pregunta: '¿El Steel Frame es apto para las barrancas y lomas de Paraná?',
    respuesta: 'Es el sistema ideal. Las barrancas de Paraná presentan desafíos de relieve y suelo con pendientes pronunciadas. Como el Steel Frame de WP es hasta un 70% más liviano que la mampostería tradicional, reduce drásticamente las cargas sobre las bases y muros de contención. Esto minimiza los costos en excavaciones profundas y cimentaciones de hormigón complejas.'
  },
  {
    pregunta: '¿Cuánto tiempo de construcción se ahorra en Paraná con este sistema?',
    respuesta: 'En promedio, una vivienda unifamiliar de Steel Frame se finaliza en un tercio del tiempo requerido por la construcción húmeda. Una obra residencial media de 120m² está lista para habitar en 5 a 6 meses. La ausencia de tiempos de fraguado de mezclas y el pre-armado de la estructura metálica en nuestro taller de Paraná agilizan el montaje drásticamente.'
  },
  {
    pregunta: '¿Cómo se comporta el sistema frente a los temporales y sudestadas del Río Paraná?',
    respuesta: 'Toda nuestra ingeniería estructural de detalle calcula la resistencia de los perfiles metálicos ante las presiones de viento dinámicas de la zona litoral de Entre Ríos. La fijación química al suelo y el anclaje mecánico pesado garantizan una resistencia superior a tormentas extremas, certificada por normas nacionales e internacionales.'
  }
]

export default function SteelFrameParana() {
  const [activeCapamuro, setActiveCapamuro] = useState(0)
  const [formStatus, setFormStatus] = useState('idle')
  const [selectedProjectType, setSelectedProjectType] = useState('')

  // Referencias para animaciones al hacer scroll
  const [heroRef, heroVisible] = useInView()
  const [hitosRef, hitosVisible] = useInView()
  const [ventajasRef, ventajasVisible] = useInView()
  const [muroRef, muroVisible] = useInView()
  const [faqRef, faqVisible] = useInView()
  const [contactRef, contactVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Marcado estructurado Schema JSON-LD local
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
    "description": "Líderes en construcción en seco y steel frame de alta gama en Paraná, Entre Ríos. Ingeniería estructural de precisión para resistir la humedad y la arcilla expansiva local.",
    "knowsAbout": [
      "Steel Framing en Paraná",
      "Construcción en Seco Paraná",
      "Arquitectura Modular en Entre Ríos",
      "Cálculo de Ingeniería de Detalle",
      "Plateas de Hormigón para Arcilla Expansiva"
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
        description="Líderes en construcción en seco, steel frame de alta gama y arquitectura modular en Paraná, Entre Ríos. Proyectos llave en mano con cálculo estructural de precisión."
        keywords="steel frame parana, construccion en seco parana, casas steel frame parana, constructora parana, steel framing entre rios, wp construcciones"
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <NavBar />

      <main className="relative z-10 pt-16">
        
        {/* ═══════════════════════════════════════════════════════
            1. HERO — "Plano Estructural" (Interactive / Animation)
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-[#070e0a] via-[#0d1611] to-[#09100b] text-white"
        >
          {/* SVG Structural grid drawing animation in background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(184,203,188,0.15)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Animated Blueprint CAD vectors */}
              <Motion.path
                d="M 50 150 L 350 150 L 350 450 L 50 450 Z M 50 250 L 350 250 M 200 150 L 200 450"
                fill="none"
                stroke="rgba(184,203,188,0.3)"
                strokeWidth="1"
                strokeDasharray="400"
                initial={{ strokeDashoffset: 400 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className="hidden md:block"
                style={{ transform: 'translate(10%, 10%) scale(1.2)' }}
              />
              <Motion.circle
                cx="200" cy="250" r="10"
                fill="none"
                stroke="#b8cbbc"
                strokeWidth="1.5"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 2, 1], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden md:block"
                style={{ transform: 'translate(10%, 10%) scale(1.2)' }}
              />
            </svg>
          </div>

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundSize: '256px 256px'
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary-fixed-dim/60" />
                <span className="text-primary-fixed-dim/70 text-[0.6rem] sm:text-xs font-bold tracking-[0.3em] uppercase font-headline">
                  Construcción de Alta Gama en Entre Ríos
                </span>
              </div>

              <h1 className="font-headline text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.05] tracking-[-0.03em] mb-6">
                Steel Frame en <span className="text-primary-fixed-dim bg-gradient-to-r from-primary-fixed-dim to-white bg-clip-text text-transparent">Paraná</span>: Ingeniería Sin Fisuras
              </h1>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-light">
                Desde 2005 diseñamos y calculamos estructuras con precisión milimétrica. Edificamos con acero galvanizado pesado de máxima durabilidad, adaptado al suelo arcilloso y la humedad fluvial entrerriana.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#cotizar"
                  className="px-6 py-3.5 bg-primary-fixed text-[#0f1f15] hover:bg-white rounded font-semibold text-sm tracking-wider transition-all duration-300 font-headline uppercase shadow-[0_4px_20px_rgba(184,203,188,0.15)] hover:shadow-none"
                >
                  Cotizar mi Proyecto
                </a>
                <a
                  href="#ventajas"
                  className="px-6 py-3.5 border border-white/20 hover:border-white text-white hover:bg-white/5 rounded font-medium text-sm tracking-wider transition-all duration-300 font-headline uppercase"
                >
                  Ver ventajas técnicas
                </a>
              </div>
            </Motion.div>

            {/* Floating UI Spec Panel */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="bg-[#111c15]/90 border border-primary-fixed-dim/20 rounded-xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex justify-between items-center border-b border-primary-fixed-dim/15 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse" />
                    <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary-fixed-dim">WP SYSTEM SPEC v2.0</span>
                  </div>
                  <span className="text-[0.65rem] text-white/40 tracking-wider">E. RÍOS, AR</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs py-1 border-b border-white/5">
                    <span className="text-white/55">Material Estructural</span>
                    <span className="font-semibold text-white/90">Acero Galvanizado pesado Z275</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-white/5">
                    <span className="text-white/55">Cálculo de Ingeniería</span>
                    <span className="font-semibold text-white/90">Precisión Milimétrica (CAD/BIM)</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-white/5">
                    <span className="text-white/55">Comportamiento en Arcillas</span>
                    <span className="font-semibold text-primary-fixed-dim">Flexibilidad estructural activa</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-white/5">
                    <span className="text-white/55">Aislamiento Térmico</span>
                    <span className="font-semibold text-white/90">Coeficiente R 4x vs Tradicional</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-white/55">Vida útil certificada</span>
                    <span className="font-semibold text-white/90">+100 años</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-primary-fixed-dim/15 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary-fixed/10 border border-primary-fixed-dim/20 flex items-center justify-center text-primary-fixed">
                    <span className="material-symbols-outlined text-lg">verified</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-headline font-bold text-white uppercase">Aptitud Técnica</h4>
                    <p className="text-[0.65rem] text-white/40">Certificado CAT nacional homologado</p>
                  </div>
                </div>
              </div>
            </Motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. HITOS — Local History (2005 & 2014)
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={hitosRef}
          className="relative py-24 px-6 lg:px-16 bg-background text-on-surface"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-primary/70 uppercase font-headline">Nuestra Historia en Paraná</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary leading-tight mt-3 mb-6">
                Pioneros de la Construcción en Seco en Entre Ríos
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Nuestra trayectoria avala cada decisión técnica que tomamos. Construimos hogares y obras comerciales con un método certificado que cambió el panorama arquitectónico de la región.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line */}
              <div className="absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-primary/10 hidden md:block z-0" />
              
              {hitosParana.map((hito, i) => (
                <Motion.div
                  key={hito.ano}
                  initial={{ opacity: 0, y: 30 }}
                  animate={hitosVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center font-headline text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {hito.ano}
                  </div>
                  <h3 className="font-headline text-lg font-bold text-primary mb-3">
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
          className="relative py-24 px-6 lg:px-16 bg-[#0c130f] text-white"
        >
          {/* Glowing orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: '30rem', height: '30rem',
                right: '5%', top: '10%',
                background: 'radial-gradient(circle, rgba(184,203,188,0.06) 0%, transparent 70%)',
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
                <span className="text-xs font-bold tracking-[0.25em] text-primary-fixed-dim/70 uppercase font-headline">SEO Técnico y Geografía Local</span>
                <h2 className="font-headline text-3xl sm:text-4xl font-bold leading-tight mt-3 mb-6">
                  Por qué construir en Steel Frame en Paraná y la región del Litoral
                </h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  El clima húmedo de Entre Ríos y los terrenos del ejido urbano de Paraná exigen una ingeniería adaptada. La construcción tradicional en húmedo suele acarrear problemas crónicos que el Steel Framing soluciona estructuralmente.
                </p>
                <div className="p-5 border border-primary-fixed-dim/15 rounded bg-primary-container/20 flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-2xl shrink-0">info</span>
                  <p className="text-xs text-white/70 leading-relaxed">
                    <strong>Ingeniería Higrotérmica:</strong> Todos nuestros paneles son calculados con programas de simulación térmica para evitar condensaciones internas, considerando las máximas de humedad relativa de Paraná (+85% en invierno).
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
                    className="p-8 border border-white/5 hover:border-primary-fixed-dim/20 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-fixed/10 border border-primary-fixed-dim/25 flex items-center justify-center text-primary-fixed-dim">
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
            4. ANATOMÍA — Dynamic Wall Layers
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={muroRef}
          className="relative py-24 px-6 lg:px-16 bg-background text-on-surface"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-primary/70 uppercase font-headline">Ingeniería de Alta Gama</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-primary leading-tight mt-3 mb-6">
                Anatomía de un Muro WP
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Hacé clic en cada capa para conocer la composición técnica real y la ingeniería multicapa que garantiza la hermeticidad y estabilidad estructural en cada obra.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              
              {/* Dynamic Wall Visual Preview */}
              <div className="flex flex-col gap-3">
                <div className="relative h-64 sm:h-80 bg-surface-container-high rounded-xl border border-outline-variant/30 overflow-hidden flex items-stretch">
                  {capasMuro.map((capa, idx) => {
                    const isSelected = idx === activeCapamuro
                    
                    return (
                      <div
                        key={capa.nombre}
                        onClick={() => setActiveCapamuro(idx)}
                        className={`cursor-pointer transition-all duration-500 relative flex-1 flex items-center justify-center border-r border-background select-none overflow-hidden ${
                          isSelected ? 'bg-primary-container text-primary-fixed font-bold flex-[2]' : 'bg-[#e2e6e3] hover:bg-[#d5dad6] text-primary/60'
                        }`}
                      >
                        {/* Interactive depth stripe visualization */}
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary/20" />
                        <span className="font-headline text-xs sm:text-sm font-semibold whitespace-nowrap rotate-90 transform origin-center">
                          Capa {idx + 1}
                        </span>

                        {isSelected && (
                          <Motion.div 
                            layoutId="selectedBorder"
                            className="absolute inset-0 border-2 border-primary-fixed-dim pointer-events-none" 
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="text-[0.65rem] text-on-surface-variant/70 text-right italic">
                  *Haz clic en las capas para navegar por la estructura interna.
                </div>
              </div>

              {/* Layer Info card */}
              <Motion.div
                key={activeCapamuro}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 shadow-lg min-h-[250px] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-headline font-bold text-primary-fixed-dim bg-primary-container px-3 py-1 rounded-full w-fit mb-4">
                    CAPA ACTIVA: {activeCapamuro + 1} DE {capasMuro.length}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-primary mb-3">
                    {capasMuro[activeCapamuro].nombre}
                  </h3>
                  <p className="text-on-surface text-sm sm:text-base leading-relaxed mb-4">
                    {capasMuro[activeCapamuro].descripcion}
                  </p>
                  <p className="text-on-surface-variant text-xs leading-relaxed border-l-2 border-primary/20 pl-4 py-1 italic bg-[#f3f6f4]">
                    <strong>Detalle Técnico:</strong> {capasMuro[activeCapamuro].detalles}
                  </p>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t border-outline-variant/20">
                  <button
                    onClick={() => setActiveCapamuro(prev => Math.max(0, prev - 1))}
                    disabled={activeCapamuro === 0}
                    className="p-2 border border-outline-variant/40 hover:border-primary disabled:opacity-40 disabled:hover:border-outline-variant/40 rounded transition-colors"
                    aria-label="Capa anterior"
                  >
                    <span className="material-symbols-outlined text-sm block">arrow_back</span>
                  </button>
                  <button
                    onClick={() => setActiveCapamuro(prev => Math.min(capasMuro.length - 1, prev + 1))}
                    disabled={activeCapamuro === capasMuro.length - 1}
                    className="p-2 border border-outline-variant/40 hover:border-primary disabled:opacity-40 disabled:hover:border-outline-variant/40 rounded transition-colors"
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
            5. FAQS — Semantic Local FAQ Schema
            ═══════════════════════════════════════════════════════ */}
        <section
          ref={faqRef}
          className="relative py-24 px-6 lg:px-16 bg-[#0a100c] text-white"
        >
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-primary-fixed-dim/70 uppercase font-headline">Preguntas Frecuentes</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-bold leading-tight mt-3 mb-6">
                Consultas de Obra en Paraná y Entre Ríos
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Despejamos las dudas habituales de quienes desean iniciar su obra de construcción en seco en la región.
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
          className="relative py-24 px-6 lg:px-16 bg-background text-on-surface"
        >
          <div className="relative z-10 w-full max-w-3xl mx-auto bg-surface-container-low border border-outline-variant/30 rounded-xl p-8 lg:p-12 shadow-xl">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-[0.25em] text-primary/70 uppercase font-headline">Tu Obra en Paraná</span>
              <h2 className="font-headline text-3xl font-bold text-primary leading-tight mt-3 mb-4">
                Solicitá Presupuesto y Asesoramiento Técnico
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Completá el formulario para que nuestro departamento de ingeniería analice los requerimientos de tu proyecto de Steel Frame en Entre Ríos o Santa Fe.
              </p>
            </div>

            {formStatus === 'success' ? (
              <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="material-symbols-outlined text-3xl">done</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">¡Consulta Recibida!</h3>
                <p className="text-on-surface-variant text-sm max-w-md mx-auto leading-relaxed">
                  Gracias por comunicarte con WP. Un especialista técnico de nuestro equipo en Paraná se contactará en las próximas 24 horas hábiles.
                </p>
              </Motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-xs font-headline font-bold text-primary uppercase mb-2">Nombre y Apellido *</label>
                    <input
                      type="text"
                      id="nombre"
                      required
                      className="w-full bg-surface border border-outline-variant/60 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-xs font-headline font-bold text-primary uppercase mb-2">Teléfono de Contacto *</label>
                    <input
                      type="tel"
                      id="telefono"
                      required
                      className="w-full bg-surface border border-outline-variant/60 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface"
                      placeholder="Ej. +54 9 343 000 0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs font-headline font-bold text-primary uppercase mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-surface border border-outline-variant/60 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface"
                      placeholder="Ej. juan@correo.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="tipo" className="block text-xs font-headline font-bold text-primary uppercase mb-2">Tipo de Proyecto *</label>
                    <select
                      id="tipo"
                      required
                      value={selectedProjectType}
                      onChange={(e) => setSelectedProjectType(e.target.value)}
                      className="w-full bg-surface border border-outline-variant/60 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface"
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
                  <label htmlFor="ubicacion" className="block text-xs font-headline font-bold text-primary uppercase mb-2">Ubicación de la obra *</label>
                  <input
                    type="text"
                    id="ubicacion"
                    required
                    className="w-full bg-surface border border-outline-variant/60 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface"
                    placeholder="Ej. Paraná, Oro Verde, San Benito, Crespo, Santa Fe, etc."
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-xs font-headline font-bold text-primary uppercase mb-2">Mensaje / Detalles del Proyecto</label>
                  <textarea
                    id="mensaje"
                    rows="4"
                    className="w-full bg-surface border border-outline-variant/60 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-on-surface resize-none"
                    placeholder="Contanos más sobre las dimensiones de la obra, si tenés planos o terreno..."
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="px-8 py-4 bg-primary text-white hover:bg-primary-container hover:text-primary-fixed rounded font-semibold text-xs tracking-widest transition-all duration-300 font-headline uppercase disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? 'Enviando...' : 'Enviar Solicitud'}
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
