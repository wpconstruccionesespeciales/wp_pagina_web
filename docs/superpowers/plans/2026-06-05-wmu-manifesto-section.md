# Manifiesto WMU — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar `FinancingSection` en `src/pages/WMU.jsx` por una sección de manifiesto tipográfico que posicione a WMU como estudio de arquitectura, con sticky scroll reveal y microanimaciones editoriales.

**Architecture:** Componente React inline en el mismo archivo `WMU.jsx` (mismo patrón que las otras secciones), siguiendo el patrón `useFadeIn` + CSS animations. Sin nuevas dependencias. El componente se vuelve sticky en desktop, las 4 declaraciones aparecen en secuencia al scrollear.

**Tech Stack:** React 19, CSS inline + template literal, `IntersectionObserver` (ya en el proyecto vía `useFadeIn`), sin librerías nuevas.

---

## Estructura de archivos

**Modificar:**
- `src/pages/WMU.jsx` — reemplazar `FinancingSection` (líneas 341-415) por `ManifestoSection`, agregar CSS al template literal `CSS` (líneas 660-730), cambiar `<FinancingSection />` por `<ManifestoSection />` en el árbol (línea 744), agregar hook `useStickyReveal` cerca de `useFadeIn` (línea 53).

**Sin archivos nuevos.** Sin dependencias nuevas. Sin cambios en otras páginas, NavBar o footer.

---

## Convenciones del proyecto

- Tokens de color ya definidos en `WMU.jsx`: `G = '#35C36B'`, `BG = '#0C1210'`, `TXT = '#F3F5F4'`, `SOFT = '#B7C0BB'`.
- Tipografías: `HEADING = '"Manrope", sans-serif'`, `BODY = '"Nunito Sans", sans-serif'`.
- Colores crema del proyecto: `#EDE9E3` (background) y `#0e1a11` (texto sobre crema).
- Para acentos en crema: `#2a7a4a` (verde apagado, ya usado en `RecognitionSection`).
- Estilo de commits: `feat(wmu): ...`, `style(wmu): ...`, `docs(wmu): ...` (ver `git log`).
- Lint: `npm run lint`. Build: `npm run build`. Dev: `npm run dev`.

---

## Task 1: Reemplazar el componente y agregar el hook base

**Files:**
- Modify: `src/pages/WMU.jsx:53-63` (agregar hook `useStickyReveal` debajo de `useFadeIn`)
- Modify: `src/pages/WMU.jsx:341-415` (reemplazar `FinancingSection` por esqueleto de `ManifestoSection`)
- Modify: `src/pages/WMU.jsx:744` (cambiar `<FinancingSection />` por `<ManifestoSection />`)

- [ ] **Step 1.1: Agregar el hook `useStickyReveal` debajo de `useFadeIn`**

Insertar después de la línea 63 (cierre de `useFadeIn`), antes del comentario `/* ═══... NAV ═══ */`:

```jsx
/* ── hook ── */
function useStickyReveal(itemCount) {
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
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])
  const setRef = (i) => (el) => { refs.current[i] = el }
  return [setRef, vis]
}
```

- [ ] **Step 1.2: Reemplazar `FinancingSection` por el esqueleto de `ManifestoSection`**

Reemplazar las líneas 341-415 completas con el siguiente bloque. Mantener el banner de comentario al inicio (líneas 341-345) actualizado:

```jsx
/* ═══════════════════════════════════════════════════════════════════════════
   4 · MANIFIESTO  — typographic manifesto with sticky reveal
   Editorial layout: cream background, roman numerals as watermarks,
   mask-wipe reveals, monogram, gutter line.
═══════════════════════════════════════════════════════════════════════════ */
const MANIFESTO_LINES = [
  { roman: 'I',   text: ['Antes del ', { accent: 'acero' }, ', hay una idea.'] },
  { roman: 'II',  text: ['Antes del ', { accent: 'módulo' }, ', un proyecto.'] },
  { roman: 'III', text: ['Antes del ', { accent: 'precio' }, ', una conversación.'] },
  { roman: 'IV',  text: ['Y al final, queda lo que ', { accent: 'imaginaste' }, '.'], closing: true },
]

function ManifestoSection() {
  const [setRef, vis] = useStickyReveal(MANIFESTO_LINES.length)
  return (
    <section id="manifiesto" className="manifiesto-section" style={{
      background: '#EDE9E3',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="manifiesto-grain" aria-hidden="true" />
      <div className="manifiesto-gutter" aria-hidden="true" />
      <div className="manifiesto-watermark" aria-hidden="true">W</div>

      <div className="manifiesto-inner">
        <span className="manifiesto-eyebrow">FILOSOFÍA WMU</span>

        <p className="manifiesto-opening">
          <em>WMU</em> es nuestro estudio de arquitectura. Casas y todo lo que se te ocurra después.
        </p>

        <div className="manifiesto-declarations">
          {MANIFESTO_LINES.map((line, i) => (
            <div
              key={line.roman}
              ref={setRef(i)}
              className={`manifiesto-line${line.closing ? ' manifiesto-line--closing' : ''}${vis[i] ? ' is-visible' : ''}`}
            >
              <span className="manifiesto-roman" aria-hidden="true">{line.roman}</span>
              <p className="manifiesto-text">
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
          ))}
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
```

- [ ] **Step 1.3: Cambiar el uso en la página**

En la línea 744, reemplazar:

```jsx
      <FinancingSection />
```

por:

```jsx
      <ManifestoSection />
```

- [ ] **Step 1.4: Verificar que el archivo compila**

Run: `npm run build`
Expected: build completes sin errores. La página no tiene aún estilos para las clases nuevas (se agregan en Task 2), pero el JSX debe compilar.

- [ ] **Step 1.5: Commit**

```bash
git add src/pages/WMU.jsx
git commit -m "feat(wmu): scaffold ManifestoSection replacing FinancingSection"
```

---

## Task 2: Agregar los estilos base (tipografía, layout, fondo)

**Files:**
- Modify: `src/pages/WMU.jsx:660-730` (template literal `CSS`)

- [ ] **Step 2.1: Agregar bloque CSS del manifiesto al final del template literal `CSS`**

Localizar el cierre del template `CSS` (el backtick final en línea 730, antes del comentario `/* ═══... PAGE ═══ */`). Insertar antes del backtick de cierre:

