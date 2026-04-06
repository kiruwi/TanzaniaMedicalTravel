<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Password reset</span>
      <h2>Request an admin password reset link</h2>
    </div>
    <form class="stack" @submit.prevent="submit">
      <label class="auth-page__field">
        <span>Email</span>
        <input v-model.trim="email" type="email" autocomplete="email" required />
      </label>
      <button class="button" :disabled="pending" type="submit">
        {{ pending ? 'Sending...' : 'Send reset link' }}
      </button>
      <p v-if="status" class="auth-page__status">{{ status }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const { requestPasswordReset } = useAuth()
const email = ref('')
const pending = ref(false)
const status = ref('')

async function submit() {
  pending.value = true
  status.value = ''

  const { error } = await requestPasswordReset(email.value)

  pending.value = false

  if (error) {
    status.value = error.message || 'Unable to send a reset link right now.'
    return
  }

  status.value = 'If that email exists, a reset link has been sent.'
}

useSeoMeta(buildSeoMeta({
  title: 'Forgot password',
  description: 'Request a secure password reset link for the admin portal.',
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

.auth-page__status {
  color: var(--color-text-soft);
}
</style>
