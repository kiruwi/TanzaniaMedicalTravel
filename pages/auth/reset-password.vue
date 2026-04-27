<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Set new password</span>
      <h2>Choose a new admin password</h2>
    </div>
    <form class="stack" @submit.prevent="submit">
      <label class="auth-page__field">
        <span>New password</span>
        <input v-model="password" type="password" autocomplete="new-password" minlength="8" required />
      </label>
      <label class="auth-page__field">
        <span>Confirm password</span>
        <input v-model="confirmPassword" type="password" autocomplete="new-password" minlength="8" required />
      </label>
      <button class="button" :disabled="pending" type="submit">
        {{ pending ? 'Updating...' : 'Update password' }}
      </button>
      <p v-if="status" class="auth-page__status">{{ status }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  path: '/tmt-admin/reset-password'
})

import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const router = useRouter()
const { getSession, updatePassword } = useAuth()
const password = ref('')
const confirmPassword = ref('')
const pending = ref(false)
const status = ref('')

onMounted(async () => {
  await getSession()
})

async function submit() {
  status.value = ''

  if (!password.value || password.value.length < 8) {
    status.value = 'Password must be at least 8 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    status.value = 'Passwords do not match.'
    return
  }

  pending.value = true
  const { error } = await updatePassword(password.value)
  pending.value = false

  if (error) {
    status.value = error.message || 'Unable to update password right now.'
    return
  }

  status.value = 'Password updated. Redirecting to login...'
  setTimeout(() => {
    router.push('/tmt-admin/login')
  }, 1200)
}

useSeoMeta(buildSeoMeta({
  title: 'Reset password',
  description: 'Create a new password for the admin portal.',
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
