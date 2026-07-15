import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import wpWhite from '../assets/wpblanco.webp'
import { WMU_INCLUDES } from '../data/wmu-modules'

// Paleta de colores de lujo: verdes profundos, gris salvia y acento esmeralda
const G       = '#35C36B' // Verde esmeralda de la marca
const BG      = '#090e0b' // Fondo ultra oscuro
const PANEL   = '#111d16' // Fondo de tarjeta/sección verde musgo oscuro
const ACCENT  = '#1a2e22' // Detalle de realce
const TXT     = '#ffffff' // Texto principal
const SAGE    = '#a0b5a5' // Gris salvia para descripciones secundarias
const HEADING = '"Manrope", sans-serif'
const BODY    = '"Nunito Sans", sans-serif'
const WA      = 'https://api.whatsapp.com/send/?phone=5493434056918&text&type=phone_number&app_absent=0'

// Textos editoriales introductorios para cada categoría de la ficha técnica
const CATEGORY_DESC = {
  'Estructura y Cerramientos': 'La solidez del acero estructural y un sistema multicapa de aislación termoacústica garantizan la máxima eficiencia y durabilidad en cualquier condición climática.',
  'Interiores y Terminaciones': 'Detalles diseñados para el confort y la calidez diaria. Materiales seleccionados bajo estrictos estándares de diseño de interiores y texturas de alta gama.',
  'Equipamiento y Muebles': 'Cocinas y baños completamente funcionales con marcas líderes, mesadas de granito natural y mobiliario a medida de alta durabilidad.',
  'Instalaciones y Documentación': 'Sistemas listos para su uso inmediato con preinstalaciones embutidas, certificación de calidad y manuales técnicos de mantenimiento.'
}

// Descripciones detalladas para las exclusiones de obra (evita bullets simples)
const EXCLUSIONES_DETAILS = [
  {
    title: 'Logística y Montaje',
    desc: 'Fletes, traslados de módulos desde planta y montaje final mediante grúa en el terreno del cliente.'
  },
  {
    title: 'Trabajos Preliminares',
    desc: 'Tareas de nivelación de suelo, excavaciones, fundaciones y bases de apoyo para el anclaje del módulo.'
  },
  {
    title: 'Gestión de Servicios',
    desc: 'Trámites, acometidas y costos de conexión de agua, luz, cloacas y gas en el sitio final.'
  },
  {
    title: 'Presentación Municipal',
    desc: 'Tasas de edificación, firma de planos locales y gestiones ante la municipalidad correspondiente.'
  }
]

function Nav() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: sc ? 'rgba(9, 14, 11, 0.96)' : 'rgba(9, 14, 11, 0.2)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 82, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Link to="/wmu" style={{ position: 'absolute', left: 24, color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: 13, fontWeight: 700, fontFamily: BODY, display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }} className="nav-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          Volver a WMU
        </Link>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={wpWhite} alt="WP Construcciones" width="256" height="72" style={{ height: 'clamp(42px, 5vw, 54px)', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: .96 }} />
        </Link>
      </div>
    </nav>
  )
}

