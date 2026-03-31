<template>
  <div class="portal-layout">
    <aside class="portal-layout__sidebar">
      <NuxtLink class="portal-layout__brand" to="/">Tanzania Medical Travel</NuxtLink>
      <nav aria-label="Patient portal">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="portal-layout__link">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>
    <div class="portal-layout__main">
      <header class="portal-layout__header">
        <div>
          <span class="eyebrow">Patient portal</span>
          <h1>{{ pageTitle }}</h1>
        </div>
        <NuxtLink class="button button--ghost" to="/contact">Need help?</NuxtLink>
      </header>
      <div class="portal-layout__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/patient' },
  { label: 'Profile', to: '/patient/profile' },
  { label: 'Cases', to: '/patient/cases' },
  { label: 'Documents', to: '/patient/documents' },
  { label: 'Payments', to: '/patient/payments' },
  { label: 'Appointments', to: '/patient/appointments' }
]

const pageTitle = computed(() => {
  const match = navItems.find((item) => route.path.startsWith(item.to))
  return match?.label || 'Patient'
})
</script>

<style scoped>
.portal-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.portal-layout__sidebar {
  --color-paragraph: #d7ebe8;
  padding: 2rem 1.5rem;
  background: #103538;
  color: #e8f4f1;
}

.portal-layout__brand {
  display: inline-flex;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.portal-layout__sidebar nav {
  display: grid;
  gap: 0.65rem;
}

.portal-layout__link {
  padding: 0.8rem 1rem;
  border-radius: 0.85rem;
  color: #d7ebe8;
}

.portal-layout__link.router-link-active {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.portal-layout__main {
  padding: 2rem;
}

.portal-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.portal-layout__content {
  display: grid;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .portal-layout {
    grid-template-columns: 1fr;
  }

  .portal-layout__sidebar {
    padding-bottom: 1rem;
  }

  .portal-layout__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
