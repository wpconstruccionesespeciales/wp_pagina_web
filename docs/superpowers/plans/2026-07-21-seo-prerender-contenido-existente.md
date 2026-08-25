# SEO Prerender y Contenido Existente Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar HTML estático indexable y estados HTTP correctos para todas las rutas actuales, consolidar la identidad SEO y mejorar el contenido existente sin inventar evidencia comercial.

**Architecture:** Migrar la SPA declarativa a React Router 7 Framework Mode con `ssr: false` y prerender de rutas estáticas. Mantener los componentes visuales existentes, convertir `SEO.jsx` en metadata renderizable, centralizar rutas y datos comerciales, y desplegar `build/client` en Vercel sin fallback SPA universal.

**Tech Stack:** React 19, React Router 7 Framework Mode, Vite 8, Vercel Static Hosting, Node.js 22+, ESLint.

---

## Estructura de archivos

- Crear `react-router.config.js`: lista de rutas prerenderizadas y directorio de aplicación.
- Crear `src/root.jsx`: documento HTML, assets globales y outlet de rutas.
- Crear `src/routes.js`: configuración de rutas estáticas.
- Crear `src/routes/*.jsx`: módulos del router que reutilizan las páginas existentes.
- Crear `src/pages/Home.jsx`: extraer la portada actualmente embebida en `App.jsx`.
- Crear `src/config/site.js`: dominio canónico, NAP, redes y rutas indexables.
- Modificar `src/components/SEO.jsx`: metadata declarativa compatible con prerender.
- Modificar `vercel.json`: servir el build estático, redirecciones y 404 real.
- Modificar `public/robots.txt` y generar `public/sitemap.xml`: URLs con `www`.
- Crear `scripts/audit-seo-build.mjs`: auditoría reproducible del HTML generado.
- Crear `docs/seo-before-after.md`: matriz por página.

## Límites de paralelización

La Task 1 es fundacional y se ejecuta primero. Después pueden correr en paralelo:

- Task 2: infraestructura SEO y hosting.
- Task 3: contenido institucional y enlazado.
- Task 4: WMU y modelos.

Task 5 integra NAP y resuelve conflictos. Task 6 verifica el conjunto completo.

### Task 1: Migrar a Framework Mode y prerender

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.js`
- Modify: `.gitignore`
- Create: `react-router.config.js`
- Create: `src/root.jsx`
- Create: `src/routes.js`
- Create: `src/pages/Home.jsx`
- Create: `src/routes/home.jsx`
- Create: `src/routes/nosotros.jsx`
- Create: `src/routes/servicios.jsx`
- Create: `src/routes/wmu.jsx`
- Create: `src/routes/wmu-especificaciones.jsx`
- Create: `src/routes/wmu-cero.jsx`
- Create: `src/routes/wmu-cero-2.jsx`
- Create: `src/routes/wmu-campo.jsx`
- Create: `src/routes/wmu-aldea.jsx`
- Create: `src/routes/wmu-sauce.jsx`
- Create: `src/routes/sostenibilidad.jsx`
- Create: `src/routes/steel-frame-parana.jsx`
- Create: `src/routes/privacidad.jsx`
- Create: `src/routes/terminos.jsx`
- Create: `src/routes/not-found.jsx`
- Delete: `src/main.jsx`
- Delete: `src/App.jsx`
- Delete: `index.html`

- [ ] **Step 1: Instalar el plugin oficial y cambiar scripts**

Ejecutar:

```powershell
npm install --save-dev @react-router/dev@^7.14.0
```

Dejar los scripts con esta forma:

```json
{
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "lint": "eslint .",
    "preview": "vite preview --outDir build/client",
    "audit:seo": "node scripts/audit-seo-build.mjs"
  }
}
```

- [ ] **Step 2: Configurar Vite y prerender**

`vite.config.js` debe utilizar `reactRouter()` conservando los manual chunks:

```js
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: { output: { manualChunks } },
  },
})
```

`react-router.config.js` debe declarar `appDirectory: 'src'`, `ssr: false`,
`buildDirectory: 'build'`, las 14 rutas públicas actuales y `/404` en
`prerender.paths`.

- [ ] **Step 3: Crear el documento raíz**

`src/root.jsx` debe importar `index.css` y renderizar:

```jsx
<html lang="es-AR">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <Meta />
    <Links />
  </head>
  <body>
    <Outlet />
    <ScrollRestoration />
    <Scripts />
  </body>