function SpecCard({ text }) {
  return (
    <Motion.div
      whileHover={{ y: -5, scale: 1.01, borderColor: G, backgroundColor: 'rgba(53, 195, 107, 0.06)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        padding: '24px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        cursor: 'default'
      }}
    >
      <span style={{
        color: G,
        fontSize: '18px',
        fontWeight: '900',
        lineHeight: '1.2',
        userSelect: 'none',
        flexShrink: 0,
        marginTop: '-2px'
      }}>
        ✓
      </span>
      <span style={{ color: TXT, fontSize: '14px', lineHeight: '1.6', fontFamily: BODY, fontWeight: '500', opacity: 0.9 }}>
        {text}
      </span>
    </Motion.div>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#050706', borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: 'clamp(60px,8vw,100px) 0 clamp(30px,4vw,50px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: TXT, marginBottom: 16, fontFamily: BODY, letterSpacing: '0.02em' }}>WP construcciones especiales</div>
            <div style={{ color: SAGE, fontSize: 13, lineHeight: 1.8, fontFamily: BODY }}>PARANÁ, E.RÍOS ARGENTINA CP3100<br/>contacto@wpconstrucciones.com.ar<br/>Cel: +54 9 3434 05-6918</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: TXT, marginBottom: 16, fontFamily: BODY, letterSpacing: '0.04em' }}>Horario</div>
            <div style={{ color: SAGE, fontSize: 13, lineHeight: 1.8, fontFamily: BODY }}>Lunes-Viernes<br/>8 a.m. – 4 p.m.</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: TXT, marginBottom: 16, fontFamily: BODY, letterSpacing: '0.04em' }}>Seguinos</div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="https://www.facebook.com/wpconstruccionesespeciales" target="_blank" rel="noopener noreferrer" style={{ color: SAGE, textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = SAGE}>Facebook</a>
              <a href="https://www.instagram.com/wpconstrucciones.especiales" target="_blank" rel="noopener noreferrer" style={{ color: SAGE, textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = SAGE}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ color: SAGE, fontSize: 12, fontFamily: BODY }}>© 2025 WP Construcciones Especiales. Todos los derechos reservados. — Sitio web desarrollado por <a href="https://tomygiorgi.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: G, textDecoration: 'none', fontWeight: 600 }}>Tomás Giorgi</a></span>
          <Link to="/wmu" style={{ color: G, fontSize: 12, textDecoration: 'none', fontWeight: 600, fontFamily: BODY, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = G}>← Volver a WMU</Link>
        </div>
      </div>
    </footer>
  )
}

