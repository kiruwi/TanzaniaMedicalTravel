<template>
  <section class="section">
    <div class="container">
      <article class="surface-card destination-detail">
        <span class="eyebrow">Destination</span>
        <h1>{{ destination.name }}</h1>
        <p>{{ destination.summary }}</p>
        <ul class="destination-detail__highlights">
          <li v-for="item in destination.highlights" :key="item">{{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createBreadcrumbSchema } from '~/utils/schema'
import { destinations } from '~/utils/mockData'

const route = useRoute()
const destination = destinations.find((item) => item.country === route.params.country)

if (!destination) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Destination not found'
  })
}

useSeoMeta(buildSeoMeta({
  title: destination.name,
  description: destination.summary,
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBreadcrumbSchema([
        { name: 'Destinations', path: '/destinations' },
        { name: destination.name, path: route.path }
      ]))
    }
  ]
})
</script>

<style scoped>
.destination-detail {
  padding: 1.75rem;
}

.destination-detail p {
  color: var(--color-text-soft);
}

.destination-detail__highlights {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.destination-detail__highlights li {
  padding: 0.9rem 1rem;
  border-radius: 0.85rem;
  background: var(--color-surface-muted);
}
</style>