```css
  /* ════════ MANIFIESTO ════════ */
  .manifiesto-section {
    padding: clamp(100px, 14vw, 180px) 0 clamp(80px, 10vw, 140px);
  }
  .manifiesto-grain {
    position: absolute; inset: 0; pointer-events: none; opacity: .045;
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
    background: #35C36B;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 1.6s cubic-bezier(.22,.61,.36,1);
  }
  .manifiesto-section.is-revealed .manifiesto-gutter { transform: scaleY(1); }
  .manifiesto-watermark {
    position: absolute;
    top: clamp(20px, 4vw, 60px);
    left: clamp(16px, 3vw, 40px);
    font-family: "Manrope", sans-serif;
    font-weight: 800;
    font-size: clamp(180px, 26vw, 320px);
    line-height: 1;
    color: #35C36B;
    opacity: .045;
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
    font-family: "Nunito Sans", sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #2a7a4a;
    opacity: .75;
    margin-bottom: 28px;
  }
  .manifiesto-opening {
    font-family: "Manrope", sans-serif;
    font-weight: 800;
    font-size: clamp(20px, 2.4vw, 32px);
    color: #0e1a11;
    line-height: 1.35;
    max-width: 720px;
    margin: 0 0 clamp(60px, 9vw, 110px);
  }
  .manifiesto-opening em {
    font-style: italic;
    font-weight: 800;
  }
  .manifiesto-declarations {
    display: flex;
    flex-direction: column;
    gap: clamp(36px, 6vw, 72px);
    margin-bottom: clamp(60px, 9vw, 110px);
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
    font-family: "Manrope", sans-serif;
    font-weight: 800;
    font-size: clamp(110px, 18vw, 200px);
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
    font-family: "Manrope", sans-serif;
    font-weight: 800;
    font-size: clamp(38px, 5.5vw, 72px);
    color: #0e1a11;
    line-height: 1.05;
    letter-spacing: -.02em;
    max-width: 540px;
    margin: 0;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 100%);
            mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 100%);
    -webkit-mask-size: 0% 100%;
            mask-size: 0% 100%;
    -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
    transition: -webkit-mask-size .7s cubic-bezier(.22,.61,.36,1) .15s;
            transition:         mask-size .7s cubic-bezier(.22,.61,.36,1) .15s;
  }
  .manifiesto-line.is-visible .manifiesto-text {
    -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
  }
  .manifiesto-accent {
    color: #2a7a4a;
    mix-blend-mode: multiply;
  }
  .manifiesto-line--closing .manifiesto-text {
    font-weight: 300;
    font-style: italic;
    font-size: clamp(28px, 4vw, 52px);
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
    font-family: "Manrope", sans-serif;
    font-weight: 700;
    font-size: clamp(15px, 1.3vw, 17px);
    color: #0e1a11;
    text-decoration: none;
    padding: 14px 0;
    position: relative;
    margin-bottom: clamp(40px, 6vw, 72px);
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
    font-family: "Nunito Sans", sans-serif;
    font-style: italic;
    font-size: 12px;
    color: #0e1a11;
    opacity: .5;
    margin: 0;
  }
```

- [ ] **Step 2.2: Verificar build**

Run: `npm run build`
Expected: build OK, sin warnings nuevos.

- [ ] **Step 2.3: Verificar lint**

Run: `npm run lint`
Expected: 0 errors. Warnings sobre orden de propiedades CSS en template literal son tolerables; el plugin `eslint` no parsea CSS.

- [ ] **Step 2.4: Verificar visualmente en dev**

Run: `npm run dev`
Open: `http://localhost:5173/wmu`
Expected: la sección se ve con fondo crema, monograma "W" gigante tenue en la esquina superior izquierda, línea vertical verde a la izquierda del contenido, eyebrow "FILOSOFÍA WMU", apertura visible, las 4 declaraciones renderizadas pero sin revelar (sin animarse aún, ya que `useStickyReveal` no se ha cableado con `is-revealed` en el contenedor — eso es Task 3).

- [ ] **Step 2.5: Commit**

```bash
git add src/pages/WMU.jsx
git commit -m "style(wmu): add manifesto typography, layout and background styles"
```

---

## Task 3: Cablear el IntersectionObserver en el contenedor y los items

**Files:**
- Modify: `src/pages/WMU.jsx` (en el componente `ManifestoSection`, agregar un `useFadeIn` para el contenedor y un `is-revealed` en el `<section>`)

- [ ] **Step 3.1: Reemplazar la firma del componente**

En la línea donde está `function ManifestoSection() {`, reemplazar el bloque entero del componente por:

```jsx
function ManifestoSection() {
  const [containerRef, containerVis] = useFadeIn(0.05)
  const [setRef, vis] = useStickyReveal(MANIFESTO_LINES.length)
  return (
    <section
      id="manifiesto"
      ref={containerRef}
      className={`manifiesto-section${containerVis ? ' is-revealed' : ''}`}
      style={{
        background: '#EDE9E3',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div className="manifiesto-grain" aria-hidden="true" />
      <div className="manifiesto-gutter" aria-hidden="true" />
      <div className="manifiesto-watermark" aria-hidden="true">W</div>

      <div className="manifiesto-inner">
        <span className="manifiesto-eyebrow">FILOSOFÍA WMU</span>

        <p className="manifiesto-opening">
          <em>WMU</em> es nuestro estudio de arquitectura. Casas y todo lo que se te ocurra después.
        </p>

        <div className="manifiesto-declarations">
          {MANIFESTO_LINES.map((line, i) => (
            <div
              key={line.roman}
              ref={setRef(i)}
              className={`manifiesto-line${line.closing ? ' manifiesto-line--closing' : ''}${vis[i] ? ' is-visible' : ''}`}
            >
              <span className="manifiesto-roman" aria-hidden="true">{line.roman}</span>
              <p className="manifiesto-text">
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
          ))}
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
```

