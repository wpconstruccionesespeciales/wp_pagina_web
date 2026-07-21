# Diseño de mejora SEO técnica con contenido existente

**Fecha:** 2026-07-21

**Proyecto:** WP Construcciones Especiales

**Estado:** aprobado para planificación

## Objetivo

Conseguir que cada URL pública entregue HTML indexable, metadatos propios y
un estado HTTP correcto, y mejorar la captación orgánica reorganizando
exclusivamente el contenido y los recursos que ya existen en el repositorio.

## Restricciones

- No inventar obras, testimonios, ubicaciones, resultados, precios o plazos.
- No presentar renders como fotografías de proyectos terminados.
- No crear landings geográficas sin contenido diferencial verificable.
- Conservar el diseño visual y las interacciones existentes salvo los ajustes
  indispensables para habilitar prerenderizado, semántica y navegación.
- Mantener Vercel como plataforma de despliegue.

## Arquitectura elegida

El proyecto pasará de React Router en modo SPA declarativo a React Router 7 en
modo framework con `ssr: false` y prerenderizado explícito de todas las rutas
públicas. El build generará un documento HTML por URL, por lo que title,
description, canonical, H1, contenido y JSON-LD estarán disponibles antes de
ejecutar JavaScript.

No se mantendrá un servidor SSR en producción. Vercel servirá los documentos
estáticos generados, un `404.html` personalizado y redirecciones permanentes
para las rutas históricas. La reescritura universal hacia `/` será eliminada.

## Fuente única de rutas y metadatos

Se definirá un registro central de rutas indexables con:

- path canónico;
- title y meta description;
- política de indexación;
- breadcrumbs;
- inclusión o exclusión del sitemap.

Ese registro alimentará el prerender y el sitemap. Los metadatos se emitirán
durante el render de cada módulo de ruta, sin depender de `useEffect` ni de
mutaciones posteriores de `document.head`.

La URL pública final será `https://www.wpconstrucciones.com`. Canonicals,
Open Graph, schema, robots y sitemap usarán directamente ese host.

## Estados HTTP y redirecciones

- Las rutas públicas declaradas responderán `200`.
- Cualquier URL inexistente responderá `404` y mostrará la vista NotFound.
- `/about` redirigirá con estado permanente a `/nosotros`.
- `/services` redirigirá con estado permanente a `/servicios`.
- El host sin `www` continuará redirigiendo al host canónico con `www`.
- No habrá cadenas de redirección entre una URL histórica y su destino final.

## Identidad comercial y NAP

Se creará una configuración central para nombre comercial, teléfono visible,
teléfono normalizado, WhatsApp, correo, localidad, provincia, país y redes.
Todos los componentes y schemas consumirán esa configuración.

La implementación no elegirá silenciosamente entre los datos contradictorios.
Antes de cerrar el cambio se deberá confirmar cuál de los teléfonos `3434` o
`3435` y cuál de los correos existentes son los datos públicos correctos. Hasta
esa confirmación no se modificará el valor comercial publicado.

## Tratamiento del contenido actual

### Inicio

Mantendrá su función institucional y comercial general. Se reducirá la
competencia interna con Servicios, WMU y Steel Frame Paraná mediante enlaces
contextuales y textos de presentación, sin intentar desarrollar en la portada
todas las intenciones de búsqueda.

### Nosotros

Mantendrá trayectoria, enfoque técnico y equipo. Se reforzará la semántica de
AboutPage y Organization usando únicamente los datos actuales.

### Servicios

Funcionará como página concentradora. El contenido existente se podrá separar
en páginas específicas únicamente cuando haya material suficiente para que
cada página tenga intención, H1, texto y CTA propios sin duplicación sustancial.
La primera implementación no obliga a publicar todas las subpáginas propuestas.

### Steel Frame Paraná

Se conservará la landing actual. Las afirmaciones que requieran evidencia se
reformularán como capacidades, criterios técnicos o experiencia declarada. Las
FAQs sobre permisos indicarán que la aprobación depende de la normativa vigente
y de las características del proyecto.

