<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Hospitals</span>
        <h1>Partner and reference hospitals for coordinated treatment planning.</h1>
      </div>
      <div class="grid-three">
        <HospitalCard v-for="hospital in items" :key="hospital.slug" :hospital="hospital" />
      </div>
    </div>
  </section>
</template>

<script setup>
import HospitalCard from '~/components/treatments/HospitalCard.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const { all } = useHospitals()
const items = all()

useSeoMeta(buildSeoMeta({
  title: 'Hospitals',
  description: 'Browse hospitals included in the medical travel platform and connect them to treatment-specific pathways.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>
