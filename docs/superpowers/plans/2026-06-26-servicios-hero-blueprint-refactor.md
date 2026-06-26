# Servicios Hero Blueprint Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el cluster de 3 tarjetas aisladas en el hero de `/servicios` por un blueprint técnico animado con wireframe + cotas, integrado al lenguaje visual de marca steel/ingeniería.

**Architecture:** Cambios en 2 archivos: CSS nuevo en `src/index.css` (clases `.blueprint-*` + keyframes), y reemplazo del bloque JSX en `src/pages/Servicios.jsx` (líneas 132-144) por un panel relativo con grid de fondo, SVG wireframe y 3 cotas con leader lines.

**Tech Stack:** React 19, Tailwind 3, CSS keyframes, SVG inline. Sin librerías nuevas.

---

## File Structure

- **Modify:** `src/index.css` — agregar bloque `.blueprint-*` al final (líneas de estilos + keyframes). No tocar nada existente.
- **Modify:** `src/pages/Servicios.jsx` — reemplazar el `<div className="flex flex-wrap gap-4 justify-end">` con el panel blueprint completo. Sin tocar otras secciones.

---

## Task 1: Agregar CSS base del blueprint (grid + keyframes)

**Files:**
- Modify: `src/index.css` (agregar al final del archivo, antes de la última línea)

- [ ] **Step 1: Agregar bloque CSS al final de `src/index.css`**

Abrir `src/index.css`, ir al final del archivo, y agregar:

```css
/* ─── Hero blueprint (Servicios) ─── */
.blueprint-panel {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 440px;
  isolation: isolate;
}

.blueprint-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 35%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 35%, transparent 80%);
  opacity: 0;
  animation: bp-fade 0.4s ease-out 0.05s forwards;
}

.blueprint-wire {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.blueprint-wire path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.22);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: var(--len, 1000);
  stroke-dashoffset: var(--len, 1000);
  animation: bp-draw 1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.blueprint-wire path:nth-child(1) { animation-delay: 0.15s; --len: 260; }
.blueprint-wire path:nth-child(2) { animation-delay: 0.30s; --len: 260; }
.blueprint-wire path:nth-child(3) { animation-delay: 0.45s; --len: 200; }
.blueprint-wire path:nth-child(4) { animation-delay: 0.60s; --len: 200; }
.blueprint-wire path:nth-child(5) { animation-delay: 0.75s; --len: 360; }

@keyframes bp-fade {
  to { opacity: 1; }
}

@keyframes bp-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes bp-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.55; }
}

@keyframes bp-line-grow {
  to { transform: scaleX(1); }
}

@keyframes bp-label-in {
  to { opacity: 1; transform: translateY(0); }
}

.blueprint-cot {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: bp-fade 0.5s ease-out forwards;
}

.blueprint-cot--01 {
  top: 12%;
  left: 8%;
  animation-delay: 0.9s;
  flex-direction: row-reverse;
}

.blueprint-cot--02 {
  top: 44%;
  right: 6%;
  animation-delay: 1.1s;
  flex-direction: row;
}

.blueprint-cot--03 {
  bottom: 14%;
  right: 4%;
  animation-delay: 1.3s;
  flex-direction: row;
}

.blueprint-cot__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #8eb59a;
  box-shadow: 0 0 0 3px rgba(142, 181, 154, 0.18);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.blueprint-cot__dot::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: #8eb59a;
  animation: bp-pulse 2.5s ease-in-out infinite;
  z-index: -1;
}

.blueprint-cot--02 .blueprint-cot__dot,
.blueprint-cot--03 .blueprint-cot__dot {
  animation-delay: inherit;
}

.blueprint-cot__line {
  height: 1px;
  background: rgba(255, 255, 255, 0.28);
  width: 64px;
  transform: scaleX(0);
  transform-origin: left center;
  animation: bp-line-grow 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.blueprint-cot--01 .blueprint-cot__line {
  transform-origin: right center;
  animation-delay: 1.1s;
}

.blueprint-cot--02 .blueprint-cot__line {
  animation-delay: 1.3s;
}

.blueprint-cot--03 .blueprint-cot__line {
  animation-delay: 1.5s;
}

.blueprint-cot__label {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  opacity: 0;
  transform: translateY(8px);
  animation: bp-label-in 0.4s ease-out forwards;
}

.blueprint-cot--01 .blueprint-cot__label {
  text-align: right;
  animation-delay: 1.25s;
}

.blueprint-cot--02 .blueprint-cot__label {
  animation-delay: 1.45s;
}

.blueprint-cot--03 .blueprint-cot__label {
  animation-delay: 1.65s;
}

.blueprint-cot__value {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  color: #8eb59a;
  letter-spacing: -0.02em;
  line-height: 1;
}

.blueprint-cot__desc {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 4px;
}

@media (max-width: 1023px) {
  .blueprint-panel {
    min-height: 360px;
  }
  .blueprint-cot--01 { top: 8%; left: 4%; }
  .blueprint-cot--02 { top: 46%; right: 4%; }
  .blueprint-cot--03 { bottom: 10%; right: 2%; }
  .blueprint-cot__value { font-size: 1.5rem; }
  .blueprint-cot__line { width: 48px; }
}

@media (max-width: 767px) {
  .blueprint-panel {
    min-height: auto;
    padding: 2rem 0;
  }
  .blueprint-wire {
    display: none;
  }
  .blueprint-grid {
    mask-image: none;
    -webkit-mask-image: none;
    opacity: 0.5;
  }
  .blueprint-cot {
    position: relative;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    flex-direction: row !important;
    margin-bottom: 1.25rem;
  }
  .blueprint-cot__label { text-align: left !important; }
  .blueprint-cot__line { width: 32px; }
}
```