</html>
```

Incluir favicon, manifest, theme color, preconnects y estilos de fuentes que hoy
están en `index.html` mediante el export `links()` o elementos estáticos del head.

- [ ] **Step 4: Extraer Home y declarar rutas**

Mover `Home` y su schema desde `App.jsx` a `src/pages/Home.jsx`. Reemplazar el
uso de `window.location.origin` por el host canónico importado desde configuración
o por una ruta absoluta estable. Crear wrappers de ruta de una sola responsabilidad:

```jsx
export { default } from '../pages/Nosotros'
```

`src/routes.js` debe usar los helpers `index()` y `route()` de
`@react-router/dev/routes`. Declarar `/404` y un wildcard que reutilicen
`src/routes/not-found.jsx`; el wildcard es sólo para navegación cliente y no
debe configurarse como fallback HTTP en Vercel.

- [ ] **Step 5: Corregir incompatibilidades de prerender**

Buscar accesos a navegador durante render:

```powershell
rg -n "window\.|document\.|localStorage|sessionStorage|navigator\." src
```

Mover a efectos o proteger con `typeof window !== 'undefined'`. Los efectos no
deben ser necesarios para producir contenido, H1 o metadata.

- [ ] **Step 6: Verificar el build fundacional**

Ejecutar:

```powershell
npm run lint
npm run build
```

Esperado: ambos comandos terminan con código 0 y existen
`build/client/index.html`, `build/client/nosotros/index.html` y el equivalente
para cada ruta prerenderizada.

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json vite.config.js .gitignore react-router.config.js src/root.jsx src/routes.js src/routes src/pages/Home.jsx src/main.jsx src/App.jsx index.html
git diff --cached --check
git commit -m "feat(render): prerenderizar rutas publicas"
```

### Task 2: Metadata, dominio canónico y hosting

**Files:**
- Create: `src/config/site.js`
- Modify: `src/components/SEO.jsx`
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Modify: `vercel.json`
- Test: `scripts/audit-seo-build.mjs`
- Create: `scripts/finalize-static-build.mjs`

- [ ] **Step 1: Crear configuración canónica**

Definir y exportar como mínimo:

```js
export const SITE_URL = 'https://www.wpconstrucciones.com'
export const SITE_NAME = 'WP Construcciones Especiales'
export const PUBLIC_ROUTES = [
  '/', '/nosotros', '/servicios', '/steel-frame-parana', '/sostenibilidad',
  '/wmu', '/wmu-especificaciones', '/wmu-cero', '/wmu-cero-2', '/wmu-campo',
  '/wmu-aldea', '/wmu-sauce', '/privacidad', '/terminos',
]
export const canonicalUrl = (path = '/') =>
  `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`
```

- [ ] **Step 2: Convertir SEO a salida declarativa**

Eliminar `useEffect`, consultas a `document` y creación manual de nodos. El
componente debe retornar `title`, `meta`, `link canonical`, alternates y un
`script` BreadcrumbList cuando corresponda:

```jsx
return <>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content={robots} />
  <link rel="canonical" href={cleanUrl} />
  <meta property="og:url" content={cleanUrl} />
  {breadcrumbs.length > 0 && (
    <script type="application/ld+json">
      {JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}
    </script>
  )}
</>
```

No mantener `meta keywords`, porque no aporta al objetivo y duplica información.

- [ ] **Step 3: Corregir archivos de rastreo**

`robots.txt` debe apuntar a
`https://www.wpconstrucciones.com/sitemap.xml`. Todas las `<loc>` del sitemap
deben utilizar el mismo host y sólo contener rutas prerenderizadas.

- [ ] **Step 4: Configurar Vercel**

Cambiar `outputDirectory` a `build/client`, eliminar el rewrite `/(.*) -> /`, y
agregar redirecciones permanentes antes de los headers:

```json
"redirects": [
  { "source": "/about", "destination": "/nosotros", "permanent": true },
  { "source": "/services", "destination": "/servicios", "permanent": true }
]
```

Crear `scripts/finalize-static-build.mjs` para copiar
`build/client/404/index.html` a `build/client/404.html` mediante `fs.copyFile`.
Actualizar el script `build` a:

```json
"build": "react-router build && node scripts/finalize-static-build.mjs"
```

Vercel servirá ese archivo con estado 404 cuando ningún archivo estático coincida;
no debe existir un rewrite catch-all con estado 200.

- [ ] **Step 5: Escribir auditoría mínima del build**

Crear un script Node sin dependencias adicionales que recorra `PUBLIC_ROUTES`,
lea cada HTML y falle si falta title, description, canonical con `www` o un H1.
También debe detectar titles duplicados salvo excepciones explícitas inexistentes.

- [ ] **Step 6: Verificar y commit**

```powershell
npm run build
npm run audit:seo
git add src/config/site.js src/components/SEO.jsx public/robots.txt public/sitemap.xml vercel.json scripts/audit-seo-build.mjs scripts/finalize-static-build.mjs package.json
git diff --cached --check
git commit -m "fix(seo): consolidar metadata y rutas canonicas"
```

### Task 3: Mejorar contenido institucional y enlazado

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Nosotros.jsx`
- Modify: `src/pages/Servicios.jsx`
- Modify: `src/pages/SteelFrameParana.jsx`
- Modify: `src/pages/Sostenibilidad.jsx`
- Modify: `src/components/Services.jsx`
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Auditar H1 y promesas no respaldadas**

Ejecutar:

```powershell
rg -n "<h1|primer edificio|líder|garant|ahorro|plazo|precio|proyectos en todo" src/pages src/components
```

Mantener un H1 por página. Reformular afirmaciones absolutas como descripción de
enfoque o capacidad cuando el repositorio no contiene respaldo verificable.

- [ ] **Step 2: Diferenciar intención de páginas**

- Home: presentación general y accesos a Servicios, Paraná y WMU.
- Nosotros: historia y enfoque técnico, sin repetir catálogo.
- Servicios: página concentradora con enlaces profundos a Paraná, WMU y contacto.
- Paraná: solución local y criterios técnicos, sin presentarla como caso de obra.
- Sostenibilidad: eficiencia y materiales explicados desde contenido existente.

No crear nuevas rutas de servicios en esta etapa si sólo repetirían párrafos.

- [ ] **Step 3: Añadir enlaces contextuales**

Usar `Link` para rutas internas y conservar `<a>` para archivos/externos. Cada
página comercial debe poder llegar a Contacto y a una página relacionada sin
depender exclusivamente del menú global.

- [ ] **Step 4: Corregir la FAQ de permisos**

La respuesta debe indicar que Steel Frame puede tramitarse dentro del marco
constructivo aplicable, pero que requisitos y aprobación dependen del municipio,
la normativa vigente, el terreno y el proyecto profesional.

- [ ] **Step 5: Verificar y commit**

```powershell
npm run lint
npm run build
git add src/pages/Home.jsx src/pages/Nosotros.jsx src/pages/Servicios.jsx src/pages/SteelFrameParana.jsx src/pages/Sostenibilidad.jsx src/components/Services.jsx src/components/Projects.jsx src/components/Footer.jsx
git diff --cached --check
git commit -m "refactor(contenido): enfocar paginas y enlaces internos"
```

### Task 4: Potenciar WMU con recursos existentes

**Files:**
- Modify: `src/data/wmu-modules.js`
- Modify: `src/components/ModulePage.jsx`
- Modify: `src/pages/WMU.jsx`
- Modify: `src/pages/WmuEspecificaciones.jsx`

- [ ] **Step 1: Ampliar datos por modelo sin inventar**

Añadir a cada objeto un `slug`, descripción breve única, `faq` derivada de
superficie, ambientes, galería/ampliación, estructura, aislación y alcance común.
No añadir precio, disponibilidad, valoración ni plazo.

- [ ] **Step 2: Renderizar FAQ y navegación relacionada**

`ModulePage.jsx` debe mostrar una sección semántica de preguntas con botones
accesibles o `details/summary`, y enlaces a `/wmu`, `/wmu-especificaciones` y CTA
de consulta. El JSON-LD FAQ sólo se incluirá si las mismas preguntas y respuestas
son visibles en la página.

- [ ] **Step 3: Corregir Product schema**

Eliminar el bloque `Offer` con `PreOrder` si no hay una oferta y condiciones
comerciales públicas. Mantener `Product` con nombre, descripción, imagen, marca
y propiedades técnicas visibles, o cambiar a `Service` si el contenido describe
principalmente fabricación a medida.

- [ ] **Step 4: Diferenciar catálogo y especificaciones**

`/wmu` debe funcionar como selector de modelos; `/wmu-especificaciones` debe
concentrar el equipamiento común. Evitar repetir toda la memoria en cada ficha y
enlazar hacia la página técnica.

- [ ] **Step 5: Verificar y commit**

```powershell
npm run lint
npm run build
git add src/data/wmu-modules.js src/components/ModulePage.jsx src/pages/WMU.jsx src/pages/WmuEspecificaciones.jsx
git diff --cached --check
git commit -m "feat(wmu): enriquecer fichas con datos existentes"
```

### Task 5: Integrar identidad comercial y resolver conflictos

**Files:**
- Modify: `src/config/site.js`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/SteelFrameParana.jsx`
- Modify: `src/pages/WMU.jsx`
- Modify: `src/pages/WmuEspecificaciones.jsx`
- Modify: `src/pages/Privacidad.jsx`
- Modify: `src/components/Contact.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/WhatsAppButton.jsx`
- Modify: `src/components/ModulePage.jsx`

