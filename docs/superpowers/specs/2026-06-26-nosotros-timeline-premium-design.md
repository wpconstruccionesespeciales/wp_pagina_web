# Diseño: Timeline premium "Nuestra Historia"

## Resumen
Rediseñar la sección de línea temporal de `/nosotros` para elevar su perceived quality, manteniendo el eje vertical y los tres hitos existentes (2004 / Hoy / Futuro). El enfoque es editorial/arquitectónico: línea central que se activa al scroll, nodos con anillo doble, tarjetas blancas con sombras sutiles y jerarquía tipográfica refinada.

## Contexto
- Archivo a modificar: `src/pages/Nosotros.jsx`, sección "Nuestra Historia" (líneas ~247-339).
- Sistema de diseño: Tailwind con Material You colors; tipografías `Space Grotesk` (headline) y `Manrope` (body).
- Herramientas disponibles: hook `useInView`, clases `animate-on-scroll` + `visible` definidas en `src/index.css`.

## Decisiones de diseño

### 1. Estructura y layout
- Mantener el contenedor `max-w-6xl mx-auto` con `py-28 px-6 lg:px-16`.
- Conservar el header actual: eyebrow "Trayectoria", H2 "Nuestra Historia", párrafo lead a la izquierda y marca "EST. 2004" grande a la derecha.
- Timeline con contenedor relativo, `pt-8 pb-4`.
- Desktop: grid de 2 columnas con tarjetas alternadas a izquierda y derecha de la línea central.
- Mobile/tablet: columna única, línea a la izquierda (`left-8`) y tarjetas a la derecha.

### 2. Línea central progresiva
- Dos capas superpuestas en el centro (desktop) o a la izquierda (mobile):
  - **Base:** `w-[2px] h-full bg-outline-variant/30`.
  - **Progreso:** `w-[2px] h-full bg-gradient-to-b from-primary via-primary to-primary/20 origin-top scale-y-0` que crece a `scale-y-100` cuando la sección entra en viewport (`transition-transform duration-1000 ease-out`).
- Posición: `left-8 md:left-1/2`.

### 3. Nodos
- Anillo exterior: `w-5 h-5 rounded-full border-2 border-primary/40 bg-surface-container-low`.
- Punto interior: `w-2 h-2 rounded-full bg-primary`.
- Glow sutil: `ring-[6px] ring-primary/10`.
- Centrado verticalmente respecto a cada tarjeta.
- En el nodo central ("Hoy"), incluir un icono pequeño `domain` de Material Symbols en blanco sobre un círculo primary (`w-7 h-7`) para marcar el punto de inflexión Steel Frame sin saturar.

### 4. Tarjetas
- Fondo `bg-white`, esquinas `rounded-[2rem]`, borde fino `border-outline/10`.
- Sombra base `shadow-sm shadow-primary/5`.
- Hover: `hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500`.
- Padding `p-8 md:p-10`.
- Se elimina el `border-l-4` / `border-r-4` grueso actual; el nodo y la sombra aportan el énfasis.
- En desktop, la tarjeta izquierda alinea su texto a la derecha; la derecha, a la izquierda.

### 5. Tipografía
- Año (desktop, junto a la línea): `text-4xl md:text-5xl font-headline font-bold text-primary`.
- Etiqueta debajo del año: `text-secondary uppercase tracking-[0.2em] text-xs font-bold`.
- Título de tarjeta: `text-2xl font-headline font-bold uppercase tracking-tight text-primary`.
- Body de tarjeta: `text-on-surface-variant leading-relaxed font-medium`.
- En mobile, el año y la etiqueta se integran dentro de la tarjeta, arriba del título.

### 6. Animaciones
- Reveal escalonado de tarjetas usando `animate-on-scroll` con delays incrementales (`delay-0`, `delay-150`, `delay-300`).
- Línea de progreso: `scaleY(0)` a `scaleY(1)` al activarse `historyVisible`.
- Nodos: `scale-0` a `scale-100` con `duration-500` y delay sutil.
- Hover de tarjetas: levantamiento + intensificación de sombra.

### 7. Responsive
- Desktop: layout alternado con línea centrada.
- Tablet/mobile: columna única, línea a la izquierda, tarjetas a la derecha, texto siempre alineado a la izquierda.
- Ocultar el "EST. 2004" grande en mobile si ya está presente en el hero.

## Criterios de éxito
- [ ] La timeline se percibe como más premium, con más aire y refinamiento.
- [ ] La línea progresiva al scroll comunica evolución sin ser intrusiva.
- [ ] Se mantiene consistencia tipográfica y cromática con el resto de la página.
- [ ] La experiencia mobile es limpia y legible.
- [ ] No se rompen otros componentes ni se agregan dependencias.

## Notas de implementación
- Refactorizar los tres hitos en un array `timelineItems` para facilitar el mapeo, los delays y el mantenimiento.
- Reutilizar `useInView` para activar la línea progresiva y los reveals.
- No agregar dependencias externas.
- Mantener el fondo `bg-surface-container-low` y la decoración geométrica existente.
