<template>
  <div>
    <div class="stack auth-page">
      <div>
        <span class="eyebrow">Admin login</span>
        <h2>Access the operations dashboard</h2>
      </div>
      <form class="stack" @submit.prevent="submit">
        <label class="auth-page__field">
          <span>Email</span>
          <input v-model="email" required type="email" />
        </label>
        <label class="auth-page__field">
          <span>Password</span>
          <input v-model="password" required type="password" />
        </label>
        <button class="button" :disabled="pending" type="submit">
          {{ pending ? 'Signing in...' : 'Sign in' }}
        </button>
        <p v-if="status">{{ status }}</p>
      </form>
      <p class="auth-page__note">
        Only the configured admin account can sign in.
      </p>
      <NuxtLink to="/tmt-admin/forgot-password">Forgot password?</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  path: '/tmt-admin/login'
})

import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const router = useRouter()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const pending = ref(false)
const status = ref('')

useSeoMeta(buildSeoMeta({
  title: 'Admin login',
  description: 'Secure access to the operations dashboard for inquiries, patients, payments, and invoicing.',
  path: route.path,
  robots: 'noindex, nofollow'
}))

useHead({
  link: buildHeadLinks(route.path)
})

async function submit() {
  pending.value = true
  status.value = ''
  const { error } = await signIn({
    email: email.value,
    password: password.value
  })

  pending.value = false

  if (error) {
    status.value = error.message || 'Unable to sign in.'
    return
  }

  router.push('/tmt-admin')
}
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

.auth-page__note {
  color: var(--color-text-soft);
}
</style>
