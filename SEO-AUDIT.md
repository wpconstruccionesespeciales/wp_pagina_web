# Auditoría SEO - WP Construcciones Especiales

**Fecha:** 2026-07-15  
**URL:** https://wpconstrucciones.com  
**Stack:** React + Vite + React Router (SPA)  
**Deploy:** Vercel (static build en `/dist`)

---

## ✅ Resumen Ejecutivo

**Puntuación global: 8/10** — Base técnica SEO sólida. Principales gaps: prevención de CLS en imágenes, enriquecimiento de sitemap y datos estructurados Breadcrumb.

---

## ✅ Fortalezas (Bien Implementado)

| Área | Estado | Detalles |
|------|--------|----------|
| **Meta Tags Base** | ✅ | `title`, `description`, `keywords`, `robots` en `index.html` + dinámicos por página vía `SEO.jsx` |
| **Open Graph / Twitter** | ✅ | `og:title`, `og:description`, `og:image`, `og:type`, `og:locale=es_AR` + `twitter:card=summary_large_image` |
| **JSON-LD Structured Data** | ✅ Excelente | `HomeAndConstructionBusiness` en Home, `Service` + `OfferCatalog` en `/servicios` |
| **Canonical URLs** | ✅ Dinámicas | Auto-generadas por página en `SEO.jsx` |
| **Sitemap.xml** | ✅ Presente | 14 URLs en `dist/sitemap.xml` |
| **Robots.txt** | ✅ Presente | `Allow: /` + referencia a sitemap |
| **Imágenes** | ✅ Buenas | WebP, lazy loading, `alt` descriptivos |
| **Idioma / Geo** | ✅ | `html lang="es"`, `og:locale="es_AR"`, `areaServed` en schema |
| **Performance** | ✅ Bueno | Vite build, preload fonts, code-splitting (lazy routes) |
| **SPA Routing** | ✅ | React Router con `vercel.json` rewrites a `/index.html` |

---

## ⚠️ Hallazgos y Recomendaciones

### 🔴 Prioridad ALTA

| # | Hallazgo | Impacto | Acción |
|---|----------|---------|--------|
| 1 | **Imágenes sin `width`/`height`** | CLS (Core Web Vitals) | Añadir dimensiones explícitas o `aspect-ratio` CSS a TODAS las `<img>` |
| 2 | **Sin etiquetas `hreflang`** | SEO Internacional | Solo `es_AR` declarado. Añadir `x-default` y variantes si se targetean otros países (ES, MX, etc.) |

### 🟡 Prioridad MEDIA

| # | Hallazgo | Impacto | Acción |
|---|----------|---------|--------|
| 3 | **Sitemap sin `<lastmod>` ni `<priority>`** | Crawl budget | Enriquecer `dist/sitemap.xml` con fechas y prioridades |
| 4 | **Falta `BreadcrumbList` JSON-LD** | Rich Snippets / Navegación | Añadir en páginas profundas: `/wmu/*`, `/servicios`, `/nosotros`, etc. |
| 5 | **Verificar H1 único por página** | Accesibilidad / SEO | Cada ruta debe tener exactamente un `<h1>` que coincida con el `title` SEO |

### 🟢 Prioridad BAJA

| # | Hallazgo | Impacto | Acción |
|---|----------|---------|--------|
| 6 | **`robots.txt` mínimo** | Control de rastreo | Añadir `Crawl-delay` o reglas específicas si se desea |
| 7 | **Sin Web App Manifest** | PWA / Branding | Crear `public/manifest.webmanifest` con iconos, nombre, theme-color |
| 8 | **Favicon solo `.ico`** | Branding moderno | Añadir `favicon.svg`, `apple-touch-icon.png`, `manifest` icons |

---

## 📋 Checklist de Quick Wins (Implementar Ya)

- [ ] **Añadir `width`/`height` a todas las imágenes** (fix CLS)
- [ ] **Actualizar `sitemap.xml`** con `<lastmod>` y `<priority>`
- [ ] **Implementar `BreadcrumbList` schema** en páginas profundas
- [ ] **Auditar H1 único** por ruta
- [ ] **Crear `manifest.webmanifest`** en `/public`
- [ ] **Añadir `hreflang`** (mínimo `x-default` + `es-AR`)

---

## 📊 Detalle por Página (Rutas Principales)

| Ruta | Title SEO | Description | JSON-LD | H1 | Imágenes Optimizadas |
|------|-----------|-------------|---------|----|---------------------|
| `/` | ✅ WP Construcciones Especiales | ✅ Completa | ✅ `HomeAndConstructionBusiness` | ✅ | ⚠️ Revisar dimensiones |
| `/nosotros` | ✅ | ✅ | ❌ Falta | ✅ | ⚠️ |
| `/servicios` | ✅ | ✅ | ✅ `Service` + `OfferCatalog` | ✅ | ⚠️ |
| `/wmu` | ✅ | ✅ | ❌ Falta | ✅ | ⚠️ |
| `/wmu-especificaciones` | ✅ | ✅ | ❌ Falta | ✅ | ⚠️ |
| `/sostenibilidad` | ✅ | ✅ | ❌ Falta | ✅ | ⚠️ |
| `/steel-frame-parana` | ✅ | ✅ | ❌ Falta | ✅ | ⚠️ |
| `/privacidad`, `/terminos` | ✅ | ✅ | ❌ No requerido | ✅ | — |

> **Nota:** Las páginas WMU individuales (`/wmu-cero`, `/wmu-campo`, etc.) son páginas ligeras (185 bytes) — evaluar si indexar o `noindex`.

---

## 🛠 Archivos Clave a Modificar

| Archivo | Acción |
|---------|--------|
| `src/components/SEO.jsx` | Añadir soporte `hreflang`, `breadcrumbs` prop |
| `scripts/generate-sitemap.cjs` (o similar) | Enriquecer sitemap con `lastmod`/`priority` |
| `public/robots.txt` | Opcional: añadir `Crawl-delay` |
| `public/manifest.webmanifest` | **Crear nuevo** |
| `src/pages/*.jsx` | Añadir `width`/`height` a `<img>`, implementar `BreadcrumbList` |
| `vercel.json` | Verificar headers `Cache-Control` para assets estáticos |

---

## 📈 Métricas a Monitorar Post-Fix

| Métrica | Herramienta | Target |
|---------|-------------|--------|
| **CLS (Cumulative Layout Shift)** | PageSpeed / Search Console | < 0.1 |
| **Indexación** | GSC → Coverage | 100% páginas clave indexadas |
| **Rich Results** | GSC → Enhancements | Breadcrumb, Organization, Service |
| **Core Web Vitals** | PageSpeed Insights | LCP < 2.5s, INP < 200ms |

---

## 🔗 Referencias

- [Google SEO Starter Guide](https://developers.google.com/search/docs/focus/seo)
- [Schema.org HomeAndConstructionBusiness](https://schema.org/HomeAndConstructionBusiness)
- [Web Vitals](https://web.dev/vitals/)
- [Vercel SPA Routing](https://vercel.com/docs/concepts/functions/edge-middleware/rewriting)

---

*Generado automáticamente — revisar y actualizar tras cada deploy mayor.*