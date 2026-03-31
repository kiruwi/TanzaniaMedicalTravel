<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">FAQ</span>
        <h1>Common questions from patients and families.</h1>
        <p>Starter FAQ content should later be replaced by Strapi-managed FAQs with visible answers on the page.</p>
      </div>
      <div class="faq-list">
        <article v-for="item in faqs" :key="item.question" class="surface-card faq-list__item">
          <h2>{{ item.question }}</h2>
          <p>{{ item.answer }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createFaqSchema } from '~/utils/schema'
import { faqs } from '~/utils/mockData'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'FAQ',
  description: 'Answers about quote requests, records upload, travel planning, and patient support.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createFaqSchema(faqs))
    }
  ]
})
</script>

<style scoped>
.faq-list {
  display: grid;
  gap: 1rem;
}

.faq-list__item {
  padding: 1.5rem;
}

.faq-list__item p {
  color: var(--color-text-soft);
}
</style>
