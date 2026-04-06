<template>
  <section class="section treatments-page">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Treatments</span>
      </div>
      <TreatmentCards :items="items" />
    </div>
  </section>
</template>

<script setup>
import TreatmentCards from '~/components/home/TreatmentCards.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const { items } = await useTreatments()

useSeoMeta(buildSeoMeta({
  title: 'Treatments',
  description: 'Browse cardiology, orthopedic, fertility, and other treatment pathways built for coordinated medical travel.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.treatments-page {
  padding-top: 1.25rem;
}
</style>
