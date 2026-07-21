# SEO técnico: antes y después

Fecha de verificación del build: 21 de julio de 2026.

Este informe compara la producción anterior con el HTML estático generado localmente por el cambio. No atribuye mejoras de ranking, tráfico o rendimiento: esos resultados sólo pueden medirse después de publicar, permitir el nuevo rastreo y observar datos reales.

## Resumen verificable

### Antes

La comprobación de la producción anterior mostró que las 14 rutas públicas, `/about`, `/services` y una URL inventada (`/no-existe-xyz`) respondían HTTP 200 con el mismo HTML inicial de 3.287 bytes. Todas entregaban:

- el title `WP Construcciones Especiales`;
- ningún `<h1>` en el HTML inicial;
- ningún canonical;
- el contenido específico sólo después de ejecutar JavaScript.

El host `https://wpconstrucciones.com` respondía 308 hacia `https://www.wpconstrucciones.com`, mientras parte de las señales SEO usaba el host sin `www`.

### Después, comprobado en el build

`npm run build` terminó correctamente y `npm run audit:seo` aprobó las 14 rutas públicas y `/404`. Cada ruta pública tiene ahora un archivo HTML prerenderizado con title, description, canonical en `https://www.wpconstrucciones.com`, un único H1 y robots `index, follow`. Las rutas comerciales incluyen JSON-LD; las páginas legales no lo requieren.

## Comparación por página

En la columna “Antes” se resume el mismo estado observado en todas las rutas: `title` genérico, H1 ausente y canonical ausente. “Schema” indica los tipos principales encontrados en el JSON-LD prerenderizado.

| Ruta | Antes | Después en `build/client` | Cambio específico |
|---|---|---|---|
| `/` | Title genérico; H1 0; sin canonical | **WP Construcciones Especiales** · H1 (1): “Especialistas en Steel Frame desde Paraná” · canonical `/` · `index, follow` · Schema: `HomeAndConstructionBusiness`, `FAQPage` | La portada ya entrega en HTML su propuesta, negocio local y preguntas frecuentes. |
| `/nosotros` | Title genérico; H1 0; sin canonical | **Nosotros \| Trayectoria en Steel Frame y Construcción en Seco · WP** · H1 (1): “Nuestra historia en arquitectura y acero” · canonical `/nosotros` · `index, follow` · Schema: `BreadcrumbList`, `AboutPage`, `Organization` | Distingue trayectoria e identidad institucional de las páginas comerciales. |
| `/wmu` | Title genérico; H1 0; sin canonical | **WMU Arquitectura Modular \| Módulos Habitacionales Steel Frame** · H1 (1): “WMU ARQUITECTURA MODULAR” · canonical `/wmu` · `index, follow` · Schema: `BreadcrumbList` | El catálogo queda orientado a arquitectura modular y enlazado mediante breadcrumbs. |
| `/wmu-especificaciones` | Title genérico; H1 0; sin canonical | **Especificaciones Técnicas \| Módulos WMU · Steel Frame** · H1 (1): “Lo que incluimos en módulos WMU” · canonical `/wmu-especificaciones` · `index, follow` · Schema: `BreadcrumbList` | Separa la intención de búsqueda técnica de la página general del catálogo. |
| `/wmu-cero` | Title genérico; H1 0; sin canonical | **WMU CERO · Módulo 36 m² \| WP Construcciones Especiales** · H1 (1): “MÓDULO WMU CERO” · canonical `/wmu-cero` · `index, follow` · Schema: `BreadcrumbList`, `Product`, `FAQPage` | Identifica modelo y superficie; estructura la ficha y sus preguntas frecuentes. |
| `/wmu-cero-2` | Title genérico; H1 0; sin canonical | **WMU CERO 2 · Módulo 55 m² \| WP Construcciones Especiales** · H1 (1): “MÓDULO WMU CERO 2” · canonical `/wmu-cero-2` · `index, follow` · Schema: `BreadcrumbList`, `Product`, `FAQPage` | Diferencia el modelo de dos habitaciones y su superficie del WMU CERO. |
| `/wmu-campo` | Title genérico; H1 0; sin canonical | **WMU CAMPO · Módulo 94 m² \| WP Construcciones Especiales** · H1 (1): “MÓDULO WMU CAMPO” · canonical `/wmu-campo` · `index, follow` · Schema: `BreadcrumbList`, `Product`, `FAQPage` | Da identidad propia al modelo CAMPO y a su ficha de 94 m². |
| `/wmu-aldea` | Title genérico; H1 0; sin canonical | **WMU ALDEA · Módulo 120 m² \| WP Construcciones Especiales** · H1 (1): “MÓDULO WMU ALDEA” · canonical `/wmu-aldea` · `index, follow` · Schema: `BreadcrumbList`, `Product`, `FAQPage` | Da identidad propia al modelo familiar ALDEA y a su ficha de 120 m². |
| `/wmu-sauce` | Title genérico; H1 0; sin canonical | **WMU SAUCE · Módulo 86 m² \| WP Construcciones Especiales** · H1 (1): “MÓDULO WMU SAUCE” · canonical `/wmu-sauce` · `index, follow` · Schema: `BreadcrumbList`, `Product`, `FAQPage` | Presenta el modelo evolutivo SAUCE como una URL diferenciada. |
| `/privacidad` | Title genérico; H1 0; sin canonical | **Política de Privacidad \| WP Construcciones Especiales** · H1 (1): “Política de Privacidad” · canonical `/privacidad` · `index, follow` · sin schema comercial | La página legal tiene metadatos y encabezado propios sin schema comercial innecesario. |
| `/terminos` | Title genérico; H1 0; sin canonical | **Términos de Servicio \| WP Construcciones Especiales** · H1 (1): “Términos de Servicio” · canonical `/terminos` · `index, follow` · sin schema comercial | La página legal queda diferenciada y canónica. |
| `/sostenibilidad` | Title genérico; H1 0; sin canonical | **Criterios Ambientales en Steel Frame \| WP** · H1 (1): “Sostenibilidad” · canonical `/sostenibilidad` · `index, follow` · Schema: `BreadcrumbList` | Enfoca la página en criterios ambientales verificables y evita promesas genéricas. |
| `/servicios` | Title genérico; H1 0; sin canonical | **Servicios de Steel Frame y Construcción en Seco \| WP** · H1 (1): “Nuestros Servicios” · canonical `/servicios` · `index, follow` · Schema: `BreadcrumbList`, `Service` | Consolida la intención comercial de arquitectura, cálculo, montaje y dirección de obra. |
| `/steel-frame-parana` | Title genérico; H1 0; sin canonical | **Steel Frame en Paraná \| WP Construcciones Especiales** · H1 (1): “Steel Frame en Paraná : Habitar el Litoral” · canonical `/steel-frame-parana` · `index, follow` · Schema: `BreadcrumbList`, `HomeAndConstructionBusiness` | Entrega una landing local específica basada en criterios de suelo, clima, envolvente, permisos y servicios ya disponibles. |

