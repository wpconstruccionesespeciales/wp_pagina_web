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

/* helper — builds a Squarespace CDN URL from uuid + filename */
const sqsp = (uuid, filename) =>
  `https://images.squarespace-cdn.com/content/v1/67ffc8a20990bb5f40749245/${uuid}/${filename}`

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
    { label: 'Clara',       src: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/df7f884b-6c2a-46c5-807a-5f997f968215/WMU+10.jpg?content-type=image%2Fjpeg' },
    { label: 'Oscura',      src: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/466a9ae0-8092-4f3f-9f4d-21d1c461296a/Captura+de+pantalla+2025-06-23+094411.png?content-type=image%2Fpng' },
    { label: 'Sin Galería', src: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/1b32d9c4-40fe-4cb0-9191-a664178c92fb/op_oscura_noGalery.png?content-type=image%2Fpng' },
  ],
  gallery: [
    { src: sqsp('e4c082db-7ba3-428b-ab69-61875436a03d', 'WMU+10.jpg'), alt: 'Render módulo WMU CERO — vista 10' },
    { src: sqsp('8303c804-30be-4efc-9e14-fd4213a31107', 'WMU+12.jpg'), alt: 'Render módulo WMU CERO — vista 12' },
    { src: sqsp('9e7c62a6-5a30-4bde-a295-e8a999e0fb92', 'WMU+13.jpg'), alt: 'Render módulo WMU CERO — vista 13' },
    { src: sqsp('da7cd17a-b4fb-4aae-9950-26ca65c50689', 'WMU+16.jpg'), alt: 'Render módulo WMU CERO — vista 16' },
    { src: sqsp('1a986fde-6acf-4473-8178-03f9bd1f1c48', 'WMU+02.jpg'), alt: 'Render módulo WMU CERO — vista 02' },
    { src: sqsp('0e835429-4254-4d4f-b520-b131313976b8', 'WMU+20.jpg'), alt: 'Render módulo WMU CERO — vista 20' },
    { src: sqsp('c6c33c7d-77a6-407e-9e9d-bd0860f951d9', 'WMU+19.jpg'), alt: 'Render módulo WMU CERO — vista 19' },
    { src: sqsp('76c0860d-9665-49b8-84a3-20e313f2c510', 'WMU+18.jpg'), alt: 'Render módulo WMU CERO — vista 18' },
    { src: sqsp('95d9a3cf-1acc-4e47-a03a-8dd9500893d3', 'WMU+17.jpg'), alt: 'Render módulo WMU CERO — vista 17' },
    { src: sqsp('46b0dcb5-7357-415d-af06-429aac74c7b9', 'WMU+15.jpg'), alt: 'Render módulo WMU CERO — vista 15' },
    { src: sqsp('1a006d5e-64f8-4c97-981a-26af97fc97f5', 'WMU+11.jpg'), alt: 'Render módulo WMU CERO — vista 11' },
  ],
  planoUrl: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/a6449cb1-f5b4-4378-9251-dd42ef02ade3/plano+cero.jpg?content-type=image%2Fjpeg',
  pdfUrl:   'https://static1.squarespace.com/static/67ffc8a20990bb5f40749245/t/68fb8a5208e7170207eba4bd/1761315410787/WMU-CERO.pdf',
  fichaStats: [
    { k: 'Superficie',   v: '36 m²' },
    { k: 'Galería opc.', v: '+22,80 m²' },
    { k: 'Estructura',   v: 'Steel Frame' },
    { k: 'Aislación',    v: 'Poliuretano + Celulosa' },
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
    { label: 'Clara',       src: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/9d8b9a67-4b20-4dfb-a862-67eb1a31f489/wmu+enhaced.png?content-type=image%2Fpng' },
    { label: 'Oscura',      src: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/e750fb00-42fe-47b3-a08d-c9a91d871b91/enhanced_wmp+prototipo+cero+con+lavadero+y+dormitorio.png?content-type=image%2Fpng' },
    { label: 'Sin galería', src: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/e25ace3b-4efc-41e9-8c22-9803057a5b0a/prototipo+wpmu+cero+con+lavadero+y+un+dormitorio+mas+chapa+trapezoidal+sin+galeeeria.jpg?content-type=image%2Fjpeg' },
  ],
  gallery: [
    { src: sqsp('9d8b9a67-4b20-4dfb-a862-67eb1a31f489', 'wmu+enhaced.png'),                                                                             alt: 'Render módulo WMU CERO 2 — vista exterior' },
    { src: sqsp('0075d8e3-ee9b-4cb6-af21-f6569e417b87', 'enhanced_wmp+prototipo+cero+con+lavadero+y+dormitorio+siding03.png'),                            alt: 'Render módulo WMU CERO 2 — vista lateral siding' },
    { src: sqsp('da7cd17a-b4fb-4aae-9950-26ca65c50689', 'WMU+16.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 16' },
    { src: sqsp('0e835429-4254-4d4f-b520-b131313976b8', 'WMU+20.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 20' },
    { src: sqsp('c6c33c7d-77a6-407e-9e9d-bd0860f951d9', 'WMU+19.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 19' },
    { src: sqsp('76c0860d-9665-49b8-84a3-20e313f2c510', 'WMU+18.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 18' },
    { src: sqsp('95d9a3cf-1acc-4e47-a03a-8dd9500893d3', 'WMU+17.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 17' },
    { src: sqsp('46b0dcb5-7357-415d-af06-429aac74c7b9', 'WMU+15.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 15' },
    { src: sqsp('1a986fde-6acf-4473-8178-03f9bd1f1c48', 'WMU+02.jpg'),                                                                                     alt: 'Render módulo WMU CERO 2 — vista 02' },
  ],
  planoUrl: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/9c7a2630-3ec7-4ddd-97d5-05de039f883d/WMU+CERO2_page-0001.jpg?content-type=image%2Fjpeg',
  pdfUrl:   'https://static1.squarespace.com/static/67ffc8a20990bb5f40749245/t/6915e6a21452ee6d2c2e571c/1763042978747/WMU+CERO+2+ficha.pdf',
  fichaStats: [
    { k: 'Superficie',   v: '55 m²' },
    { k: 'Galería opc.', v: '+18 m²' },
    { k: 'Estructura',   v: 'Steel Frame' },
    { k: 'Aislación',    v: 'Poliuretano + Celulosa' },
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
    { src: sqsp('6b834997-13a4-4f8b-8156-877bff0dca54', 'Ara12.jpg'), alt: 'Render módulo WMU CAMPO — vista principal' },
    { src: sqsp('43c9f557-3bde-4964-a050-aa7b927f4751', 'Ara10.jpg'), alt: 'Render módulo WMU CAMPO — vista 10' },
    { src: sqsp('142b965b-3c24-4b0d-a2d3-983517e30f47', 'Ara14.jpg'), alt: 'Render módulo WMU CAMPO — vista 14' },
    { src: sqsp('cc6f58cb-fbcd-4e8a-bea2-4c1eca59344a', 'Ara9.jpg'),  alt: 'Render módulo WMU CAMPO — vista 9' },
    { src: sqsp('13f66b1d-d215-4c3c-8341-ed0d04580566', 'Ara8.jpg'),  alt: 'Render módulo WMU CAMPO — vista 8' },
    { src: sqsp('b53191ff-b8e7-4ff8-bace-181839d076c5', 'Ara13.jpg'), alt: 'Render módulo WMU CAMPO — vista 13' },
    { src: sqsp('86366464-f775-42f0-93e3-04cebe24c5d5', 'Ara11.jpg'), alt: 'Render módulo WMU CAMPO — vista 11' },
  ],
  planoUrl: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/c16d4d76-9fc7-40f9-8880-fbdfe0573575/WMU+CAMPO+plano.jpg?content-type=image%2Fjpeg',
  pdfUrl:   'https://static1.squarespace.com/static/67ffc8a20990bb5f40749245/t/6915ee52b4d2040461f5f811/1763044946277/WMU+CAMPO+ficha.pdf',
  fichaStats: [
    { k: 'Superficie', v: '94 m²' },
    { k: 'Galería',    v: '80 m²' },
    { k: 'Estructura', v: 'Steel Frame' },
    { k: 'Aislación',  v: 'Poliuretano + Celulosa' },
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
    { src: sqsp('a0d01b76-96db-4eed-bb4f-ef35a9efd9df', 'aldea.png'),     alt: 'Render módulo WMU ALDEA — vista principal' },
    { src: sqsp('f08ec8fb-e0e5-464d-9f2a-9bff9c8f12e2', 'aldea (2).png'), alt: 'Render módulo WMU ALDEA — vista 2' },
    { src: sqsp('7098cb63-4f7b-46d9-b1de-188fac63b4f0', 'aldea (3).png'), alt: 'Render módulo WMU ALDEA — vista 3' },
    { src: sqsp('6ec07d4b-9b4b-4af7-aecb-9bd8b5a02bdf', 'aldea (1).png'), alt: 'Render módulo WMU ALDEA — vista 1' },
  ],
  planoUrl: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/ae9de712-cf57-4fae-8556-a049c3f26d01/CASA+ALDEA+plano.jpg?content-type=image%2Fjpeg',
  pdfUrl:   'https://static1.squarespace.com/static/67ffc8a20990bb5f40749245/t/691723267a19407a03d41dea/1763124006452/CASA+ALDEA+ficha.pdf',
  fichaStats: [
    { k: 'Superficie', v: '120 m²' },
    { k: 'Galería',    v: '21 m²' },
    { k: 'Estructura', v: 'Steel Frame' },
    { k: 'Aislación',  v: 'Poliuretano + Celulosa' },
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
    { src: sqsp('d8f242d3-1e7b-456f-b2cb-0fbb7930462f', 'sauce.png'),                   alt: 'Render módulo WMU SAUCE — vista principal' },
    { src: sqsp('4af45009-da2d-444e-bac4-ea312845586b', 'enhanced_Sauce Montrul 7.png'), alt: 'Render módulo WMU SAUCE — vista 7' },
    { src: sqsp('dd708cc8-3fb9-4035-a2cd-5aed673c230a', 'enhanced_Sauce Montrul 8.png'), alt: 'Render módulo WMU SAUCE — vista 8' },
    { src: sqsp('f73673e3-5e6f-466d-a9e6-44519ef55eab', 'enhanced_Sauce Montrul 6.png'), alt: 'Render módulo WMU SAUCE — vista 6' },
  ],
  planoUrl: 'https://images.squarespace-cdn.com/content/67ffc8a20990bb5f40749245/90163f54-0f10-4564-b159-bf16c2b17729/WMU+SAUCE+plano.jpg?content-type=image%2Fjpeg',
  pdfUrl:   'https://static1.squarespace.com/static/67ffc8a20990bb5f40749245/t/6914a05910afad5d5c582c03/1762959449070/WMU+SAUCE.pdf',
  fichaStats: [
    { k: 'Superficie', v: '86 m²' },
    { k: 'Galería',    v: '10 m²' },
    { k: 'Estructura', v: 'Steel Frame' },
    { k: 'Aislación',  v: 'Poliuretano + Celulosa' },
  ],
  ctaBgIndex: 3,
}
