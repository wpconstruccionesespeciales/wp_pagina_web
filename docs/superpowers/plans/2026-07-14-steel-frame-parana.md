# Landing Page Steel Frame Paraná Implementation Plan (Rediseño de Mosaico Editorial)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar por completo el Hero de la landing page local `/steel-frame-parana` implementando un layout editorial limpio de estilo Awwwards, con mosaico interactivo de fotos reales en parallax dinámico al cursor, y remover metadatos con aspecto artificial.

**Architecture:** El Hero utilizará un fondo crema claro (`bg-[#fafaf9]`) con generoso espacio en blanco. La tipografía será editorial. Las imágenes reales de las obras de WP flotarán en capas independientes con desplazamientos coordinados por hooks de Framer Motion. El compilado se verificará al final.

---

### Task 1: Rediseñar el Hero en SteelFrameParana.jsx con el Enfoque Mosaico Editorial

**Files:**
- Modify: `src/pages/SteelFrameParana.jsx`
- Test: Build de producción (`npm run build`).

- [ ] **Step 1: Crear la estructura del Hero con fondo crema claro y tipografía editorial masiva en verde profundo**
- [ ] **Step 2: Implementar el rastreo de mouse para coordinar el parallax independiente sobre el mosaico de imágenes**
- [ ] **Step 3: Agregar las imágenes reales de obras de WP en Paraná (/wp/wp imagen.jpg, /wp/IMG_9133.webp y /wp/after.jpg) en contenedores asimétricos con micro-etiquetas conceptuales**
- [ ] **Step 4: Eliminar por completo el componente PreciseBlueprint, las curvas topográficas y los metadatos numéricos**
- [ ] **Step 5: Realizar commit de la página actualizada**

```bash
git add src/pages/SteelFrameParana.jsx
git commit -m "feat(pages): redisenar hero local con layout de mosaico editorial en parallax"
```

---

### Task 2: Verificar compilado de producción

**Files:**
- Test: Ejecutar build de producción `npm run build` para asegurar la integridad de la SPA.

- [ ] **Step 1: Ejecutar el build**

Run: `npm run build`
Expected: Compilación exitosa en carpeta `dist` sin lints ni errores de React.
