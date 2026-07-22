/* ─────────────────────────────────────────────────────────────
   Shared content: "Qué incluye" — standard equipment across
   all WMU modules. Same 4 groups, same items.
   ───────────────────────────────────────────────────────────── */
export const WMU_INCLUDES = [
  {
    title: 'Estructura y Cerramientos',
    items: [
      'Estructura de Steel Frame y estructura metálica',
      'Entrepiso con relleno alivianado',
      'Aislación en cubierta con poliuretano',
      'Aislación en muros con celulosa',
      'Revestimiento exterior chapa (tipo sándwich con poliuretano) / siding (placa cementicia)',
      'Carpintería de aluminio DVH / Laminado',
    ],
  },
  {
    title: 'Interiores y Terminaciones',
    items: [
      'Puertas interiores',
      'Frente e interior de placard y guardado',
      'Revestimientos en baño',
      'Pisos flotante / madera',
      'Zócalos EPS / madera',
    ],
  },
  {
    title: 'Equipamiento y Muebles',
    items: [
      'Mueble de cocina con mesada de granito, bacha, grifería',
      'Artefactos sanitarios con griferías, accesorios',
      'Mueble de baño con bacha y grifería',
      'Equipos de horno, anafe, campana extractora, extractor de baño, termotanque eléctrico',
    ],
  },
  {
    title: 'Instalaciones y Documentación',
    items: [
      'Artefactos de iluminación, embutidos / riel',
      'Preinstalación para aire acondicionado',
      'Instalación completa sanitaria / eléctrica',
      'Se entrega toda la documentación técnica / manual de uso / mantenimiento',
    ],
  },
]

/* helper — builds a local public path from filename (preserves "filename" shape) */
const local = (filename) => `/wmu/${filename}`

/* ─────────────────────────────────────────────────────────────
   WMU CERO — 36 m² · 1 habitación
   ───────────────────────────────────────────────────────────── */
export const WMU_CERO = {
  id: 'wmu-cero',
  title: 'WMU CERO · Módulo 36 m² | WP Construcciones Especiales',
  module: {
    name: 'WMU CERO',
    features: [
      { icon: 'bed',         label: '1 habitación' },
      { icon: 'shower',      label: '1 baño' },
      { icon: 'square_foot', label: '36 m² cubiertos' },
      { icon: 'chair',       label: 'Estar-Cocina' },
    ],
    description:
      'El modelo WMU CERO te ofrece 36m² de diseño inteligente, distribuidos en 1 habitación, 1 baño y un ambiente principal integrado. Ideal como primera vivienda o espacio extra, este módulo se adapta a tu proyecto y permite añadir una galería opcional de 22,80m². Calidad llave en mano.',
  },
  renderTabs: [
    { label: 'Clara',       src: local('WMU+10.webp') },
    { label: 'Oscura',      src: local('Captura+de+pantalla+2025-06-23+094411.webp') },
    { label: 'Sin Galería', src: local('op_oscura_noGalery.webp') },
  ],
  gallery: [
    { src: local('WMU+10.webp'), alt: 'Render módulo WMU CERO — vista 10' },
    { src: local('WMU+12.webp'), alt: 'Render módulo WMU CERO — vista 12' },
    { src: local('WMU+13.webp'), alt: 'Render módulo WMU CERO — vista 13' },
    { src: local('WMU+16.webp'), alt: 'Render módulo WMU CERO — vista 16' },
    { src: local('WMU+02.webp'), alt: 'Render módulo WMU CERO — vista 02' },
    { src: local('WMU+20.webp'), alt: 'Render módulo WMU CERO — vista 20' },
    { src: local('WMU+19.webp'), alt: 'Render módulo WMU CERO — vista 19' },
    { src: local('WMU+18.webp'), alt: 'Render módulo WMU CERO — vista 18' },
    { src: local('WMU+17.webp'), alt: 'Render módulo WMU CERO — vista 17' },
    { src: local('WMU+15.webp'), alt: 'Render módulo WMU CERO — vista 15' },
    { src: local('WMU+11.webp'), alt: 'Render módulo WMU CERO — vista 11' },
  ],
  planoUrl: '/wmu/planos/wmu-cero.jpg',
  pdfUrl:   '/wmu/fichas/wmu-cero.pdf',
  fichaStats: [
    { k: 'Superficie',   v: '36 m²' },
    { k: 'Galería opc.', v: '+22,80 m²' },
    { k: 'Estructura',   v: 'Steel Frame' },
    { k: 'Aislación',    v: 'Poliuretano + Celulosa' },
  ],
  faq: [
    { question: '¿Qué superficie y ambientes tiene WMU CERO?', answer: 'WMU CERO tiene 36 m² cubiertos, 1 habitación, 1 baño y un estar-cocina integrado.' },
    { question: '¿WMU CERO puede incorporar una galería?', answer: 'Sí. El modelo contempla una galería opcional de 22,80 m².' },
    { question: '¿Qué estructura y aislación utiliza WMU CERO?', answer: 'Utiliza estructura Steel Frame, aislación de poliuretano en cubierta y celulosa en muros.' },
    { question: '¿Qué alcance de terminaciones e instalaciones tiene WMU CERO?', answer: 'El alcance común incluye estructura y cerramientos, terminaciones interiores, equipamiento, instalaciones sanitarias y eléctricas, y documentación técnica.' },
  ],
  ctaBgIndex: 3,
}

