import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import SEO from './SEO'
import NavBar from './NavBar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { WMU_INCLUDES } from '../data/wmu-modules'

/* ───────────────────────── tokens ───────────────────────── */
const G      = '#35C36B'
const G_DARK = '#106843'
const G_DEEP = '#09824b'
const HEAD   = '#173b2e'
const BODY_C = '#273f34'
const SOFT_C = '#20352c'
const BORDER = '#e6efe9'
const CARD   = '#ffffff'
const INK    = '#0e1a11'

const HEADING_F = '"Manrope", sans-serif'
const BODY_F    = '"Nunito Sans", sans-serif'

const WA = 'https://api.whatsapp.com/send/?phone=5493434056918&text&type=phone_number&app_absent=0'

/* ───────────────────────── hooks ───────────────────────── */
function useFadeIn(threshold = 0.12) {
  const ref = useRef(null)
  const [vis, setVis] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: Math.min(threshold, 0.05), rootMargin: '0px 0px -48px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, vis]
}

/* ─────────────────────── helpers ───────────────────────── */
function imgSrc(base, w) {
  if (base.startsWith('/')) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}format=${w}w`
}

function srcSet(base, widths) {
  if (base.startsWith('/')) return undefined
  return widths.map(w => `${imgSrc(base, w)} ${w}w`).join(', ')
}

/* ═════════════════════════════════════════════════════════════
   1 · HERO
   ═════════════════════════════════════════════════════════════ */
function HeroSection({ data }) {
  const [ref, vis] = useFadeIn(0.05)
  const [tab, setTab] = useState(0)
  const [modal, setModal] = useState(false)
  const hasTabs = data.renderTabs.length > 0
  const current = hasTabs ? data.renderTabs[tab] : { src: data.gallery[0].src, label: '' }
  const moduleName = data.module.name

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => { if (e.key === 'Escape') setModal(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [modal])

  return (
    <section ref={ref} id="wmucero" style={{
      position: 'relative', overflow: 'hidden',
      background: '#fbfdfb', color: INK,
      padding: 'clamp(104px, 10vw, 128px) 0 clamp(40px, 5vw, 64px)',
    }}>
      {/* decorative orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-8%', left: '-10%', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, ${G}1f, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-12%', right: '-8%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, #b8cbbc40, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .04, pointerEvents: 'none', background: 'repeating-linear-gradient(60deg, #106843 0 1px, transparent 1px 60px),repeating-linear-gradient(-60deg, #106843 0 1px, transparent 1px 60px)' }} />

      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        <div className="wc-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'center' }}>

          {/* LEFT — content */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: '#e8f5ee', color: G_DARK, fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: BODY_F, marginBottom: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: G }} />
              WMU · Arquitectura Modular
            </span>

            <h1 style={{ margin: 0, fontSize: 'clamp(30px, 4.6vw, 46px)', lineHeight: 1.05, color: HEAD, fontWeight: 800, fontFamily: HEADING_F, letterSpacing: '-.01em', textWrap: 'balance' }}>
              MÓDULO<br />
              <span style={{ color: G_DARK }}>{moduleName}</span>
            </h1>

            {/* contact card */}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactanos por WhatsApp"
              style={{
                marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 12, textDecoration: 'none',
                background: 'linear-gradient(135deg, #0e5a37 0%, #1f8e57 100%)',
                color: '#ecfff5', boxShadow: '0 10px 22px rgba(16,104,67,.20)',
                transition: 'transform .2s ease, box-shadow .25s ease',
              }}
              className="wc-contact-card"
            >
              <span className="material-symbols-outlined" aria-hidden="true" style={{ color: '#ecfff5', fontSize: 20 }}>sell</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', opacity: .9, fontFamily: BODY_F }}>HOY</span>
                <span style={{ fontSize: 'clamp(15px, 1.9vw, 18px)', fontWeight: 800, fontFamily: HEADING_F, letterSpacing: '.04em' }}>CONTÁCTANOS</span>
              </div>
              <span aria-hidden="true" style={{ width: 1, height: 18, background: 'rgba(236,255,245,.35)' }} />
              <span style={{ fontSize: 11, fontFamily: BODY_F, fontWeight: 500, opacity: .9 }}>Financiación disponible</span>
            </a>

            {/* features row */}
            <div className="wc-features" style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
              {data.module.features.map((f) => (
                <div key={f.label} style={{ padding: '14px 6px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ color: G_DARK, fontSize: 32 }}>{f.icon}</span>
                  <h4 style={{ margin: 0, color: SOFT_C, fontSize: 13, fontWeight: 600, fontFamily: BODY_F, letterSpacing: '.01em' }}>{f.label}</h4>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 16, maxWidth: '58ch', color: BODY_C, fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, fontFamily: BODY_F }}>
              {data.module.description}
            </p>

            <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="wc-btn-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chat</span>
                Hablar por WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>

          {/* RIGHT — render viewer */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(24px)', transition: 'opacity .8s ease .15s, transform .8s ease .15s' }}>
            <div className="wc-render-card" style={{
              position: 'relative', background: CARD, borderRadius: 18, padding: 14,
              boxShadow: '0 18px 48px rgba(15,31,21,.10), 0 2px 6px rgba(15,31,21,.05)',
              border: `1px solid ${BORDER}`,
            }}>
              {/* tabs — only when module has render variants */}
              {hasTabs && (
                <div role="tablist" style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {data.renderTabs.map((t, i) => {
                    const active = i === tab
                    return (
                      <button
                        key={t.label}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setTab(i)}
                        style={{
                          padding: '8px 14px', borderRadius: 999,
                          border: `1px solid ${active ? G_DARK : '#d0d8d3'}`,
                          background: active ? G_DARK : 'transparent',
                          color: active ? '#ecfff5' : SOFT_C,
                          fontFamily: BODY_F, fontSize: 12, fontWeight: 700, letterSpacing: '.04em',
                          cursor: 'pointer',
                          transition: 'background .2s, color .2s, border-color .2s, transform .2s',
                        }}
                      >{t.label}</button>
                    )
                  })}
                </div>
              )}

              {/* image */}
              <div
                onClick={() => setModal(true)}
                className="wc-render-frame"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModal(true) }}
                aria-label="Ver imagen ampliada"
                style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'zoom-in', aspectRatio: '16/9', background: '#f1f5f2' }}
              >
                {hasTabs ? (
                  <AnimatePresence mode="wait">
                    <Motion.img
                      key={current.src}
                      src={imgSrc(current.src, 1000)}
                      srcSet={srcSet(current.src, [500, 750, 1000, 1500])}
                      sizes="(max-width: 900px) 100vw, 600px"
                      alt={`Render módulo ${moduleName} — variante ${current.label}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </AnimatePresence>
                ) : (
                  <img
                    src={imgSrc(current.src, 1000)}
                    srcSet={srcSet(current.src, [500, 750, 1000, 1500])}
                    sizes="(max-width: 900px) 100vw, 600px"
                    alt={`Render módulo ${moduleName}`}
                    loading="eager"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,31,21,.18), transparent 30%)', pointerEvents: 'none' }} />
                <div aria-hidden="true" style={{ position: 'absolute', right: 12, bottom: 12, width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,.95)', display: 'grid', placeItems: 'center', boxShadow: '0 6px 16px rgba(0,0,0,.18)' }}>
                  <span className="material-symbols-outlined" style={{ color: G_DARK, fontSize: 20 }}>zoom_in</span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <a href="#galeria" className="wc-btn-dark">Ver galería</a>
                <a href="#ficha" className="wc-btn-dark">Ver ficha técnica</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modal && (
          <Motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModal(false)}
            role="dialog" aria-modal="true" aria-label="Imagen ampliada"
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8,18,12,.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 24, cursor: 'zoom-out' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setModal(false) }}
              aria-label="Cerrar"
              style={{ position: 'absolute', top: 22, right: 22, width: 44, height: 44, borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#f1f1f1', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>close</span>
            </button>
            <Motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              src={imgSrc(current.src, 2500)}
              alt="Imagen ampliada"
              style={{ maxWidth: 'min(94vw, 1400px)', maxHeight: 'min(90vh, 1100px)', width: '100%', height: 'auto', objectFit: 'contain', borderRadius: 10, boxShadow: '0 30px 80px rgba(0,0,0,.5)' }}
            />
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   2 · GALLERY
   ═════════════════════════════════════════════════════════════ */
function GallerySection({ data }) {
  const [ref, vis] = useFadeIn(0.05)
  const [active, setActive] = useState(null)
  const gallery = data.gallery

  const close = useCallback(() => setActive(null), [])
  const next  = useCallback(() => setActive((i) => (i === null ? null : (i + 1) % gallery.length)), [gallery.length])
  const prev  = useCallback(() => setActive((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)), [gallery.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [active, close, next, prev])

  const count = gallery.length
  const countWord = count === 1 ? 'vista' : 'vistas'

  return (
    <section ref={ref} id="galeria" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: .03, pointerEvents: 'none', background: 'radial-gradient(circle at 20% 30%, #106843 0%, transparent 50%),radial-gradient(circle at 80% 70%, #35C36B 0%, transparent 50%)' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'opacity .8s ease, transform .8s ease' }}>
          <span style={{ color: G_DARK, fontWeight: 700, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: BODY_F, display: 'inline-block', marginBottom: 12 }}>Galería</span>
          <h2 style={{ margin: 0, fontFamily: HEADING_F, fontWeight: 800, fontSize: 'clamp(28px, 4.6vw, 52px)', color: HEAD, lineHeight: 1.1, letterSpacing: '-.01em' }}>
            Conocé cada <span style={{ color: G_DARK }}>detalle</span>
          </h2>
          <p style={{ marginTop: 14, maxWidth: 560, marginInline: 'auto', color: BODY_C, fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, fontFamily: BODY_F }}>
            {count} {countWord} del módulo, desde el exterior y los ambientes interiores. Tocá una imagen para verla en grande.
          </p>
        </div>

        <div className="wc-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {gallery.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setActive(i)}
              aria-label={`Abrir imagen ${g.alt}`}
              className="wc-thumb"
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: 14, padding: 0, border: `1px solid ${BORDER}`,
                background: '#f1f5f2', cursor: 'zoom-in', aspectRatio: '4/3',
                boxShadow: '0 8px 24px rgba(15,31,21,.06)',
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
                transition: `opacity .7s ease ${.05 + i * .05}s, transform .7s ease ${.05 + i * .05}s, box-shadow .3s ease`,
              }}
            >
              <img
                src={imgSrc(g.src, 750)}
                srcSet={srcSet(g.src, [500, 750, 1000])}
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                alt={g.alt}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s ease' }}
                className="wc-thumb-img"
              />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,31,21,.32) 0%, transparent 50%)', opacity: 0, transition: 'opacity .35s ease' }} className="wc-thumb-fade" />
              <div aria-hidden="true" style={{ position: 'absolute', right: 10, bottom: 10, width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,.95)', display: 'grid', placeItems: 'center', opacity: 0, transform: 'translateY(6px)', transition: 'opacity .3s ease, transform .3s ease' }} className="wc-thumb-icon">
                <span className="material-symbols-outlined" style={{ color: G_DARK, fontSize: 18 }}>zoom_in</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active !== null && (
          <Motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog" aria-modal="true" aria-label="Galería de imágenes"
            onClick={close}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8,18,12,.94)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 'clamp(16px, 4vw, 56px)' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close() }}
              aria-label="Cerrar"
              style={{ position: 'absolute', top: 22, right: 22, width: 44, height: 44, borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#f1f1f1', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>close</span>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Imagen anterior"
              style={{ position: 'absolute', left: 'clamp(8px, 2vw, 28px)', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#f1f1f1', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>chevron_left</span>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Siguiente imagen"
              style={{ position: 'absolute', right: 'clamp(8px, 2vw, 28px)', top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: 999, border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#f1f1f1', cursor: 'pointer', display: 'grid', placeItems: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>chevron_right</span>
            </button>

            <Motion.img
              key={gallery[active].src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              src={imgSrc(gallery[active].src, 2500)}
              alt={gallery[active].alt}
              style={{ maxWidth: 'min(94vw, 1500px)', maxHeight: 'min(86vh, 1100px)', width: '100%', height: 'auto', objectFit: 'contain', borderRadius: 12, boxShadow: '0 30px 80px rgba(0,0,0,.5)' }}
            />

            <div aria-hidden="true" style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.6)', fontFamily: BODY_F, fontSize: 12, letterSpacing: '.12em' }}>
              {String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   3 · FICHA TÉCNICA
   ═════════════════════════════════════════════════════════════ */
function FichaSection({ data }) {
  const [ref, vis] = useFadeIn(0.05)
  return (
    <section ref={ref} id="ficha" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#fbfdfb', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '-6%', right: '-8%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, #b8cbbc4a, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div className="wc-ficha-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 'clamp(36px, 5vw, 80px)', alignItems: 'center' }}>

          {/* LEFT — content */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-20px)', transition: 'opacity .8s ease, transform .8s ease' }}>
            <span style={{ color: G_DARK, fontWeight: 700, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: BODY_F, display: 'inline-block', marginBottom: 14 }}>Ficha técnica</span>
            <h2 style={{ margin: 0, fontFamily: HEADING_F, fontWeight: 800, fontSize: 'clamp(28px, 4.6vw, 48px)', color: HEAD, lineHeight: 1.1, letterSpacing: '-.01em' }}>
              Ver ficha <span style={{ color: G_DARK }}>técnica</span>
            </h2>
            <p style={{ marginTop: 18, maxWidth: '52ch', color: BODY_C, fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.75, fontFamily: BODY_F }}>
              Analizá en profundidad este diseño. Descargá la ficha técnica para revisar el plano detallado, la superficie cubierta y todas sus posibilidades de expansión.
            </p>

            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={data.pdfUrl} target="_blank" rel="noopener noreferrer" className="wc-btn-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>description</span>
                Ficha Técnica (PDF)
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="wc-btn-ghost-dark">Hacer una consulta</a>
            </div>

            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, maxWidth: 460 }}>
              {data.fichaStats.map((it) => (
                <div key={it.k} style={{ padding: '14px 16px', borderRadius: 12, background: '#fff', border: `1px solid ${BORDER}` }}>
                  <div style={{ color: '#5a6e60', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: BODY_F }}>{it.k}</div>
                  <div style={{ color: INK, fontSize: 18, fontWeight: 800, fontFamily: HEADING_F, marginTop: 4 }}>{it.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floor plan */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(20px)', transition: 'opacity .8s ease .15s, transform .8s ease .15s' }}>
            <div style={{ position: 'relative', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 18, padding: 18, boxShadow: '0 20px 48px rgba(15,31,21,.10)' }}>
              <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 4, background: `linear-gradient(90deg, transparent, ${G}, transparent)`, borderTopLeftRadius: 18, borderTopRightRadius: 18 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: SOFT_C, fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: BODY_F }}>Plano · {data.module.name}</span>
                <span className="material-symbols-outlined" style={{ color: G_DARK, fontSize: 20 }}>architecture</span>
              </div>
              <img
                src={imgSrc(data.planoUrl, 1500)}
                srcSet={srcSet(data.planoUrl, [750, 1000, 1500])}
                sizes="(max-width: 900px) 100vw, 600px"
                alt={`Plano del proyecto modular ${data.module.name}`}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,.06)' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   4 · QUÉ INCLUYE
   ═════════════════════════════════════════════════════════════ */
function QueIncluyeSection() {
  const [ref, vis] = useFadeIn(0.05)
  return (
    <section ref={ref} id="que-incluye" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .04, pointerEvents: 'none', background: 'repeating-linear-gradient(45deg, #106843 0 1px, transparent 1px 36px),repeating-linear-gradient(-45deg, #106843 0 1px, transparent 1px 36px)' }} />

      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{ marginBottom: 'clamp(36px, 5vw, 56px)', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <span style={{ color: G_DEEP, fontWeight: 700, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: BODY_F, display: 'inline-block', marginBottom: 12 }}>Estándar llave en mano</span>
          <h2 style={{ margin: 0, fontFamily: HEADING_F, fontWeight: 800, fontSize: 'clamp(28px, 4.6vw, 48px)', color: HEAD, lineHeight: 1.1, letterSpacing: '-.01em' }}>
            ¿Qué <span style={{ color: G_DEEP }}>incluye</span>?
          </h2>
          <div style={{ marginTop: 14, width: 64, height: 3, background: G_DEEP, borderRadius: 4 }} />
        </div>

        <div className="wc-includes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(20px, 3vw, 48px)' }}>
          {WMU_INCLUDES.map((group, gi) => (
            <div
              key={group.title}
              style={{
                padding: 'clamp(20px, 2.6vw, 32px)', borderRadius: 16, background: '#fdfdfd',
                border: `1px solid ${BORDER}`,
                borderTop: `3px solid ${G_DEEP}`,
                boxShadow: '0 8px 24px rgba(15,31,21,.04)',
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
                transition: `opacity .7s ease ${.1 + gi * .1}s, transform .7s ease ${.1 + gi * .1}s`,
              }}
            >
              <h3 style={{ margin: 0, fontFamily: BODY_F, fontWeight: 700, fontSize: 'clamp(15px, 1.4vw, 18px)', color: '#0e1a11', letterSpacing: '.01em' }}>{group.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {group.items.map((item, ii) => (
                  <li key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#3a4a40', fontSize: 14, lineHeight: 1.6, fontFamily: BODY_F }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, marginTop: 3, width: 18, height: 18, borderRadius: '50%', background: '#e8f5ee', color: G_DEEP, display: 'grid', placeItems: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   5 · CTA
   ═════════════════════════════════════════════════════════════ */
function CtaSection({ data }) {
  const [ref, vis] = useFadeIn(0.1)
  const bgIndex = Math.min(data.ctaBgIndex ?? 3, data.gallery.length - 1)
  const bg = data.gallery[bgIndex]?.src
  return (
    <section ref={ref} style={{ padding: 'clamp(80px, 9vw, 120px) 0', position: 'relative', overflow: 'hidden', background: '#0e1a11' }}>
      {bg && (
        <img
          src={imgSrc(bg, 1500)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(.7) contrast(1.05) saturate(.95)' }}
        />
      )}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,31,21,.55) 0%, rgba(8,18,12,.82) 100%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .05, pointerEvents: 'none', background: 'repeating-linear-gradient(60deg, #fff 0 1px, transparent 1px 64px),repeating-linear-gradient(-60deg, #fff 0 1px, transparent 1px 64px)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '-12%', right: '-6%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(53,195,107,.18), transparent 70%)', filter: 'blur(36px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', textAlign: 'center', color: '#ecfff5', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'opacity .8s ease, transform .8s ease' }}>
        <span style={{ color: G, fontWeight: 700, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: BODY_F, display: 'inline-block', marginBottom: 14 }}>¿Listo para empezar?</span>
        <h2 style={{ margin: 0, fontFamily: HEADING_F, fontWeight: 800, fontSize: 'clamp(28px, 4.4vw, 48px)', lineHeight: 1.1, letterSpacing: '-.01em', textWrap: 'balance' }}>
          Construí tu {data.module.name} con nosotros.
        </h2>
        <p style={{ marginTop: 18, color: 'rgba(236,255,245,.82)', fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, fontFamily: BODY_F }}>
          Te acompañamos en cada paso: desde la elección del modelo hasta la entrega llave en mano.
        </p>
        <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="wc-btn-light">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chat</span>
            Hablar por WhatsApp
          </a>
          <a href={data.pdfUrl} target="_blank" rel="noopener noreferrer" className="wc-btn-ghost-light">Descargar ficha</a>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
   GLOBAL CSS
   ═════════════════════════════════════════════════════════════ */
const CSS = `
  html { scroll-behavior: smooth; }

  .wc-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 22px; border-radius: 12px;
    background: ${G_DARK}; color: #ecfff5;
    font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 14px;
    text-decoration: none; cursor: pointer; border: none;
    box-shadow: 0 10px 24px rgba(16,104,67,.20);
    transition: transform .2s ease, box-shadow .25s ease, background-color .2s ease;
  }
  .wc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 32px rgba(16,104,67,.30); background: #0e7a4d; }

  .wc-btn-dark {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 18px; border-radius: 12px;
    background: #0e1a11; color: #ecfff5;
    font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 14px;
    text-decoration: none; cursor: pointer; border: none;
    transition: transform .2s ease, background-color .2s ease;
  }
  .wc-btn-dark:hover { background: #1a2a20; transform: translateY(-1px); }

  .wc-btn-ghost-dark {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 22px; border-radius: 12px;
    background: transparent; color: #0e1a11;
    border: 1px solid #0e1a11;
    font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 14px;
    text-decoration: none; cursor: pointer;
    transition: background-color .2s ease, color .2s ease, border-color .2s ease;
  }
  .wc-btn-ghost-dark:hover { background: #0e1a11; color: #ecfff5; }

  .wc-btn-light {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 22px; border-radius: 12px;
    background: #ecfff5; color: #0e1a11;
    font-family: "Nunito Sans", sans-serif; font-weight: 800; font-size: 14px;
    text-decoration: none; cursor: pointer; border: none;
    transition: transform .2s ease, background-color .2s ease;
  }
  .wc-btn-light:hover { transform: translateY(-2px); background: #fff; }

  .wc-btn-ghost-light {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 22px; border-radius: 12px;
    background: transparent; color: #ecfff5;
    border: 1px solid rgba(236,255,245,.5);
    font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 14px;
    text-decoration: none; cursor: pointer;
    transition: background-color .2s ease, border-color .2s ease;
  }
  .wc-btn-ghost-light:hover { background: rgba(236,255,245,.08); border-color: rgba(236,255,245,.85); }

  .wc-contact-card:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(16,104,67,.30); }

  .wc-subnav {
    position: sticky; top: 80px; z-index: 35;
    display: flex; justify-content: center; gap: 6px;
    padding: 10px 16px;
    background: rgba(255,255,255,.88);
    border-block: 1px solid rgba(16,104,67,.10);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 10px 30px rgba(15,31,21,.05);
  }
  .wc-subnav a {
    padding: 9px 14px; border-radius: 10px;
    color: #3a5145; font-family: "Nunito Sans", sans-serif;
    font-size: 12px; font-weight: 800; text-decoration: none;
    transition: color .2s ease, background-color .2s ease, transform .15s ease;
  }
  .wc-subnav a:hover { color: ${G_DARK}; background: #e8f5ee; }
  .wc-subnav a:active { transform: scale(.97); }

  .wc-thumb:hover { box-shadow: 0 16px 40px rgba(15,31,21,.16) !important; }
  .wc-thumb:hover .wc-thumb-img { transform: scale(1.06); }
  .wc-thumb:hover .wc-thumb-fade { opacity: 1 !important; }
  .wc-thumb:hover .wc-thumb-icon { opacity: 1 !important; transform: translateY(0) !important; }

  @media (max-width: 980px) {
    .wc-hero-grid { grid-template-columns: 1fr !important; }
    .wc-ficha-grid { grid-template-columns: 1fr !important; }
    .wc-ficha-grid > :first-child { order: 2; }
    .wc-ficha-grid > :last-child { order: 1; }
  }
  @media (max-width: 768px) {
    .wc-features { grid-template-columns: repeat(2, 1fr) !important; }
    .wc-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .wc-includes-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .wc-gallery-grid { grid-template-columns: 1fr !important; }
    .wc-subnav { top: 72px; justify-content: flex-start; overflow-x: auto; }
    .wc-subnav a { white-space: nowrap; }
  }
`

/* ═════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════ */
export default function ModulePage({ data }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.module.name,
    "image": data.renderTabs && data.renderTabs.length > 0 
      ? `${window.location.origin}${data.renderTabs[0].src}`
      : (data.gallery && data.gallery.length > 0 ? `${window.location.origin}${data.gallery[0].src}` : ""),
    "description": data.module.description,
    "brand": {
      "@type": "Brand",
      "name": "WP Construcciones Especiales"
    },
    "category": "SingleFamilyResidence",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    }
  }

  return (
    <div className="font-body" style={{ background: '#ffffff', color: INK, fontFamily: BODY_F }}>
      <SEO 
        title={data.title}
        description={data.module.description}
        keywords={`wmu, ${data.module.name.toLowerCase()}, casa modular ${data.module.name.toLowerCase()}, steel frame modulo, construccion en seco argentina`}
        ogImage={data.renderTabs && data.renderTabs.length > 0 ? data.renderTabs[0].src : (data.gallery && data.gallery.length > 0 ? data.gallery[0].src : "")}
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
      <style>{CSS}</style>
      <NavBar />
      <main>
        <HeroSection    data={data} />
        <nav className="wc-subnav" aria-label={`Secciones de ${data.module.name}`}>
          <a href="#galeria">Galería</a>
          <a href="#ficha">Ficha técnica</a>
          <a href="#que-incluye">Qué incluye</a>
        </nav>
        <GallerySection data={data} />
        <FichaSection   data={data} />
        <QueIncluyeSection />
        <CtaSection     data={data} />
      </main>
      <Footer showCTA={false} />
      <WhatsAppButton />
    </div>
  )
}
