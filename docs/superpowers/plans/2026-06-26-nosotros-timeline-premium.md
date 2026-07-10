# Timeline premium "Nuestra Historia" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la sección de línea temporal de `/nosotros` para que se perciba más premium, manteniendo el eje vertical y los tres hitos existentes.

**Architecture:** Refactorizar los hitos hardcodeados en un array mapeable, crear un componente interno `TimelineItem`, e implementar una línea central progresiva, nodos con anillo doble y tarjetas blancas con sombras y hover refinado. Todo dentro de `src/pages/Nosotros.jsx`, sin nuevas dependencias.

**Tech Stack:** React 19, Tailwind CSS 3.4, Vite, Material Symbols.

---

## File Structure

- `src/pages/Nosotros.jsx` — página que contiene la sección "Nuestra Historia". Se modifica para reemplazar la timeline actual por la versión premium.
- `src/hooks/useInView.js` — hook existente para detectar entrada en viewport. Se reutiliza sin cambios.
- `src/index.css` — clases `animate-on-scroll` y utilidades geométricas existentes. Se reutilizan sin cambios.

---

### Task 1: Refactorizar datos de la timeline en un array

**Files:**
- Modify: `src/pages/Nosotros.jsx:90-150` (zona de arrays constantes, cerca de `metaStats`)

- [ ] **Step 1: Agregar el array `timelineItems` debajo de `metaStats`**

```jsx
const timelineItems = [
  {
    year: '2004',
    label: 'Los Cimientos',
    subtitle: 'The Foundation',
    description:
      'Nuestra historia comienza a principios de siglo. Arrancamos como una firma boutique de estructuras enfocada en la pureza del material. Esos primeros proyectos establecieron nuestra reputación de calidad sin compromiso y precisión técnica.',
    highlighted: false,
  },
  {
    year: 'HOY',
    label: 'Pioneros Steel Frame',
    subtitle: 'Modern Mastery',
    description:
      'Nos convertimos en líderes del Steel Frame a nivel nacional, optimizando la eficiencia estructural y la velocidad de obra sin sacrificar el alma arquitectónica del proyecto. Más de 100 obras ejecutadas avalan nuestro camino.',
    highlighted: true,
  },
  {
    year: 'FUTURO',
    label: 'Ingeniería & Soluciones',
    subtitle: 'The Vision',
    description:
      'Un compromiso con la ingeniería sostenible y circular. Nuestro futuro está definido por tecnologías de acero inteligente y diseños net-zero que amplían los límites de lo que el hábitat moderno puede alcanzar.',
    highlighted: false,
  },
]
```

- [ ] **Step 2: Ejecutar lint para verificar que no haya errores de sintaxis**

Run: `npm run lint`
Expected: `✔ no errors` (o warnings preexistentes).

---

### Task 2: Crear el componente interno `TimelineItem`

**Files:**
- Modify: `src/pages/Nosotros.jsx` (antes del `export default function Nosotros()`)

- [ ] **Step 1: Agregar el componente `TimelineItem` justo debajo del array `timelineItems`**

