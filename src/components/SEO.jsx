import { useEffect } from 'react'

const SITE_URL = 'https://wpconstrucciones.com'

function normalizeUrl(url) {
  if (!url) return `${SITE_URL}/`
  if (url.startsWith('http')) return url
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`
}

function updateLink(selector, attributes) {
  let link = document.querySelector(selector)
  if (!link) {
    link = document.createElement('link')
    document.head.appendChild(link)
  }
  Object.entries(attributes).forEach(([key, value]) => link.setAttribute(key, value))
}

function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: normalizeUrl(item.url),
    })),
  }
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  robots = 'index, follow',
  breadcrumbs = [],
}) {
  useEffect(() => {
    // 0. Robots Directives
    let metaRobots = document.querySelector('meta[name="robots"]')
    if (!metaRobots) {
      metaRobots = document.createElement('meta')
      metaRobots.setAttribute('name', 'robots')
      document.head.appendChild(metaRobots)
    }
    metaRobots.setAttribute('content', robots)

    // 1. Title
    if (title) {
      document.title = title
    }

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description || 'WP Construcciones Especiales - Líderes en Steel Frame de alta gama y arquitectura modular.')

    // 3. Meta Keywords
    let metaKey = document.querySelector('meta[name="keywords"]')
    if (!metaKey) {
      metaKey = document.createElement('meta')
      metaKey.setAttribute('name', 'keywords')
      document.head.appendChild(metaKey)
    }
    metaKey.setAttribute('content', keywords || 'steel frame, construccion en seco, arquitectura modular, casas modulares, argentina')

    // 4. Open Graph Metas (WhatsApp, Facebook, LinkedIn, etc.)
    const updateOG = (property, content) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`)
      if (!ogMeta) {
        ogMeta = document.createElement('meta')
        ogMeta.setAttribute('property', property)
        document.head.appendChild(ogMeta)
      }
      ogMeta.setAttribute('content', content)
    }

    updateOG('og:title', title || 'WP Construcciones Especiales')
    updateOG('og:description', description || 'Líderes en construcción en seco y steel framing de alta gama.')
    updateOG('og:type', ogType)
    const cleanUrl = canonicalUrl || normalizeUrl(window.location.pathname)
    updateOG('og:url', cleanUrl)
    
    let finalImage = `${SITE_URL}/wmu/wmu-financing.webp`
    if (ogImage) {
      finalImage = normalizeUrl(ogImage)
    }
    updateOG('og:image', finalImage)

    // 5. Twitter Cards
    const updateTwitter = (name, content) => {
      let twMeta = document.querySelector(`meta[name="${name}"]`)
      if (!twMeta) {
        twMeta = document.createElement('meta')
        twMeta.setAttribute('name', name)
        document.head.appendChild(twMeta)
      }
      twMeta.setAttribute('content', content)
    }

    updateTwitter('twitter:card', 'summary_large_image')
    updateTwitter('twitter:title', title || 'WP Construcciones Especiales')
    updateTwitter('twitter:description', description || 'Líderes en construcción en seco y steel framing de alta gama.')
    updateTwitter('twitter:image', finalImage)

    // 6. Canonical and language alternates
    updateLink('link[rel="canonical"]', { rel: 'canonical', href: cleanUrl })
    updateLink('link[rel="alternate"][hreflang="es-AR"]', { rel: 'alternate', hreflang: 'es-AR', href: cleanUrl })
    updateLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: cleanUrl })

    // 7. Breadcrumb structured data
    const breadcrumbId = 'seo-breadcrumb-jsonld'
    const existingBreadcrumb = document.getElementById(breadcrumbId)
    if (breadcrumbs.length > 0) {
      const script = existingBreadcrumb || document.createElement('script')
      script.id = breadcrumbId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(buildBreadcrumbSchema(breadcrumbs))
      if (!existingBreadcrumb) document.head.appendChild(script)
    } else if (existingBreadcrumb) {
      existingBreadcrumb.remove()
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, robots, breadcrumbs])

  return null
}
