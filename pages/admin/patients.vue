<template>
  <section class="surface-card admin-copy">
    <h2>Patients</h2>
    <p>Patient management should eventually connect to Supabase profiles, cases, roles, and audit trails.</p>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  path: '/tmt-admin/patients'
})
</script>

<style scoped>
.admin-copy {
  padding: 1.5rem;
}

.admin-copy p {
  color: var(--color-text-soft);
}
</style>
