import { useEffect, useState, useRef } from 'react'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import wpWhite from '../assets/wpblanco.webp'
import { BUSINESS, whatsappUrl } from '../config/site'

/* ── tokens ── */
const G     = '#3BB77E' // Moss Green (organic, elegant)
const BG    = '#0A0F0D' // Deep Pine Slate
const TXT   = '#F3F5F4'
const SOFT  = '#B7C0BB'
const SAND  = '#E6DED4' // Cedar / Warm Sand highlight
const STEEL = '#2F363F' // Industrial Slate

/* Fuentes anteriores (guardadas para referencia):
   const HEADING = '"Manrope", sans-serif'
   const BODY    = '"Nunito Sans", sans-serif'
*/
const HEADING = '"Space Grotesk", sans-serif'
const BODY    = '"Manrope", sans-serif'

/* ── urls ── */
const WA = whatsappUrl()

/* parallax image URLs (local) */
const SKY_URL   = '/media/sky-hero.webp'
const ARA10_URL = '/wmu/Ara10.webp'
const ALDEA_URL = '/wmu/aldea+(3).webp'
const HEX_IMG   = '/wmu/aldea+(3).webp'
const cssUrl = (url) => `url("${url}")`

/* ── data ── */
const MODELS = [
  { name: 'WMU CERO',   size: '36 m²',  img: '/wmu/wmu-cero.webp',  href: '/wmu-cero', internal: true },
  { name: 'WMU CERO 2', size: '55 m²',  img: '/wmu/wmu-cero2.webp', href: '/wmu-cero-2', internal: true },
  { name: 'WMU CAMPO',  size: '94 m²',  img: '/wmu/wmu-campo.webp', href: '/wmu-campo', internal: true },
  { name: 'WMU ALDEA',  size: '120 m²', img: '/wmu/wmu-aldea.webp', href: '/wmu-aldea', internal: true },
  { name: 'WMU SAUCE',  size: '86 m²',  img: '/wmu/wmu-sauce.webp', href: '/wmu-sauce', internal: true },
]

const SPECS = [
  'Estructura Steel Frame, metálica y entrepiso alivianado',
  'Aislación térmica completa (Poliuretano y Celulosa)',
  'Revestimiento exterior: Chapa (sándwich) o Siding',
  'Carpintería de aluminio DVH y Puertas interiores',
  'Pisos flotantes y Revestimientos en baño',
  'Muebles de Cocina y Baño (Mesadas y Bachas incluidas)',
  'Griferías y Artefactos sanitarios completos',
  'Kit Electro: Horno, Anafe, Campana y Termotanque',
  'Iluminación LED completa y Preinstalación AA',
  'Instalación sanitaria/eléctrica + Documentación técnica',
]

const PRESS = [
  { tag: 'Especialistas',             portal: 'Clarín',          img: '/wmu/clarin.jpg',        title: 'Construcciones con Alma de Acero',     href: 'https://www.clarin.com/arq/especialistas-construcciones-alma-acero_0_1maFutEy6.html' },
  { tag: 'Calidad y Compromiso',      portal: 'Arquitectura R',  img: '/wmu/arquitecturar.jpg', title: 'Proyectos innovadores de Steel Frame',  href: 'https://arquitecturar.com.ar/wp-construcciones-especiales-revoluciona-la-construccion-con-steel-frame-en-el-litoral-argentino' },
  { tag: 'Más Eficiencia, Menos Precio', portal: 'Oleinizak',     img: '/wmu/xmas.jpg',      title: 'Enfoque en eficiencia de producción',  href: 'https://oleinizak.com/matteoda-wp-construcciones-ahora-debemos-enfocarnos-en-ser-mas-eficientes-en-la-produccion-y-no-en-el-precio' },
]

