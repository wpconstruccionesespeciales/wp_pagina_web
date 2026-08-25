export const SITE_URL = 'https://www.wpconstrucciones.com'
export const SITE_NAME = 'WP Construcciones Especiales'
export const BUSINESS_ID = `${SITE_URL}/#business`

const PHONE_E164 = '+5493434056918'
const EMAIL = 'wpsascentral@gmail.com'

export const BUSINESS = Object.freeze({
  name: SITE_NAME,
  phoneDisplay: '+54 9 3434 05-6918',
  phoneE164: PHONE_E164,
  telHref: `tel:${PHONE_E164}`,
  whatsapp: '5493434056918',
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}`,
  locality: 'Paraná',
  region: 'Entre Ríos',
  country: 'AR',
  social: Object.freeze({
    facebook: 'https://www.facebook.com/WPConstruccionesEspeciales',
    instagram: 'https://www.instagram.com/wpconstruccionesespeciales/?hl=en',
  }),
})

export const PUBLIC_ROUTES = Object.freeze([
  '/',
  '/nosotros',
  '/wmu',
  '/wmu-especificaciones',
  '/wmu-cero',
  '/wmu-cero-2',
  '/wmu-campo',
  '/wmu-aldea',
  '/wmu-sauce',
  '/privacidad',
  '/terminos',
  '/sostenibilidad',
  '/servicios',
  '/steel-frame-parana',
])

export function canonicalUrl(pathname = '/') {
  const path = pathname.startsWith('http') ? new URL(pathname).pathname : pathname
  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`

  return new URL(normalizedPath, `${SITE_URL}/`).href
}

export function whatsappUrl(message = '') {
  const url = new URL(`https://wa.me/${BUSINESS.whatsapp}`)

  if (message) url.searchParams.set('text', message)

  return url.href
}
