<template>
  <header :class="headerClasses" class="site-header">
    <div class="container site-header__inner">
      <NuxtLink class="site-header__brand" to="/">
        <img class="site-header__brand-mark" src="/images/logo-mark.svg" alt="" aria-hidden="true">
        <span class="site-header__brand-wordmark" aria-label="Tanzania Medical Travel">
          <span>Tanzania</span>
          <span class="site-header__brand-wordmark-emphasis">Medical</span>
          <span class="site-header__brand-wordmark-subline">Travel</span>
        </span>
      </NuxtLink>

      <nav class="site-header__nav" aria-label="Primary navigation">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="site-header__actions">
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
  { label: 'Treatments', to: '/treatments' },
  { label: 'Hospitals', to: '/hospitals' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/faq' }
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
  border-bottom: 1px solid var(--color-header-border);
  backdrop-filter: blur(14px);
  background: var(--color-surface-elevated-soft);
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
}

.site-header--overlay {
  border-bottom-color: transparent;
  backdrop-filter: none;
  background: transparent;
  box-shadow: none;
}

.site-header--scrolled {
  box-shadow: var(--shadow-header);
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
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.site-header__brand-mark {
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
}

.site-header__brand-wordmark {
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  column-gap: 0.28rem;
  row-gap: 0.08rem;
  flex: 0 1 auto;
  font-size: 0.736rem;
  font-weight: 400;
  line-height: 1;
}

.site-header__brand-wordmark-emphasis {
  font-weight: 600;
}

.site-header__brand-wordmark-subline {
  grid-column: 1 / -1;
}

.site-header--overlay .site-header__brand {
  color: var(--color-text-on-dark);
}

.site-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2.25rem;
  color: var(--color-text-soft);
  font-size: 1.00rem;
  font-weight: 400;
}

.site-header--overlay .site-header__nav {
  color: var(--color-text-on-dark);
}

.site-header__nav a {
  transition: color 0.2s ease, opacity 0.2s ease;
}

.site-header__nav a:hover,
.site-header__nav a:focus-visible {
  color: var(--color-highlight);
  font-weight: 300;
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

.site-header--overlay .site-header__actions :deep(.button) {
  background: var(--color-surface-overlay-strong);
  border-color: var(--color-border-on-dark-strong);
  color: var(--color-text-on-dark);
}

.site-header--overlay .site-header__actions :deep(.button:hover) {
  background: var(--color-surface-overlay-hover);
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
  border-color: var(--color-border-on-dark-hover);
  color: var(--color-text-on-dark);
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
