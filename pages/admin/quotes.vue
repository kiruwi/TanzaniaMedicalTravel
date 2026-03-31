<template>
  <section class="surface-card admin-copy">
    <h2>Quotes</h2>
    <p>Quote operations should show case-linked pricing breakdowns, approval actions, and expiry visibility.</p>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
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
