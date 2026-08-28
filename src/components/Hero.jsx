import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config/site'

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const overlayRef = useRef(null)
  const accentRef = useRef(null)
  const panelLeftRef = useRef(null)
  const panelRightRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    let ticking = false

    const update = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight || 1
      const progress = Math.min(scrollY / vh, 1.2)
      if (gridRef.current) gridRef.current.style.transform = `translate3d(0, ${scrollY * 0.09}px, 0) scale(${1.02 + progress * 0.03})`
      if (overlayRef.current) overlayRef.current.style.transform = `translate3d(0, ${scrollY * 0.06}px, 0)`
      if (accentRef.current) accentRef.current.style.transform = `translate3d(0, ${scrollY * -0.05}px, 0)`
      if (panelLeftRef.current) panelLeftRef.current.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0) rotate(-10deg)`
      if (panelRightRef.current) panelRightRef.current.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0) rotate(11deg)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    if (!prefersReducedMotion) {
      update()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    // ——— Robust autoplay for Android / mobile ———
    // Problema anterior: IntersectionObserver pausaba el video cuando el hero
    // salía del viewport. En Android Chrome el observer se dispara de forma
    // agresiva (address-bar resize, ahorro de batería) y el video quedaba pausado.
    // Además Android exige muted + playsInline + play() vía JS con reintentos.
    const video = videoRef.current
    if (!video) {
      return () => window.removeEventListener('scroll', onScroll)
    }

    if (prefersReducedMotion) {
      video.pause()
      return () => window.removeEventListener('scroll', onScroll)
    }

    // Forzar atributos críticos vía JS (algunos Android ignoran el atributo JSX)
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    // @ts-ignore — webkit / x5 attrs para iOS / Android WeChat
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('x5-playsinline', '')
    video.setAttribute('x5-video-player-type', 'h5')
    video.setAttribute('x5-video-player-fullscreen', 'false')

    let isCleaningUp = false

    const tryPlay = () => {
      if (isCleaningUp || prefersReducedMotion) return
      if (document.visibilityState !== 'visible') return
      // Re-afirmar muted antes de cada intento (Android lo resetea en algunos casos)
      video.muted = true
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    // Intento inmediato + cuando metadata/canplay estén listos
    tryPlay()
    const onLoadedData = () => tryPlay()
    const onCanPlay = () => tryPlay()

    // Si Android pausó el video por ahorro de batería / tab oculta, reanudar
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    const onPageShow = () => tryPlay()
    const onFocus = () => tryPlay()
    // Primer gesto del usuario desbloquea autoplay bloqueado por política
    const onFirstInteraction = () => {
      tryPlay()
      window.removeEventListener('touchend', onFirstInteraction)
      window.removeEventListener('click', onFirstInteraction)
    }
    // Si algo externo pausó el video (Data Saver, low-power), reanudar si seguimos visibles
    const onPause = () => {
      if (isCleaningUp || prefersReducedMotion) return
      if (document.visibilityState !== 'visible') return
      // pequeño delay para no pelear con pause intencional del cleanup
      window.setTimeout(tryPlay, 300)
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('pause', onPause)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('focus', onFocus)
    window.addEventListener('touchend', onFirstInteraction, { passive: true })
    window.addEventListener('click', onFirstInteraction)

    return () => {
      isCleaningUp = true
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('pause', onPause)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('touchend', onFirstInteraction)
      window.removeEventListener('click', onFirstInteraction)
    }
  }, [prefersReducedMotion])

  return (
    <>
      <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video BG (estático, sin parallax) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            className={`${prefersReducedMotion ? '' : 'hero-video-kenburns'} absolute inset-0 w-full h-full object-cover`}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline=""
            x5-playsinline=""
            x5-video-player-type="h5"
            x5-video-player-fullscreen="false"
            preload="auto"
            poster="/wp/Secuencia%2001_1.jpg"
            aria-hidden="true"
          >
            <source src="/wp/Secuencia%2001_1.webm" type="video/webm" />
            <source src="/wp/Secuencia%2001_1.mp4" type="video/mp4" />
          </video>
        </div>
          <div className="absolute inset-0 hero-gradient" />
          <div ref={gridRef} className="absolute inset-0 will-change-transform">
            <div className="absolute inset-0 grid-pattern hero-grid-fade" />
          </div>
          <div ref={overlayRef} className="absolute inset-0 will-change-transform">
            <div className="absolute inset-0 hero-noise opacity-60" />
          </div>
          <div ref={accentRef} className="absolute inset-0 will-change-transform">
            <div className="hero-orb hero-orb-left" />
            <div className="hero-orb hero-orb-right" />
            <div className="hero-wire hero-wire-top" />
            <div className="hero-wire hero-wire-bottom" />
          </div>
          <div ref={panelLeftRef} className="hero-blueprint hero-blueprint-left will-change-transform" />
          <div ref={panelRightRef} className="hero-blueprint hero-blueprint-right will-change-transform" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-24 hero-reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="hero-badge-mark" />
            Arquitectura, ingeniería y construcción
          </span>

          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-[-0.04em] mb-8">
            Especialistas en
            <br />
            <span className="text-primary-fixed-dim">Steel Frame</span>
            <br />
            desde Paraná
          </h1>

          <p className="text-white/60 text-lg lg:text-xl max-w-lg mb-12 leading-relaxed">
            Integramos diseño, cálculo, fabricación y montaje para desarrollar cada proyecto según su uso y emplazamiento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappUrl('Hola, quiero iniciar un proyecto de construcción.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 transition-all duration-300"
            >
              Iniciar Proyecto
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white backdrop-blur-md px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-white/30 active:scale-[0.97] transition-all duration-300"
            >
              Nuestros Servicios
            </a>
          </div>

          <div className="hero-highlights mt-12 max-w-4xl">
            {[
              {
                value: 'Eficiencia térmica',
                detail: 'Rendimiento energético',
                icon: 'mode_heat',
              },
              {
                value: 'Montaje coordinado',
                detail: 'Sistema modular',
                icon: 'grid_view',
              },
              {
                value: 'Construcción en seco',
                detail: 'Secuencia planificada',
                icon: 'construction',
              },
            ].map(({ value, detail, icon }) => (
              <div key={value} className="hero-highlight-card">
                <div className="hero-highlight-icon">
                  <span className="material-symbols-outlined text-[18px] text-primary-fixed">{icon}</span>
                </div>
                <div>
                  <div className="hero-highlight-title">{value}</div>
                  <div className="hero-highlight-detail">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 top-32 z-10 hidden xl:block">
          <div className="hero-detail-card">
            <div className="hero-detail-card__eyebrow">
              <span className="hero-badge-mark hero-badge-mark--small" />
              Ventajas del sistema
            </div>
            <div className="hero-detail-card__value">Montaje sin tiempos de fraguado</div>
            <p className="hero-detail-card__copy">
              Montaje en seco, mayor control de ejecución y una obra más limpia desde el primer día.
            </p>
            <div className="hero-detail-card__stats">
              <div>
                <strong>Por proyecto</strong>
                <span>plazo estimado</span>
              </div>
              <div>
                <strong>Menos residuos</strong>
                <span>proceso más ordenado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
          <span className="text-white/30 text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {[
            { value: 'Steel Frame', label: 'Sistema Constructivo', icon: 'domain' },
            { value: 'Desde 2005', label: 'Trayectoria Técnica', icon: 'calendar_month' },
            { value: 'En seco', label: 'Secuencia de Montaje', icon: 'bolt' },
            { value: 'CNC', label: 'Perfilado Coordinado', icon: 'speed' },
          ].map(({ value, label, icon }) => (
            <div key={label} className="text-center py-8 lg:py-10 px-4 group hover:bg-white/5 transition-colors duration-300">
              <span className="material-symbols-outlined text-primary-fixed-dim text-xl mb-2 block opacity-60">{icon}</span>
              <div className="text-2xl lg:text-3xl font-black font-headline text-white mb-1">{value}</div>
              <div className="text-xs text-white/40 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