### WMU y modelos

Se reutilizarán renders, planos, PDF, superficies, ambientes, terminaciones y
opciones de ampliación existentes. Cada modelo conservará URL, title, H1 y
description propios. Se añadirán FAQs sólo cuando su respuesta pueda derivarse
de las fichas y especificaciones actuales.

El schema será revisado por modelo. No se declararán precio, valoración,
disponibilidad ni condiciones comerciales que no estén confirmadas.

### Sostenibilidad y páginas legales

Se mantendrán como rutas independientes, con HTML prerenderizado y metadatos
propios. Las páginas legales podrán excluirse del sitemap si no aportan valor de
búsqueda, pero continuarán siendo accesibles y rastreables desde el footer.

## Navegación y enlazado interno

Se crearán relaciones claras entre:

- Inicio y cada sección comercial principal;
- Servicios y Steel Frame Paraná;
- WMU, especificaciones y cada modelo;
- Sostenibilidad y las explicaciones técnicas relacionadas;
- todas las páginas comerciales y Contacto.

Los breadcrumbs visibles y JSON-LD compartirán la misma definición para evitar
diferencias. Cada ruta indexable tendrá exactamente un H1 descriptivo.

## Datos estructurados

- Home: `HomeAndConstructionBusiness` y organización, sin datos contradictorios.
- Nosotros: `AboutPage` y referencia a la organización.
- Servicios: `Service` u `OfferCatalog` basado en servicios realmente descritos.
- WMU: schema por modelo sin ofertas comerciales inventadas.
- Steel Frame Paraná: negocio/servicio local sin duplicar entidades incompatibles.
- Páginas profundas: `BreadcrumbList` generado desde la navegación canónica.

No se añadirá schema sólo para obtener más marcado. Todo dato estructurado debe
ser visible o estar respaldado por el contenido de la página.

## Pruebas y aceptación

Se añadirán comprobaciones automáticas sobre el resultado del build para cada
ruta pública:

- existe un HTML estático;
- contiene un title único y una meta description no vacía;
- contiene exactamente un canonical con host `www`;
- contiene exactamente un H1;
- no conserva el title genérico de otra ruta;
- la URL está incluida en el sitemap cuando corresponde;
- los enlaces internos importantes apuntan a rutas válidas.

También se comprobarán las redirecciones y el 404 en una vista previa compatible
con la configuración de Vercel. `npm run lint` y el build de producción deberán
terminar correctamente antes de cada commit funcional.

## Informe antes y después

La entrega final incluirá una matriz por página con:

- estado HTTP anterior y posterior;
- title inicial anterior y posterior;
- canonical anterior y posterior;
- presencia de H1 en HTML anterior y posterior;
- metadatos o schema relevante;
- cambio de contenido o enlazado realizado;
- cualquier limitación que permanezca por falta de material verificable.

Las mediciones anteriores se basarán en las respuestas de producción registradas
antes de la implementación. Las posteriores se tomarán del build y la vista
previa local; después del despliegue deberán repetirse contra producción.

## Fuera de alcance

- Casos de obra nuevos.
- Testimonios nuevos.
- Nuevas imágenes o producción audiovisual.
- Landings nuevas para Santa Fe u otras ciudades.
- Precios, financiación o plazos comerciales no confirmados.
- Investigación editorial extensa sobre costos, permisos o normativa.
- Migración a un CMS o incorporación de un backend.

## Secuencia de entrega

1. Migración de renderizado y rutas.
2. Metadatos estáticos, dominio canónico y sitemap.
3. Estados HTTP, 404 y redirecciones históricas.
4. Configuración central de identidad comercial, pendiente de confirmación NAP.
5. Revisión semántica y enlazado de páginas existentes.
6. Mejora de WMU y schema con información disponible.
7. Auditoría automática y matriz antes/después.
