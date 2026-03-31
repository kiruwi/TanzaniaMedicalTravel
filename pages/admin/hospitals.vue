<template>
  <section class="surface-card admin-copy">
    <h2>Hospitals</h2>
    <p>This view is intended for operational metadata, partner records, and CMS alignment with Strapi content.</p>
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
