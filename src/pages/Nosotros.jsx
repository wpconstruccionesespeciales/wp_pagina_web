import { useRef, useState, useCallback, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import useInView from '../hooks/useInView'

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
      className="relative w-full aspect-[16/9] max-h-[700px] overflow-hidden select-none cursor-col-resize rounded-3xl"
      onMouseDown={(e) => { e.preventDefault(); dragging.current = true; move(e.clientX) }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
    >
      {/* DESPUÉS — full size, clipped from left */}
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYo-F-iKmr869WS-J3bAAOkDStaqo9pfM9IiYh_JyVoZ4zQfo9izNQMBRpKIRAw8sgQsf--jLxXMcwFvRQxrgCaNO3D_m9v4oj536qm3yFnaYmTByuH4UzcaYpHc_g8bMFayohPg08gPWMIE09RYWuNs-c8H8jJoORIe8oupIaY2aZR66lhkygqbWGmjrgoAsOUcQo4F8hrOVL1LJ-zwCQrpfIcR-2EIv11S3uuIje6-Y_rRrjdkX7BfJbopKSnG5zgJ4iYF69a-4"
        alt="Resultado final Steel Frame"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* ANTES — full size, clipped from right */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdmEsohwOT5izQIIS1N4NVhnW7nxzyEv1pCinKXNMKHUelTts9kahLmz5MD7ElgcO2vDFYB5NSqGxrUX6SvcYdFsyNhMjcDJscBzwxDlZodYGhxeoCjULmyv1FdqK5Hy7KKQhogqS9fkUAy8EHWiYrKEofeBdMY-7rRWuTiSBP2veE_ghgojp82KQUq9z2OHcIsnHs9FV9Xhz9PEmOOTAQqSem1KzhPG4zMaLRsDaEUMkH2DSfNALV9kv_tcwMJasOut32da4Lzn8"
          alt="Estado original antes de obra"
          className="w-full h-full object-cover grayscale brightness-75"
          draggable={false}
        />
      </div>

      {/* Divisor */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-px h-full bg-white/80 mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-3xl">compare</span>
        </div>
      </div>

      {/* Labels fijos */}
      <div className="absolute top-8 left-8 z-10 bg-black/60 backdrop-blur-md px-6 py-2 text-white font-headline font-bold uppercase tracking-widest text-sm pointer-events-none rounded-full">
        Antes
      </div>
      <div className="absolute top-8 right-8 z-10 bg-primary/90 backdrop-blur-md px-6 py-2 text-white font-headline font-bold uppercase tracking-widest text-sm pointer-events-none rounded-full">
        Después
      </div>

      {/* Info box ANTES */}
      <div className="absolute bottom-8 left-8 z-10 w-72 bg-black/50 backdrop-blur-lg p-6 border border-white/10 pointer-events-none rounded-2xl">
        <p className="text-white text-sm font-body uppercase tracking-tighter opacity-80 mb-2">Estado original</p>
        <h3 className="text-white text-2xl font-headline font-bold">Traditional Masonry Warehouse</h3>
      </div>

      {/* Info box DESPUÉS */}
      <div className="absolute bottom-8 right-8 z-10 w-72 bg-primary/90 backdrop-blur-lg p-6 border border-white/5 pointer-events-none rounded-2xl">
        <p className="text-white/70 text-sm font-body uppercase tracking-tighter mb-2">Transformación WP</p>
        <h3 className="text-white text-2xl font-headline font-bold">Steel-Frame Loft Conversion</h3>
      </div>
    </div>
  )
}

const metaStats = [
  { value: '60%', label: 'Ejecución más rápida' },
  { value: '30%', label: 'Carga más ligera' },
  { value: 'CERO', label: 'Desperdicio de material' },
  { value: 'A-36', label: 'Grado de acero' },
]

const processFeatures = [
  { icon: 'precision_manufacturing', title: 'Precisión Milimétrica', desc: 'Cada perfil es cortado y perforado por control numérico.' },
  { icon: 'eco', title: 'Residuo Cero', desc: 'Construcción en seco optimizada para la sostenibilidad urbana.' },
  { icon: 'humidity_low', title: 'Resistencia a Humedad', desc: 'Acero galvanizado tratado para durabilidad eterna.' },
]

const bentoCards = [
  {
    span: 'md:col-span-8 md:row-span-2',
    type: 'image',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALaPpD4Cq-TavG6F9qRrjLBmBcf90lzu0-lygAAklgy1EpY-wlSYcbpbVDQX1IYYUtO_qQM2pYEatFM0qXYowGI28CNxETRVtLAGQPZhOwxuBVj2pES1GF0jFhQtsDbptRaA4RjwS5oX_DCTc-dM1g8sMyw3xq_Wj-IIAnH1vcmDr0th456z4B-0XxtGRZUKWc4GihQQ7k72lRrYa5AD4WLhVP7GUOSOMggP-HSolpcRuIq3Cn59VwHy4fcSO8Jo7AGnJ0LcC9RWE',
    title: 'Edificios de mediana altura',
    desc: 'Soluciones verticales con máxima eficiencia estructural y rapidez de montaje.',
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
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIz4wlWosI0hj3B49l5xgty4UYd0pwqHhlYlFAref3k06TSALs_8fo3ZhEjJBc4F1r3CvhJSww5ATRw2GJTVrkCApunf5vOnodNbveQmf7Hf_3dR-130TydkA2h_BtiDUhoRH6955G19g3x-zA7LwXWcRvp9CkX0',
    title: 'Industriales | Locales comerciales',
  },
  {
    span: 'md:col-span-4 md:row-span-2',
    type: 'reforma',
    title: 'Reformas y Ampliaciones',
    desc: 'La ligereza del acero permite ampliar estructuras existentes sin comprometer la cimentación original.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtCZWe9QEC61ovU1B7aieiNcwHpCNbk-sMZx23J41YvNqaW0VGSjmWIj7g01uJSvXOuHA5jrIIw_Vm7euO8kpe9tOMYHMiJHv99u5y31XqGK6SMrFezaxtQFUzFizmgqox-y1-NBD_oQZ6ObyTCDWKro8w0yEkXc_sd4B9VRQZikrBtBTzU5zk_ZBi7neyNfhOg39wZr-n-9xJKW6v4rfVFAO73ojCUrW1jelv6HGwOxpXtSGuohUuobohSto4E_Hs7WicLRLCl0',
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

/* ──────────────── PAGE ──────────────── */
export default function Nosotros() {
  const [heroRef, heroVisible] = useInView()
  const [historyRef, historyVisible] = useInView()
  const [beforeAfterRef, beforeAfterVisible] = useInView()
  const [processRef, processVisible] = useInView()
  const [bentoRef, bentoVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Nosotros | STEEL CORE - WP Construcciones Especiales'
  }, [])

  return (
    <div className="relative bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden">
      <NavBar />

      <main className="pt-20">

        {/* ═══════════════════════════════════════════════════════
            HERO — Quiénes Somos
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-32 px-6 lg:px-16 overflow-hidden bg-background" ref={heroRef}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tertiary-fixed/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 opacity-70 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.15] top-12 left-12 pointer-events-none scale-110" />
          <div className="bg-geo-corners bg-geo-corners-left opacity-[0.25] bottom-16 left-8 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className={`lg:col-span-7 animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">WP Construcciones Especiales</span>
                </div>
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6 text-primary">
                  ¿Quiénes somos?
                </h1>
                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-medium">
                  En WP no solo construimos estructuras; ingeniamos el futuro de la arquitectura residencial
                  y comercial de alta gama a través de soluciones de Steel Frame de precisión.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-primary/30" />
                  <p className="text-on-surface-variant/70 text-sm italic font-semibold">
                    Forjando excelencia desde el comienzo del nuevo milenio.
                  </p>
                </div>
              </div>

              <div className={`lg:col-span-5 relative animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
                <div className="aspect-square rounded-3xl overflow-hidden relative group border border-outline/10 shadow-xl shadow-primary/5">
                  <img
                    alt="Ingeniería estructural de precisión"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe3Ep1pD-Un-mWeiBNPRllD0MV-yNN3VRnbyPPpoo_MYHGsKoR4PYDsR0L2Lnktu5pg-54roY1Bc2xEI7SOsjQgRj_qme13pz43VMXxRH24aeQ0EwWEph6RCeSCOW3kjlwEmXw9Hg9tmTcZOdMjL49ofCe4xr1sYHCpVf0w8KpmVfLHzJFzqBFeBdvZUSUCRtiHc5Uy_YoNkPJLJlibY8cJiVYgonvxvUuAKxpS3nsBBDepIAXfAIhbrI0BG1TbzIPjzeXlNv-Y3w"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/30 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/30 rounded-br-3xl pointer-events-none" />
                </div>
                {/* Badge icono */}
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 lg:p-8 rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center border border-primary-fixed-dim/20">
                  <span className="material-symbols-outlined text-4xl lg:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            NUESTRA HISTORIA — Timeline
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={historyRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.04)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="bg-geo-dots bg-geo-dots-right opacity-[0.1] top-12 right-12 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
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
                <span className="text-8xl font-black text-outline/15 select-none font-headline">EST. 2004</span>
              </div>
            </div>

            {/* Timeline vertical */}
            <div className={`relative animate-on-scroll ${historyVisible ? 'visible' : ''}`}>
              {/* Línea central */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/50 -translate-x-1/2" />

              {/* Item 1 — 2004 */}
              <div className="relative grid md:grid-cols-2 gap-12 mb-24 items-center">
                <div className="hidden md:block text-right pr-12">
                  <h3 className="text-4xl font-bold text-primary mb-2 font-headline">2004</h3>
                  <p className="text-secondary uppercase tracking-widest text-sm font-bold">Los Cimientos</p>
                </div>
                <div className="pl-12 md:pl-12 relative">
                  <div className="absolute left-[-2.25rem] md:left-[-3rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-surface-container-low ring-8 ring-primary/5" />
                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border-l-4 border-primary hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-headline uppercase tracking-tight">Los Cimientos</h4>
                    <p className="text-on-surface-variant leading-relaxed font-medium">
                      Nuestra historia comienza a principios de siglo. Arrancamos como una firma boutique
                      de estructuras enfocada en la pureza del material. Esos primeros proyectos establecieron
                      nuestra reputación de calidad sin compromiso y precisión técnica.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 2 — HOY */}
              <div className="relative grid md:grid-cols-2 gap-12 mb-24 items-center">
                <div className="order-2 md:order-1 pr-0 md:pr-12 relative text-left md:text-right">
                  <div className="absolute left-[-2.25rem] md:right-[-3.25rem] md:left-auto top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-surface-container-low ring-8 ring-primary/5" />
                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm md:border-r-4 border-primary text-left md:text-right hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-headline uppercase tracking-tight">Pioneros Steel Frame</h4>
                    <p className="text-on-surface-variant leading-relaxed font-medium">
                      Nos convertimos en líderes del Steel Frame a nivel nacional, optimizando la eficiencia
                      estructural y la velocidad de obra sin sacrificar el alma arquitectónica del proyecto.
                      Más de 100 obras ejecutadas avalan nuestro camino.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2 hidden md:block pl-12">
                  <h3 className="text-4xl font-bold text-primary mb-2 font-headline">HOY</h3>
                  <p className="text-secondary uppercase tracking-widest text-sm font-bold">Modern Mastery</p>
                </div>
              </div>

              {/* Item 3 — FUTURO */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                <div className="hidden md:block text-right pr-12">
                  <h3 className="text-4xl font-bold text-primary mb-2 font-headline">FUTURO</h3>
                  <p className="text-secondary uppercase tracking-widest text-sm font-bold">The Vision</p>
                </div>
                <div className="pl-12 md:pl-12 relative">
                  <div className="absolute left-[-2.25rem] md:left-[-3rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-surface-container-low ring-8 ring-primary/5" />
                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border-l-4 border-primary hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500">
                    <h4 className="text-2xl font-bold mb-4 font-headline uppercase tracking-tight">Ingeniería &amp; Soluciones</h4>
                    <p className="text-on-surface-variant leading-relaxed font-medium">
                      Un compromiso con la ingeniería sostenible y circular. Nuestro futuro está definido
                      por tecnologías de acero inteligente y diseños net-zero que amplían los límites de lo
                      que el hábitat moderno puede alcanzar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ANTES / DESPUÉS
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={beforeAfterRef}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="bg-geo-dots bg-geo-dots-left opacity-[0.08] -top-12 left-10 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto">
            <div className={`text-center mb-16 animate-on-scroll ${beforeAfterVisible ? 'visible' : ''}`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Transformación</span>
                <div className="w-12 h-px bg-primary/40" />
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                Metamorfosis Estructural
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                Presenciá la precisión de WP. Transformamos estructuras obsoletas en obras maestras
                industriales usando nuestra metodología de Steel Frame.
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
                  className="group relative p-6 lg:p-8 rounded-3xl bg-white border border-outline/10 hover:border-primary-fixed-dim hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute -inset-10 bg-primary-fixed/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-75" />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/20 rounded-tl-xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/20 rounded-br-xl pointer-events-none" />
                  <p className="font-headline text-3xl lg:text-4xl font-black text-primary mb-1 relative z-10">{value}</p>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold relative z-10">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TRAE TU PROYECTO
        ═══════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={processRef}>
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
                  Nuestra metodología integra software de modelado avanzado con maquinaria de perfilado
                  (roll-forming) de última generación, eliminando el error humano y el desperdicio de obra.
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
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZqT859Mtu8ZGD-BJQpSCCjEENWwFhOucU-5-GGaG4hYNlFlBS-9qmV00pO1mBA2TdMUIWqMZXIZV8mUKKrdwprSS_A3oa16r5wsFUlDxx4WZ2xsAWrwXtoL9qnHsb_CSaGKDwr0TbPIagsW4MnvDKW7h126XTXZVSnU7YVdPZOLkqVxKT4ENDXpfnFSIhqjoiJUKOcRYaII64_2M_3wqqGf26g5fb7_N9jtl-mXOfO_NgGlizJocEYHBq8AA6jlMeB7Erx1mJQQY"
                    alt="Maquinaria roll-forming"
                  />
                </div>
                <div className="grid-rows-2 grid gap-4">
                  <div className="aspect-video overflow-hidden rounded-3xl">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOAXrwlsgZefcaTSVmDG-0NknvHyPVT_D8PbUG_Rn8mFJupiLvFOWAwu2PKimVRhkOQ82pHtMKZoHEyc4XhNSUmaVkHVFD6LOVJ5HB4n5dnX0hOhhlph8BBYfhFXU5qLQ_HE4bccy5THJXVVqd0ZxgsfqX-jukYprf3Oed6EVveF0EPiWCnUuHUl-7XWfemstLPUMa3lLg_HLHPNsV9rA4eQrApNq6EmiRZgkSZnIZJT8owvSFxAgLJAl-kjJUcpEYHhhgf1ifk4o"
                      alt="Ensamblaje estructura"
                    />
                  </div>
                  <div className="bg-primary p-8 flex flex-col justify-end text-white rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <p className="font-headline text-2xl lg:text-3xl font-bold tracking-tighter mb-3 italic relative z-10">
                      "La estructura es el alma de la arquitectura."
                    </p>
                    <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-bold relative z-10">
                      V. Structural Engineering Team
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
        <section className="relative py-28 px-6 lg:px-16 overflow-hidden bg-background" ref={bentoRef}>
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
                <div className={`${bentoCards[3].span} group relative overflow-hidden rounded-3xl bg-white border border-outline/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}>
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
        <section className="relative py-28 px-6 lg:px-16 overflow-hidden bg-gradient-to-br from-surface-container-low via-[#eaf2ed] to-surface-container-low" ref={ctaRef}>
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
              Transforme su visión<br /><span className="text-[#3a7a4a]">en una estructura de precisión.</span>
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-semibold">
              Nuestros ingenieros están listos para analizar su proyecto y proporcionar una cotización técnica detallada.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href="/#contact"
                className="group flex items-center gap-3 bg-primary hover:bg-[#203728] text-white px-10 py-5 rounded-xl font-headline font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <span>Iniciar Proyecto</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
              </a>
              <a
                href="/#contact"
                className="group flex items-center gap-2 text-primary/70 hover:text-primary text-sm font-bold transition-colors py-5 px-4"
              >
                <span>Descargar Especificaciones Técnicas</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform duration-300">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer showCTA={false} />
    </div>
  )
}
