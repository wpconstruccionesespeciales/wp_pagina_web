# Plan de Implementación de la Subpágina de Especificaciones WMU

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una nueva subpágina premium para mostrar las especificaciones técnicas completas de los módulos WMU, y cambiar el botón de "VER PLANES" en `WMU.jsx` para que apunte a ella como "VER MÁS ESPECIFICACIONES".

**Architecture:** La subpágina `/wmu-especificaciones` importará y renderizará en formato grilla premium los 19 ítems estructurados de `WMU_INCLUDES` desde `src/data/wmu-modules.js`. Para ello, añadiremos una nueva ruta en `App.jsx`, actualizaremos el enlace en `WMU.jsx` y desarrollaremos el nuevo componente `/pages/WmuEspecificaciones.jsx` siguiendo el diseño premium forest green.

**Tech Stack:** React, React Router, TailwindCSS/CSS en línea, Framer Motion (opcional si es para animaciones sutiles, pero priorizaremos CSS con animaciones en línea para velocidad y consistencia con `WMU.jsx`).

---

### Task 1: Agregar Ruta en `App.jsx`

**Files:**
- Modify: [App.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/App.jsx)

- [ ] **Step 1: Agregar la importación perezosa (lazy) de `WmuEspecificaciones`**
  Modify [App.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/App.jsx) to add:
  ```javascript
  const WmuEspecificaciones = lazy(() => import('./pages/WmuEspecificaciones'))
  ```

- [ ] **Step 2: Configurar la ruta `/wmu-especificaciones`**
  Modify [App.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/App.jsx) by adding the route under `/wmu`:
  ```javascript
  <Route path="/wmu-especificaciones" element={<WmuEspecificaciones />} />
  ```

- [ ] **Step 3: Guardar y verificar**
  Commit:
  ```bash
  git add src/App.jsx
  git commit -m "feat(routing): add lazy load route for wmu-especificaciones"
  ```

---

### Task 2: Modificar botón en `WMU.jsx`

**Files:**
- Modify: [WMU.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/pages/WMU.jsx)

- [ ] **Step 1: Reemplazar el botón "VER PLANES" por "VER MÁS ESPECIFICACIONES"**
  Modify [WMU.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/pages/WMU.jsx) around line 778:
  ```diff
  - <a href="https://www.wpconstrucciones.com/wmu" target="_blank" rel="noopener noreferrer" className="wmu-btn-ghost" style={{ flex: 1, textAlign: 'center' }}>VER PLANES</a>
  + <Link to="/wmu-especificaciones" className="wmu-btn-ghost" style={{ flex: 1, textAlign: 'center', display: 'inline-block' }}>VER MÁS ESPECIFICACIONES</Link>
  ```

- [ ] **Step 2: Guardar y verificar**
  Commit:
  ```bash
  git add src/pages/WMU.jsx
  git commit -m "feat(wmu): update cta to link to wmu-especificaciones subpage"
  ```

---

### Task 3: Crear la nueva subpágina `WmuEspecificaciones.jsx`

