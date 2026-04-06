<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">{{ specialty }}</span>
        <h1>{{ heading }}</h1>
        <p>Specialty landing pages should cluster related treatments and support internal linking into individual treatment details.</p>
      </div>
      <TreatmentCards :items="items" />
    </div>
  </section>
</template>

<script setup>
import TreatmentCards from '~/components/home/TreatmentCards.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createBreadcrumbSchema } from '~/utils/schema'

const route = useRoute()
const specialty = route.params.specialty
const { bySpecialty } = await useTreatments()
const items = bySpecialty(specialty)

const heading = computed(() => `${specialty.charAt(0).toUpperCase()}${specialty.slice(1)} treatment pathways`)

useSeoMeta(buildSeoMeta({
  title: heading.value,
  description: `Explore ${specialty} treatment pathways, doctors, and hospital options for international patients.`,
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBreadcrumbSchema([
        { name: 'Treatments', path: '/treatments' },
        { name: heading.value, path: route.path }
      ]))
    }
  ]
})
</script>
