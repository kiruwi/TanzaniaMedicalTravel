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
  background:
    radial-gradient(circle at top left, rgba(217, 119, 6, 0.08), transparent 24%),
    linear-gradient(180deg, rgba(245, 248, 247, 1), rgba(238, 245, 243, 0.88));
}

.admin-layout__sidebar {
  padding: 2rem 1.5rem;
  background:
    linear-gradient(180deg, rgba(6, 60, 55, 0.98), rgba(15, 118, 110, 0.94)),
    var(--color-heading);
  color: rgba(255, 255, 255, 0.94);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-layout__brand {
  display: inline-flex;
  margin-bottom: 2rem;
  color: #fbd38d;
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
  color: rgba(255, 255, 255, 0.78);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.admin-layout__link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  transform: translateX(2px);
}

.admin-layout__link.router-link-active {
  background: rgba(255, 255, 255, 0.14);
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
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.68);
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
