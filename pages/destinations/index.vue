<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Destinations</span>
        <h1>Destination pages for treatment access, travel guidance, and recovery planning.</h1>
      </div>
      <div class="grid-two">
        <article v-for="destination in destinations" :key="destination.country" class="surface-card destination-card">
          <h2>{{ destination.name }}</h2>
          <p>{{ destination.summary }}</p>
          <NuxtLink :to="`/destinations/${destination.country}`">View destination</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { destinations } from '~/utils/mockData'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Destinations',
  description: 'Explore destination pages for treatment access, hospital cities, and travel support context.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.destination-card {
  padding: 1.5rem;
}

.destination-card p {
  color: var(--color-text-soft);
}

.destination-card a {
  color: var(--color-primary);
  font-weight: 400;
}
</style>