Todas las páginas incluyen también una meta description específica. La auditoría valida que exista exactamente una, que no esté vacía y que los títulos no se repitan entre rutas.

## Rutas especiales y códigos HTTP

| Ruta o caso | Antes en producción | Estado esperado después del deploy | Implementación |
|---|---|---|---|
| `/about` | 200 con la SPA genérica | Redirección permanente a `/nosotros` | Redirect `permanent: true` en `vercel.json`. |
| `/services` | 200 con la SPA genérica | Redirección permanente a `/servicios` | Redirect `permanent: true` en `vercel.json`. |
| URL desconocida, por ejemplo `/no-existe-xyz` | 200; soft-404 | 404 real | El build genera `build/client/404.html`, con `noindex, nofollow`. |
| 14 rutas públicas | 200 con HTML inicial idéntico | 200 con HTML prerenderizado específico | Un archivo HTML por ruta en `build/client`. |
| Host sin `www` | 308 a `www`, pero con señales SEO inconsistentes | Redirección al host `www`; canonicals, sitemap y robots ya apuntan al destino final | `SITE_URL`, sitemap, robots y HTML usan `https://www.wpconstrucciones.com`. |

La auditoría comprueba las invariantes de la salida que usa Vercel: presencia de los HTML prerenderizados, metadatos de cada ruta, configuración de descubrimiento y existencia de `404.html` con directiva `noindex`. Los códigos anteriores son el comportamiento esperado según `vercel.json` y esa salida estática, pero la auditoría local no puede comprobar el status HTTP que finalmente entrega la capa de routing del proveedor. Los 200, redirects permanentes y 404 deben revalidarse con solicitudes HTTP reales después del deploy.

## Alcance y limitaciones

Esta etapa mejora la rastreabilidad, diferenciación e interpretación del contenido existente. No se añadieron ni se deben inferir:

- fotografías de obras no disponibles;
- ubicaciones o casos de obra no documentados;
- testimonios o resultados sin prueba;
- precios, rangos de inversión o financiación;
- plazos generales de fabricación u obra.

Por ese motivo, las mejoras se concentran en HTML prerenderizado, señales canónicas, datos comerciales coherentes, jerarquía semántica, contenido ya existente, fichas WMU y preguntas frecuentes que no exigen nuevas pruebas. Cuando exista material verificable, una etapa posterior podrá sumar casos de obra y evidencia visual sin rehacer esta base técnica.

## Verificación reproducible

```bash
npm run build
npm run audit:seo
```

Resultado obtenido: `SEO audit passed for 14 public routes and /404.`
