<template>
  <div class="stack auth-page">
    <div>
      <span class="eyebrow">Register</span>
      <h2>Create a patient account</h2>
    </div>
    <form class="stack" @submit.prevent="submit">
      <label class="auth-page__field">
        <span>Full name</span>
        <input v-model="fullName" required type="text" />
      </label>
      <label class="auth-page__field">
        <span>Email</span>
        <input v-model="email" required type="email" />
      </label>
      <label class="auth-page__field">
        <span>Password</span>
        <input v-model="password" minlength="8" required type="password" />
      </label>
      <button class="button" :disabled="pending" type="submit">
        {{ pending ? 'Creating account...' : 'Create account' }}
      </button>
      <p v-if="status">{{ status }}</p>
    </form>
    <div class="auth-page__divider">or</div>
    <button class="button button--ghost auth-page__oauth" :disabled="pending" type="button" @click="signUpGoogle">
      Sign up with Google
    </button>
    <p>
      Already have an account?
      <NuxtLink to="/auth/login">Sign in</NuxtLink>
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { signUp, signInWithGoogle } = useAuth()
const fullName = ref('')
const email = ref('')
const password = ref('')
const pending = ref(false)
const status = ref('')

useSeoMeta(buildSeoMeta({
  title: 'Register',
  description: 'Register a patient account for case management and secure document upload.',
  path: route.path,
  robots: 'noindex, nofollow'
}))

useHead({
  link: buildHeadLinks(route.path)
})

async function submit() {
  pending.value = true
  status.value = ''
  const origin = window.location.origin || config.public.siteUrl

  const { data, error } = await signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${origin}/auth/login`,
      data: {
        full_name: fullName.value,
        role: 'patient',
        profile_complete: false
      }
    }
  })

  if (error) {
    pending.value = false
    status.value = error.message || 'Unable to create your account.'
    return
  }

  const user = data.user

  if (user?.id && user.email) {
    try {
      const syncResponse = await $fetch('/api/auth/sync-user', {
        method: 'POST',
        body: {
          id: user.id,
          email: user.email,
          role: 'patient',
          full_name: fullName.value
        }
      })

      if (syncResponse?.synced === false) {
        pending.value = false
        status.value = syncResponse.reason || 'Account created, but profile sync failed.'
        return
      }
    } catch (syncError) {
      pending.value = false
      status.value = syncError?.data?.statusMessage || 'Account created, but profile sync failed.'
      return
    }
  }

  pending.value = false

  if (data.session) {
    router.push('/patient')
    return
  }

  status.value = 'Account created. Check your email to confirm your account, then sign in.'
  fullName.value = ''
  email.value = ''
  password.value = ''
}

async function signUpGoogle() {
  pending.value = true
  status.value = ''

  const { error } = await signInWithGoogle('/patient')

  if (error) {
    pending.value = false
    status.value = error.message || 'Unable to continue with Google.'
  }
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

.auth-page__divider {
  text-align: center;
  color: var(--color-text-soft);
}

.auth-page__oauth {
  width: 100%;
}
</style>
