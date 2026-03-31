<template>
  <section class="surface-card admin-copy">
    <h2>Doctors</h2>
    <p>Doctor records should eventually blend Strapi profile content with operational scheduling and appointment links.</p>
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
