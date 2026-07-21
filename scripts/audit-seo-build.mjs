import { readFile, stat } from 'node:fs/promises'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_ROUTES, SITE_URL, canonicalUrl } from '../src/config/site.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const auditedRoutes = [...PUBLIC_ROUTES, '/404']
const nonCanonicalHost = SITE_URL.replace('://www.', '://')
const schemaRequiredRoutes = new Set(
  PUBLIC_ROUTES.filter((route) => !['/privacidad', '/terminos'].includes(route)),
)

function projectFile(path) {
  return resolve(projectRoot, path)
}

function outputFile(route) {
  return route === '/'
    ? projectFile('build/client/index.html')
    : projectFile(`build/client${route}/index.html`)
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[0])
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'))
  return match?.[1]
}

function assertSingle(route, label, elements, errors) {
  if (elements.length !== 1) {
    errors.push(`${route}: expected exactly one ${label}, found ${elements.length}`)
    return null
  }
  return elements[0]
}

function metaByName(html, name) {
  return matches(html, new RegExp(`<meta\\b(?=[^>]*\\bname=["']${name}["'])[^>]*>`, 'gi'))
}

function metaByProperty(html, property) {
  return matches(html, new RegExp(`<meta\\b(?=[^>]*\\bproperty=["']${property}["'])[^>]*>`, 'gi'))
}

function alternateByLanguage(html, language) {
  return matches(
    html,
    new RegExp(`<link\\b(?=[^>]*\\brel=["']alternate["'])(?=[^>]*\\bhreflang=["']${language}["'])[^>]*>`, 'gi'),
  )
}

function assertAbsoluteUrl(route, label, value, errors) {
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol')
  } catch {
    errors.push(`${route}: ${label} must be an absolute HTTP(S) URL, found ${value || '(empty)'}`)
  }
}

