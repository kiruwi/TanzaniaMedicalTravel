<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Doctors</span>
        <h1>Specialists linked to case coordination and treatment pages.</h1>
      </div>
      <div class="grid-three">
        <DoctorCard v-for="doctor in items" :key="doctor.slug" :doctor="doctor" />
      </div>
    </div>
  </section>
</template>

<script setup>
import DoctorCard from '~/components/treatments/DoctorCard.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const { all } = useDoctors()
const items = all()

useSeoMeta(buildSeoMeta({
  title: 'Doctors',
  description: 'Browse doctors connected to treatments and hospital pathways for international patients.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>
