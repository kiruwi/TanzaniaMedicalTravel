<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Access closed</span>
      <h2>Account creation is disabled</h2>
    </div>
    <p class="auth-page__copy">
      This portal is restricted to the configured admin account. New accounts cannot be created from the website.
    </p>
    <NuxtLink class="button" to="/auth/login">Back to login</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Registration disabled',
  description: 'Self-service account creation is disabled for this operations portal.',
  path: route.path,
  robots: 'noindex, nofollow'
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.auth-page__copy {
  color: var(--color-text-soft);
}
</style>
