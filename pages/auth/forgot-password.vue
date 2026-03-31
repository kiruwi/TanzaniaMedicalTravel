<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Password reset</span>
      <h2>Request a password reset link</h2>
    </div>
    <form class="stack">
      <label class="auth-page__field">
        <span>Email</span>
        <input type="email" />
      </label>
      <button class="button" type="button">Send reset link</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Forgot password',
  description: 'Request a secure password reset link for the patient portal.',
  path: route.path,
  robots: 'noindex, nofollow'
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.auth-page__field {
  display: grid;
  gap: 0.45rem;
}

.auth-page__field input {
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
}
</style>
