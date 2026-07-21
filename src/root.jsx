import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './index.css'

const DESCRIPTION = 'WP Construcciones Especiales es líder en construcción en seco, steel framing de alta gama y arquitectura modular en Argentina. Diseños sostenibles con precisión milimétrica.'
const SOCIAL_DESCRIPTION = 'Líderes en construcción en seco y steel framing de alta gama. Soluciones modulares y arquitectura de precisión con alma de acero.'
const SOCIAL_IMAGE = 'https://wpconstrucciones.com/wmu/wmu-financing.webp'

export function Layout({ children }) {
  return (
    <html lang="es-AR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>WP Construcciones Especiales</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content="steel frame, construccion en seco, arquitectura modular, casas modulares, wmu, wp construcciones, argentina" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WP Construcciones Especiales" />
        <meta property="og:description" content={SOCIAL_DESCRIPTION} />
        <meta property="og:image" content={SOCIAL_IMAGE} />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WP Construcciones Especiales" />
        <meta name="twitter:description" content={SOCIAL_DESCRIPTION} />
        <meta name="twitter:image" content={SOCIAL_IMAGE} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#15251b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-label="Cargando página">
      <div className="h-9 w-9 rounded-full border-2 border-primary/15 border-t-primary animate-spin" />
    </div>
  )
}

export default function Root() {
  return <Outlet />
}
