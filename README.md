# WP Construcciones Especiales

## Mantenimiento

Generar la versión estática de producción y ejecutar la auditoría SEO:

```bash
npm run build
```

Auditar nuevamente el HTML ya generado en `build/client` sin repetir el build:

```bash
npm run audit:seo
```

Para añadir una ruta pública:

1. Agregarla a `PUBLIC_ROUTES` en `src/config/site.js`. El prerender toma su lista de esta configuración.
2. Declarar su archivo de ruta en `src/routes.js`.
3. Si `public/sitemap.xml` continúa siendo estático, agregar allí la URL canónica con `https://www.wpconstrucciones.com`.
4. Ejecutar `npm run build` y corregir cualquier error informado por la auditoría.