/* ── hook ── */
function useFadeIn(threshold = 0.12) {
  const ref = useRef(null)
  const [vis, setVis] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current; if (!el) return
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

/* ── hook: cascade reveal via IntersectionObserver ── */
function useCascadeReveal(itemCount) {
  const refs = useRef([])
  const [vis, setVis] = useState(() => Array(itemCount).fill(false))
  useEffect(() => {
    const observers = []
    refs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVis(prev => {
              if (prev[i]) return prev
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { threshold: 0.04, rootMargin: '0px 0px -48px 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])
  const setRef = (i) => (el) => { refs.current[i] = el }
  return [setRef, vis]
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV  — clean: back arrow left, WP logo centered, no WhatsApp button
═══════════════════════════════════════════════════════════════════════════ */
function WMUNav() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className="wmu-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: sc ? 'rgba(12,18,16,.93)' : 'transparent',
      backdropFilter: sc ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: sc ? 'blur(14px)' : 'none',
      borderBottom: sc ? '1px solid rgba(255,255,255,.07)' : 'none',
      transition: 'background .35s, border-color .35s',
    }}>
      <div className="wmu-nav-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 82, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* back link — left */}
        <Link to="/" style={{ position: 'absolute', left: 24, color: 'rgba(255,255,255,.7)', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          <span className="wmu-back-label">Volver</span>
        </Link>
        {/* centered logo — proper size */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={wpWhite} alt="WP Construcciones" style={{ height: 'clamp(42px, 5vw, 54px)', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: .96 }} />
        </Link>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="wmu-nav-wa" aria-label="Contactar por WhatsApp">
          <svg viewBox="0 0 32 32" fill="currentColor" width="22" height="22" aria-hidden="true"><path d="M16.004 3.2C9.054 3.2 3.404 8.85 3.404 15.8c0 2.22.58 4.39 1.684 6.3L3.2 28.8l6.9-1.81a12.55 12.55 0 006.004 1.53h.005c6.95 0 12.6-5.65 12.6-12.6-.003-3.37-1.314-6.53-3.69-8.91A12.53 12.53 0 0016.004 3.2zm0 23.1a10.45 10.45 0 01-5.33-1.46l-.38-.23-3.95 1.04 1.06-3.87-.25-.4A10.42 10.42 0 015.5 15.8c0-5.79 4.71-10.5 10.51-10.5 2.81 0 5.45 1.09 7.43 3.08a10.44 10.44 0 013.07 7.43c-.003 5.79-4.713 10.5-10.503 10.5zm5.76-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.76.75.33 1.34.52 1.8.67.75.24 1.44.21 1.98.13.6-.09 1.87-.77 2.13-1.5.27-.74.27-1.37.19-1.5-.08-.14-.29-.22-.61-.37z"/></svg>
        </a>
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING WHATSAPP — pulsing green orb, bottom-right
═══════════════════════════════════════════════════════════════════════════ */
function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
      className="wa-float"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 999,
        width: 58, height: 58, borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37,211,102,.45)',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.7)',
        transition: 'opacity .4s ease, transform .4s ease',
        pointerEvents: show ? 'auto' : 'none',
        textDecoration: 'none',
      }}>
      <svg viewBox="0 0 32 32" fill="white" width="28" height="28">
        <path d="M16.004 3.2C9.054 3.2 3.404 8.85 3.404 15.8c0 2.22.58 4.39 1.684 6.3L3.2 28.8l6.9-1.81a12.55 12.55 0 006.004 1.53h.005c6.95 0 12.6-5.65 12.6-12.6-.003-3.37-1.314-6.53-3.69-8.91A12.53 12.53 0 0016.004 3.2zm0 23.1a10.45 10.45 0 01-5.33-1.46l-.38-.23-3.95 1.04 1.06-3.87-.25-.4A10.42 10.42 0 015.5 15.8c0-5.79 4.71-10.5 10.51-10.5 2.81 0 5.45 1.09 7.43 3.08a10.44 10.44 0 013.07 7.43c-.003 5.79-4.713 10.5-10.503 10.5zm5.76-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.76.75.33 1.34.52 1.8.67.75.24 1.44.21 1.98.13.6-.09 1.87-.77 2.13-1.5.27-.74.27-1.37.19-1.5-.08-.14-.29-.22-.61-.37z"/>
      </svg>
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   1 · HERO  — UNTOUCHED
═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="financiacion" aria-label="Financiación WMU" className="wmu-section" style={{
      position: 'relative', isolation: 'isolate', minHeight: '100svh',
      display: 'grid', placeItems: 'center', overflow: 'hidden', background: BG, color: TXT,
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: -2, overflow: 'hidden' }}>
        <img src={SKY_URL} alt="" aria-hidden="true" width="2000" height="2576" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.55) contrast(1.05) saturate(1.05)' }} />
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90, background: 'linear-gradient(to top,rgba(0,0,0,0) 0%,rgba(0,0,0,.65) 65%,#000 100%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: 'linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,.7) 60%,#000 100%)', pointerEvents: 'none', zIndex: 0 }} />

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'radial-gradient(120% 120% at 70% 20%,rgba(53,195,107,.18),transparent 60%),linear-gradient(0deg,rgba(0,0,0,.35),rgba(0,0,0,.35))' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-40% -10% -10% -40%', zIndex: -1, opacity: .15, pointerEvents: 'none', background: 'repeating-linear-gradient(60deg,rgba(255,255,255,.25) 0 1px,transparent 1px 32px),repeating-linear-gradient(-60deg,rgba(255,255,255,.25) 0 1px,transparent 1px 32px)', transform: 'skewY(-6deg)' }} />

      <div className="hero-inner wmu-hero-inner" style={{ width: 'min(1200px,92vw)', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 'clamp(24px,4vw,48px)', alignItems: 'center', zIndex: 1, paddingTop: 80 }}>
        <div className="wmu-hero-copy">
          <span style={{ display: 'inline-block', marginBottom: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: G, fontSize: '.82rem', fontFamily: BODY }}>
            Plan WMU + financiación
          </span>
          <h1 style={{ margin: '0 0 10px', lineHeight: 1.05, fontSize: 'clamp(32px,5.5vw,64px)', fontFamily: HEADING, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '.01em' }}>
            <span style={{ display: 'block', opacity: .95, fontWeight: 800 }}>WMU</span>
            <span style={{ display: 'block', color: '#2f8a5a', fontWeight: 800 }}>ARQUITECTURA MODULAR</span>
          </h1>
          <p style={{ margin: '.6rem 0 1rem', color: SOFT, fontSize: 'clamp(14px,1.4vw,18px)', lineHeight: 1.65, fontFamily: BODY }}>
            Arquitectura modular en steel frame: precisión industrial, obra limpia y montaje rápido. Elegí el modelo, ajustá el plan, lo instalamos.
          </p>

          <div className="wmu-financing-cue" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', background: 'rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.14)', padding: '10px 14px', borderRadius: 12, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', width: 'max-content', maxWidth: '100%' }}>
            <span style={{ fontSize: '.85rem', fontFamily: BODY }}>Empezá hoy · financiación Banco Hipotecario</span>
            <img src="/media/banco-hipotecario.png" alt="Banco Hipotecario" width="100" height="190" style={{ height: 21, width: 'auto', objectFit: 'contain', filter: 'contrast(1.05) brightness(1.2)', marginLeft: 'auto' }} />
          </div>

          <div className="wmu-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '15px 0 0' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="wmu-btn-primary">CONTÁCTANOS</a>
            <a href="#models" className="wmu-btn-ghost">VER MODELOS</a>
          </div>

          <div style={{ display: 'flex', gap: 6, margin: '14px 0 0', flexWrap: 'wrap' }}>
            {['Montaje express','Llave en mano','Garantía estructural'].map(c => (
              <span key={c} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.05)', color: SOFT, fontFamily: BODY }}>{c}</span>
            ))}
          </div>
        </div>

        <figure aria-label="Render módulo WMU" style={{ margin: 0 }} className="hero-hex wmu-hero-media">
          <div style={{ position: 'relative', width: 'clamp(260px,34vw,510px)', aspectRatio: '1', marginInline: 'auto', clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.55)' }}>
            <img src={HEX_IMG} alt="Módulo WMU" width="1600" height="900" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(200deg,rgba(53,195,107,.15),transparent 60%)', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
          </div>
        </figure>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 · PROCESS  — UNTOUCHED
═══════════════════════════════════════════════════════════════════════════ */
function ProcessSection() {
  const [ref, vis] = useFadeIn(0.05)
  return (
    <section id="proceso-wmu" ref={ref} className="wmu-section" style={{
      position: 'relative', overflow: 'hidden', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
    }}>
      <img src="/wmu/wmu-process-bg.webp" alt="" aria-hidden="true" width="1366" height="768"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom' }} />

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.72) 0%, rgba(0,0,0,.5) 28%, rgba(0,0,0,.12) 52%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,.6) 60%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(60px,9vw,110px) clamp(20px,5vw,80px) 0' }}>
        <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
          <h2 className="text-mask-reveal-line" style={{
            fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(28px,5vw,41px)', color: TXT,
            lineHeight: 1.15, maxWidth: 900, margin: '0 auto 8px',
            textShadow: '0 3px 24px rgba(0,0,0,.5)',
          }}>
            <span style={{ color: G }}>El proceso, en nuestras manos:</span> vos disfrutá<br/>el resultado.
          </h2>
        </div>
        <p style={{
          fontFamily: BODY, color: SOFT, fontSize: 'clamp(16px,1.6vw,20px)',
          lineHeight: 1.3, maxWidth: 600, margin: '0 auto', fontWeight: 400,
          textShadow: '0 1px 10px rgba(0,0,0,.6)',
          opacity: vis ? 1 : 0, transition: 'opacity .75s ease .15s',
        }}>
          Construir no tiene que ser un problema. Con el sistema en seco, todo es más rápido y simple. En poco tiempo, tu proyecto listo.
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 · MODELS  — sky parallax + featured hero card + glass grid
   Redesign: large featured model up top, rest in asymmetric glass grid,
   diagonal grid overlay, glassmorphism cards with green accents
═══════════════════════════════════════════════════════════════════════════ */
function CardLink({ model, className, style, children }) {
  const ariaLabel = model.internal 
    ? `Ver detalles y especificaciones del modelo modular ${model.name}`
    : `Ver ficha técnica externa del modelo modular ${model.name}`
  if (model.internal) {
    return <Link to={model.href} className={className} style={style} aria-label={ariaLabel}>{children}</Link>
  }
  return <a href={model.href} target="_blank" rel="noopener noreferrer" className={className} style={style} aria-label={ariaLabel}>{children}</a>
}

function ModelCard({ model, delay, vis, featured }) {
  const [hov, setHov] = useState(false)
  const hoverHandlers = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
  }
  if (featured) {
    return (
      <CardLink
        model={model}
        className={`model-featured wmu-3d-card-reveal ${vis ? 'visible' : ''}`}
        {...hoverHandlers}
        style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, textDecoration: 'none',
          borderRadius: 20, overflow: 'hidden',
          background: 'rgba(12,18,16,.65)', border: '1px solid rgba(255,255,255,.1)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          marginBottom: 20,
          transitionDelay: vis ? '0s' : `${delay}s`,
        }}>
        <div className={`wmu-card-clip-sweep ${vis ? 'visible' : ''}`} style={{ overflow: 'hidden', minHeight: 320, transitionDelay: vis ? '0s' : `${delay}s` }}>
          <img src={model.img} alt={model.name} width="1600" height="900" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform .6s ease' }} />
        </div>
        <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: G, fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: BODY, marginBottom: 10 }}>Modelo destacado</span>
          <div style={{ fontWeight: 800, color: TXT, fontSize: 'clamp(24px,3vw,36px)', fontFamily: HEADING, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 6 }}>{model.name}</div>
          <div style={{ color: SOFT, fontSize: 15, fontFamily: BODY, marginBottom: 20 }}>{model.size}</div>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 13, lineHeight: 1.7, fontFamily: BODY, marginBottom: 28 }}>
            Diseño pensado para máximo confort y eficiencia. Estructura Steel Frame con terminaciones premium incluidas.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {['Steel Frame', 'Llave en mano', 'DVH'].map(t => (
              <span key={t} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(53,195,107,.25)', background: 'rgba(53,195,107,.08)', color: G, fontFamily: BODY, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
          <span style={{ color: G, fontSize: 14, fontWeight: 800, fontFamily: BODY, display: 'flex', alignItems: 'center', gap: 6 }}>
            Explorar modelo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </CardLink>
    )
  }
  return (
    <CardLink
      model={model}
      className={`wmu-3d-card-reveal ${vis ? 'visible' : ''}`}
      {...hoverHandlers}
      style={{
        display: 'block', textDecoration: 'none', borderRadius: 16, overflow: 'hidden',
        background: 'rgba(12,18,16,.6)', border: '1px solid rgba(255,255,255,.1)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        transitionDelay: vis ? '0s' : `${delay}s`,
      }}>
      <div className={`wmu-card-clip-sweep ${vis ? 'visible' : ''}`} style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', transitionDelay: vis ? '0s' : `${delay}s` }}>
        <img src={model.img} alt={model.name} width="1600" height="900" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform .5s ease' }} />
        {/* green glow on hover */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 100%, rgba(53,195,107,.15), transparent 70%)', opacity: hov ? 1 : 0, transition: 'opacity .4s ease', pointerEvents: 'none' }} />
        {/* size badge */}
        <div style={{ position: 'absolute', top: 12, right: 12, padding: '5px 12px', borderRadius: 8, background: 'rgba(12,18,16,.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.1)' }}>
          <span style={{ color: TXT, fontSize: 12, fontWeight: 700, fontFamily: BODY }}>{model.size}</span>
        </div>
      </div>
      <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, color: TXT, fontSize: 14, fontFamily: BODY }}>{model.name}</div>
        <span style={{ color: G, fontSize: 13, fontWeight: 700, fontFamily: BODY, display: 'flex', alignItems: 'center', gap: 4 }}>
          Ver más
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
        </span>
      </div>
    </CardLink>
  )
}

