# Diseño: Subpágina Premium de Especificaciones Constructivas WMU

## Resumen
Crear una nueva subpágina `/wmu-especificaciones` para mostrar en detalle las especificaciones técnicas completas de los módulos WMU (19 ítems de equipamiento y terminaciones) con un diseño premium adaptado a la estética visual oscura de la sección WMU. Además, modificar el botón "VER PLANES" en la página principal de WMU para que diga "VER MÁS ESPECIFICACIONES" y redirija a esta nueva subpágina.

## Contexto
- **Archivos a modificar/crear**:
  - `src/pages/WmuEspecificaciones.jsx` [NUEVO]: Subpágina que contendrá el diseño premium detallado.
  - `src/pages/WMU.jsx` [MODIFICAR]: Modificar la sección `SpecsSection` para que el botón "VER PLANES" apunte a la nueva subpágina con el texto "VER MÁS ESPECIFICACIONES".
  - `src/App.jsx` [MODIFICAR]: Agregar la ruta `/wmu-especificaciones` importando de forma perezosa (`lazy`) la nueva página.
- **Estilos globales**: Se integrará perfectamente con los estilos existentes en `src/pages/WMU.jsx` y `src/index.css`.
- **Datos**: Utilizará `WMU_INCLUDES` importado de `src/data/wmu-modules.js`.

## Decisiones de Diseño

### 1. Paleta de Colores y Fondo
- **Fondo base**: Gradiente profundo en tonos forest green oscuros y negro (`linear-gradient(135deg, #0e1b13 0%, #060e0a 100%)`) para dar un ambiente sofisticado, arquitectónico y premium.
- **Acentos**: Verde vibrante marca (`#35C36B` o `G`) e iluminación suave.
- **Overlay decorativo**: Fondo con grilla diagonal sutil (`repeating-linear-gradient(...)`) similar al de la sección de modelos para mantener el ADN visual del sitio.

### 2. Estructura y Componentes de la Subpágina

#### A. Navegación Superior (`WMUNavEspecificaciones`)
- Barra superior flotante translúcida (`backdrop-filter: blur(14px)`).
- Logo de WP Construcciones Especiales centrado.
- Botón **"← Volver a WMU"** posicionado a la izquierda, que redirige al usuario de vuelta a `/wmu`.

#### B. Hero Header / Portada de la Ficha
- Imagen de fondo: Un render premium a pantalla completa o banner alto con efecto parallax (`/wmu/aldea+(3).webp`).
- Overlay oscuro con un gradiente radial verde sutil.
- Título principal: *"Lo que incluimos en módulos WMU"* (en mayúsculas, tipografía `Manrope` / `HEADING`, tamaño adaptado, negrita extrema, con sombra y brillo sutil).

#### C. Sección de Especificaciones Constructivas ("QUÉ INCLUYE")
- Subtítulos premium:
  - *"ESPECIFICACIONES CONSTRUCTIVAS"* (blanco, tracking-wider, centrado).
  - *"DETALLE TÉCNICO WMU"* (verde vibrante, tamaño menor, centrado).
- Encabezado de sección:
  - *"QUÉ INCLUYE"* al estilo editorial, con un badge con esquinas redondeadas al lado: **"MODELO COMPLETO"** (texto blanco en fondo verde sólido `#106843`).
- **Grilla de 19 Tarjetas**:
  - Grid de 3 columnas en desktop (`lg:grid-cols-3`), 2 en tablet (`md:grid-cols-2`) y 1 en móvil.
  - Cada tarjeta tendrá:
    - Fondo semi-transparente muy oscuro (`rgba(12,18,16,.6)`).
    - Borde fino premium (`border: 1px solid rgba(53, 195, 107, 0.12)`).
    - Efecto hover con iluminación radial verde desde la parte inferior, ensanchamiento del borde a `#35C36B` y pequeña elevación (`translateY(-4px)`).
    - Un checkmark (`✓`) de color verde vibrante encerrado en un badge circular o ícono vectorial premium.
    - Tipografía Nunito Sans (`BODY`) clara y legible en color blanco (`#F3F5F4`) o gris suave.
  - Animación: Aparición progresiva en cascada (*cascade reveal*) usando intersección o transiciones de retardo.

#### D. Sección de Exclusiones ("NO INCLUYE")
- Título *"NO INCLUYE"* en mayúsculas, estilo minimalista y elegante.
- Fondo de tarjeta de vidrio ligeramente diferente (`rgba(255,255,255,.02)`) con borde sutil.
- Grilla de 3 columnas para las 4 exclusiones:
  1. *Logística de traslado, montaje final en el terreno*
  2. *Trabajos preliminares, nivelación, fundaciones*
  3. *Solicitud de servicios (gastos de solicitud)*
  4. *Presentación municipal (gastos de presentacion)*
- Color del texto en gris suave/apagado (`rgba(255,255,255,.7)`), con viñetas elegantes en rojo sutil o círculos oscuros.

#### E. Pie de Página (Footer)
- Integrar la estructura del footer global oscuro (`WMUFooter`) adaptada para la subpágina.

---

## Criterios de Éxito
- [ ] La nueva página `/wmu-especificaciones` carga correctamente con carga diferida (`lazy`).
- [ ] El diseño replica fielmente el estilo de la imagen provista por el usuario, elevando su calidad a un nivel premium.
- [ ] El botón "VER MÁS ESPECIFICACIONES" en `src/pages/WMU.jsx` apunta a `/wmu-especificaciones`.
- [ ] El botón "Volver" en la subpágina redirige a `/wmu` correctamente.
- [ ] Es totalmente responsive y el rendimiento es impecable.
- [ ] Se mantiene consistencia con la tipografía y paleta de colores del sitio.

## Notas de Implementación
- Reutilizar las variables de estilo (`G`, `BG`, `TXT`, `SOFT`, `HEADING`, `BODY`) para mantener la cohesión de diseño.
- Implementar la lógica del scroll restaurado (`scrollTo(0,0)`) al cargar la subpágina.
