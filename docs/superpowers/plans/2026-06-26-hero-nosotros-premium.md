# Hero Nosotros Premium - Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar el hero de la página `/nosotros` (`src/pages/Nosotros.jsx`) con un estilo claro pero premium, manteniendo consistencia con el sistema de diseño existente.

**Architecture:** Se modifica únicamente el hero dentro de `src/pages/Nosotros.jsx` (líneas ~175-221). Se reutilizan clases globales de `src/index.css` (`animate-on-scroll`, `gradient-text`, `bg-geo-*`) y Tailwind. No se agregan dependencias.

**Tech Stack:** React, Vite, Tailwind CSS, Material Symbols.

---

### Task 1: Restructurar el contenedor del hero

**Files:**
- Modify: `src/pages/Nosotros.jsx:175-221`

- [ ] **Step 1: Cambiar fondo y padding del section**

Reemplazar el `<section>` actual por uno con fondo `bg-surface-container-low` y mayor padding vertical.

```jsx
<section
  className="relative py-28 lg:py-36 px-6 lg:px-16 overflow-hidden bg-surface-container-low"
  ref={heroRef}
>
```

- [ ] **Step 2: Ajustar decoraciones geométricas**

Reemplazar las decoraciones actuales por variantes más sutiles (opacidad baja) usando clases existentes.

```jsx
{/* Decoración geométrica sutil */}
<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
  <div className="bg-geo-dots bg-geo-dots-left opacity-[0.08] top-16 left-16" />
  <div className="bg-geo-corners bg-geo-corners-left opacity-[0.18] bottom-20 left-12" />
  <div className="bg-geo-ring bg-geo-ring-right opacity-[0.06] top-24 right-16" />
</div>
```

---

### Task 2: Rediseñar la columna de texto

**Files:**
- Modify: `src/pages/Nosotros.jsx:181-201`

- [ ] **Step 1: Reescribir el bloque textual con jerarquía premium**

```jsx
<div className={`lg:col-span-7 animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
  <div className="flex items-center gap-4 mb-8">
    <div className="w-14 h-px bg-primary/30" />
    <span className="text-primary text-xs font-extrabold tracking-[0.25em] uppercase">
      WP Construcciones Especiales
    </span>
  </div>

  <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-8 text-primary">
    Ingeniería con <span className="gradient-text">alma de acero</span>
  </h1>

  <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-medium">
    En WP no solo construimos estructuras; ingeniamos el futuro de la arquitectura residencial
    y comercial de alta gama a través de soluciones de Steel Frame de precisión.
  </p>

  <div className="flex items-center gap-4 max-w-xl">
    <div className="w-12 h-px bg-primary/20" />
    <p className="text-primary/60 text-base italic font-medium">
      Forjando excelencia desde el comienzo del nuevo milenio.
    </p>
  </div>
</div>
```

---

### Task 3: Rediseñar la columna de imagen con marco editorial

**Files:**
- Modify: `src/pages/Nosotros.jsx:203-219`

- [ ] **Step 1: Reemplazar la imagen cuadrada por un tratamiento vertical con esquinas arquitectónicas**

```jsx
<div className={`lg:col-span-5 relative animate-on-scroll ${heroVisible ? 'visible' : ''}`}>
  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group border border-outline/10 shadow-2xl shadow-primary/5">
    <img
      alt="Ingeniería estructural de precisión"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe3Ep1pD-Un-mWeiBNPRllD0MV-yNN3VRnbyPPpoo_MYHGsKoR4PYDsR0L2Lnktu5pg-54roY1Bc2xEI7SOsjQgRj_qme13pz43VMXxRH24aeQ0EwWEph6RCeSCOW3kjlwEmXw9Hg9tmTcZOdMjL49ofCe4xr1sYHCpVf0w8KpmVfLHzJFzqBFeBdvZUSUCRtiHc5Uy_YoNkPJLJlibY8cJiVYgonvxvUuAKxpS3nsBBDepIAXfAIhbrI0BG1TbzIPjzeXlNv-Y3w"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

    {/* Marco arquitectónico */}
    <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/40 rounded-tl-2xl pointer-events-none" />
    <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/40 rounded-br-2xl pointer-events-none" />
  </div>

  {/* Stat card flotante */}
  <div className="absolute -bottom-5 -left-5 lg:-left-10 bg-white p-5 lg:p-6 rounded-2xl shadow-xl shadow-primary/5 border border-outline/10 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
      <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
    </div>
    <div>
      <p className="font-headline text-2xl lg:text-3xl font-black text-primary leading-none">21+</p>
      <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mt-1">Años de excelencia</p>
    </div>
  </div>

  {/* Badge icono */}
  <div className="absolute -top-4 -right-4 lg:-right-6 bg-primary text-white p-4 lg:p-5 rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center border border-primary-fixed-dim/20">
    <span className="material-symbols-outlined text-3xl lg:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
  </div>
</div>
```

---

### Task 4: Verificar responsive y animaciones

**Files:**
- Modify: `src/pages/Nosotros.jsx`

- [ ] **Step 1: Asegurar que los elementos flotantes no rompan en mobile**

En pantallas pequeñas, la stat card y el badge pueden superponerse. Verificar que con `relative` en mobile y posicionamiento absoluto en `lg:` funcione. Si es necesario, ocultar el badge en mobile:

```jsx
<div className="hidden lg:flex absolute -top-4 -right-6 ...">
```

- [ ] **Step 2: Verificar animaciones con useInView**

Confirmar que `heroRef` y `heroVisible` ya están definidos y que las clases `animate-on-scroll` y `visible` se aplican correctamente.

---

### Task 5: Test visual

**Files:**
- N/A

- [ ] **Step 1: Iniciar servidor de desarrollo**

Run: `npm run dev`

- [ ] **Step 2: Navegar a `/nosotros` y verificar**

Expected:
- Fondo claro con más cuerpo que el original.
- Tipografía grande y jerárquica con acento en gradiente.
- Imagen con tratamiento editorial y marco arquitectónico.
- Stat card y badge bien posicionados en desktop.
- Sin errores en consola.

---

## Self-review

- **Spec coverage:** fondo claro pero con más cuerpo (Task 1), tipografía premium (Task 2), imagen editorial (Task 3), responsive y animaciones (Task 4), verificación visual (Task 5).
- **Placeholder scan:** no hay TBD/TODO.
- **Type consistency:** se usan las mismas clases y hooks del archivo original.
