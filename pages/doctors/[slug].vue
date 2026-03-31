<template>
  <section class="section">
    <div class="container stack">
      <article class="surface-card doctor-detail">
        <span class="status-badge">{{ doctor.specialty }}</span>
        <h1>{{ doctor.name }}</h1>
        <p>{{ doctor.title }}</p>
        <p>{{ doctor.summary }}</p>
        <p>Languages: {{ doctor.languages.join(', ') }}</p>
      </article>

      <article v-if="hospital" class="surface-card doctor-detail">
        <h2>Associated hospital</h2>
        <p>{{ hospital.name }} in {{ hospital.city }}</p>
        <NuxtLink :to="`/hospitals/${hospital.slug}`">View hospital profile</NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup>
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createBreadcrumbSchema } from '~/utils/schema'

const route = useRoute()
const { findBySlug, linkedHospital } = useDoctors()
const doctor = findBySlug(route.params.slug)

if (!doctor) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Doctor not found'
  })
}

const hospital = linkedHospital(doctor)

useSeoMeta(buildSeoMeta({
  title: doctor.name,
  description: doctor.summary,
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBreadcrumbSchema([
        { name: 'Doctors', path: '/doctors' },
        { name: doctor.name, path: route.path }
      ]))
    }
  ]
})
</script>

<style scoped>
.doctor-detail {
  padding: 1.75rem;
}

.doctor-detail p {
  color: var(--color-text-soft);
}

.doctor-detail a {
  color: var(--color-primary);
  font-weight: 400;
}
</style>