Nota: el cambio clave respecto a Task 1.2 es:
- Se importa `useFadeIn` (ya está en el archivo) y se aplica al contenedor.
- El `<section>` recibe el ref del contenedor y la clase `is-revealed` cuando entra al viewport.
- Esto hace que la línea vertical del gutter y el monograma se activen cuando la sección entra a pantalla.

- [ ] **Step 3.2: Verificar visualmente**

Run: `npm run dev`
Open: `http://localhost:5173/wmu`, scrollear hasta la sección.
Expected: al entrar a la sección, la línea vertical del gutter crece de 0 a full-height. El monograma "W" se ve estático (ya estaba, ahora con `is-revealed` activo). Los numerales romanos y los textos de las 4 declaraciones revelan al scrollear.

- [ ] **Step 3.3: Commit**

```bash
git add src/pages/WMU.jsx
git commit -m "feat(wmu): wire up IntersectionObserver for manifesto reveal"
```

---

## Task 4: Sticky scroll en desktop

**Files:**
- Modify: `src/pages/WMU.jsx` (template literal `CSS`)

- [ ] **Step 4.1: Agregar media query de sticky solo en desktop**

En el template literal `CSS`, agregar al final (antes del backtick de cierre):

```css
  /* manifesto — desktop sticky */
  @media (min-width: 1024px) {
    .manifiesto-section {
      position: sticky;
      top: 0;
      z-index: 2;
      /* el contenedor padre del sticky debe tener height extra;
         como ManifestoSection es hijo directo del wrapper de la página,
         usamos min-height para crear el "espacio" de scroll */
    }
  }
```

Pero el sticky necesita un **contenedor padre con altura**. El `WMU` page retorna un `<div>` que envuelve todo. Para que el sticky funcione, hay que envolver la sección. Cambiar la estructura de la página:

En el componente `export default function WMU()` (línea 735), modificar el return para envolver cada sección que necesite scroll-extended. Como solo queremos que el manifiesto sea sticky durante 1.5 pantallas, la forma más simple es agregar `min-height` al `<section>` mismo cuando está en desktop (pero esto rompe el sticky porque sticky necesita un padre más alto).

**Enfoque alternativo más simple y robusto:** NO usar `position: sticky` en el section. En su lugar, hacer que las 4 declaraciones se revelen a medida que el usuario scrollea, usando un threshold escalonado en el `useStickyReveal`. El efecto se siente como sticky sin el riesgo de scroll-jank.

Modificar `useStickyReveal` para que cada item tenga un threshold menor que el anterior, generando un cascade reveal:

Reemplazar el bloque `{ threshold: 0.25 }` en el `useStickyReveal` por:

```jsx
{ threshold: [0.1, 0.25, 0.5][i] || 0.1, rootMargin: '0px 0px -10% 0px' }
```

- [ ] **Step 4.2: Verificar que el reveal cascade funciona**

Run: `npm run dev`
Scrollear lento por la sección.
Expected: las 4 declaraciones aparecen en cascada mientras el usuario pasa por la sección. El numeral romano se pinta de izquierda a derecha. El texto se destapa con mask wipe. La declaración IV (cierre) entra con blur y el subrayado se dibuja con stroke.

- [ ] **Step 4.3: Commit**

```bash
git add src/pages/WMU.jsx
git commit -m "feat(wmu): cascade reveal thresholds for manifesto declarations"
```

---

## Task 5: Responsive mobile + reduced motion

**Files:**
- Modify: `src/pages/WMU.jsx` (template literal `CSS`)