/* ─────────────────────────────────────────────────────────────
   WMU CERO 2 — 55 m² · 2 habitaciones
   ───────────────────────────────────────────────────────────── */
export const WMU_CERO_2 = {
  id: 'wmu-cero-2',
  title: 'WMU CERO 2 · Módulo 55 m² | WP Construcciones Especiales',
  module: {
    name: 'WMU CERO 2',
    features: [
      { icon: 'bed',         label: '2 habitaciones' },
      { icon: 'shower',      label: '1 baño' },
      { icon: 'square_foot', label: '55 m² cubiertos' },
      { icon: 'chair',       label: 'Estar-Cocina' },
    ],
    description:
      'El modelo WMU CERO 2 amplía el diseño del módulo CERO a 55m² cubiertos, incorporando 2 habitaciones, 1 baño, estar y cocina-comedor integrados. Incluye la opción de una galería exterior de 18m² y la posibilidad de ampliación con baño/lavadero. Ideal para quienes buscan más espacio y funcionalidad, con la misma calidad, llave en mano.',
  },
  renderTabs: [
    { label: 'Clara',       src: local('wmu+enhaced.webp') },
    { label: 'Oscura',      src: local('enhanced_wmp+prototipo+cero+con+lavadero+y+dormitorio.webp') },
    { label: 'Sin galería', src: local('prototipo+wpmu+cero+con+lavadero+y+un+dormitorio+mas+chapa+trapezoidal+sin+galeeeria.webp') },
  ],
  gallery: [
    { src: local('wmu+enhaced.webp'),                                                             alt: 'Render módulo WMU CERO 2 — vista exterior' },
    { src: local('enhanced_wmp+prototipo+cero+con+lavadero+y+dormitorio+siding03.webp'),          alt: 'Render módulo WMU CERO 2 — vista lateral siding' },
    { src: local('WMU+16.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 16' },
    { src: local('WMU+20.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 20' },
    { src: local('WMU+19.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 19' },
    { src: local('WMU+18.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 18' },
    { src: local('WMU+17.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 17' },
    { src: local('WMU+15.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 15' },
    { src: local('WMU+02.webp'),                                                                  alt: 'Render módulo WMU CERO 2 — vista 02' },
  ],
  planoUrl: '/wmu/planos/wmu-cero-2.jpg',
  pdfUrl:   '/wmu/fichas/wmu-cero-2.pdf',
  fichaStats: [
    { k: 'Superficie',   v: '55 m²' },
    { k: 'Galería opc.', v: '+18 m²' },
    { k: 'Estructura',   v: 'Steel Frame' },
    { k: 'Aislación',    v: 'Poliuretano + Celulosa' },
  ],
  faq: [
    { question: '¿Qué superficie y ambientes tiene WMU CERO 2?', answer: 'WMU CERO 2 tiene 55 m² cubiertos, 2 habitaciones, 1 baño y estar-cocina-comedor integrados.' },
    { question: '¿Qué opciones de ampliación tiene WMU CERO 2?', answer: 'El modelo contempla una galería exterior opcional de 18 m² y la posibilidad de ampliación con baño y lavadero.' },
    { question: '¿Qué estructura y aislación utiliza WMU CERO 2?', answer: 'Utiliza estructura Steel Frame, aislación de poliuretano en cubierta y celulosa en muros.' },
    { question: '¿Qué alcance de terminaciones e instalaciones tiene WMU CERO 2?', answer: 'El alcance común incluye estructura y cerramientos, terminaciones interiores, equipamiento, instalaciones sanitarias y eléctricas, y documentación técnica.' },
  ],
  ctaBgIndex: 3,
}

/* ─────────────────────────────────────────────────────────────
   WMU CAMPO — 94 m² · 2 habitaciones · galería exterior 80 m²
   ───────────────────────────────────────────────────────────── */
export const WMU_CAMPO = {
  id: 'wmu-campo',
  title: 'WMU CAMPO · Módulo 94 m² | WP Construcciones Especiales',
  module: {
    name: 'WMU CAMPO',
    features: [
      { icon: 'bed',         label: '2 habitaciones' },
      { icon: 'shower',      label: '1 baño' },
      { icon: 'square_foot', label: '94 m² cubiertos' },
      { icon: 'chair',       label: 'Estar-Cocina' },
    ],
    description:
      'El WMU CAMPO ofrece 94 m² cubiertos con un diseño contemporáneo y funcional. Incluye 2 habitaciones, 1 baño y un estar–cocina–comedor integrado, conectado a una galería exterior de 80 m² que amplía la vida hacia el paisaje. Ideal para disfrutar del verde con la calidad y solidez de la línea WMU.',
  },
  renderTabs: [],
  gallery: [
    { src: local('Ara12.webp'), alt: 'Render módulo WMU CAMPO — vista principal' },
    { src: local('Ara10.webp'), alt: 'Render módulo WMU CAMPO — vista 10' },
    { src: local('Ara14.webp'), alt: 'Render módulo WMU CAMPO — vista 14' },
    { src: local('Ara9.webp'),  alt: 'Render módulo WMU CAMPO — vista 9' },
    { src: local('Ara8.webp'),  alt: 'Render módulo WMU CAMPO — vista 8' },
    { src: local('Ara13.webp'), alt: 'Render módulo WMU CAMPO — vista 13' },
    { src: local('Ara11.webp'), alt: 'Render módulo WMU CAMPO — vista 11' },
  ],
  planoUrl: '/wmu/planos/wmu-campo.jpg',
  pdfUrl:   '/wmu/fichas/wmu-campo.pdf',
  fichaStats: [
    { k: 'Superficie', v: '94 m²' },
    { k: 'Galería',    v: '80 m²' },
    { k: 'Estructura', v: 'Steel Frame' },
    { k: 'Aislación',  v: 'Poliuretano + Celulosa' },
  ],
  faq: [
    { question: '¿Qué superficie y ambientes tiene WMU CAMPO?', answer: 'WMU CAMPO tiene 94 m² cubiertos, 2 habitaciones, 1 baño y un estar-cocina-comedor integrado.' },
    { question: '¿Cómo se integra la galería en WMU CAMPO?', answer: 'El espacio interior se conecta con una galería exterior de 80 m².' },
    { question: '¿Qué estructura y aislación utiliza WMU CAMPO?', answer: 'Utiliza estructura Steel Frame, aislación de poliuretano en cubierta y celulosa en muros.' },
    { question: '¿Qué alcance de terminaciones e instalaciones tiene WMU CAMPO?', answer: 'El alcance común incluye estructura y cerramientos, terminaciones interiores, equipamiento, instalaciones sanitarias y eléctricas, y documentación técnica.' },
  ],
  ctaBgIndex: 3,
}

/* ─────────────────────────────────────────────────────────────
   WMU ALDEA — 120 m² · 4 habitaciones · galería semicubierta 21 m²
   ───────────────────────────────────────────────────────────── */
export const WMU_ALDEA = {
  id: 'wmu-aldea',
  title: 'WMU ALDEA · Módulo 120 m² | WP Construcciones Especiales',
  module: {
    name: 'WMU ALDEA',
    features: [
      { icon: 'bed',         label: '4 habitaciones' },
      { icon: 'shower',      label: '2 baños' },
      { icon: 'square_foot', label: '120 m² cubiertos' },
      { icon: 'chair',       label: 'Estar-Cocina' },
    ],
    description:
      'El WMU ALDEA ofrece 120 m² cubiertos con un diseño contemporáneo y funcional, ideal para familias. Incluye 4 habitaciones, 2 baños y un amplio estar-cocina-comedor integrado. Este espacio se conecta con una galería semicubierta de 21 m² que amplía la vida hacia el exterior. Una solución que combina amplitud y confort con la calidad y solidez de la línea WMU.',
  },
  renderTabs: [],
  gallery: [
    { src: local('aldea.webp'),     alt: 'Render módulo WMU ALDEA — vista principal' },
    { src: local('aldea+(2).webp'), alt: 'Render módulo WMU ALDEA — vista 2' },
    { src: local('aldea+(3).webp'), alt: 'Render módulo WMU ALDEA — vista 3' },
    { src: local('aldea+(1).webp'), alt: 'Render módulo WMU ALDEA — vista 1' },
  ],
  planoUrl: '/wmu/planos/wmu-aldea.jpg',
  pdfUrl:   '/wmu/fichas/wmu-aldea.pdf',
  fichaStats: [
    { k: 'Superficie', v: '120 m²' },
    { k: 'Galería',    v: '21 m²' },
    { k: 'Estructura', v: 'Steel Frame' },
    { k: 'Aislación',  v: 'Poliuretano + Celulosa' },
  ],
  faq: [
    { question: '¿Qué superficie y ambientes tiene WMU ALDEA?', answer: 'WMU ALDEA tiene 120 m² cubiertos, 4 habitaciones, 2 baños y un estar-cocina-comedor integrado.' },
    { question: '¿Qué superficie tiene la galería de WMU ALDEA?', answer: 'El modelo incorpora una galería semicubierta de 21 m² conectada con el área social.' },
    { question: '¿Qué estructura y aislación utiliza WMU ALDEA?', answer: 'Utiliza estructura Steel Frame, aislación de poliuretano en cubierta y celulosa en muros.' },
    { question: '¿Qué alcance de terminaciones e instalaciones tiene WMU ALDEA?', answer: 'El alcance común incluye estructura y cerramientos, terminaciones interiores, equipamiento, instalaciones sanitarias y eléctricas, y documentación técnica.' },
  ],
  ctaBgIndex: 3,
}

/* ─────────────────────────────────────────────────────────────
   WMU SAUCE — 86 m² · 2 habitaciones · galería semicubierta 10 m²
   ───────────────────────────────────────────────────────────── */
export const WMU_SAUCE = {
  id: 'wmu-sauce',
  title: 'WMU SAUCE · Módulo 86 m² | WP Construcciones Especiales',
  module: {
    name: 'WMU SAUCE',
    features: [
      { icon: 'bed',              label: '2 habitaciones' },
      { icon: 'shower',           label: '1 baño' },
      { icon: 'square_foot',      label: '86 m² cubiertos' },
      { icon: 'table_restaurant', label: 'Cocina-Comedor' },
    ],
    description:
      'WMU SAUCE presenta un diseño evolutivo que se adapta a tus necesidades. La Primera Etapa ofrece 86 m² cubiertos e incluye 2 habitaciones, 1 baño, un estar y una cocina-Comedor social en común. Esta área se conecta con una galería semicubierta de 10 m².\n\nEl modelo permite una ampliación opcional de 46 m² que suma una habitación adicional, un baño completo y una sala de TV (que puede funcionar como otro dormitorio), brindando máxima flexibilidad a futuro.',
  },
  renderTabs: [],
  gallery: [
    { src: local('sauce.webp'),                           alt: 'Render módulo WMU SAUCE — vista principal' },
    { src: local('enhanced_Sauce+Montrul+7.webp'),        alt: 'Render módulo WMU SAUCE — vista 7' },
    { src: local('enhanced_Sauce+Montrul+8.webp'),        alt: 'Render módulo WMU SAUCE — vista 8' },
    { src: local('enhanced_Sauce+Montrul+6.webp'),        alt: 'Render módulo WMU SAUCE — vista 6' },
  ],
  planoUrl: '/wmu/planos/wmu-sauce.jpg',
  pdfUrl:   '/wmu/fichas/wmu-sauce.pdf',
  fichaStats: [
    { k: 'Superficie', v: '86 m²' },
    { k: 'Galería',    v: '10 m²' },
    { k: 'Estructura', v: 'Steel Frame' },
    { k: 'Aislación',  v: 'Poliuretano + Celulosa' },
  ],
  faq: [
    { question: '¿Qué superficie y ambientes tiene la primera etapa de WMU SAUCE?', answer: 'La primera etapa de WMU SAUCE tiene 86 m² cubiertos, 2 habitaciones, 1 baño, estar y cocina-comedor social.' },
    { question: '¿Cómo puede ampliarse WMU SAUCE?', answer: 'El modelo admite una ampliación opcional de 46 m² que suma una habitación, un baño completo y una sala de TV que también puede funcionar como dormitorio.' },
    { question: '¿Qué relación tiene WMU SAUCE con el exterior?', answer: 'La primera etapa se conecta con una galería semicubierta de 10 m².' },
    { question: '¿Qué estructura, aislación y alcance tiene WMU SAUCE?', answer: 'Utiliza estructura Steel Frame, aislación de poliuretano en cubierta y celulosa en muros. El alcance común incluye cerramientos, terminaciones interiores, equipamiento, instalaciones y documentación técnica.' },
  ],
  ctaBgIndex: 3,
}

export const WMU_MODELS = [WMU_CERO, WMU_CERO_2, WMU_CAMPO, WMU_ALDEA, WMU_SAUCE]
