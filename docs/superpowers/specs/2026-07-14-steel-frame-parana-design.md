# Especificación de Diseño (Rediseño del Hero): Landing Page Steel Frame Paraná

Esta especificación detalla el diseño artístico avanzado de estilo editorial, la identidad basada en fotografía de obras reales de la empresa y la estructura de SEO local para la nueva subpágina dedicada a la búsqueda de "steel frame parana" para **WP Construcciones Especiales**.

---

## 1. Identidad de Marca y Concepto Editorial del Hero (Awwwards Style)

Descartamos por completo las tarjetas de metadatos robóticas y la modelación estructural rígida para ir hacia un diseño de autor, limpio, humano y centrado en la materialidad y la espacialidad real de la empresa en la región del litoral:

### 1. Paleta de Colores & Lienzo
*   **Fondo**: Un lienzo claro y elegante (`bg-[#fafaf9]`) con amplios espacios en blanco que permiten respirar al diseño.
*   **Contraste**: Tipografía en verde bosque profundo (`#15251b`) y gris oscuro cálido, logrando legibilidad editorial y sofisticación.

### 2. Estructura de Mosaico de Obras Reales en Paraná (Lado Derecho)
En lugar de una maqueta 3D simulada o esquemas técnicos rígidos, representamos el portafolio real de WP en Paraná de forma dinámica e interactiva:
*   **Mosaico Asimétrico de Capas**: Tres marcos fotográficos flotantes con diferentes proporciones (utilizando imágenes reales de las obras de la empresa):
    1.  *Vivienda Unifamiliar en Paraná* (`/wp/wp imagen.jpg`).
    2.  *Edificio en Altura Paraná* (`/wp/IMG_9133.webp`).
    3.  *Ampliaciones e Ingeniería de Obra* (`/wp/after.jpg`).
*   **Paralaje Magnético al Mouse**: Las imágenes flotan en capas independientes. El movimiento del mouse desplaza suavemente cada imagen en una dirección y velocidad ligeramente diferentes, generando una rica ilusión de profundidad espacial y dinamismo orgánico.
*   **Interacciones Finas**: Al hacer hover sobre cada marco fotográfico, se produce una transición suave de un filtro artístico a color pleno y se revela una micro-etiqueta conceptual (ej. *"El Espacio"*, *"La Luz"*, *"El Acero"*).

### 3. Composición Tipográfica (Lado Izquierdo)
*   **Tipografía Editorial Gigante (H1)**: *"Steel Frame en Paraná: Habitar el Litoral"* con interlineado ceñido (`leading-[1.05]`) y peso visual contundente.
*   **Mensaje de Autor**: Un breve texto introductorio de dos líneas:
    *"Desde el año 2005 diseñamos estructuras metálicas de alta precisión pensadas para integrarse en la geografía y el clima entrerriano."*
*   **Acciones**: Botones de llamada a la acción minimalistas integrados orgánicamente.

---

## 2. Enlazado Interno & Navegación
*   **NavBar**: El menú superior se mantiene libre del enlace para preservar el diseño corporativo limpio.
*   **Home (FirstSteelFrame.jsx)**: Mantiene el botón destacado de tracción local *"Steel Frame en Paraná"* al lado del de *"VER NOTA"*.
*   **Footer**: Mantiene el enlace absoluto de enlazado interno para asegurar la indexabilidad permanente.

---

## 3. Plan de Integración Técnica
1.  **Rediseñar SteelFrameParana.jsx**: Implementar el mosaico de imágenes reales con efecto paralaje en base a coordenadas de cursor elásticas (`useSpring` y `useTransform` de Framer Motion) y tipografía editorial de alto contraste, removiendo metadatos simulados e instrumentación CAD.
2.  **Verificar compilación**: Validar con `npm run build`.
