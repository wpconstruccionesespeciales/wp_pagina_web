import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      setScrollY(window.scrollY)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1
  const progress = Math.min(scrollY / viewportHeight, 1.2)
  const imageTransform = `translate3d(0, ${scrollY * 0.18}px, 0) scale(${1.12 + progress * 0.06})`
  const gridTransform = `translate3d(0, ${scrollY * 0.09}px, 0) scale(${1.02 + progress * 0.03})`
  const overlayTransform = `translate3d(0, ${scrollY * 0.06}px, 0)`
  const accentTransform = `translate3d(0, ${scrollY * -0.05}px, 0)`
  const panelTransform = `translate3d(0, ${scrollY * 0.12}px, 0) rotate(-10deg)`
  const panelTransformAlt = `translate3d(0, ${scrollY * 0.08}px, 0) rotate(11deg)`

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax BG */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-[-6%] will-change-transform" style={{ transform: imageTransform }}>
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcC4RlmZk72IG2JI_z569dnckX4AFaCfPFmdySXUCjpnoKlwQ48ZmxT9wU_GdB4RNNb6HlbohyuPr9Tg3GG-DQBbqJ1mFqaqq3FfhFbSkDwzPCHKcOSM5mdyomCCgHZaQnjTlg7Kf0YZbo_26unTtsgfXDtaKNWx3o960gkwK5Mt0np4F4RZq4XKei22Vkw3CQIKjI8S07yhZsIZuPUFxjdLXCnDin9htT9Gx_XlXAG3lrOBCtEgOXEK_JVWcIEGfW9tMMF6XJLLQ"
              alt="luxury modern architectural villa with steel frame structure"
            />
          </div>
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 will-change-transform" style={{ transform: gridTransform }}>
            <div className="absolute inset-0 grid-pattern hero-grid-fade" />
          </div>
          <div className="absolute inset-0 will-change-transform" style={{ transform: overlayTransform }}>
            <div className="absolute inset-0 hero-noise opacity-60" />
          </div>
          <div className="absolute inset-0 will-change-transform" style={{ transform: accentTransform }}>
            <div className="hero-orb hero-orb-left" />
            <div className="hero-orb hero-orb-right" />
            <div className="hero-wire hero-wire-top" />
            <div className="hero-wire hero-wire-bottom" />
          </div>
          <div className="hero-blueprint hero-blueprint-left will-change-transform" style={{ transform: panelTransform }} />
          <div className="hero-blueprint hero-blueprint-right will-change-transform" style={{ transform: panelTransformAlt }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-24 hero-reveal">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="hero-badge-mark" />
            Innovación en Construcción
          </span>

          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-[-0.04em] mb-8">
            Especialistas en
            <br />
            <span className="text-primary-fixed-dim">Steel Frame</span>
            <br />
            a nivel nacional
          </h1>

          <p className="text-white/60 text-lg lg:text-xl max-w-lg mb-12 leading-relaxed">
            Redefiniendo la arquitectura moderna a través de la precisión técnica y la sostenibilidad estructural.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              Iniciar Proyecto
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white backdrop-blur-md px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
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
                value: 'Montaje de precisión',
                detail: 'Sistema modular',
                icon: 'grid_view',
              },
              {
                value: 'Obra rápida',
                detail: 'Ejecución limpia',
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
            <div className="hero-detail-card__value">60% menos tiempo de obra</div>
            <p className="hero-detail-card__copy">
              Montaje en seco, mayor control de ejecución y una obra más limpia desde el primer día.
            </p>
            <div className="hero-detail-card__stats">
              <div>
                <strong>4-6 meses</strong>
                <span>plazo promedio</span>
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
            { value: '100+', label: 'Proyectos Realizados', icon: 'domain' },
            { value: '21', label: 'Años de Experiencia', icon: 'calendar_month' },
            { value: '4-6', label: 'Meses Promedio de Obra', icon: 'bolt' },
            { value: '60%', label: 'Más Rápido vs Tradicional', icon: 'speed' },
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
