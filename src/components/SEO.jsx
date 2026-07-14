import { useEffect } from 'react'

export default function SEO({ title, description, keywords, ogImage, ogType = 'website', canonicalUrl, robots = 'index, follow' }) {
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

    updateOG('og:title', title || 'STEEL CORE | WP Construcciones Especiales')
    updateOG('og:description', description || 'Líderes en construcción en seco y steel framing de alta gama.')
    updateOG('og:type', ogType)
    const cleanUrl = canonicalUrl || (window.location.origin + window.location.pathname)
    updateOG('og:url', cleanUrl)
    
    let finalImage = `${window.location.origin}/wmu/wmu-financing.webp`
    if (ogImage) {
      finalImage = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`
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
    updateTwitter('twitter:title', title || 'STEEL CORE | WP Construcciones Especiales')
    updateTwitter('twitter:description', description || 'Líderes en construcción en seco y steel framing de alta gama.')
    updateTwitter('twitter:image', finalImage)

    // 6. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]')
    if (!linkCanonical) {
      linkCanonical = document.createElement('link')
      linkCanonical.setAttribute('rel', 'canonical')
      document.head.appendChild(linkCanonical)
    }
    linkCanonical.setAttribute('href', cleanUrl)
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, robots])

  return null
}
