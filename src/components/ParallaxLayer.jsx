import { useEffect, useRef, useState } from 'react'

/**
 * ParallaxLayer — Componente de parallax acelerado por GPU de alto rendimiento
 * Compatible con celulares (touch) y desktop (60/120 fps).
 *
 * @param {string} src - Ruta de la imagen de fondo
 * @param {number} speed - Intensidad del efecto parallax (0.1 a 0.4 recomendado)
 * @param {string} alt - Texto alternativo para accesibilidad (opcional)
 * @param {object} overlayStyle - Estilos adicionales para la capa de gradiente u overlay
 * @param {React.ReactNode} children - Elementos adicionales dentro de la capa (gradientes, grillas)
 */
export default function ParallaxLayer({
  src,
  speed = 0.22,
  alt = '',
  overlayStyle = {},
  children = null
}) {
  const containerRef = useRef(null)
  const layerRef = useRef(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, desactivar parallax
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const container = containerRef.current
    const layer = layerRef.current
    if (!container || !layer) return

    let rafId = null
    let isVisible = false

    // intersection observer para computar scroll solo cuando la sección está en pantalla
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          onScroll()
        }
      },
      { root: null, rootMargin: '100px 0px 100px 0px', threshold: 0 }
    )

    const calculateOffset = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight

      // Posición relativa del centro del contenedor respecto al centro del viewport (-1 a 1)
      const containerCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2
      const relativeDist = (containerCenter - viewportCenter) / (windowHeight / 2 + rect.height / 2)

      // Rango de desplazamiento clamped en pixeles
      const maxTranslate = rect.height * speed
      const targetY = relativeDist * maxTranslate

      layer.style.transform = `translate3d(0, ${targetY.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (!isVisible) return
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(calculateOffset)
    }

    observer.observe(container)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Ejecutar cálculo inicial
    calculateOffset()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed])

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
      <div
        ref={layerRef}
        style={{
          position: 'absolute',
          top: '-20%',
          left: 0,
          right: 0,
          bottom: '-20%',
          width: '100%',
          height: '140%',
          willChange: 'transform',
          transform: 'translate3d(0, 0px, 0)',
          transition: 'transform 0.05s linear',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Capa opcional de overlay / gradiente */}
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
