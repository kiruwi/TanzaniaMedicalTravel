<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Set new password</span>
      <h2>Choose a new patient portal password</h2>
    </div>
    <form class="stack">
      <label class="auth-page__field">
        <span>New password</span>
        <input type="password" />
      </label>
      <label class="auth-page__field">
        <span>Confirm password</span>
        <input type="password" />
      </label>
      <button class="button" type="button">Update password</button>
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
  title: 'Reset password',
  description: 'Create a new password for the patient portal.',
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
