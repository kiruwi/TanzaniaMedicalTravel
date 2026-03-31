<template>
  <section class="section">
    <div class="container stack">
      <article class="surface-card hospital-detail">
        <span class="status-badge">{{ hospital.city }}</span>
        <h1>{{ hospital.name }}</h1>
        <p>{{ hospital.summary }}</p>
        <div class="grid-two">
          <div>
            <strong>Specialty focus</strong>
            <p>{{ hospital.specialtyFocus }}</p>
          </div>
          <div>
            <strong>Address</strong>
            <p>{{ hospital.address }}</p>
          </div>
        </div>
      </article>

      <section>
        <div class="section-heading">
          <span class="eyebrow">Related treatments</span>
          <h2>Internal links to treatment pathways</h2>
        </div>
        <div class="grid-three">
          <article v-for="item in linkedTreatments" :key="item.slug" class="surface-card hospital-detail__related">
            <h3>{{ item.name }}</h3>
            <p>{{ item.summary }}</p>
            <NuxtLink :to="`/treatments/${item.specialty}/${item.slug}`">View treatment</NuxtLink>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createBreadcrumbSchema } from '~/utils/schema'

const route = useRoute()
const { findBySlug, relatedTreatments } = useHospitals()
const hospital = findBySlug(route.params.slug)

if (!hospital) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Hospital not found'
  })
}

const linkedTreatments = relatedTreatments(hospital)

useSeoMeta(buildSeoMeta({
  title: hospital.name,
  description: hospital.summary,
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBreadcrumbSchema([
        { name: 'Hospitals', path: '/hospitals' },
        { name: hospital.name, path: route.path }
      ]))
    }
  ]
})
</script>

<style scoped>
.hospital-detail {
  padding: 1.75rem;
}

.hospital-detail p {
  color: var(--color-text-soft);
}

.hospital-detail__related {
  padding: 1.5rem;
}

.hospital-detail__related a {
  color: var(--color-primary);
  font-weight: 400;
}
</style>
