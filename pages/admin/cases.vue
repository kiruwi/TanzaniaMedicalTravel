<template>
  <section class="surface-card admin-copy">
    <h2>Cases</h2>
    <p>Operational case management should support assignment, status control, quote creation, and appointment scheduling.</p>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  path: '/tmt-admin/cases'
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