```jsx
function TimelineItem({ item, index, isLast, isVisible }) {
  const isEven = index % 2 === 0
  const sideClass = isEven ? 'md:text-right' : 'md:text-left'
  const cardAlignment = isEven ? 'md:ml-auto' : 'md:mr-auto'
  const delayClass = index === 0 ? '' : index === 1 ? 'delay-150' : 'delay-300'

  return (
    <div className="relative grid md:grid-cols-2 gap-8 md:gap-0 items-center mb-20 last:mb-0">
      {/* Columna de año (desktop) */}
      <div className={`hidden md:block ${isEven ? 'pr-16 order-1' : 'pl-16 order-2'} ${sideClass}`}>
        <h3 className="text-5xl lg:text-6xl font-headline font-black text-primary leading-none mb-2">
          {item.year}
        </h3>
        <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
          {item.subtitle}
        </p>
      </div>

      {/* Nodo */}
      <div className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-low ring-[6px] ring-primary/10 transition-transform duration-500 ${
            isVisible ? 'scale-100' : 'scale-0'
          } ${delayClass}`}
        >
          {item.highlighted ? (
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                domain
              </span>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary" />
            </>
          )}
        </div>
      </div>

      {/* Tarjeta */}
      <div className={`pl-16 md:pl-0 ${isEven ? 'md:pr-16 order-2' : 'md:pl-16 order-1'}`}>
        <div
          className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${delayClass}`}
        >
          <div
            className={`bg-white p-8 md:p-10 rounded-[2rem] border border-outline/10 shadow-sm shadow-primary/5 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 ${cardAlignment}`}
          >
            {/* Año y subtítulo mobile */}
            <div className="md:hidden mb-4">
              <h3 className="text-4xl font-headline font-black text-primary leading-none mb-1">
                {item.year}
              </h3>
              <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
                {item.subtitle}
              </p>
            </div>

            <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary mb-4">
              {item.label}
            </h4>
            <p className="text-on-surface-variant leading-relaxed font-medium">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Ejecutar lint**

Run: `npm run lint`
Expected: sin errores nuevos.

---

### Task 3: Implementar la línea central progresiva

**Files:**
- Modify: `src/pages/Nosotros.jsx` (sección "Nuestra Historia", dentro del contenedor de timeline)

- [ ] **Step 1: Reemplazar el bloque de timeline actual por la nueva estructura con línea progresiva**

Buscar el `<section>` con `ref={historyRef}` (líneas ~250-339) y reemplazar todo su interior desde `<div className="relative max-w-6xl mx-auto">` hasta el cierre del `</section>` por:

```jsx
        <section className="relative py-28 px-6 lg:px-16 overflow-hidden bg-surface-container-low" ref={historyRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,140,90,0.04)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
          <div className="bg-geo-dots bg-geo-dots-right opacity-[0.1] top-12 right-12 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            {/* Header */}
            <div className={`flex flex-col md:flex-row justify-between items-end mb-20 gap-8 animate-on-scroll ${historyVisible ? 'visible' : ''}`}>
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">Trayectoria</span>
                </div>
                <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter text-primary mb-4 leading-tight">
                  Nuestra Historia
                </h2>
                <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                  Un camino definido por la integridad estructural, evolucionando desde los cimientos tradicionales hasta la vanguardia de la innovación en Steel Frame.
                </p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-8xl font-black text-outline/15 select-none font-headline">EST. 2004</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pt-8 pb-4">
              {/* Línea base */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-outline-variant/30 -translate-x-1/2" />

              {/* Línea de progreso */}
              <div
                className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary to-primary/20 origin-top -translate-x-1/2 transition-transform duration-1000 ease-out ${
                  historyVisible ? 'scale-y-100' : 'scale-y-0'
                }`}
              />

              {/* Items */}
              <div className="stagger-children">
                {timelineItems.map((item, index) => (
                  <TimelineItem
                    key={item.year}
                    item={item}
                    index={index}
                    isLast={index === timelineItems.length - 1}
                    isVisible={historyVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 2: Ejecutar lint**

Run: `npm run lint`
Expected: sin errores nuevos.

---

### Task 4: Ajustar animaciones escalonadas

**Files:**
- Modify: `src/pages/Nosotros.jsx` (clases de delay en `TimelineItem`)

- [ ] **Step 1: Revisar que `stagger-children` funcione con los delays manuales**

El componente `TimelineItem` ya aplica `delay-150` y `delay-300` para los índices 1 y 2. Tailwind incluye esas utilidades por defecto. Si el proyecto no las tiene en `tailwind.config.js`, usar estilos inline o clases arbitrarias. Alternativa: cambiar `delayClass` a clases inline en el wrapper.

Opción más segura: reemplazar el bloque de delay en `TimelineItem` por estilos inline:

```jsx
const delayStyle = { transitionDelay: `${index * 150}ms` }
```

Y aplicarlo en los elementos animados:

```jsx
<div
  className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-low ring-[6px] ring-primary/10 transition-transform duration-500 ${
    isVisible ? 'scale-100' : 'scale-0'
  }`}
  style={delayStyle}
>
```

```jsx
<div
  className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
  style={delayStyle}
>
```

- [ ] **Step 2: Ejecutar lint**

Run: `npm run lint`
Expected: sin errores nuevos.

---

### Task 5: Verificación visual

**Files:**
- Ninguno (solo lectura/verificación).

- [ ] **Step 1: Iniciar el servidor de desarrollo**

Run: `npm run dev`
Expected: Vite inicia sin errores, muestra `http://localhost:5173/`.

- [ ] **Step 2: Navegar a `/nosotros` y verificar la sección "Nuestra Historia"**

Verificar:
1. El header de la sección se ve igual que antes.
2. Hay una línea vertical centrada en desktop y a la izquierda en mobile.
3. Al hacer scroll hacia la sección, la línea se llena de primary de arriba hacia abajo.
4. Los nodos aparecen con un anillo exterior, punto interior y glow; el nodo central tiene el icono `domain`.
5. Las tarjetas son blancas, con esquinas grandes, sombra suave y levantamiento en hover.
6. En desktop, las tarjetas alternan izquierda/derecha; en mobile, todas están a la derecha de la línea.
7. El texto dentro de las tarjetas está alineado correctamente.
8. No hay errores en la consola del navegador.

- [ ] **Step 3: Verificar responsive en anchos comunes**

Usar DevTools para simular:
- 375px (mobile)
- 768px (tablet)
- 1440px (desktop)

En todos los casos, la timeline debe ser legible, sin desbordamientos ni solapamientos.

- [ ] **Step 4: Ejecutar build para asegurar que no hay errores de producción**

Run: `npm run build`
Expected: build exitosa, carpeta `dist/` generada sin errores.

---

### Task 6: Commit

**Files:**
- Modify: `src/pages/Nosotros.jsx`

- [ ] **Step 1: Revisar cambios con git diff**

Run: `git diff src/pages/Nosotros.jsx`
Expected: solo cambios en la sección "Nuestra Historia" y el nuevo array `timelineItems`.

- [ ] **Step 2: Hacer commit de los cambios**

Run:
```bash
git add src/pages/Nosotros.jsx
git commit -m "feat(nosotros): rediseña timeline de Nuestra Historia con look premium"
```
Expected: commit creado exitosamente.

---

## Self-Review Checklist

- [ ] **Spec coverage:** Cada requerimiento del spec (`línea progresiva`, `nodos anillo doble`, `tarjetas blancas`, `responsive`, `animaciones escalonadas`, `sin dependencias`) tiene al menos una tarea asociada.
- [ ] **Placeholder scan:** No quedan `TBD`, `TODO`, "implementar luego", "manejar edge cases" sin código.
- [ ] **Type consistency:** `TimelineItem` recibe siempre las mismas props (`item`, `index`, `isLast`, `isVisible`).
- [ ] **Path consistency:** Todos los paths apuntan a `src/pages/Nosotros.jsx`.

