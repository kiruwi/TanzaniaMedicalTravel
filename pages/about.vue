<template>
  <section class="section">
    <div class="container about">
      <div class="section-heading">
        <span class="eyebrow">About</span>
        <h1>Built to reduce coordination risk for patients traveling for care.</h1>
        <p>
          This scaffold assumes a business model that combines case intake, provider matching, financial planning, travel bookings,
          and follow-up support through one platform.
        </p>
      </div>
      <div class="grid-two">
        <article class="surface-card about__card">
          <h2>What the platform covers</h2>
          <p>Public SEO pages, a patient portal, and an operational admin portal sit in one Nuxt application.</p>
        </article>
        <article class="surface-card about__card">
          <h2>What sits where</h2>
          <p>Supabase handles operational data and auth. Strapi owns marketing content and editorial structures.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'About',
  description: 'Learn how the medical travel platform is structured across case coordination, patient operations, and public content.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.about__card {
  padding: 1.5rem;
}

.about__card p {
  color: var(--color-text-soft);
}
</style>