- [ ] **Step 2: Verificar que no hay errores de sintaxis**

Run: `npm run lint`
Expected: 0 errors (warnings preexistentes son OK).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(servicios): add blueprint hero CSS (grid, wire, cotas, animations)"
```

---

## Task 2: Reemplazar el cluster de stats con el panel blueprint

**Files:**
- Modify: `src/pages/Servicios.jsx` líneas 132-144

- [ ] **Step 1: Reemplazar el bloque JSX**

En `src/pages/Servicios.jsx`, las líneas 132-144 son:

```jsx
                {/* Floating stat cluster */}
                <div className="flex flex-wrap gap-4 justify-end">
                  {[
                    { val: '200+', lab: 'Proyectos entregados' },
                    { val: '15+', lab: 'Años de experiencia' },
                    { val: '100%', lab: 'Garantía estructural' },
                  ].map(({ val, lab }) => (
                    <div key={lab} className="group flex flex-col items-center justify-center px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md hover:bg-white/[0.06] hover:border-primary-fixed-dim/30 hover:-translate-y-1 transition-all duration-500 min-w-[130px]">
                      <span className="text-primary-fixed-dim text-2xl md:text-3xl font-black font-headline tracking-tight group-hover:scale-105 transition-transform duration-300">{val}</span>
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider text-center mt-1.5 group-hover:text-white/55 transition-colors duration-300">{lab}</span>
                    </div>
                  ))}
                </div>
```

Reemplazar TODO ese bloque por:

```jsx
                {/* Blueprint técnico con cotas */}
                <div className="blueprint-panel">
                  <div className="blueprint-grid" />

                  <svg className="blueprint-wire" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <path d="M 130 90 L 130 310" />
                    <path d="M 270 90 L 270 310" />
                    <path d="M 130 90 L 270 90" />
                    <path d="M 130 310 L 270 310" />
                    <path d="M 130 90 L 270 310" />
                  </svg>

                  <div className="blueprint-cot blueprint-cot--01">
                    <span className="blueprint-cot__dot" />
                    <span className="blueprint-cot__line" />
                    <div className="blueprint-cot__label">
                      <span className="blueprint-cot__value">200+</span>
                      <span className="blueprint-cot__desc">Proyectos entregados</span>
                    </div>
                  </div>

                  <div className="blueprint-cot blueprint-cot--02">
                    <span className="blueprint-cot__dot" />
                    <span className="blueprint-cot__line" />
                    <div className="blueprint-cot__label">
                      <span className="blueprint-cot__value">15+</span>
                      <span className="blueprint-cot__desc">Años de experiencia</span>
                    </div>
                  </div>

                  <div className="blueprint-cot blueprint-cot--03">
                    <span className="blueprint-cot__dot" />
                    <span className="blueprint-cot__line" />
                    <div className="blueprint-cot__label">
                      <span className="blueprint-cot__value">100%</span>
                      <span className="blueprint-cot__desc">Garantía estructural</span>
                    </div>
                  </div>
                </div>
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: 0 errors nuevos (el CSS está bien, el JSX es válido).

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build exitoso, sin errores de React o de Tailwind purging.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Servicios.jsx
git commit -m "feat(servicios): replace isolated stat cards with animated blueprint panel"
```

---

## Task 3: Verificación visual

- [ ] **Step 1: Levantar dev server**

Run: `npm run dev` (en background o nueva terminal)
Expected: Vite arranca sin errores. URL típica: `http://localhost:5173/servicios`.

- [ ] **Step 2: Verificar el hero en desktop**

Abrir `http://localhost:5173/servicios` en navegador > 1024px de ancho. Confirmar:
- [ ] El grid de fondo es visible pero sutil
- [ ] El wireframe SVG se dibuja con animación al cargar
- [ ] Los 3 puntos verdes aparecen con stagger
- [ ] Las leader lines crecen desde los puntos hacia las etiquetas
- [ ] Las 3 cotas (200+, 15+, 100%) son legibles y no se solapan
- [ ] El pulso en los puntos es sutil (no distrae)
- [ ] El resto del hero (título, párrafo, scroll indicator) no cambió

- [ ] **Step 3: Verificar el hero en mobile (< 768px)**

Abrir DevTools, modo responsive ~375px. Confirmar:
- [ ] El wireframe se oculta
- [ ] El grid de fondo se ve simplificado (sin máscara radial)
- [ ] Las 3 cotas se apilan verticalmente
- [ ] El panel no rompe el layout del hero

- [ ] **Step 4: Verificar el hero en tablet (768-1024px)**

Confirmar:
- [ ] Las cotas se ven con tamaño reducido
- [ ] El wireframe sigue visible
- [ ] No hay overflow horizontal

---

## Notas

- El color del dot verde (`#8eb59a`) matchea con `primary-fixed-dim` que ya se usa en el hero. Si el usuario quiere ajustarlo, está en `.blueprint-cot__dot` y `.blueprint-cot__value`.
- Las posiciones de las cotas (`top`, `left`, `right`, `bottom` en `.blueprint-cot--01/02/03`) son ajustables si se quiere moverlas para que no se solapen con el wireframe.
- El wireframe SVG es solo decorativo (`aria-hidden="true"`); los stats siguen siendo accesibles por su texto.
- Si en mobile las cotas quedan muy anchas, se puede agregar `max-width` al label.
