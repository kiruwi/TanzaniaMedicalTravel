<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Register</span>
      <h2>Create a patient account</h2>
    </div>
    <form class="stack">
      <label class="auth-page__field">
        <span>Full name</span>
        <input type="text" />
      </label>
      <label class="auth-page__field">
        <span>Email</span>
        <input type="email" />
      </label>
      <label class="auth-page__field">
        <span>Password</span>
        <input type="password" />
      </label>
      <button class="button" type="button">Create account</button>
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
  title: 'Register',
  description: 'Register a patient account for case management and secure document upload.',
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