function schemaAssetUrls(schema) {
  const assets = []

  const collectAssetValue = (value, label) => {
    if (typeof value === 'string') {
      assets.push({ label, value })
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => collectAssetValue(item, `${label}[${index}]`))
    } else if (value && typeof value === 'object') {
      if (typeof value.url === 'string') assets.push({ label: `${label}.url`, value: value.url })
      if (typeof value.contentUrl === 'string') assets.push({ label: `${label}.contentUrl`, value: value.contentUrl })
    }
  }

  const visit = (value, path = '$') => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`))
      return
    }
    if (!value || typeof value !== 'object') return

    Object.entries(value).forEach(([key, child]) => {
      if (key === 'image' || key === 'logo') collectAssetValue(child, `${path}.${key}`)
      visit(child, `${path}.${key}`)
    })
  }

  visit(schema)
  return assets
}

async function assertBuiltSchemaAsset(route, label, value, errors) {
  let url

  try {
    url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported protocol')
  } catch {
    errors.push(`${route}: JSON-LD ${label} must be an absolute HTTP(S) URL, found ${value || '(empty)'}`)
    return
  }

  if (url.origin !== SITE_URL) return

  const buildClientRoot = projectFile('build/client')
  let schemaAssetPath

  try {
    schemaAssetPath = decodeURIComponent(url.pathname).replace(/^\/+/, '')
  } catch {
    errors.push(`${route}: JSON-LD ${label} has an invalid encoded asset path ${url.pathname}`)
    return
  }

  const assetPath = resolve(buildClientRoot, schemaAssetPath)
  const pathFromBuildRoot = relative(buildClientRoot, assetPath)

  if (!schemaAssetPath || pathFromBuildRoot.startsWith('..') || isAbsolute(pathFromBuildRoot)) {
    errors.push(`${route}: JSON-LD ${label} has an invalid same-origin asset path ${url.pathname}`)
    return
  }

  try {
    const assetStats = await stat(assetPath)
    if (!assetStats.isFile()) throw new Error('not a file')
  } catch {
    errors.push(`${route}: JSON-LD ${label} points to missing build asset ${url.pathname}`)
  }
}

async function auditRoute(route, { notFound = false } = {}) {
  const errors = []
  let html

  try {
    html = await readFile(outputFile(route), 'utf8')
  } catch (error) {
    return {
      errors: [`${route}: unable to read prerendered HTML (${error.message})`],
      title: null,
    }
  }

  if (html.includes(nonCanonicalHost)) {
    errors.push(`${route}: HTML or JSON-LD contains the non-canonical host ${nonCanonicalHost}`)
  }

  const title = assertSingle(route, '<title>', matches(html, /<title\b[^>]*>[\s\S]*?<\/title>/gi), errors)
  const description = assertSingle(route, 'meta description', metaByName(html, 'description'), errors)
  const canonical = assertSingle(route, 'canonical link', matches(html, /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi), errors)
  const h1 = assertSingle(route, '<h1>', matches(html, /<h1\b[^>]*>[\s\S]*?<\/h1>/gi), errors)
  const robots = assertSingle(route, 'meta robots', metaByName(html, 'robots'), errors)
  const alternateEsAr = assertSingle(route, 'es-AR alternate link', alternateByLanguage(html, 'es-AR'), errors)
  const alternateDefault = assertSingle(route, 'x-default alternate link', alternateByLanguage(html, 'x-default'), errors)

  const ogTags = Object.fromEntries(
    ['locale', 'site_name', 'title', 'description', 'type', 'url', 'image'].map((property) => [
      property,
      assertSingle(route, `og:${property}`, metaByProperty(html, `og:${property}`), errors),
    ]),
  )
  const twitterTags = Object.fromEntries(
    ['card', 'title', 'description', 'image'].map((name) => [
      name,
      assertSingle(route, `twitter:${name}`, metaByName(html, `twitter:${name}`), errors),
    ]),
  )
  const jsonLdScripts = matches(html, /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi)

  const titleText = title?.replace(/<[^>]+>/g, '').trim() || null
  if (title && !titleText) errors.push(`${route}: title is empty`)
  if (description && !attribute(description, 'content')?.trim()) errors.push(`${route}: description is empty`)
  if (h1 && !h1.replace(/<[^>]+>/g, '').trim()) errors.push(`${route}: H1 is empty`)

  const canonicalHref = canonical ? attribute(canonical, 'href') : null
  if (canonical) {
    const expected = canonicalUrl(route)
    if (canonicalHref !== expected) errors.push(`${route}: canonical must be ${expected}, found ${canonicalHref || '(empty)'}`)
    if (!canonicalHref?.startsWith('https://www.')) errors.push(`${route}: canonical is not HTTPS www`)
  }

  for (const [label, alternate] of [['es-AR', alternateEsAr], ['x-default', alternateDefault]]) {
    if (alternate && attribute(alternate, 'href') !== canonicalHref) {
      errors.push(`${route}: ${label} alternate must equal canonical`)
    }
  }

  if (robots) {
    const content = attribute(robots, 'content')?.toLowerCase() || ''
    if (!content) errors.push(`${route}: robots content is empty`)
    if (notFound && !content.includes('noindex')) errors.push(`${route}: 404 robots must contain noindex`)
    if (!notFound && content.includes('noindex')) errors.push(`${route}: public route must be indexable`)
  }

  for (const [property, tag] of Object.entries(ogTags)) {
    if (tag && !attribute(tag, 'content')?.trim()) errors.push(`${route}: og:${property} is empty`)
  }
  for (const [name, tag] of Object.entries(twitterTags)) {
    if (tag && !attribute(tag, 'content')?.trim()) errors.push(`${route}: twitter:${name} is empty`)
  }

  const ogUrl = ogTags.url ? attribute(ogTags.url, 'content') : null
  if (ogTags.url && ogUrl !== canonicalHref) errors.push(`${route}: og:url must equal canonical`)
  if (ogTags.image) assertAbsoluteUrl(route, 'og:image', attribute(ogTags.image, 'content'), errors)
  if (twitterTags.image) assertAbsoluteUrl(route, 'twitter:image', attribute(twitterTags.image, 'content'), errors)

  if (schemaRequiredRoutes.has(route) && jsonLdScripts.length === 0) {
    errors.push(`${route}: expected at least one JSON-LD block on a commercial route`)
  }

  for (const [index, script] of jsonLdScripts.entries()) {
    const payload = script
      .replace(/^<script\b[^>]*>/i, '')
      .replace(/<\/script>$/i, '')
      .trim()

    try {
      const schema = JSON.parse(payload)
      if (schema === null || typeof schema !== 'object') throw new Error('root value must be an object or array')
      const assets = schemaAssetUrls(schema)
      await Promise.all(
        assets.map(({ label, value }) => assertBuiltSchemaAsset(route, `schema ${index + 1} ${label}`, value, errors)),
      )
    } catch (error) {
      errors.push(`${route}: JSON-LD ${index + 1} is invalid (${error.message})`)
    }
  }

  return { errors, title: titleText }
}

async function auditDiscoveryFiles() {
  const errors = []
  const readAuditFile = async (path) => {
    try {
      return await readFile(projectFile(path), 'utf8')
    } catch (error) {
      errors.push(`${path}: unable to read file (${error.message})`)
      return null
    }
  }
  const [sitemap, robots, notFoundPage] = await Promise.all([
    readAuditFile('public/sitemap.xml'),
    readAuditFile('public/robots.txt'),
    readAuditFile('build/client/404.html'),
  ])
  if (sitemap === null || robots === null || notFoundPage === null) return errors

  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim())
  const expectedUrls = PUBLIC_ROUTES.map((route) => canonicalUrl(route))

  if (sitemapUrls.length !== expectedUrls.length) {
    errors.push(`sitemap: expected ${expectedUrls.length} URLs, found ${sitemapUrls.length}`)
  }
  if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap: URLs must be unique')

  for (const expectedUrl of expectedUrls) {
    if (!sitemapUrls.includes(expectedUrl)) errors.push(`sitemap: missing ${expectedUrl}`)
  }
  for (const sitemapUrl of sitemapUrls) {
    if (!expectedUrls.includes(sitemapUrl)) errors.push(`sitemap: unexpected ${sitemapUrl}`)
    try {
      const url = new URL(sitemapUrl)
      if (url.origin !== SITE_URL) errors.push(`sitemap: URL must use ${SITE_URL}, found ${sitemapUrl}`)
    } catch {
      errors.push(`sitemap: invalid absolute URL ${sitemapUrl}`)
    }
  }

  const sitemapDirectives = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map((match) => match[1])
  const expectedSitemap = `${SITE_URL}/sitemap.xml`
  if (sitemapDirectives.length !== 1 || sitemapDirectives[0] !== expectedSitemap) {
    errors.push(`robots: expected exactly one Sitemap directive for ${expectedSitemap}`)
  }
  if (!/^User-agent:\s*\*\s*$/im.test(robots)) errors.push('robots: missing User-agent: *')
  if (!/^Allow:\s*\/\s*$/im.test(robots)) errors.push('robots: missing Allow: /')
  if (!notFoundPage.trim()) errors.push('build/client/404.html: file is empty')

  return errors
}

const [routeResults, discoveryErrors] = await Promise.all([
  Promise.all(PUBLIC_ROUTES.map((route) => auditRoute(route)).concat(auditRoute('/404', { notFound: true }))),
  auditDiscoveryFiles(),
])
const errors = [...routeResults.flatMap((result) => result.errors), ...discoveryErrors]
const titleRoutes = new Map()

routeResults.forEach((result, index) => {
  if (!result.title) return

  const route = auditedRoutes[index]
  const previousRoute = titleRoutes.get(result.title)
  if (previousRoute) {
    errors.push(`${route}: title duplicates ${previousRoute}: ${result.title}`)
  } else {
    titleRoutes.set(result.title, route)
  }
})

if (errors.length > 0) {
  console.error(`SEO audit failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`SEO audit passed for ${PUBLIC_ROUTES.length} public routes and /404.`)
}
