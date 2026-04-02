<template>
  <header :class="headerClasses" class="site-header">
    <div class="container site-header__inner">
      <NuxtLink class="site-header__brand" to="/">
        <img class="site-header__brand-mark" src="/images/logo-mark.svg" alt="" aria-hidden="true">
        <span class="site-header__brand-text">TMT</span>
      </NuxtLink>

      <nav class="site-header__nav" aria-label="Primary navigation">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="site-header__actions">
        <NuxtLink class="button button--ghost" to="/auth/login">Patient login</NuxtLink>
        <NuxtLink class="button" to="/contact">Get a quote</NuxtLink>
      </div>

      <button class="site-header__menu-button" type="button" @click="open = true">
        Menu
      </button>
    </div>

    <MobileMenu :open="open" :links="navItems" @close="open = false" />
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MobileMenu from '~/components/layout/MobileMenu.vue'

const route = useRoute()
const open = ref(false)
const isScrolled = ref(false)

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Treatments', to: '/treatments' },
  { label: 'Hospitals', to: '/hospitals' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' }
]

const isHome = computed(() => route.path === '/')
const isOverlay = computed(() => isHome.value && !isScrolled.value)
const headerClasses = computed(() => ({
  'site-header--overlay': isOverlay.value,
  'site-header--scrolled': isScrolled.value
}))

function syncScrollState() {
  isScrolled.value = window.scrollY > 24
}

onMounted(() => {
  syncScrollState()
  window.addEventListener('scroll', syncScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', syncScrollState)
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(214, 229, 225, 0.9);
  backdrop-filter: blur(14px);
  background: rgba(247, 251, 250, 0.92);
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
}

.site-header--overlay {
  border-bottom-color: transparent;
  backdrop-filter: none;
  background: transparent;
  box-shadow: none;
}

.site-header--scrolled {
  box-shadow: 0 12px 30px rgba(6, 60, 55, 0.08);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 84px;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--color-heading);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-header__brand-mark {
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
}

.site-header__brand-text {
  font-weight: 700;
}

.site-header--overlay .site-header__brand {
  color: #f4fffb;
}

.site-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.site-header--overlay .site-header__nav {
  color: #f4fffb;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-header__actions :deep(.button) {
  padding: 0.72rem 1.08rem;
  font-size: 0.9rem;
}

.site-header--overlay .site-header__actions :deep(.button--ghost) {
  border-color: rgba(244, 255, 251, 0.44);
  color: #f4fffb;
}

.site-header--overlay .site-header__actions :deep(.button--ghost:hover) {
  background: rgba(255, 255, 255, 0.1);
}

.site-header--overlay .site-header__actions :deep(.button:not(.button--ghost)) {
  background: rgba(244, 255, 251, 0.14);
  border-color: rgba(244, 255, 251, 0.18);
  color: #f4fffb;
}

.site-header--overlay .site-header__actions :deep(.button:not(.button--ghost):hover) {
  background: rgba(244, 255, 251, 0.22);
}

.site-header__menu-button {
  display: none;
  padding: 0.7rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 300;
}

.site-header--overlay .site-header__menu-button {
  border-color: rgba(244, 255, 251, 0.38);
  color: #f4fffb;
}

@media (max-width: 1040px) {
  .site-header__nav,
  .site-header__actions {
    display: none;
  }

  .site-header__menu-button {
    display: inline-flex;
  }
}
</style>