**Files:**
- Create: [WmuEspecificaciones.jsx](file:///c:/Users/Gime/Desktop/wp_pagina_web/src/pages/WmuEspecificaciones.jsx)

- [ ] **Step 1: Escribir el código para la subpágina `WmuEspecificaciones.jsx`**
  Create the file with a dark forest green responsive design, parallax hero, navbar with back link to `/wmu`, a grid of 19 cards with checkboxes, a custom "No incluye" panel, and the footer.

  Código propuesto:
  ```jsx
  import { useEffect, useState, useRef } from 'react'
  import { Link } from 'react-router-dom'
  import wpWhite from '../assets/wpblanco.webp'
  import { WMU_INCLUDES } from '../data/wmu-modules'

  // Tokens de diseño alineados con WMU.jsx
  const G    = '#35C36B'
  const BG   = '#0C1210'
  const TXT  = '#F3F5F4'
  const SOFT = '#B7C0BB'
  const HEADING = '"Manrope", sans-serif'
  const BODY    = '"Nunito Sans", sans-serif'
  const WA  = 'https://api.whatsapp.com/send/?phone=5493434056918&text&type=phone_number&app_absent=0'

  function Nav() {
    const [sc, setSc] = useState(false)
    useEffect(() => {
      const fn = () => setSc(window.scrollY > 60)
      window.addEventListener('scroll', fn, { passive: true })
      return () => window.removeEventListener('scroll', fn)
    }, [])
    return (
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: sc ? 'rgba(12,18,16,.95)' : 'transparent',
        backdropFilter: sc ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: sc ? 'blur(14px)' : 'none',
        borderBottom: sc ? '1px solid rgba(255,255,255,.07)' : 'none',
        transition: 'background .35s, border-color .35s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 82, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Link to="/wmu" style={{ position: 'absolute', left: 24, color: 'rgba(255,255,255,.7)', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver a WMU
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={wpWhite} alt="WP Construcciones" style={{ height: 'clamp(42px, 5vw, 54px)', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: .96 }} />
          </Link>
        </div>
      </nav>
    )
  }

  function SpecCard({ text, index }) {
    const [hov, setHov] = useState(false)
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(18, 30, 25, 0.45)',
          border: hov ? `1px solid ${G}` : '1px solid rgba(53, 195, 107, 0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: hov ? '0 16px 36px rgba(53,195,107,.15)' : '0 4px 20px rgba(0,0,0,.15)',
          transform: hov ? 'translateY(-4px)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'rgba(53, 195, 107, 0.15)',
          color: G,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span style={{ color: TXT, fontSize: '14px', lineHeight: '1.6', fontFamily: BODY, fontWeight: '500' }}>
          {text}
        </span>
      </div>
    )
  }

  function Footer() {
    return (
      <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,.07)', padding: 'clamp(40px,6vw,72px) 0 clamp(20px,4vw,40px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
          <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: TXT, marginBottom: 10, fontFamily: BODY }}>WP construcciones especiales</div>
              <div style={{ color: SOFT, fontSize: 13, lineHeight: 1.75, fontFamily: BODY }}>PARANÁ, E.RÍOS ARGENTINA CP3100<br/>contacto@wpconstrucciones.com.ar<br/>Cel: +54 9 3434 05-6918</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: TXT, marginBottom: 10, fontFamily: BODY }}>Horario</div>
              <div style={{ color: SOFT, fontSize: 13, lineHeight: 1.8, fontFamily: BODY }}>Lunes-Viernes<br/>8 a.m. – 4 p.m.</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: TXT, marginBottom: 10, fontFamily: BODY }}>Seguinos</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <a href="https://www.facebook.com/wpconstruccionesespeciales" target="_blank" rel="noopener noreferrer" style={{ color: SOFT, textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY }}>Facebook</a>
                <a href="https://www.instagram.com/wpconstrucciones.especiales" target="_blank" rel="noopener noreferrer" style={{ color: SOFT, textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: BODY }}>Instagram</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ color: SOFT, fontSize: 12, fontFamily: BODY }}>© 2025 WP Construcciones Especiales. Todos los derechos reservados.</span>
            <Link to="/wmu" style={{ color: G, fontSize: 12, textDecoration: 'none', fontWeight: 600, fontFamily: BODY }}>← Volver a WMU</Link>
          </div>
        </div>
      </footer>
    )
  }

  export default function WmuEspecificaciones() {
    // Scroll to top on load
    useEffect(() => {
      window.scrollTo(0, 0)
      document.title = "Especificaciones Constructivas | Módulos WMU"
    }, [])

    const allItems = WMU_INCLUDES.flatMap(group => group.items)

    const noIncludes = [
      "Logística de traslado, montaje final en el terreno",
      "Trabajos preliminares, nivelación, fundaciones",
      "Solicitud de servicios (gastos de solicitud)",
      "Presentación municipal (gastos de presentacion)"
    ]

    return (
      <div style={{ background: '#0e1a14', color: TXT, minHeight: '100vh', fontFamily: BODY, overflowX: 'hidden' }}>
        <Nav />

        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: '420px',
          backgroundImage: 'url("/wmu/aldea+(3).webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Parallax semi-dark gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(14,26,20,0.55) 0%, rgba(14,26,20,0.92) 100%)',
            zIndex: 1
          }} />
          
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px', marginTop: '60px' }}>
            <h1 style={{
              fontFamily: HEADING,
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              margin: 0,
              color: TXT
            }}>
              Lo que incluimos en módulos WMU
            </h1>
          </div>
        </section>

        {/* Specs List Grid */}
        <section style={{
          padding: '60px 0 100px 0',
          background: 'linear-gradient(to bottom, #0e1a14 0%, #08110c 100%)',
          position: 'relative'
        }}>
          {/* DNA grid decorative lines */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .03, pointerEvents: 'none', background: 'repeating-linear-gradient(60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px),repeating-linear-gradient(-60deg,rgba(255,255,255,.3) 0 1px,transparent 1px 36px)' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', position: 'relative', zIndex: 2 }}>
            
            {/* Headers */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontFamily: HEADING,
                fontSize: 'clamp(20px, 3.2vw, 36px)',
                fontWeight: 800,
                color: TXT,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: '0 0 8px 0'
              }}>
                Especificaciones Constructivas
              </h2>
              <p style={{
                fontFamily: HEADING,
                fontSize: '13px',
                fontWeight: 700,
                color: G,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0
              }}>
                Detalle Técnico WMU
              </p>
            </div>

            {/* "Qué incluye" banner with "Modelo completo" badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '14px'
            }}>
              <h3 style={{
                fontFamily: HEADING,
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
                color: TXT
              }}>
                Qué incluye
              </h3>
              <span style={{
                background: '#106843',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                Modelo Completo
              </span>
            </div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '80px'
            }}>
              {allItems.map((item, index) => (
                <SpecCard key={index} text={item} index={index} />
              ))}
            </div>

            {/* "No incluye" banner */}
            <div style={{
              marginBottom: '24px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '14px'
            }}>
              <h3 style={{
                fontFamily: HEADING,
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
                color: TXT
              }}>
                No incluye
              </h3>
            </div>

            {/* No incluye Items */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '32px',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px'
              }}>
                {noIncludes.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.3)',
                      marginTop: '8px',
                      flexShrink: 0
                    }} />
                    <span style={{
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      fontFamily: BODY
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    )
  }
  ```

- [ ] **Step 2: Guardar y verificar**
  Commit:
  ```bash
  git add src/pages/WmuEspecificaciones.jsx
  git commit -m "feat(wmu): create premium technical specifications subpage"
  ```
