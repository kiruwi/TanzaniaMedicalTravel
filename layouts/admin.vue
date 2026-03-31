<template>
  <div class="admin-layout">
    <aside class="admin-layout__sidebar">
      <NuxtLink class="admin-layout__brand" to="/admin">Operations desk</NuxtLink>
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

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Leads', to: '/admin/leads' },
  { label: 'Patients', to: '/admin/patients' },
  { label: 'Cases', to: '/admin/cases' },
  { label: 'Quotes', to: '/admin/quotes' },
  { label: 'Bookings', to: '/admin/bookings' },
  { label: 'Hospitals', to: '/admin/hospitals' },
  { label: 'Doctors', to: '/admin/doctors' },
  { label: 'Treatments', to: '/admin/treatments' },
  { label: 'Content', to: '/admin/content' }
]

const pageTitle = computed(() => {
  const match = navItems.find((item) => route.path === item.to)
  return match?.label || 'Admin'
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.admin-layout__sidebar {
  --color-paragraph: #d4defd;
  padding: 2rem 1.5rem;
  background: #111827;
  color: #eef2ff;
}

.admin-layout__brand {
  display: inline-flex;
  margin-bottom: 2rem;
  color: #fbbf24;
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
  color: #d4defd;
}

.admin-layout__link.router-link-active {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
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
