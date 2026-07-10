# Hero Servicios — Refactor del cluster de stats a blueprint técnico

Fecha: 2026-06-26
Alcance: reemplazo del "Floating stat cluster" en el hero de `src/pages/Servicios.jsx` (líneas 132-144). No se tocan otras secciones ni la página de inicio.

## Contexto

La página `/servicios` (`src/pages/Servicios.jsx`) tiene un hero dark con layout de 2 columnas: copy a la izquierda y un cluster de 3 tarjetas de stats a la derecha (`200+ Proyectos`, `15+ Años`, `100% Garantía`). Las tarjetas se renderizan con `flex flex-wrap gap-4 justify-end` y estilos `bg-white/[0.03] border-white/8 backdrop-blur-md` con `min-w-[130px]`.

El problema reportado por el usuario: las 3 tarjetas se ven "aisladas" en la esquina superior derecha del hero, como piezas sueltas que no dialogan con el copy ni con la identidad de marca (steel / ingeniería / planos ejecutivos). Refactorizar para integrar los stats al lenguaje visual de la marca.

## Decisión de diseño

Convertir el cluster de stats en un **blueprint técnico animado** sobre el lado derecho del hero. Los 3 stats dejan de ser tarjetas y se vuelven **cotas** (dimensiones) ancladas a un wireframe arquitectónico sutil. Sensación: "plano ejecutivo en una mesa de ingeniería".

### Elementos visuales

1. **Grid de blueprint de fondo** (en el panel derecho)
   - Cuadrícula de 40×40px, blanco a 4% opacidad
   - Refuerza el lenguaje técnico sin competir con el copy

2. **Wireframe SVG: cross-section de un módulo steel frame**
   - Vista en corte de un módulo: dos perfiles verticales, dos horizontales, una diagonal de rigidización
   - Trazos blancos 1.5px a 22% opacidad
   - Centrado dentro del panel derecho, ocupa ~70% del alto disponible

3. **3 cotas con leader lines**
   - Cada stat = 1 punto de anclaje (círculo de 6px en `primary-fixed-dim`) + 1 línea guía 1px a 28% opacidad + 1 etiqueta
   - Distribución:
     - **Cota 01** (arriba-izquierda, ancla al perfil vertical izquierdo del wireframe): `200+` + `Proyectos entregados`
     - **Cota 02** (medio-derecha, ancla a la diagonal de rigidización): `15+` + `Años de experiencia`
     - **Cota 03** (abajo-derecha, ancla al perfil horizontal inferior): `100%` + `Garantía estructural`
   - Valor: `text-2xl lg:text-3xl font-headline font-black text-primary-fixed-dim`
   - Label: `text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold`
   - Hover en el label: `text-white/70 transition-colors`

4. **Animaciones de entrada (cascada, en viewport)**
   - Grid fade-in: 0.4s
   - Wireframe path drawing (`stroke-dasharray` + `stroke-dashoffset`): 1s con stagger de 150ms por path
   - Puntos de anclaje: scale 0→1 + opacity, 0.4s con stagger 250ms
   - Leader lines: `transform: scaleX(0)` → `scaleX(1)` desde el ancla, 0.5s con stagger 300ms
   - Labels: fade-in + translate-y 8px→0, 0.4s con stagger 350ms

5. **Animación idle**
   - Puntos de anclaje: pulse sutil (scale 1→1.3, opacity 1→0.6) en loop de 2.5s, escalonado entre los 3 puntos

### Layout y estructura JSX

```jsx
{/* Antes: <div className="flex flex-wrap gap-4 justify-end"> ...3 cards... </div> */}

{/* Después: panel derecho con blueprint */}
<div className="relative h-[440px] lg:h-[480px]">
  {/* Grid de fondo */}
  <div className="absolute inset-0 blueprint-grid" />

  {/* Wireframe SVG centrado */}
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
    {/* paths con clase blueprint-path para animar */}
  </svg>

  {/* Cotas con leader lines (absolute positioned) */}
  <div className="blueprint-cot blueprint-cot--01">
    <span className="blueprint-cot__dot" />
    <span className="blueprint-cot__line" />
    <div className="blueprint-cot__label">
      <span className="blueprint-cot__value">200+</span>
      <span className="blueprint-cot__desc">Proyectos entregados</span>
    </div>
  </div>
  {/* repetir para 02 y 03 */}
</div>
```

### Responsive

- **Desktop (lg+):** panel derecho con blueprint + 3 cotas a los lados del wireframe
- **Tablet (md):** se reduce el tamaño del wireframe, las cotas se acercan a los anclajes
- **Mobile (< md):** el wireframe se simplifica (solo los 4 perfiles, sin diagonal) y las 3 cotas se apilan verticalmente debajo del copy, con un mini wireframe inline de 80×80px a la izquierda de cada stat

## CSS nuevo (en `src/index.css`)

Bloque dedicado a `.blueprint-grid`, `.blueprint-path`, `.blueprint-cot` y sus modificadores. Animaciones con `@keyframes` para `blueprint-draw`, `blueprint-pulse`, `blueprint-line-grow`.

## Lo que NO cambia

- Layout general del hero (2 columnas: copy izq, visual der)
- Eyebrow, título, párrafo, scroll indicator (líneas 113-129, 148-153)
- Sección CORE SERVICES ni ninguna otra sección
- Página de inicio (`src/components/Services.jsx` que es un componente, no se toca)
- Paleta y tipografías del hero

## Criterios de éxito

- Las 3 stats dejan de parecer "tarjetas aisladas" y se sienten parte de un sistema visual
- La identidad de marca (steel / ingeniería / planos) se refuerza en el hero
- En mobile las stats siguen siendo legibles y no se rompen
- Sin regresiones: scroll indicator, eyebrow, título y párrafo se ven igual que antes
