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
      className="relative w-full aspect-[16/9] max-h-[700px] overflow-hidden select-none cursor-col-resize rounded-xl"
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
      <div className="absolute top-8 left-8 z-10 bg-black/60 backdrop-blur-md px-6 py-2 text-white font-headline font-bold uppercase tracking-widest text-sm pointer-events-none">
        Antes
      </div>
      <div className="absolute top-8 right-8 z-10 bg-primary/90 backdrop-blur-md px-6 py-2 text-white font-headline font-bold uppercase tracking-widest text-sm pointer-events-none">
        Después
      </div>

      {/* Info box ANTES */}
      <div className="absolute bottom-8 left-8 z-10 w-72 bg-black/50 backdrop-blur-lg p-6 border border-white/10 pointer-events-none">
        <p className="text-white text-sm font-body uppercase tracking-tighter opacity-80 mb-2">Estado original</p>
        <h3 className="text-white text-2xl font-headline font-bold">Traditional Masonry Warehouse</h3>
      </div>

      {/* Info box DESPUÉS */}
      <div className="absolute bottom-8 right-8 z-10 w-72 bg-primary/90 backdrop-blur-lg p-6 border border-white/5 pointer-events-none">
        <p className="text-white/70 text-sm font-body uppercase tracking-tighter mb-2">Transformación WP</p>
        <h3 className="text-white text-2xl font-headline font-bold">Steel-Frame Loft Conversion</h3>
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

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Nosotros | STEEL CORE - WP Construcciones Especiales"
  }, [])

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <NavBar />

      <main className="pt-20">

        {/* ══════════════════════════════════════════════
            PARTE 1 — Quiénes Somos
        ══════════════════════════════════════════════ */}

        {/* ── QUIÉNES SOMOS ── */}
        <section
          className="px-8 lg:px-16 py-24 md:py-32 max-w-screen-2xl mx-auto grid md:grid-cols-12 gap-12 items-center"
          ref={heroRef}
        >
          <div className={`md:col-span-7 animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              WP Construcciones Especiales
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8 text-primary font-headline">
              ¿Quiénes somos?
            </h1>
            <p className="text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed mb-10">
              En WP no solo construimos estructuras; ingeniamos el futuro de la arquitectura residencial
              y comercial de alta gama a través de soluciones de Steel Frame de precisión.
            </p>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-1 bg-primary flex-shrink-0" />
              <p className="text-on-surface-variant font-medium italic">
                Forjando excelencia desde el comienzo del nuevo milenio.
              </p>
            </div>
          </div>

          <div className={`md:col-span-5 relative animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
            <div className="aspect-square bg-surface-container-high rounded-xl overflow-hidden relative group">
              <img
                alt="Ingeniería estructural de precisión"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe3Ep1pD-Un-mWeiBNPRllD0MV-yNN3VRnbyPPpoo_MYHGsKoR4PYDsR0L2Lnktu5pg-54roY1Bc2xEI7SOsjQgRj_qme13pz43VMXxRH24aeQ0EwWEph6RCeSCOW3kjlwEmXw9Hg9tmTcZOdMjL49ofCe4xr1sYHCpVf0w8KpmVfLHzJFzqBFeBdvZUSUCRtiHc5Uy_YoNkPJLJlibY8cJiVYgonvxvUuAKxpS3nsBBDepIAXfAIhbrI0BG1TbzIPjzeXlNv-Y3w"
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
            {/* Badge icono */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-8 rounded-lg shadow-2xl">
              <span className="material-symbols-outlined text-5xl">architecture</span>
            </div>
          </div>
        </section>

        {/* ── NUESTRA HISTORIA — Timeline ── */}
        <section className="bg-surface-container-low py-24 px-8 lg:px-16" ref={historyRef}>
          <div className="max-w-5xl mx-auto">
            <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-8 animate-on-scroll ${historyVisible ? 'visible' : ''}`}>
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-6 font-headline">
                  Nuestra Historia
                </h2>
                <p className="text-lg text-secondary">
                  Un camino definido por la integridad estructural, evolucionando desde los cimientos
                  tradicionales hasta la vanguardia de la innovación en Steel Frame.
                </p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-8xl font-black text-outline/10 select-none font-headline">EST. 2004</span>
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
                  <div className="absolute left-[-2.25rem] md:left-[-3rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-surface ring-8 ring-primary/5" />
                  <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border-l-4 border-primary">
                    <h4 className="text-2xl font-bold mb-4 font-headline uppercase tracking-tight">Los Cimientos</h4>
                    <p className="text-on-surface-variant leading-relaxed">
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
                  <div className="absolute left-[-2.25rem] md:right-[-3.25rem] md:left-auto top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-surface ring-8 ring-primary/5" />
                  <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm md:border-r-4 border-primary text-left md:text-right">
                    <h4 className="text-2xl font-bold mb-4 font-headline uppercase tracking-tight">Pioneros Steel Frame</h4>
                    <p className="text-on-surface-variant leading-relaxed">
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
                  <div className="absolute left-[-2.25rem] md:left-[-3rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-surface ring-8 ring-primary/5" />
                  <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-sm border-l-4 border-primary">
                    <h4 className="text-2xl font-bold mb-4 font-headline uppercase tracking-tight">Ingeniería &amp; Soluciones</h4>
                    <p className="text-on-surface-variant leading-relaxed">
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

        {/* ── ANTES / DESPUÉS — Slider interactivo ── */}
        <section className="py-24 px-8 lg:px-16 overflow-hidden" ref={beforeAfterRef}>
          <div className="max-w-screen-2xl mx-auto">
            <div className={`text-center mb-16 animate-on-scroll ${beforeAfterVisible ? 'visible' : ''}`}>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 font-headline">
                Metamorfosis Estructural
              </h2>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Presenciá la precisión de WP. Transformamos estructuras obsoletas en obras maestras
                industriales usando nuestra metodología de Steel Frame.
              </p>
            </div>

            <div className={`animate-on-scroll ${beforeAfterVisible ? 'visible' : ''}`}>
              <BeforeAfterSlider />
            </div>

            {/* Stats debajo del slider */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '60%', label: 'Ejecución más rápida' },
                { value: '30%', label: 'Carga más ligera' },
                { value: 'CERO', label: 'Desperdicio de material' },
                { value: 'A-36', label: 'Grado de acero' },
              ].map(({ value, label }) => (
                <div key={label} className="p-6 bg-surface-container-low rounded-lg">
                  <p className="text-primary font-headline font-bold text-3xl mb-1">{value}</p>
                  <p className="text-secondary text-xs uppercase tracking-widest font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PARTE 2 — Proceso + Bento + CTA
        ══════════════════════════════════════════════ */}

        {/* ── TRAE TU PROYECTO ── */}
        <section className="py-32 bg-surface-container-low px-8 lg:px-16" ref={processRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-start">

              <div className={`md:w-1/3 animate-on-scroll ${processVisible ? 'visible' : ''}`}>
                <h2 className="font-headline text-4xl font-bold tracking-tighter text-primary mb-6">
                  Trae tu proyecto
                </h2>
                <div className="w-20 h-1 bg-primary mb-8" />
                <p className="font-body text-on-surface-variant leading-relaxed mb-8">
                  Nuestra metodología integra software de modelado avanzado con maquinaria de perfilado
                  (roll-forming) de última generación, eliminando el error humano y el desperdicio de obra.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: 'precision_manufacturing', title: 'Precisión Milimétrica', desc: 'Cada perfil es cortado y perforado por control numérico.' },
                    { icon: 'eco', title: 'Residuo Cero', desc: 'Construcción en seco optimizada para la sostenibilidad urbana.' },
                    { icon: 'humidity_low', title: 'Resistencia a Humedad', desc: 'Acero galvanizado tratado para durabilidad eterna.' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1">{icon}</span>
                      <div>
                        <h4 className="font-headline font-bold text-primary">{title}</h4>
                        <p className="text-sm text-on-surface-variant">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 animate-on-scroll ${processVisible ? 'visible' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZqT859Mtu8ZGD-BJQpSCCjEENWwFhOucU-5-GGaG4hYNlFlBS-9qmV00pO1mBA2TdMUIWqMZXIZV8mUKKrdwprSS_A3oa16r5wsFUlDxx4WZ2xsAWrwXtoL9qnHsb_CSaGKDwr0TbPIagsW4MnvDKW7h126XTXZVSnU7YVdPZOLkqVxKT4ENDXpfnFSIhqjoiJUKOcRYaII64_2M_3wqqGf26g5fb7_N9jtl-mXOfO_NgGlizJocEYHBq8AA6jlMeB7Erx1mJQQY"
                    alt="Maquinaria roll-forming"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="aspect-video overflow-hidden rounded-sm">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOAXrwlsgZefcaTSVmDG-0NknvHyPVT_D8PbUG_Rn8mFJupiLvFOWAwu2PKimVRhkOQ82pHtMKZoHEyc4XhNSUmaVkHVFD6LOVJ5HB4n5dnX0hOhhlph8BBYfhFXU5qLQ_HE4bccy5THJXVVqd0ZxgsfqX-jukYprf3Oed6EVveF0EPiWCnUuHUl-7XWfemstLPUMa3lLg_HLHPNsV9rA4eQrApNq6EmiRZgkSZnIZJT8owvSFxAgLJAl-kjJUcpEYHhhgf1ifk4o"
                      alt="Ensamblaje estructura"
                    />
                  </div>
                  <div className="bg-primary p-8 flex flex-col justify-end text-white">
                    <p className="font-headline text-3xl font-bold tracking-tighter mb-4 italic">
                      "La estructura es el alma de la arquitectura."
                    </p>
                    <span className="text-xs uppercase tracking-widest text-primary-fixed-dim">
                      V. Structural Engineering Team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VERSATILIDAD ESTRUCTURAL — Bento Grid ── */}
        <section className="py-32 bg-surface px-8 lg:px-16" ref={bentoRef}>
          <div className="max-w-screen-xl mx-auto">
            <div className={`mb-16 animate-on-scroll ${bentoVisible ? 'visible' : ''}`}>
              <h3 className="font-headline text-xs tracking-[0.3em] uppercase text-outline mb-4">
                Especializaciones
              </h3>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary">
                Versatilidad Estructural
              </h2>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px] animate-on-scroll ${bentoVisible ? 'visible' : ''}`}>
              <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-lg bg-surface-container-high">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALaPpD4Cq-TavG6F9qRrjLBmBcf90lzu0-lygAAklgy1EpY-wlSYcbpbVDQX1IYYUtO_qQM2pYEatFM0qXYowGI28CNxETRVtLAGQPZhOwxuBVj2pES1GF0jFhQtsDbptRaA4RjwS5oX_DCTc-dM1g8sMyw3xq_Wj-IIAnH1vcmDr0th456z4B-0XxtGRZUKWc4GihQQ7k72lRrYa5AD4WLhVP7GUOSOMggP-HSolpcRuIq3Cn59VwHy4fcSO8Jo7AGnJ0LcC9RWE"
                  alt="Edificios de mediana altura"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <h4 className="font-headline text-3xl font-bold text-white">Edificios de mediana altura</h4>
                  <p className="text-white/70 mt-2 max-w-md">Soluciones verticales con máxima eficiencia estructural y rapidez de montaje.</p>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-lg bg-primary-container">
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="material-symbols-outlined text-on-primary-container text-4xl">home_work</span>
                  <h4 className="font-headline text-xl font-bold text-primary">Viviendas unifamiliares</h4>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-lg border border-outline/10">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIz4wlWosI0hj3B49l5xgty4UYd0pwqHhlYlFAref3k06TSALs_8fo3ZhEjJBc4F1r3CvhJSww5ATRw2GJTVrkCApunf5vOnodNbveQmf7Hf_3dR-130TydkA2h_BtiDUhoRH6955G19g3x-zA7LwXWcRvp9CkX0"
                  alt="Industrial y comercial"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h4 className="font-headline text-xl font-bold text-primary">Industriales | Locales comerciales</h4>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-lg bg-surface-container-low">
                <div className="p-8 h-full flex flex-col">
                  <h4 className="font-headline text-2xl font-bold text-primary mb-4">Reformas y Ampliaciones</h4>
                  <p className="text-sm text-on-surface-variant flex-grow">
                    La ligereza del acero permite ampliar estructuras existentes sin comprometer la cimentación original.
                  </p>
                  <div className="mt-4 aspect-square rounded-sm overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdtCZWe9QEC61ovU1B7aieiNcwHpCNbk-sMZx23J41YvNqaW0VGSjmWIj7g01uJSvXOuHA5jrIIw_Vm7euO8kpe9tOMYHMiJHv99u5y31XqGK6SMrFezaxtQFUzFizmgqox-y1-NBD_oQZ6ObyTCDWKro8w0yEkXc_sd4B9VRQZikrBtBTzU5zk_ZBi7neyNfhOg39wZr-n-9xJKW6v4rfVFAO73ojCUrW1jelv6HGwOxpXtSGuohUuobohSto4E_Hs7WicLRLCl0"
                      alt="Reforma y ampliación"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-lg bg-secondary text-white">
                <div className="absolute inset-0 p-8 flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                  <h4 className="font-headline text-xl font-bold">Clínicas | Consultorios</h4>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-lg bg-surface-container-lowest border border-outline/10">
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                  <div>
                    <h4 className="font-headline text-xl font-bold text-primary">Estudios Acústicos</h4>
                    <p className="text-xs text-outline tracking-wider uppercase mt-1">High-end Soundproofing</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-3xl">surround_sound</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-primary text-white" ref={ctaRef}>
          <div className={`max-w-screen-xl mx-auto px-8 lg:px-16 text-center animate-on-scroll ${ctaVisible ? 'visible' : ''}`}>
            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic">
              Transforme su visión en una estructura de precisión.
            </h2>
            <p className="font-body text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Nuestros ingenieros están listos para analizar su proyecto y proporcionar una cotización técnica detallada.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a
                href="/#contact"
                className="w-full md:w-auto bg-white text-primary px-10 py-5 font-headline font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary-fixed transition-colors text-center"
              >
                Iniciar Proyecto
              </a>
              <a
                href="/#contact"
                className="font-headline text-sm uppercase tracking-widest border-b border-primary-fixed-dim pb-1 hover:text-primary-fixed-dim transition-colors"
              >
                Descargar Especificaciones Técnicas
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer showCTA={false} />
    </div>
  )
}