function ModelsSection() {
  const [ref, vis] = useFadeIn(0.05)
  return (
    <section id="models" ref={ref} className="wmu-section wmu-parallax" style={{
      position: 'relative', padding: 'clamp(80px,10vw,140px) 0', scrollMarginTop: '-20px',
      backgroundImage: `url(${SKY_URL})`, backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* layered overlay — gradient instead of flat */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(12,18,16,.5) 50%, rgba(0,0,0,.7) 100%)', pointerEvents: 'none' }} />
      {/* diagonal grid — DNA from hero */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-20% -10% -10% -20%', opacity: .06, pointerEvents: 'none', background: 'repeating-linear-gradient(60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px),repeating-linear-gradient(-60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px)', transform: 'skewY(-4deg)' }} />
      {/* green radial glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(53,195,107,.08), transparent)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,64px)' }}>
          <span style={{ color: G, fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: BODY, display: 'block', marginBottom: 10, opacity: vis ? 1 : 0, transition: 'opacity .6s ease' }}>Catálogo WMU</span>
          <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
            <h2 className="text-mask-reveal-line" style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(30px,4.5vw,56px)', color: TXT, textTransform: 'uppercase', textShadow: '0 2px 16px rgba(0,0,0,.5)', margin: 0 }}>
              Nuestros Modelos
            </h2>
          </div>
        </div>

        {/* featured model — ALDEA (biggest) */}
        <ModelCard model={MODELS[3]} delay={0} vis={vis} featured />

        {/* remaining 4 in a grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="models-grid">
          {MODELS.filter((_,i) => i !== 3).map((m,i) => (
            <ModelCard key={m.name} model={m} delay={.12 + i*.15} vis={vis} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4 · MANIFIESTO  — typographic manifesto with sticky reveal
   Editorial layout: cream background, roman numerals as watermarks,
   mask-wipe reveals, monogram, gutter line.
═══════════════════════════════════════════════════════════════════════════ */
const MANIFESTO_LINES = [
  { roman: 'I',   text: ['No seguimos fórmulas, ', { accent: 'creamos' }, ' soluciones.'] },
  { roman: 'II',  text: ['Cada proyecto es una ', { accent: 'conversación' }, ' hecha arquitectura.'] },
  { roman: 'III', text: ['Diseñamos espacios que ', { accent: 'transforman' }, ' vidas.'] },
  { roman: 'IV',  text: ['Y al final, queda lo que ', { accent: 'soñaste' }, '.'], closing: true },
]

function ManifestoSection() {
  const [containerRef, containerVis] = useFadeIn(0.05)
  const [setRef, vis] = useCascadeReveal(MANIFESTO_LINES.length)
  return (
    <section
      id="manifiesto"
      ref={containerRef}
      className={`wmu-section manifiesto-section${containerVis ? ' is-revealed' : ''}`}
      style={{
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div className="manifiesto-grain" aria-hidden="true" />
      <div className="manifiesto-gutter" aria-hidden="true" />
      <div className="manifiesto-watermark" aria-hidden="true">W</div>

      <div className="manifiesto-inner">
        <span className="manifiesto-eyebrow">FILOSOFÍA WMU</span>

        <p className="manifiesto-opening">
          <em>WMU</em> es nuestro estudio de arquitectura. Diseñamos y construimos espacios únicos: casas, ampliaciones, proyectos a medida y todo lo que tu imaginación pueda crear.
        </p>

        <div className="manifiesto-declarations">
          {MANIFESTO_LINES.map((line, i) => {
            const delay = 0.1 + (i % 3) * 0.12 + (i * 0.07);
            return (
            <div
              key={line.roman}
              ref={setRef(i)}
              className={`manifiesto-line${line.closing ? ' manifiesto-line--closing' : ''}${vis[i] ? ' is-visible' : ''}`}
            >
              <span className="manifiesto-roman" aria-hidden="true">{line.roman}</span>
              <p className="manifiesto-text" style={{ transitionDelay: `${delay.toFixed(2)}s` }}>
                {line.text.map((seg, j) =>
                  typeof seg === 'string'
                    ? <span key={j}>{seg}</span>
                    : <span key={j} className="manifiesto-accent">{seg.accent}</span>
                )}
                {line.closing && (
                  <svg className="manifiesto-underline" viewBox="0 0 240 14" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M3 9 C 50 3, 100 12, 150 6 S 220 4, 237 8"
                      fill="none"
                      stroke="#2a7a4a"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </p>
            </div>
            );
          })}
        </div>

        <a href={WA} target="_blank" rel="noopener noreferrer" className="manifiesto-cta">
          Hablemos
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>

        <hr className="manifiesto-rule" aria-hidden="true" />
        <p className="manifiesto-signature">— Equipo WP + WMU</p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5 · EXPAND  — aldea parallax with glassmorphism panel + asymmetric layout
═══════════════════════════════════════════════════════════════════════════ */
function ExpandSection() {
  const [ref, vis] = useFadeIn()
  return (
    <section id="extender" ref={ref} className="wmu-section wmu-parallax" style={{
      position: 'relative', padding: 'clamp(30px,4vw,50px) 0', overflow: 'hidden',
      backgroundImage: cssUrl(ALDEA_URL), backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* gradient overlay — more nuanced than flat */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(12,18,16,.75) 0%, rgba(30,30,30,.4) 50%, rgba(12,18,16,.65) 100%)', pointerEvents: 'none', zIndex: 1 }} />
      {/* diagonal grid DNA */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-20% -10% -10% -20%', opacity: .05, pointerEvents: 'none', zIndex: 2, background: 'repeating-linear-gradient(60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px),repeating-linear-gradient(-60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px)', transform: 'skewY(-4deg)' }} />

      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div className="expand-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
          {/* left — glassmorphism content panel */}
          <div style={{
            padding: 'clamp(20px,3vw,32px)', borderRadius: 20,
            background: 'rgba(12,18,16,.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,.08)',
            boxShadow: '0 16px 48px rgba(0,0,0,.3)',
          }}>
            {/* vertical green accent bar */}
            <div style={{ width: 3, height: 24, background: G, borderRadius: 4, marginBottom: 12, opacity: vis ? 1 : 0, transition: 'opacity .6s ease' }} />
            <h2 style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(24px,3.5vw,44px)', color: TXT, textTransform: 'uppercase', marginBottom: 10, lineHeight: 1.1, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(18px)', transition: 'opacity .7s ease .05s, transform .7s ease .05s' }}>
              ¿Necesitás<br/><span style={{ color: G }}>ampliar</span> tu espacio?
            </h2>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,.75)', fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.75, marginBottom: 18, opacity: vis ? 1 : 0, transition: 'opacity .7s ease .12s' }}>
              Nos especializamos en ampliar tu espacio sobre estructuras existentes. Steel Frame para ejecución rápida y máxima solidez, sin demoler lo que ya construiste.
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18, opacity: vis ? 1 : 0, transition: 'opacity .7s ease .18s' }}>
              {['Sin demolición', 'Montaje rápido', 'Garantía estructural'].map(t => (
                <span key={t} style={{ fontSize: 10, padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(53,195,107,.25)', background: 'rgba(53,195,107,.08)', color: G, fontFamily: BODY, fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: G, color: '#0a1f12', fontWeight: 800, textDecoration: 'none', fontSize: 14, fontFamily: BODY, boxShadow: '0 8px 28px rgba(53,195,107,.25)', opacity: vis ? 1 : 0, transition: 'opacity .7s ease .22s' }}>
              CONSULTANOS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          {/* right — empty, lets the parallax image breathe */}
          <div className="expand-spacer" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
    6 · RECOGNITION  — editorial compact separator with rich details
═══════════════════════════════════════════════════════════════════════════ */
function RecognitionSection() {
  const [ref, vis] = useFadeIn()
  const values = [
    { num: '[MOD-3.6m]', title: 'Nuestra visión',  text: 'Seguir construyendo con la misma calidad y método que nos distingue, para que tu inversión sea sólida.' },
    { num: '[MOD-6.0m]', title: 'Nuestra misión',  text: 'Calidad innegociable y máxima eficiencia, cumpliendo siempre el compromiso de entrega pactado.' },
    { num: '[MOD-12.0m]', title: 'Sustentabilidad', text: 'Construcciones más cómodas que gastan menos luz, contribuyendo a un futuro más limpio y eficiente.' },
  ]
  return (
    <section ref={ref} className="wmu-section" style={{
      background: '#EDE9E3',
      padding: 'clamp(56px,7vw,80px) 0', position: 'relative', overflow: 'hidden'
    }}>
      {/* large green watermark */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(10px,2vw,30px)', right: 'clamp(16px,3vw,40px)', fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(140px,20vw,240px)', lineHeight: 1, color: G, opacity: .04, pointerEvents: 'none', userSelect: 'none' }}>W</div>
      {/* organic green glows */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 50% 80% at 80% 50%, rgba(59,183,126,.06), transparent)` }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 40% 60% at 10% 80%, rgba(59,183,126,.04), transparent)` }} />
      {/* diagonal grid DNA */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-20% -10% -10% -20%', opacity: .03, pointerEvents: 'none', background: `repeating-linear-gradient(60deg,rgba(42,122,74,.4) 0 1px,transparent 1px 48px),repeating-linear-gradient(-60deg,rgba(42,122,74,.4) 0 1px,transparent 1px 48px)`, transform: 'skewY(-4deg)' }} />
      {/* horizontal decorative line */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(42,122,74,.12) 20%, rgba(42,122,74,.12) 80%, transparent)', pointerEvents: 'none' }} />
      {/* corner accents */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 24, right: 24, width: 40, height: 40, borderTop: '1px solid rgba(42,122,74,.2)', borderRight: '1px solid rgba(42,122,74,.2)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 24, left: 24, width: 40, height: 40, borderBottom: '1px solid rgba(42,122,74,.15)', borderLeft: '1px solid rgba(42,122,74,.15)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)', position: 'relative', zIndex: 1 }}>
        <div className="recognition-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
          {/* LEFT — title block */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-20px)', transition: 'opacity .7s ease, transform .7s ease' }}>
            {/* small caps label with dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: G }} />
              <span style={{ color: '#2e7d53', fontWeight: 600, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: BODY }}>Trayectoria</span>
            </div>
            {/* title with italic word */}
            <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
              <h2 className="text-mask-reveal-line" style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#0e1a11', textTransform: 'uppercase', lineHeight: 1.05, margin: 0 }}>
                Reconocidos
              </h2>
            </div>
            <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
              <h2 className="text-mask-reveal-line" style={{ fontFamily: HEADING, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(28px,4vw,52px)', color: '#2e7d53', lineHeight: 1.05, margin: '2px 0 0', transitionDelay: '0.08s' }}>
                por la calidad
              </h2>
            </div>
            <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
              <h2 className="text-mask-reveal-line" style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: '#0e1a11', textTransform: 'uppercase', lineHeight: 1.05, margin: '2px 0 0', transitionDelay: '0.16s' }}>
                y la <span style={{ color: '#2e7d53' }}>eficiencia</span>
              </h2>
            </div>
            {/* decorative line under title */}
            <div style={{ marginTop: 24, width: 60, height: 2, background: `linear-gradient(90deg, ${G}, transparent)` }} />
          </div>

          {/* RIGHT — value cards with timeline */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* timeline vertical line */}
            <div aria-hidden="true" style={{ position: 'absolute', left: 23, top: 28, bottom: 28, width: 1, background: `linear-gradient(to bottom, rgba(59,183,126,.3), rgba(59,183,126,.1))`, pointerEvents: 'none' }} />
            
            {values.map((v, i) => (
              <div key={v.title} style={{
                padding: 'clamp(20px,2.5vw,28px) clamp(20px,2.5vw,28px) clamp(20px,2.5vw,28px) 64px',
                borderRadius: 16,
                background: '#fff',
                border: '1px solid rgba(42,122,74,.08)',
                boxShadow: '0 2px 16px rgba(0,0,0,.04)',
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(24px)',
                transition: `opacity .6s ease ${.15+i*.12}s, transform .6s ease ${.15+i*.12}s, box-shadow .3s ease, border-color .3s ease`,
                position: 'relative',
              }} className="recognition-card">
                {/* number background */}
                <div aria-hidden="true" className="recognition-num" style={{ position: 'absolute', top: 14, right: 20, fontFamily: HEADING, fontWeight: 700, fontSize: 14, color: G, opacity: .2, letterSpacing: '.05em', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', transition: 'opacity .3s ease' }}>{v.num}</div>
                {/* timeline dot */}
                <div aria-hidden="true" className="recognition-dot" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#fff', border: `2px solid ${G}`, boxShadow: `0 0 0 4px rgba(59,183,126,.1)`, zIndex: 1, transition: 'background .3s ease, border-color .3s ease, box-shadow .3s ease' }} />
                {/* left accent bar */}
                <div style={{ position: 'absolute', top: 12, bottom: 12, left: 0, width: 2, background: `linear-gradient(to bottom, ${G}, #2e7d53)`, opacity: .3, borderRadius: 2 }} />
                {/* content */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <span style={{ color: '#2e7d53', fontSize: 24, lineHeight: 1 }}>{v.icon}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#0e1a11', fontSize: 'clamp(15px,1.5vw,18px)', fontFamily: HEADING, marginBottom: 6, letterSpacing: '.01em' }}>{v.title}</div>
                    <div style={{ color: '#5a6e60', fontSize: 'clamp(13px,1.3vw,16px)', lineHeight: 1.6, fontFamily: BODY }}>{v.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
    6B · PRESS  — editorial showcase with rich decorative elements
═══════════════════════════════════════════════════════════════════════════ */
function PressSection() {
  const [ref, vis] = useFadeIn()
  return (
    <section ref={ref} className="wmu-section" style={{
      position: 'relative', padding: 'clamp(100px,12vw,160px) 0', overflow: 'hidden',
      background: '#F5F3F0',
    }}>
      {/* large green watermark W */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 'clamp(20px,4vw,60px)', left: 'clamp(16px,3vw,40px)', fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(200px,28vw,340px)', lineHeight: 1, color: '#35C36B', opacity: .04, pointerEvents: 'none', userSelect: 'none' }}>W</div>
      {/* large black watermark W */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 'clamp(40px,6vw,80px)', right: 'clamp(20px,4vw,60px)', fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(160px,22vw,260px)', lineHeight: 1, color: '#0e1a11', opacity: .03, pointerEvents: 'none', userSelect: 'none' }}>W</div>
      {/* vertical green accent line left */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '6%', top: '10%', bottom: '15%', width: 2, background: 'linear-gradient(to bottom, transparent, #35C36B, transparent)', opacity: .18, pointerEvents: 'none' }} />
      {/* vertical black accent line right */}
      <div aria-hidden="true" style={{ position: 'absolute', right: '10%', top: '15%', bottom: '10%', width: 1, background: 'linear-gradient(to bottom, transparent, #0e1a11, transparent)', opacity: .08, pointerEvents: 'none' }} />
      {/* horizontal green line */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '35%', left: '15%', width: '25%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(53,195,107,.25), transparent)', pointerEvents: 'none' }} />
      {/* organic green glows */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 15% 50%, rgba(53,195,107,.07), transparent)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 50% at 90% 80%, rgba(53,195,107,.05), transparent)', pointerEvents: 'none' }} />
      {/* black subtle glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(14,26,17,.03), transparent)', pointerEvents: 'none' }} />
      {/* diagonal grid DNA */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-20% -10% -10% -20%', opacity: .03, pointerEvents: 'none', background: 'repeating-linear-gradient(60deg,rgba(42,122,74,.4) 0 1px,transparent 1px 48px),repeating-linear-gradient(-60deg,rgba(42,122,74,.4) 0 1px,transparent 1px 48px)', transform: 'skewY(-4deg)' }} />
      {/* accent line top */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(53,195,107,.4), transparent)', pointerEvents: 'none' }} />
      {/* floating hexagon decorations - green */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '15%', right: '8%', width: 70, height: 70, clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: 'rgba(53,195,107,.06)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '20%', left: '5%', width: 50, height: 50, clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: 'rgba(53,195,107,.05)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: '60%', right: '20%', width: 35, height: 35, clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: 'rgba(53,195,107,.07)', pointerEvents: 'none' }} />
      {/* floating hexagon decorations - black */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '25%', left: '12%', width: 45, height: 45, clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: 'rgba(14,26,17,.04)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '35%', right: '6%', width: 55, height: 55, clipPath: 'polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)', background: 'rgba(14,26,17,.03)', pointerEvents: 'none' }} />
      {/* corner accents */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 24, left: 24, width: 40, height: 40, borderTop: '2px solid rgba(53,195,107,.2)', borderLeft: '2px solid rgba(53,195,107,.2)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 24, right: 24, width: 40, height: 40, borderBottom: '2px solid rgba(14,26,17,.1)', borderRight: '2px solid rgba(14,26,17,.1)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        {/* header */}
        <div style={{ marginBottom: 'clamp(48px,7vw,72px)', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'opacity .7s ease, transform .7s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg, #35C36B, #2a7a4a)', borderRadius: 2 }} />
            <span style={{ color: '#2a7a4a', fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: BODY }}>Prensa y Medios</span>
          </div>
          <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
            <h2 className="text-mask-reveal-line" style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', color: '#0e1a11', textTransform: 'uppercase', lineHeight: 1.1, margin: 0, maxWidth: 600 }}>
              Nuestra labor en los <span style={{ color: '#2e7d53' }}>medios</span>
            </h2>
          </div>
          <p style={{ fontFamily: BODY, color: '#5a6e60', fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.7, marginTop: 16, maxWidth: 520 }}>
            Cobertura mediática que respalda nuestra trayectoria y compromiso con la excelencia constructiva.
          </p>
        </div>

        {/* press cards */}
        <div className="press-grid-new" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {PRESS.map((p, i) => (
            <a key={p.tag} href={p.href} target="_blank" rel="noopener noreferrer"
              className="press-card-new"
              style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none', borderRadius: 20, overflow: 'hidden',
                background: '#fff',
                border: '1px solid rgba(42,122,74,.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.02)',
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
                transition: `opacity .7s ease ${.1+i*.1}s, transform .7s ease ${.1+i*.1}s, box-shadow .3s ease, border-color .3s ease`,
                position: 'relative',
              }}>
              {/* image container */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', flexShrink: 0 }}>
                <img src={p.img} alt={p.tag} width="500" height="500" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s ease' }} className="press-card-img-new" />
                {/* green gradient overlay on image */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,122,74,.15) 0%, transparent 40%)', pointerEvents: 'none' }} />
                {/* portal name overlay */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)', backdropFilter: 'blur(1px)', pointerEvents: 'none' }}>
                  <span style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(20px,2.5vw,28px)', color: '#fff', textTransform: 'uppercase', letterSpacing: '.05em', opacity: .85, textShadow: '0 2px 12px rgba(0,0,0,.4)' }}>{p.portal}</span>
                </div>
                {/* tag badge */}
                <div style={{ position: 'absolute', top: 14, left: 14, padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(53,195,107,.2)', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
                  <span style={{ color: '#2a7a4a', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: BODY }}>{p.tag}</span>
                </div>
              </div>
              {/* content */}
              <div style={{ padding: '20px 24px 24px', position: 'relative', flex: 1 }}>
                {/* subtle green line at bottom of content */}
                <div style={{ position: 'absolute', bottom: 0, left: 24, right: 24, height: 2, background: 'linear-gradient(90deg, #35C36B, transparent)', opacity: 0, transition: 'opacity .3s ease' }} className="press-card-line" />
                <div style={{ fontWeight: 700, color: '#0e1a11', fontSize: 15, fontFamily: BODY, lineHeight: 1.35, marginBottom: 12 }}>{p.title}</div>
                <span style={{ color: '#2a7a4a', fontSize: 13, fontWeight: 700, fontFamily: BODY, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'gap .3s ease' }} className="press-link-new">
                  Leer nota
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   7 · SPECS  — Ara10 parallax + glassmorphism panel with 2-col spec grid
═══════════════════════════════════════════════════════════════════════════ */
function SpecsSection() {
  const [ref, vis] = useFadeIn()
  return (
    <section ref={ref} className="wmu-section wmu-parallax" style={{
      position: 'relative', padding: 'clamp(80px,10vw,140px) 0', overflow: 'hidden',
      backgroundImage: cssUrl(ARA10_URL), backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* layered gradient overlay */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(12,18,16,.8) 0%, rgba(30,30,30,.45) 50%, rgba(12,18,16,.7) 100%)', pointerEvents: 'none', zIndex: 0 }} />
      {/* diagonal grid DNA */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: '-20% -10% -10% -20%', opacity: .05, pointerEvents: 'none', zIndex: 1, background: 'repeating-linear-gradient(60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px),repeating-linear-gradient(-60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px)', transform: 'skewY(-4deg)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        {/* top header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,64px)' }}>
          <span style={{ color: G, fontWeight: 700, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: BODY, display: 'block', marginBottom: 10, opacity: vis ? 1 : 0, transition: 'opacity .6s ease' }}>Todo incluido</span>
          <div className={`text-mask-reveal-wrapper ${vis ? 'visible' : ''}`}>
            <h2 className="text-mask-reveal-line" style={{ fontFamily: HEADING, fontWeight: 800, fontSize: 'clamp(26px,4vw,52px)', color: TXT, margin: 0, textTransform: 'uppercase', textShadow: '0 2px 16px rgba(0,0,0,.5)' }}>
              ¿Qué incluye el modelo estándar?
            </h2>
          </div>
        </div>

        <div className="specs-layout" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>
          {/* left — glassmorphism specs panel */}
          <div style={{
            padding: 'clamp(28px,4vw,44px)', borderRadius: 20,
            background: 'rgba(12,18,16,.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,.08)',
            boxShadow: '0 16px 48px rgba(0,0,0,.3)',
          }}>
            <div className="specs-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
              {SPECS.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(8px)', transition: `opacity .5s ease ${.1+.04*i}s, transform .5s ease ${.1+.04*i}s` }}>
                  {/* hex bullet */}
                  <div style={{ width: 8, height: 9, marginTop: 5, flexShrink: 0, clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', background: G }} />
                  <span style={{ color: 'rgba(255,255,255,.82)', fontSize: 13, lineHeight: 1.55, fontFamily: BODY }}>{s}</span>
                </div>
              ))}
            </div>

            {/* no incluye — distinct panel */}
            <div style={{ marginTop: 24, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', opacity: vis ? 1 : 0, transition: 'opacity .6s ease .5s' }}>
              <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, lineHeight: 1.65, fontFamily: BODY }}>
                <strong style={{ color: TXT, fontWeight: 700 }}>No incluye:</strong> Logística de traslado y montaje final · Nivelación y fundaciones · Gastos de solicitud de servicios y presentación municipal.
              </span>
            </div>
          </div>

          {/* right — CTA card + image */}
          <div>
            <div className={`specs-img image-clip-reveal ${vis ? 'visible' : ''}`} style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,.4)', marginBottom: 20 }}>
              <img src="/wmu/wmu-aldea.webp" alt="Modelo WMU Aldea" width="2048" height="1152" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: vis ? 1 : 0, transition: 'opacity .7s ease .4s' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="wmu-btn-primary" style={{ flex: 1, textAlign: 'center' }}>CONTÁCTANOS</a>
              <Link to="/wmu-especificaciones" className="wmu-btn-ghost" style={{ flex: 1, textAlign: 'center', display: 'inline-block' }}>VER MÁS ESPECIFICACIONES</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */
function WMUFooter() {
  return (
    <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,.07)', padding: 'clamp(40px,6vw,72px) 0 clamp(20px,4vw,40px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: TXT, marginBottom: 10, fontFamily: BODY }}>WP construcciones especiales</div>
            <div style={{ color: SOFT, fontSize: 13, lineHeight: 1.75, fontFamily: BODY }}>
              {BUSINESS.locality.toUpperCase()}, E.RÍOS ARGENTINA CP3100<br/>
              <a href={BUSINESS.mailtoHref} style={{ color: 'inherit' }}>{BUSINESS.email}</a><br/>
              <a href={BUSINESS.telHref} style={{ color: 'inherit' }}>{BUSINESS.phoneDisplay}</a>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: TXT, marginBottom: 10, fontFamily: BODY }}>Horario</div>
            <div style={{ color: SOFT, fontSize: 13, lineHeight: 1.8, fontFamily: BODY }}>Lunes-Viernes<br/>8:00 – 16:00</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: TXT, marginBottom: 10, fontFamily: BODY }}>Seguinos</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" style={{ color: SOFT, textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY }}>Facebook</a>
              <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" style={{ color: SOFT, textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY }}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: SOFT, fontSize: 12, fontFamily: BODY }}>© 2025 WP Construcciones Especiales. Todos los derechos reservados. — Sitio web desarrollado por <a href="https://tomygiorgi.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: 'none', fontWeight: 600 }}>Tomás Giorgi</a></span>
          <Link to="/" style={{ color: G, fontSize: 12, textDecoration: 'none', fontWeight: 600, fontFamily: BODY }}>← Volver al inicio</Link>
        </div>
      </div>
    </footer>
  )
}

function MobileContactBar() {
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" className="wmu-mobile-contact" aria-label="Contactar por WhatsApp">
      <svg viewBox="0 0 32 32" fill="currentColor" width="22" height="22" aria-hidden="true"><path d="M16.004 3.2C9.054 3.2 3.404 8.85 3.404 15.8c0 2.22.58 4.39 1.684 6.3L3.2 28.8l6.9-1.81a12.55 12.55 0 006.004 1.53h.005c6.95 0 12.6-5.65 12.6-12.6-.003-3.37-1.314-6.53-3.69-8.91A12.53 12.53 0 0016.004 3.2zm0 23.1a10.45 10.45 0 01-5.33-1.46l-.38-.23-3.95 1.04 1.06-3.87-.25-.4A10.42 10.42 0 015.5 15.8c0-5.79 4.71-10.5 10.51-10.5 2.81 0 5.45 1.09 7.43 3.08a10.44 10.44 0 013.07 7.43c-.003 5.79-4.713 10.5-10.503 10.5zm5.76-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.76.75.33 1.34.52 1.8.67.75.24 1.44.21 1.98.13.6-.09 1.87-.77 2.13-1.5.27-.74.27-1.37.19-1.5-.08-.14-.29-.22-.61-.37z"/></svg>
      <span>CONTACTANOS POR WHATSAPP</span>
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════════════════ */
const CSS = `
  html { scroll-behavior: smooth; }

  .wmu-page {
    width: 100%;
    max-width: 100vw;
    overflow-x: clip;
    background-color: #0A0F0D;
  }

  .wmu-shell { width: 100%; min-width: 0; overflow-x: clip; }
  .wmu-container { width: min(1200px, calc(100% - 32px)); margin-inline: auto; }
  .wmu-section { min-width: 0; }
  .wmu-actions { display: flex; flex-wrap: wrap; gap: 12px; }
  .wmu-mobile-only { display: none; }
  .wmu-nav-wa {
    position: absolute; right: 24px; display: flex; align-items: center; justify-content: center;
    width: 44px; height: 44px; border-radius: 50%; color: #25D366;
    text-decoration: none; transition: background-color .2s ease, transform .2s ease;
  }
  .wmu-nav-wa:hover { background: rgba(37,211,102,.12); transform: scale(1.06); }
  .wmu-mobile-contact { display: none; }

  @media (max-width: 768px) {
    .wmu-shell { padding-bottom: calc(72px + env(safe-area-inset-bottom)) !important; }
    .wmu-nav-inner { height: 68px !important; padding-inline: 16px !important; }
    .wmu-nav a:first-child { left: 16px !important; }
    .wmu-nav-wa { right: 16px; }
    .wmu-mobile-contact {
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      min-height: 48px; padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      background: #25D366; color: #07130D; font: 800 13px/1.2 "Space Grotesk", sans-serif;
      letter-spacing: .03em; text-decoration: none; box-shadow: 0 -6px 24px rgba(0,0,0,.26);
    }
    .wmu-actions > a { min-height: 48px; }
  }
  @media (max-width: 560px) {
    .wmu-back-label { display: none; }
    .wmu-nav img { max-width: 132px; }
    .wmu-hero-inner { width: 100% !important; min-height: auto !important; padding: 112px 16px 56px !important; }
    .wmu-hero-media > div { width: min(82vw, 360px) !important; }
    .wmu-financing-cue { width: 100% !important; }
    .wmu-container { width: min(100% - 32px, 520px); }
    .wmu-mobile-only { display: block; }
    .wmu-actions { flex-direction: column; }
    .wmu-actions > a { width: 100%; text-align: center; }
  }

  .wmu-btn-primary {
    padding: 14px 26px; border-radius: 12px; font-weight: 800;
    letter-spacing: .2px; text-decoration: none; display: inline-block;
    background: #3BB77E; color: #F3F5F4; font-family: "Space Grotesk", sans-serif;
    box-shadow: 0 10px 26px rgba(59,183,126,.2); white-space: nowrap;
    transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow .25s ease;
  }
  .wmu-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(59,183,126,.3); }
  .wmu-btn-primary:active { transform: translateY(0) scale(0.97) !important; }

  .wmu-btn-ghost {
    padding: 14px 26px; border-radius: 12px; font-weight: 800;
    letter-spacing: .2px; text-decoration: none; display: inline-block;
    background: transparent; color: #F3F5F4; font-family: "Space Grotesk", sans-serif;
    border: 1px solid rgba(255,255,255,.14); white-space: nowrap;
    transition: background .2s, border-color .2s, transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .wmu-btn-ghost:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.22); }
  .wmu-btn-ghost:active { transform: scale(0.97) !important; }

  /* Model cards 3D entrance and orbit hover */
  .wmu-3d-card-reveal {
    perspective: 800px;
    transform-style: preserve-3d;
    transform-origin: bottom center;
    transform: perspective(800px) rotateX(24deg) translateY(40px) scale(0.96);
    opacity: 0;
    transition: transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1400ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .wmu-3d-card-reveal.visible {
    transform: perspective(800px) rotateX(0deg) translateY(0) scale(1);
    opacity: 1;
  }
  .wmu-3d-card-reveal:hover {
    transform: perspective(800px) rotateX(-2deg) translateY(-8px) scale(1.02) !important;
    box-shadow: 0 20px 48px rgba(59,183,126,.15), 0 4px 20px rgba(0,0,0,.25) !important;
  }
  .wmu-3d-card-reveal:active {
    transform: perspective(800px) rotateX(0deg) translateY(0) scale(0.985) !important;
  }

  /* Clip-path sweep reveal for images */
  .wmu-card-clip-sweep {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 1600ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .visible .wmu-card-clip-sweep,
  .visible.wmu-card-clip-sweep {
    clip-path: inset(0 0 0 0);
  }

  @media (prefers-reduced-motion: reduce) {
    .wmu-3d-card-reveal {
      transform: none !important;
      transition: opacity 300ms ease !important;
    }
    .wmu-card-clip-sweep {
      clip-path: none !important;
      transition: none !important;
    }
  }

  .wmu-subnav {
    position: sticky;
    top: 94px;
    z-index: 80;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 6px 8px;
    margin: -22px auto -22px;
    width: max-content;
    max-width: 90%;
    background: rgba(10, 15, 13, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 99px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .wmu-subnav a {
    padding: 8px 16px;
    border-radius: 99px;
    color: rgba(243, 245, 244, 0.72);
    text-decoration: none;
    font-family: "Space Grotesk", sans-serif;
    font-size: 12px;
    font-weight: 800;
    transition: color .2s ease, background-color .2s ease, transform .15s ease;
  }
  .wmu-subnav a:hover {
    color: #F3F5F4;
    background: rgba(59, 183, 126, 0.14);
  }
  .wmu-subnav a:active {
    transform: scale(.96);
  }

  /* WhatsApp float pulse */
  .wa-float {
    animation: wa-pulse 2.5s ease-in-out infinite;
  }
  .wa-float:hover {
    animation: none;
    transform: translateY(0) scale(1.1) !important;
    box-shadow: 0 8px 32px rgba(37,211,102,.5) !important;
  }
  @keyframes wa-pulse {
    0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,.45); }
    50% { box-shadow: 0 6px 32px rgba(37,211,102,.65), 0 0 0 10px rgba(37,211,102,.08); }
  }

  /* press card hover */
  .press-card-new {
    transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 250ms ease, border-color 250ms ease;
  }
  .press-card-new:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,.1) !important;
    border-color: rgba(59,183,126,.2) !important;
    transform: translateY(-6px);
  }
  .press-card-new:active { transform: translateY(-2px) scale(0.98) !important; }
  .press-card-new:hover .press-card-img-new { transform: scale(1.06); }
  .press-card-new:hover .press-link-new { gap: 12px; }
  .press-card-new:hover .press-card-line { opacity: 1 !important; }

  /* recognition card hover */
  .recognition-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08) !important; border-color: rgba(59,183,126,.15) !important; }
  .recognition-card:hover .recognition-dot { background: #3BB77E !important; border-color: #3BB77E !important; box-shadow: 0 0 0 6px rgba(59,183,126,.15) !important; }
  .recognition-card:hover .recognition-num { opacity: .12 !important; }

  /* parallax — only on desktop */
  .wmu-parallax {
    background-attachment: scroll;
  }
  @media (min-width: 1025px) {
    .wmu-parallax {
      background-attachment: fixed !important;
    }
  }

  /* ── responsive ── */
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr !important; gap: 28px !important; }
    .wmu-hero-copy { order: 1; }
    .wmu-hero-media { order: 2; }
    .model-featured { grid-template-columns: 1fr !important; }
    .expand-layout { grid-template-columns: 1fr !important; }
    .expand-spacer { display: none; }
  }
  @media (max-width: 768px) {
    .fin-grid     { grid-template-columns: 1fr !important; }
    .fin-img      { order: -1; }
    .recognition-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
    .values-row      { grid-template-columns: 1fr !important; }
    .press-grid-new  { grid-template-columns: 1fr !important; }
    .specs-layout    { grid-template-columns: 1fr !important; }
    .specs-cols   { grid-template-columns: 1fr !important; }
    .specs-img    { order: -1; }
    .footer-cols  { grid-template-columns: 1fr !important; gap: 24px !important; }
    .models-grid  { grid-template-columns: repeat(2,1fr) !important; }
    .press-grid-new { grid-template-columns: 1fr 1fr !important; }
    .press-grid-new > :first-child { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .models-grid { grid-template-columns: 1fr !important; }
    .wmu-subnav {
      justify-content: flex-start;
      overflow-x: auto;
      border-radius: 20px;
      max-width: 92%;
      padding: 6px;
      margin: -16px auto -16px;
    }
    .wmu-subnav a {
      white-space: nowrap;
    }
  }

  /* ════════ MANIFIESTO ════════ */
  .manifiesto-section {
    padding: clamp(64px, 9vw, 110px) 0 clamp(48px, 6vw, 80px);
    isolation: isolate;
    background-color: #F2EFE9;
    background-image: 
      linear-gradient(rgba(59, 183, 126, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 183, 126, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .manifiesto-grain {
    position: absolute; inset: 0; pointer-events: none; opacity: .04;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    background-size: 220px 220px;
    mix-blend-mode: multiply;
    animation: mf-grain 12s steps(8) infinite;
  }
  @keyframes mf-grain {
    0%   { transform: translate(0, 0); }
    20%  { transform: translate(-2px, 1px); }
    40%  { transform: translate(1px, -2px); }
    60%  { transform: translate(-1px, 2px); }
    80%  { transform: translate(2px, -1px); }
    100% { transform: translate(0, 0); }
  }
  .manifiesto-gutter {
    position: absolute;
    left: calc(50% - min(600px, 46vw) - clamp(24px, 4vw, 56px));
    top: clamp(110px, 15vw, 190px);
    bottom: clamp(90px, 11vw, 150px);
    width: 2px;
    background: #3BB77E;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 1.6s cubic-bezier(.22,.61,.36,1);
  }
  .manifiesto-section.is-revealed .manifiesto-gutter { transform: scaleY(1); }
  .manifiesto-watermark {
    position: absolute;
    top: clamp(20px, 4vw, 60px);
    left: clamp(16px, 3vw, 40px);
    font-family: "Space Grotesk", sans-serif;
    font-weight: 800;
    font-size: clamp(180px, 26vw, 320px);
    line-height: 1;
    color: #3BB77E;
    opacity: .05;
    pointer-events: none;
    user-select: none;
  }
  .manifiesto-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(16px, 4vw, 48px) 0 calc(50% - min(600px, 46vw) + clamp(24px, 4vw, 56px) + 16px);
  }
  .manifiesto-eyebrow {
    display: block;
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #2a7a4a;
    opacity: .75;
    margin-bottom: 20px;
  }
  .manifiesto-opening {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 800;
    font-size: clamp(18px, 2vw, 26px);
    color: #0e1a11;
    line-height: 1.3;
    max-width: 720px;
    margin: 0 0 clamp(36px, 5vw, 64px);
  }
  .manifiesto-opening em {
    font-style: italic;
    font-weight: 800;
  }
  .manifiesto-declarations {
    display: flex;
    flex-direction: column;
    gap: clamp(22px, 3.4vw, 40px);
    margin-bottom: clamp(36px, 5vw, 64px);
  }
  .manifiesto-line {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
  }
  .manifiesto-roman {
    position: absolute;
    top: -.05em;
    right: 0;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 800;
    font-size: clamp(90px, 14vw, 160px);
    line-height: .9;
    color: #35C36B;
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    transition:
      clip-path .6s cubic-bezier(.22,.61,.36,1),
      opacity .4s ease;
    user-select: none;
    pointer-events: none;
  }
  .manifiesto-line.is-visible .manifiesto-roman {
    opacity: .14;
    clip-path: inset(0 0 0 0);
  }
  .manifiesto-text {
    position: relative;
    z-index: 1;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 800;
    font-size: clamp(28px, 4vw, 52px);
    color: #0e1a11;
    line-height: 1.05;
    letter-spacing: -.02em;
    max-width: 540px;
    margin: 0;
    clip-path: inset(0 100% 0 0);
    transition: clip-path .8s cubic-bezier(.22,.61,.36,1);
  }
  .manifiesto-line.is-visible .manifiesto-text {
    clip-path: inset(0 0 0 0);
  }
  .manifiesto-accent {
    color: #2a7a4a;
    mix-blend-mode: multiply;
  }
  .manifiesto-line--closing .manifiesto-text {
    font-weight: 300;
    font-style: italic;
    font-size: clamp(22px, 3vw, 38px);
    color: #4a6255;
    letter-spacing: -.005em;
    -webkit-mask-image: none;
            mask-image: none;
    -webkit-mask-size: auto;
            mask-size: auto;
    opacity: 0;
    filter: blur(8px);
    transform: translateY(8px);
    transition:
      opacity 1.2s ease .15s,
      filter 1.2s ease .15s,
      transform 1.2s ease .15s;
  }
  .manifiesto-line--closing.is-visible .manifiesto-text {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
  .manifiesto-underline {
    position: absolute;
    left: 0;
    bottom: -.4em;
    width: clamp(140px, 22vw, 260px);
    height: 12px;
    overflow: visible;
    stroke-dasharray: 320;
    stroke-dashoffset: 320;
    transition: stroke-dashoffset 1.4s ease .6s;
  }
  .manifiesto-line--closing.is-visible .manifiesto-underline {
    stroke-dashoffset: 0;
  }
  .manifiesto-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    font-size: clamp(15px, 1.3vw, 17px);
    color: #0e1a11;
    text-decoration: none;
    padding: 14px 0;
    position: relative;
    margin-bottom: clamp(24px, 3.5vw, 44px);
  }
  .manifiesto-cta::after {
    content: "";
    position: absolute;
    left: 0; bottom: 10px;
    width: 100%; height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .35s ease, background-color .25s ease;
  }
  .manifiesto-cta:hover {
    color: #2a7a4a;
  }
  .manifiesto-cta:hover::after {
    transform: scaleX(1);
    background: #2a7a4a;
  }
  .manifiesto-cta svg {
    transition: transform .3s ease;
  }
  .manifiesto-cta:hover svg {
    transform: translateX(8px);
  }
  .manifiesto-rule {
    border: 0;
    border-top: 1px solid #35C36B;
    width: clamp(80px, 12vw, 160px);
    margin: 0 0 18px;
    opacity: .55;
  }
  .manifiesto-signature {
    font-family: "Manrope", sans-serif;
    font-style: italic;
    font-size: 12px;
    color: #0e1a11;
    opacity: .5;
    margin: 0;
  }
`

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function WMU() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="wmu-page wmu-shell" style={{ fontFamily: BODY }}>
      <SEO 
        title="WMU Arquitectura Modular | Módulos Habitacionales Steel Frame"
        description="Descubrí la línea WMU de casas modulares premium llave en mano. Construcción rápida con estructura de steel frame y excelente aislación térmica en Argentina."
        keywords="wmu, arquitectura modular, modulos habitacionales, casas modulares argentina, viviendas industrializadas, modulo cero, steel frame modular"
        ogImage="/wmu/wmu-financing.webp"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'WMU Arquitectura Modular', url: '/wmu' },
        ]}
      />
      <style>{CSS}</style>
      <WMUNav />
      <HeroSection />
      <nav className="wmu-subnav" aria-label="Secciones de arquitectura modular">
        <a href="#proceso-wmu">Proceso</a>
        <a href="#models">Modelos</a>
        <a href="#extender">Extensiones</a>
        <Link to="/wmu-especificaciones">Especificaciones técnicas</Link>
      </nav>
      <ProcessSection />
      <ModelsSection />
      <RecognitionSection />
      <ExpandSection />
      <PressSection />
      <SpecsSection />
      <ManifestoSection />
      <WMUFooter />
      <MobileContactBar />
      <FloatingWhatsApp />
    </div>
  )
}
