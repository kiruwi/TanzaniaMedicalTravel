<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Quote request</span>
        <h1>Get a personalised treatment and travel quote.</h1>
        <p>
          If you already have a treatment in mind, share a few details and we will come back with clear options for care, travel, and stay support.
        </p>
      </div>
      <QuoteRequestForm />
    </div>
  </section>
</template>

<script setup>
import QuoteRequestForm from '~/components/forms/QuoteRequestForm.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Quote request',
  description: 'Request a personalised quote for treatment, travel, accommodation, and support so you can plan with confidence.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>
