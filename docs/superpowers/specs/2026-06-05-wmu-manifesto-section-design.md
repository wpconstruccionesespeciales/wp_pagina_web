# Manifiesto WMU — Sección editorial en `src/pages/WMU.jsx`

Fecha: 2026-06-05
Alcance: reemplazo de `FinancingSection` por `ManifestoSection` en la página `/wmu`.

## Contexto

La página `/wmu` (ruta `src/pages/WMU.jsx`) es la línea de producto de WP Construcciones Especiales. Actualmente la página tiene siete secciones en este orden: `HeroSection`, `ProcessSection`, `ModelsSection`, `FinancingSection`, `ExpandSection`, `RecognitionSection`, `SpecsSection`.

`FinancingSection` (slot `id="financiacion-wmu"`, fondo crema `#EDE9E3`) promociona financiación del Banco Hipotecario y enlaza a un Google Form externo. El equipo no quiere seguir mostrando este módulo: ni el banco aplica como producto, ni el formulario convierte bien. Lo que se busca es ocupar ese slot con una sección que:

1. Refuerce el posicionamiento de marca (WMU como estudio de arquitectura, no como línea de casas).
2. No dependa de fotos reales de obras (no se disponen por ahora).
3. Honre a las casas como el origen y la base del trabajo, sin quedarse ahí — WMU también diseña oficinas, locales, ampliaciones, refugios, etc.
4. Cierre con un CTA a WhatsApp.
5. Se vea "editorial", al nivel de una página hecha con herramientas de AI design.

## Decisión de diseño

Una sección tipo **manifiesto tipográfico**: la tipografía es la protagonista absoluta, sin imágenes, sobre fondo crema con grano fotográfico muy sutil. El copy es una apertura + cuatro declaraciones numeradas en romano + cierre + CTA.

### Apertura (corregida tras feedback del usuario)

> *WMU es nuestro estudio de arquitectura. Casas y todo lo que se te ocurra después.*

Casas van **primeras** (punto de partida valioso); el resto se suma, no se impone. El "se te ocurra" mantiene el tono de manifiesto y rima con la declaración IV ("lo que imaginaste") — bookend del módulo.

### Copy completo

```
WMU es nuestro estudio de arquitectura.
Casas y todo lo que se te ocurra después.

I.   Antes del acero, hay una idea.
II.  Antes del módulo, un proyecto.
III. Antes del precio, una conversación.
IV.  Y al final, queda lo que imaginaste.

Hablemos →

— Equipo WP + WMU
```

Palabras acentuadas (en verde `#2a7a4a`, `mix-blend-mode: multiply`):
- I: **acero**
- II: **módulo**
- III: **precio**
- IV: **imaginaste**

## Layout y tipografía

### Fondo

- Color base: `#EDE9E3` (mismo crema que la sección actual).
- Capa de ruido fotográfico encima: SVG noise filter inline, opacidad ~3-4%, blend `multiply` o `overlay`. Animación muy sutil (12s loop, 1-2px de desplazamiento) para dar sensación de "papel respirando".

### Estructura visual

- **Gutter izquierdo**: línea vertical verde `#35C36B` de 2px, que recorre toda la altura del módulo, desde arriba de "FILOSOFÍA WMU" hasta abajo de "Hablemos". Es la columna vertebral editorial.
- **Línea horizontal verde de 1px** al pie, antes de la firma. Cierra la "L" invertida con la línea vertical.
- **Monograma "W"** decorativo en la esquina superior izquierda, 280px, opacidad 0.04, color verde. Solo gesto editorial.
- **Sin paralax, sin glassmorphism, sin hexágonos, sin patrones geométricos.** La fuerza la lleva la tipografía.

### Tipografía

- **Eyebrow** "FILOSOFÍA WMU": Nunito Sans, 11px, tracking `.18em`, uppercase, color `#2a7a4a`, opacity `.7`.
- **Apertura** ("WMU es nuestro estudio…"): Manrope 800, `clamp(20px, 2.4vw, 32px)`, color `#0e1a11`, `max-width: 720px`, alineada a la izquierda. "WMU" en italic (`font-style: italic`).
- **Numerales romanos (I, II, III, IV)**: Manrope 800, **180px** (`clamp(120px, 18vw, 200px)`), color verde `#35C36B`, opacity `.12`. Flotan como marca de agua a la **derecha** de cada declaración, ocupando el cuarto derecho del ancho del módulo, mientras la declaración misma vive en `max-width: 540px` alineada a la izquierda.
- **Declaraciones I, II, III**: Manrope 800, `clamp(40px, 5.5vw, 72px)`, color `#0e1a11`, line-height `1.05`, letter-spacing `-.02em`.
- **Declaración IV (cierre)**: Manrope **300** (light), italic, `clamp(28px, 4vw, 52px)`, color `#4a6255` (gris-verde apagado). Sotto voce — silencia la página antes del CTA. Subrayado a mano (SVG, trazo tipo plumín) bajo "lo que imaginaste", animado con `stroke-dasharray` cuando entra.
- **"Hablemos →"**: Manrope 700, 16px, color `#0e1a11`. Solo tipografía con flecha. Hover: flecha se desplaza 8px a la derecha + color verde + underline animado de izquierda a derecha.
- **"— Equipo WP + WMU"**: Nunito Sans italic, 12px, opacity `.5`, alineado a la derecha.

## Animación

### Sticky scroll (solo desktop)

La sección completa se vuelve `position: sticky; top: 0` durante un tramo de scroll equivalente a ~1.5 pantallas. Mientras está sticky, el usuario ve las 4 declaraciones aparecer UNA A UNA a medida que scrollea. Cuando termina, la sección se libera y el usuario sigue a `ExpandSection`.

