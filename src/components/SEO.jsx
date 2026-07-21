import { useLocation } from 'react-router'
import { canonicalUrl as createCanonicalUrl, SITE_NAME, SITE_URL } from '../config/site'

const DEFAULT_DESCRIPTION = 'WP Construcciones Especiales - Líderes en Steel Frame de alta gama y arquitectura modular.'
const DEFAULT_SOCIAL_DESCRIPTION = 'Líderes en construcción en seco y steel framing de alta gama.'
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/wmu/wmu-financing.webp`

function absoluteUrl(url) {
  if (!url) return DEFAULT_SOCIAL_IMAGE
  return new URL(url, `${SITE_URL}/`).href
}

function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: createCanonicalUrl(item.url),
    })),
  }
}

export default function SEO({
  title,
  description,
  ogImage,
  ogType = 'website',
  canonicalUrl: canonicalOverride,
  robots = 'index, follow',
  breadcrumbs = [],
}) {
  const { pathname } = useLocation()
  const canonical = createCanonicalUrl(canonicalOverride || pathname)
  const resolvedTitle = title || SITE_NAME
  const resolvedDescription = description || DEFAULT_DESCRIPTION
  const socialDescription = description || DEFAULT_SOCIAL_DESCRIPTION
  const socialImage = absoluteUrl(ogImage)
  const breadcrumbJson = breadcrumbs.length > 0
    ? JSON.stringify(buildBreadcrumbSchema(breadcrumbs)).replace(/</g, '\\u003c')
    : null

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es-AR" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={socialImage} />
      {breadcrumbJson && (
        <script
          id="seo-breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
        />
      )}
    </>
  )
}
