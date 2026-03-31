export function absoluteUrl(path = '/') {
  const config = useRuntimeConfig()
  const base = config.public.siteUrl || config.siteUrl || 'https://example-medical-travel.com'
  return new URL(path, base).toString()
}

export function buildTitle(title) {
  return title || 'Tanzania Medical Travel'
}

export function buildCanonical(path) {
  return absoluteUrl(path)
}

export function buildSeoMeta({
  title,
  description,
  path = '/',
  image = '/images/og-default.svg',
  robots = 'index, follow',
  type = 'website'
}) {
  const canonical = buildCanonical(path)
  const resolvedTitle = buildTitle(title)
  const resolvedImage = absoluteUrl(image)

  return {
    title: resolvedTitle,
    description,
    ogTitle: resolvedTitle,
    ogDescription: description,
    ogType: type,
    ogUrl: canonical,
    ogImage: resolvedImage,
    twitterCard: 'summary_large_image',
    twitterTitle: resolvedTitle,
    twitterDescription: description,
    twitterImage: resolvedImage,
    robots
  }
}

export function buildHeadLinks(path = '/') {
  return [
    {
      rel: 'canonical',
      href: buildCanonical(path)
    }
  ]
}
