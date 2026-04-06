<template>
  <section class="section">
    <div class="container stack">
      <div class="section-heading">
        <span class="eyebrow">Pricing</span>
        <h1>Starter cost ranges and quote logic for international patients.</h1>
        <p>The final platform should calculate line items through operational quotes stored in Supabase, not through static marketing copy alone.</p>
      </div>
      <div class="grid-three">
        <article v-for="item in treatments" :key="item.slug" class="surface-card pricing-card">
          <h2>{{ item.name }}</h2>
          <p>{{ item.summary }}</p>
          <strong>From {{ formatCurrency(item.priceFrom) }}</strong>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatCurrency'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const { items: treatments } = await useTreatments()

useSeoMeta(buildSeoMeta({
  title: 'Pricing',
  description: 'View starter pricing guidance for treatment programs and understand how detailed quotes are assembled.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.pricing-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
}

.pricing-card p {
  color: var(--color-text-soft);
}

.pricing-card strong {
  color: var(--color-primary);
  font-size: 1.35rem;
}
</style>
