# Diseño: Hero premium de la página Nosotros

## Resumen
Rediseñar el hero de la página `/nosotros` para elevar su perceived quality. El fondo debe permanecer **claro**, pero con más cuerpo y sofisticación que el actual. El enfoque es editorial/arquitectónico: más aire, jerarquía tipográfica refinada, imagen con tratamiento premium y detalles geométricos sutiles.

## Contexto
- Archivo a modificar: `src/pages/Nosotros.jsx` (hero actual en líneas ~175-221).
- Estilos globales disponibles: `src/index.css` incluye clases como `animate-on-scroll`, `gradient-text`, `bg-geo-*`, etc.
- Sistema de diseño: Tailwind con Material You colors; tipografías `Space Grotesk` (headline) y `Manrope` (body).

## Decisiones de diseño

### 1. Paleta y fondo
- Fondo base: `bg-surface-container-low` (`#f3f4f3`) para darle más cuerpo que el blanco puro actual.
- Degradado sutil opcional: `bg-gradient-to-b from-background to-surface-container-low`.
- Decoración: usar clases `bg-geo-*` existentes a opacidad baja (`0.08`–`0.15`) para mantener el lenguaje geométrico del sitio sin competir con el contenido.

### 2. Layout
- Grid asimétrico de 12 columnas en desktop:
  - Texto: `lg:col-span-7`
  - Imagen + elementos flotantes: `lg:col-span-5`
- Mayor padding vertical (`py-28 lg:py-36`) para dar aire premium.
- En mobile: apilado natural, imagen a ancho completo.

### 3. Tipografía
- **Eyebrow**: `"WP Construcciones Especiales"`, uppercase, `tracking-[0.25em]`, `text-xs`, `font-extrabold`, `text-primary`, precedido por una línea fina de `primary/30`.
- **H1**: `"¿Quiénes somos?"` o `"Ingeniería con alma de acero"` (a evaluar), `font-headline`, `text-5xl md:text-6xl lg:text-7xl`, `font-bold`, `tracking-tighter`, `leading-[0.95]`, con acento en gradiente (`gradient-text`) en una o dos palabras clave.
- **Lead**: texto de apoyo más corto, `text-lg md:text-xl`, `text-on-surface-variant`, `leading-relaxed`, `max-w-2xl`.
- **Tagline**: en cursiva sutil, `text-primary/60`, separada del lead por una línea divisoria.

### 4. Imagen y tratamiento
- Imagen principal con esquinas grandes (`rounded-[2rem]`).
- Marco arquitectónico: esquinas con líneas finas `primary/20` en los ángulos superior-izquierdo e inferior-derecho.
- Relación de aspecto vertical (`aspect-[4/5]`) para diferenciarse del cuadrado actual.
- Efecto hover sutil: `group-hover:scale-105` con transición de 700 ms.

### 5. Elementos flotantes
- **Stat card**: tarjeta blanca flotante con sombra suave (`shadow-xl shadow-primary/5`), bordes redondeados (`rounded-2xl`) y borde fino (`border-outline/10`). Contenido sugerido: `"21+"` / `"Años de excelencia"`.
- **Icon badge**: badge circular con ícono `architecture` en `bg-primary text-white`, reposicionado para no ocultar la imagen.
- En mobile ambos elementos se reubican debajo de la imagen o se ocultan si el espacio es insuficiente.

### 6. Animaciones
- Reveal escalonado del texto y la imagen al entrar en viewport usando `animate-on-scroll` y clases `visible` ya existentes.
- Las tarjetas flotantes pueden animarse con `delay` sutil para crear ritmo.

### 7. Responsive
- Desktop: layout de dos columnas con elementos flotantes.
- Tablet/mobile: apilado, imagen a ancho completo, tarjetas debajo, tipografía reducida.
- Ocultar decoraciones geométricas en mobile si distraen.

## Criterios de éxito
- [ ] El hero se percibe como más premium y menos "plantilla".
- [ ] El fondo sigue siendo claro, con mayor profundidad que el original.
- [ ] Se mantiene consistencia con la tipografía y sistema de colores existente.
- [ ] La experiencia mobile es limpia y legible.
- [ ] No se rompen los demás componentes de la página.

## Notas de implementación
- Reutilizar clases de `src/index.css` siempre que sea posible (`animate-on-scroll`, `gradient-text`, `bg-geo-*`).
- No agregar dependencias nuevas.
- Mantener el hook `useInView` actual para activar animaciones.