export default function WmuEspecificaciones() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ background: BG, color: TXT, minHeight: '100vh', fontFamily: BODY, overflowX: 'hidden' }}>
      <SEO 
        title="Especificaciones Técnicas | Módulos WMU · Steel Frame"
        description="Ficha técnica detallada del equipamiento estándar e ingeniería de los módulos habitacionales WMU. Detalles de estructura de steel frame y aberturas."
        keywords="especificaciones tecnicas wmu, ficha tecnica steel frame, equipamiento modulo habitable, construccion industrializada, wp construcciones"
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'WMU Arquitectura Modular', url: '/wmu' },
          { name: 'Especificaciones Técnicas', url: '/wmu-especificaciones' },
        ]}
      />
      <Nav />

      {/* Hero Section Imersiva */}
      <section style={{
        position: 'relative',
        height: '70vh',
        backgroundImage: 'url("/wmu/aldea+(3).webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Gradiente cinemático oscuro */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(9, 14, 11, 0.3) 0%, rgba(9, 14, 11, 0.75) 60%, ${BG} 100%)`,
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 800, marginTop: '80px' }}>
          <Motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              color: G,
              fontFamily: HEADING,
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '16px'
            }}
          >
            Ficha Técnica Detallada
          </Motion.span>
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: HEADING,
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              margin: '0 0 20px 0',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
              color: TXT
            }}
          >
            Lo que incluimos en módulos WMU
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: SAGE,
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              lineHeight: '1.7',
              maxWidth: '620px',
              margin: '0 auto',
              fontWeight: '500'
            }}
          >
            Explorá en detalle la memoria descriptiva y los estándares constructivos premium que componen cada espacio llave en mano.
          </Motion.p>

          {/* Indicador de scroll animado */}
          <Motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'default' }}
          >
            <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: SAGE, textTransform: 'uppercase', fontWeight: 700 }}>Scroll para explorar</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </Motion.div>
        </div>
      </section>

      {/* Bloques de Categorías Técnicas */}
      <section style={{ padding: '80px 0 60px 0', background: BG, position: 'relative' }}>
        {/* Fondo decorativo sutil */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .02, pointerEvents: 'none', background: 'repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 40px)' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
          
          {WMU_INCLUDES.map((category, index) => {
            const numStr = String(index + 1).padStart(2, '0')
            return (
              <Motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  marginBottom: '100px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '48px'
                }}
              >
                {/* Gran número de fondo decorativo asimétrico */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '0',
                  fontSize: 'clamp(90px, 14vw, 160px)',
                  fontFamily: HEADING,
                  fontWeight: 900,
                  color: 'rgba(53, 195, 107, 0.03)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0
                }}>
                  {numStr}
                </div>

                {/* Encabezado Editorial de Categoría */}
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '750px', marginBottom: '36px' }}>
                  <span style={{ color: G, fontFamily: HEADING, fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Categoría {numStr}
                  </span>
                  <h2 style={{
                    fontFamily: HEADING,
                    fontSize: 'clamp(22px, 3vw, 32px)',
                    fontWeight: 800,
                    margin: '6px 0 14px 0',
                    color: TXT,
                    letterSpacing: '-0.01em'
                  }}>
                    {category.title}
                  </h2>
                  <p style={{
                    color: SAGE,
                    fontSize: '15px',
                    lineHeight: '1.65',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {CATEGORY_DESC[category.title] || ''}
                  </p>
                </div>

                {/* Grilla Asimétrica y Limpia de Especificaciones */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '16px'
                }}>
                  {category.items.map((item, specIdx) => (
                    <SpecCard key={specIdx} text={item} />
                  ))}
                </div>
              </Motion.div>
            )
          })}

        </div>
      </section>

      {/* Sección NO INCLUYE (Exclusiones de Obra) */}
      <section style={{ padding: '80px 0', background: '#060a07', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
          
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '16px',
              marginBottom: '36px'
            }}
          >
            <span style={{ color: '#e53e3e', fontFamily: HEADING, fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Delimitación de Responsabilidad
            </span>
            <h2 style={{
              fontFamily: HEADING,
              fontSize: '24px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: '6px 0 0 0',
              color: TXT
            }}>
              Exclusiones de Obra
            </h2>
          </Motion.div>

          {/* Grilla de Exclusiones de Alta Gama */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {EXCLUSIONES_DETAILS.map((ex, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '4px',
                  padding: '24px',
                  position: 'relative'
                }}
              >
                {/* Viñeta roja arquitectónica vertical */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '28px',
                  width: '3px',
                  height: '16px',
                  background: '#e53e3e',
                  boxShadow: '0 0 8px rgba(229, 62, 62, 0.4)'
                }} />
                
                <h4 style={{
                  fontFamily: HEADING,
                  fontSize: '15px',
                  fontWeight: 800,
                  margin: '0 0 10px 12px',
                  color: TXT
                }}>
                  {ex.title}
                </h4>
                <p style={{
                  color: SAGE,
                  fontSize: '13px',
                  lineHeight: '1.6',
                  fontFamily: BODY,
                  margin: '0 0 0 12px',
                  fontWeight: '500'
                }}>
                  {ex.desc}
                </p>
              </Motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Sección: Configuremos tu próximo espacio */}
      <section style={{
        padding: '100px 0',
        background: `linear-gradient(180deg, #060a07 0%, ${PANEL} 100%)`,
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontFamily: HEADING,
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            margin: '0 0 14px 0'
          }}>
            ¿Tenés alguna consulta técnica?
          </h2>
          <p style={{
            color: SAGE,
            fontSize: '15px',
            lineHeight: '1.65',
            maxWidth: '560px',
            margin: '0 auto 36px auto',
            fontWeight: '500'
          }}>
            Ponete en contacto con nuestro equipo de ingeniería para profundizar en detalles de obra, planos estructurales y factibilidad de terreno.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Motion.a
              whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(53, 195, 107, 0.25)' }}
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: G,
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '14px',
                fontFamily: BODY,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              Consultar por WhatsApp
            </Motion.a>
            <Motion.a
              whileHover={{ y: -3, borderColor: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              href="https://www.wpconstrucciones.com/wmu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '15px 36px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '14px',
                fontFamily: BODY,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
            >
              Ver Catálogo Completo
            </Motion.a>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .nav-back-btn:hover {
          color: #35C36B !important;
        }
      `}</style>
    </div>
  )
}
