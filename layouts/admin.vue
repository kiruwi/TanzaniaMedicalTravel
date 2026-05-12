<template>
  <div class="admin-layout">
    <aside class="admin-layout__sidebar">
      <NuxtLink class="admin-layout__brand" to="/tmt-admin">Operations desk</NuxtLink>
      <nav aria-label="Admin portal">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="admin-layout__link">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>
    <div class="admin-layout__main">
      <header class="admin-layout__header">
        <div>
          <span class="eyebrow">Admin portal</span>
          <h1>{{ pageTitle }}</h1>
        </div>
        <NuxtLink class="button" to="/">View public site</NuxtLink>
      </header>
      <slot />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { request } = useAdminApi()

const navItems = [
  { label: 'Dashboard', to: '/tmt-admin' },
  { label: 'Access log', to: '/tmt-admin/access-log' },
  { label: 'Leads', to: '/tmt-admin/leads' },
  { label: 'Patients', to: '/tmt-admin/patients' },
  { label: 'Cases', to: '/tmt-admin/cases' },
  { label: 'Quotes', to: '/tmt-admin/quotes' },
  { label: 'Bookings', to: '/tmt-admin/bookings' },
  { label: 'Hospitals', to: '/tmt-admin/hospitals' },
  { label: 'Doctors', to: '/tmt-admin/doctors' },
  { label: 'Treatments', to: '/tmt-admin/treatments' },
  { label: 'Content', to: '/tmt-admin/content' }
]

const pageTitle = computed(() => {
  const match = navItems.find((item) => route.path === item.to)
  return match?.label || 'Admin'
})

async function logPageAccess(path) {
  try {
    await request('/api/admin/access-log/page', {
      method: 'POST',
      body: {
        path
      }
    })
  } catch (error) {
    console.error('Failed to write admin page access log', error)
  }
}

watch(
  () => route.fullPath,
  (path) => {
    if (process.client && path.startsWith('/tmt-admin')) {
      void logPageAccess(path)
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background: var(--gradient-admin-shell);
}

.admin-layout__sidebar {
  padding: 2rem 1.5rem;
  background: var(--gradient-admin-sidebar);
  color: var(--color-text-on-dark);
  border-right: 1px solid var(--color-border-on-dark);
}

.admin-layout__brand {
  display: inline-flex;
  margin-bottom: 2rem;
  color: var(--color-admin-brand);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.admin-layout__sidebar nav {
  display: grid;
  gap: 0.65rem;
}

.admin-layout__link {
  padding: 0.8rem 1rem;
  border-radius: 0.85rem;
  color: var(--color-text-on-dark-soft);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.admin-layout__link:hover {
  background: var(--color-surface-overlay);
  color: var(--color-text-inverse);
  transform: translateX(2px);
}

.admin-layout__link.router-link-active {
  background: var(--color-surface-overlay-strong);
  color: var(--color-text-inverse);
}

.admin-layout__main {
  padding: 2rem;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface-panel);
  backdrop-filter: blur(14px);
}

.admin-layout__header .eyebrow {
  display: inline-flex;
}

@media (max-width: 900px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-layout__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