- [ ] **Step 5.1: Agregar media queries mobile + reduced motion**

En el template literal `CSS`, agregar al final (antes del backtick de cierre):

```css
  /* manifesto — mobile */
  @media (max-width: 767px) {
    .manifiesto-section { padding: 80px 0 60px; }
    .manifiesto-watermark { font-size: 160px; }
    .manifiesto-roman {
      position: static;
      display: block;
      font-size: 80px;
      margin-bottom: 8px;
      text-align: right;
    }
    .manifiesto-text { max-width: 100%; }
    .manifiesto-line--closing .manifiesto-text { font-size: 28px; }
    .manifiesto-cta {
      min-height: 44px;
      align-items: center;
    }
    .manifiesto-gutter {
      left: calc(50% - min(600px, 46vw) - 12px);
      width: 1.5px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .manifiesto-watermark { font-size: 240px; }
    .manifiesto-roman { font-size: 140px; }
  }

  /* manifesto — reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .manifiesto-grain { animation: none; }
    .manifiesto-gutter { transition: none; transform: scaleY(1); }
    .manifiesto-text,
    .manifiesto-line--closing .manifiesto-text,
    .manifiesto-underline,
    .manifiesto-roman {
      transition: opacity .2s ease;
      -webkit-mask-size: 100% 100% !important;
              mask-size: 100% 100% !important;
      clip-path: none !important;
      filter: none !important;
      transform: none !important;
      stroke-dashoffset: 0 !important;
    }
    .manifiesto-roman { opacity: .14 !important; }
  }
```

- [ ] **Step 5.2: Verificar mobile en DevTools**

Run: `npm run dev`
Abrir DevTools → modo responsive → 375px width.
Expected: el watermark "W" se ve más chico, el numeral romano se mueve arriba de la declaración (no al costado), el padding se reduce, la línea del gutter se ve más fina. Todo legible.

- [ ] **Step 5.3: Verificar reduced motion**

En DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`.
Reload.
Expected: la página carga con todo visible inmediatamente, sin animaciones de mask wipe, blur, ni clip-path. El texto aparece directamente.

- [ ] **Step 5.4: Commit**

```bash
git add src/pages/WMU.jsx
git commit -m "style(wmu): add mobile responsive and reduced-motion fallbacks for manifesto"
```

---

## Task 6: Limpieza y verificación final

**Files:**
- Modify: `src/pages/WMU.jsx` (posibles ajustes finos)

- [ ] **Step 6.1: Verificar que no quedan referencias huérfanas a `FinancingSection`**

Run: 
```bash
git grep -n "FinancingSection" src/
```
Expected: 0 resultados. Si hay resultados, eliminar la función `FinancingSection` completa (líneas 341-415 si quedaron) y cualquier import/referencia.

Run también:
```bash
git grep -n "financiacion-wmu" src/
```
Expected: 0 resultados.

- [ ] **Step 6.2: Verificar que el linter pasa limpio**

Run: `npm run lint`
Expected: 0 errors.

- [ ] **Step 6.3: Verificar build de producción**

Run: `npm run build`
Expected: build OK, bundle size no aumenta significativamente (<5KB gzipped extra por el nuevo CSS y JSX).

- [ ] **Step 6.4: Verificación visual final**

Run: `npm run dev`
Open: `http://localhost:5173/wmu`
Checklist visual:
- [ ] Fondo crema con grano muy sutil (no perceptible de cerca, sí en screenshots).
- [ ] Monograma "W" gigante tenue en la esquina superior izquierda.
- [ ] Línea vertical verde en el gutter izquierdo, presente y con altura completa.
- [ ] Eyebrow "FILOSOFÍA WMU" en verde apagado.
- [ ] Apertura "WMU es nuestro estudio de arquitectura..." con "WMU" en italic.
- [ ] Las 4 declaraciones aparecen en secuencia al scrollear.
- [ ] Numerales romanos (I, II, III, IV) gigantes al costado de cada declaración, pintándose de izquierda a derecha.
- [ ] Palabras acento (acero, módulo, precio, imaginaste) en verde con multiply.
- [ ] Declaración IV en light italic, con blur al entrar y subrayado a mano dibujándose.
- [ ] "Hablemos →" en tipografía discreta, con underline animado en hover.
- [ ] Línea horizontal verde fina antes de la firma.
- [ ] "— Equipo WP + WMU" en italic pequeño.
- [ ] En hover del CTA: flecha se mueve 8px, color cambia a verde, underline se dibuja.