- [ ] **Step 1: Fijar la fuente de verdad**

Adoptar los valores predominantes del sitio actual:

```js
export const BUSINESS = {
  name: 'WP Construcciones Especiales',
  phoneDisplay: '+54 9 3434 05-6918',
  phoneE164: '+5493434056918',
  whatsapp: '5493434056918',
  email: 'wpsascentral@gmail.com',
  locality: 'Paraná',
  region: 'Entre Ríos',
  country: 'AR',
}
```

Esta elección corrige el enlace aislado `3434` y el correo alternativo aislado,
sin inventar una dirección postal exacta.

- [ ] **Step 2: Reemplazar literales**

Todos los enlaces y schemas deben importar `BUSINESS`. La URL de WhatsApp se
construirá desde un helper único. No debe quedar ningún teléfono o correo literal
fuera de `src/config/site.js`.

- [ ] **Step 3: Comprobar ausencia de contradicciones**

```powershell
rg -n "3434|3435|wpsascentral|contacto@wpconstrucciones" src
```

Esperado: sólo `src/config/site.js` contiene los valores comerciales.

- [ ] **Step 4: Verificar y commit**

```powershell
npm run lint
npm run build
git add src/config/site.js src/pages src/components
git diff --cached --check
git commit -m "fix(contacto): unificar identidad comercial"
```

### Task 6: Auditoría final e informe antes/después

**Files:**
- Modify: `scripts/audit-seo-build.mjs`
- Create: `docs/seo-before-after.md`
- Modify: `README.md`

- [ ] **Step 1: Completar verificaciones automáticas**

El script debe informar por ruta:

```text
path | html | title | description | canonical | h1 | robots | schema
```

Debe salir con código 1 ante archivos ausentes, canonical sin `www`, H1 distinto
de uno, title duplicado, description vacía o schema JSON inválido.

- [ ] **Step 2: Registrar el antes y después**

Usar como baseline comprobado de producción: todas las rutas auditadas respondían
con el mismo HTML inicial, title genérico, sin H1 y sin canonical; URL inexistente,
`/about` y `/services` respondían 200. Comparar con el build final por cada una de
las 14 rutas y documentar cambios específicos de contenido/schema.

- [ ] **Step 3: Documentar comandos de mantenimiento**

Añadir a README:

```powershell
npm run build
npm run audit:seo
```

Explicar que una ruta pública nueva debe agregarse a `routes.js`, prerender y
sitemap mediante la configuración compartida.

- [ ] **Step 4: Ejecutar la verificación completa**

```powershell
npm run lint
npm run build
npm run audit:seo
git status --short
```

Esperado: los tres comandos pasan y sólo existen cambios intencionales.

- [ ] **Step 5: Commit final**

```powershell
git add scripts/audit-seo-build.mjs docs/seo-before-after.md README.md
git diff --cached --check
git commit -m "test(seo): verificar paginas prerenderizadas"
```

## Revisión final

Un revisor debe comparar los commits con la especificación, ejecutar lint, build
y auditoría, inspeccionar al menos Home, Servicios, Paraná, WMU Cero y una URL
inexistente, y confirmar que no se añadieron afirmaciones comerciales nuevas.