### Reveal por declaración (mientras sticky)

Orden y timing al entrar cada declaración:

1. **Numeral romano** (I/II/III/IV): `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, 600ms ease-out. Se "pinta" de izquierda a derecha.
2. **Texto de la declaración**: `mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%)` animada. El texto se "destapa" como si una cortina corriera. 700ms ease-out, delay 150ms.
3. **Palabras acento** (verde): fade-in individual con stagger de 80ms entre palabras.

### Línea vertical verde del gutter

Inicia con `transform: scaleY(0)` (origen arriba) y crece a `scaleY(1)` a lo largo de todo el scroll del módulo, vía `useScroll` de framer-motion o `IntersectionObserver` con thresholds progresivos.

### Declaración IV (cierre)

Entra con `filter: blur(8px) → blur(0)` + fade, 1.2s, en vez del wipe del mask. El subrayado a mano se dibuja con `stroke-dasharray` SVG animation, de derecha a izquierda, como si alguien lo escribiera.

### Transición al CTA

Cuando el sticky termina y la sección se libera, "Hablemos →" hace un fade-in con ligero slide-up. Aterrizaje en una zona respirada.

### Reducción de movimiento

`@media (prefers-reduced-motion: reduce)`:
- Sin sticky scroll.
- Sin mask wipe, sin blur filter.
- Cada declaración entra con fade simple (200ms).
- Línea vertical del gutter aparece estática (sin scaleY animado).
- Ruido del fondo estático (sin loop).

## Responsive

### Mobile (<768px)

- Numerales romanos bajan a 90px, se mueven al fondo de cada declaración (no al costado).
- Declaraciones en `clamp(32px, 8vw, 48px)`.
- Sin sticky scroll (es feo en mobile). Declaraciones aparecen en secuencia según entran al viewport, con el mismo mask wipe pero con scroll normal.
- Línea vertical del gutter: 1.5px.
- "Hablemos →" con alto táctil mínimo de 44px.

### Tablet (768–1024px)

- Layout casi idéntico al desktop, ajustes de tamaño.
- Sticky scroll funciona.

### Desktop (>1024px)

- Layout completo según diseño.
- Sin `background-attachment` (no hay imagen de fondo).

## Estructura técnica

### Archivo único

`ManifestoSection` se define en el mismo archivo `src/pages/WMU.jsx`, reemplazando a `FinancingSection`. Mismo patrón: componente inline, sin archivo separado. Si el componente crece demasiado, se extrae después; por ahora no hace falta.

### Reemplazo en la página

```jsx
// Antes
<FinancingSection />

// Después
<ManifestoSection />
```

El `id` del contenedor pasa de `id="financiacion-wmu"` a `id="manifiesto"`. **No hay anchor links externos hacia `#financiacion-wmu`** en el proyecto (verificado: nav y footer no apuntan a ese slot), así que el cambio no rompe navegación.

### Estado

Componente presentacional puro, sin estado React (excepto los refs de `IntersectionObserver`). Sin hooks de framer-motion obligatorios — se puede hacer con CSS + `IntersectionObserver` siguiendo el patrón del `useFadeIn` que ya existe. Si se usa framer-motion, aprovechar `useScroll` + `useTransform` para la línea vertical del gutter y el sticky.

### CSS

Animaciones y estilos del módulo agregadas al template literal `CSS` que ya está al final de `WMU.jsx` (líneas 660-730). Mismo patrón que el resto. No se crea archivo CSS externo.

### Sin nuevas dependencias

El módulo usa solo lo que ya está en el proyecto: React 19, CSS inline / template literal, `IntersectionObserver` (ya está en `useFadeIn`). Si se decide usar framer-motion, ya está en `package.json` (línea 13) pero no se usa en `WMU.jsx` actualmente — importarlo localmente es opcional.

## Componentes auxiliares (en el mismo archivo)

- `useFadeIn` ya existe (líneas 53-63), se reutiliza o se extiende.
- Posible nuevo hook: `useStickyReveal(refsArray)` que devuelva visibilidad por índice, con threshold escalonado, para coordinar el reveal de las 4 declaraciones.

## Riesgos y decisiones abiertas

- **Riesgo visual bajo:** el módulo no interactúa con backend, no rompe estado, no rompe rutas. El peor caso es "no queda tan lindo" y se ajusta.
- **Decisión abierta: framer-motion sí/no.** Mi recomendación: no traerlo. El patrón CSS+IO del proyecto es suficiente. Si el sticky scroll se siente flojo, se reconsidera.
- **Decisión abierta: ruido del fondo.** Puede ser inline SVG filter (`<filter><feTurbulence/></filter>` referenciado desde CSS) o un PNG tiled. Recomiendo inline SVG para no agregar assets al build y mantenerlo vectorial.
- **Decisión abierta: "1.5 pantallas" de sticky.** Es un valor aproximado. Si el reveal se siente muy lento o muy rápido durante implementación, se ajusta el `top` offset o el `height` del wrapper sticky. Rango aceptable: 1.2–2.0 pantallas.

## No-objetivos (fuera de alcance)

- No se tocan otras secciones de la página.
- No se cambia la NavBar ni el footer.
- No se modifica la página Home (`App.jsx`).
- No se modifica el routing.
- No se agregan dependencias nuevas.
- No se cambia el copy de las otras secciones.
- No se reemplaza `id="financiacion-wmu"` por un redirect — se elimina directamente, no hay consumidores.