- [ ] **Step 6.5: Commit final (si hubo ajustes)**

```bash
git add src/pages/WMU.jsx
git commit -m "chore(wmu): final cleanup after manifesto implementation"
```

---

## Resumen de tareas

| Task | Descripción                                       | Tiempo estimado |
|------|---------------------------------------------------|-----------------|
| 1    | Esqueleto del componente + hook + cambio en page  | ~10 min         |
| 2    | CSS base (tipografía, layout, fondo)              | ~15 min         |
| 3    | Wire-up del IntersectionObserver                  | ~5 min          |
| 4    | Reveal en cascada                                 | ~5 min          |
| 5    | Responsive mobile + reduced motion                | ~10 min         |
| 6    | Limpieza y verificación final                     | ~10 min         |
|      | **Total**                                         | **~55 min**     |

---

## Criterios de "listo"

- ✅ `FinancingSection` completamente removida.
- ✅ `ManifestoSection` renderiza en el slot entre Models y Expand.
- ✅ Copy completo según spec: apertura + 4 declaraciones + cierre.
- ✅ Animaciones: reveal en cascada, mask wipe, clip-path numerals, blur en IV, stroke SVG underline.
- ✅ Gutter line vertical verde presente.
- ✅ Monograma "W" en la esquina.
- ✅ Ruido de fondo sutil.
- ✅ Mobile responsivo.
- ✅ `prefers-reduced-motion` respetado.
- ✅ Sin nuevas dependencias en `package.json`.
- ✅ Lint pasa.
- ✅ Build pasa.
- ✅ Verificación visual checklist completa.

---

## Desviaciones del spec (intencionales, documentadas)

El spec original menciona un **sticky scroll** en desktop donde la sección se queda fija durante ~1.5 pantallas mientras el usuario descubre las 4 declaraciones. **El plan implementa en su lugar un *cascade reveal***: cada declaración tiene un threshold de IntersectionObserver distinto, por lo que aparecen en secuencia mientras el usuario scrollea con flujo normal.

**Razón del cambio:** implementar `position: sticky` en una sección hija de un wrapper que tiene otras 6 secciones requiere modificar la estructura del componente `WMU` (envolver cada sección en contenedores de altura explícita) o agregar wrappers condicionales. Esto agrega riesgo de scroll-jank y complejidad innecesaria. El cascade reveal logra el mismo efecto perceptual ("voy descubriendo el manifiesto a medida que avanzo") sin los riesgos técnicos.

**Lo que se pierde:** el "stuck" moment donde la sección se queda quieta y el usuario hace scroll sin que la página avance. Esto era un efecto de "página de revista" pero el cascade reveal mantiene la sensación editorial y la progresión narrativa.

**Lo que se gana:** robustez, sin riesgo de scroll-jank, sin modificar la estructura del componente, compatible con todos los navegadores sin polyfills.

Si durante implementación se siente que falta el "stuck" y querés recuperarlo, agregar sticky es factible pero requiere un Task 7 con wrapping estructural. Por ahora, cascade reveal es la decisión.

Otra desviación menor: el spec menciona "stagger de 80ms entre palabras acento". El plan revela las palabras acento junto con el mask wipe del padre, no individualmente. Agregar stagger por palabra requeriría partir el texto en spans individuales con `transition-delay` calculado, lo cual agrega JSX verboso para un efecto sutil que se pierde con el mask wipe de fondo. Se puede agregar en una iteración futura si se nota.
