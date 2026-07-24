import { useEffect, useRef, useState } from 'react'

/**
 * ParallaxLayer — Parallax acelerado por GPU.
 * Doble vía:
 *   • Vía CSS (animation-timeline: view())  → 0 main-thread, corre en compositor.
 *     Soportado en Chrome/Edge/Android modernos.
 *   • Vía JS (rAF + IntersectionObserver)   → fallback universal (Safari/iOS/legacy).
 *
 * @param {string} src           Ruta de la imagen de fondo
 * @param {number} speed         Intensidad (0.1–0.4 recomendado). Define cuánto
 *                               "excedente" se reserva arriba/abajo (buffer) y
 *                               el rango de translación. Las dos vías producen
 *                               el mismo resultado visual.
 * @param {string} alt           Texto alternativo (accesibilidad)
 * @param {string} loading       'lazy' (default) | 'eager'  — hint al navegador
 * @param {object} overlayStyle  Estilos extra para la capa overlay/gradiente
 * @param {React.ReactNode} children  Capas extra (gradients, grids, glows)
 */

const STYLE_ID = '__plx_layer_style__'
function injectStyle() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
@keyframes plx-y {
  from { transform: translate3d(0, var(--plx-t, 0), 0); }
  to   { transform: translate3d(0, calc(var(--plx-t, 0) * -1), 0); }
}
.plx-native {
  animation: plx-y linear both;
  animation-timeline: view();
  animation-range: cover;
}
@media (prefers-reduced-motion: reduce) {
  .plx-native { animation: none; }
}
`
  document.head.appendChild(style)
}

let _supports = null
function supportsScrollTimeline() {
  if (_supports !== null) return _supports
  if (typeof window === 'undefined' || !window.CSS || typeof CSS.supports !== 'function') {
    return (_supports = false)
  }
  try {
    _supports = CSS.supports('animation-timeline: view()')
  } catch {
    _supports = false
  }
  return _supports
}

const pct = (n) => `${(n * 100).toFixed(4)}%`

export default function ParallaxLayer({
  src,
  speed = 0.22,
  alt = '',
  loading = 'lazy',
  overlayStyle = {},
  children = null,
}) {
  const containerRef = useRef(null)
  const layerRef = useRef(null)

  const [native] = useState(() => {
    if (!supportsScrollTimeline()) return false
    injectStyle()
    return true
  })

  useEffect(() => {
    if (native) return

    const container = containerRef.current
    const layer = layerRef.current
    if (!container || !layer) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    let rafId = null
    let visible = false
    let running = true

    const calc = () => {
      rafId = null
      if (!running || !visible) return
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const containerCenter = rect.top + rect.height / 2
      const denom = vh / 2 + rect.height / 2
      const relativeDist = denom > 0 ? (containerCenter - vh / 2) / denom : 0
      const maxTranslate = rect.height * speed
      const y = relativeDist * maxTranslate
      layer.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
    }

    const schedule = () => {
      if (!visible || rafId !== null) return
      rafId = requestAnimationFrame(calc)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          layer.style.willChange = 'transform'
          schedule()
        } else {
          layer.style.willChange = 'auto'
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0 }
    )

    const onMq = (e) => {
      if (e.matches) {
        layer.style.transform = ''
        layer.style.willChange = 'auto'
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      } else {
        schedule()
      }
    }
    mq.addEventListener('change', onMq)

    io.observe(container)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    calc()

    return () => {
      running = false
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', onMq)
      if (rafId !== null) cancelAnimationFrame(rafId)
      layer.style.willChange = 'auto'
    }
  }, [speed, native])

  const buffer = pct(speed)
  const layerHeight = `calc(100% + ${pct(2 * speed)})`
  const tVar = pct(speed / (1 + 2 * speed))

  const layerStyle = {
    position: 'absolute',
    top: `-${buffer}`,
    left: 0,
    width: '100%',
    height: layerHeight,
    willChange: 'transform',
    ...(native
      ? { '--plx-t': tVar }
      : { transform: 'translate3d(0, 0, 0)' }),
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div ref={layerRef} className={native ? 'plx-native' : undefined} style={layerStyle}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Overlay / gradiente */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...overlayStyle,
        }}
      />

      {children}
    </div>
  )
}