<template>
  <section class="surface-card admin-copy">
    <h2>Treatments</h2>
    <p>Treatment management should ultimately support CMS publishing, SEO oversight, and linked operational quote data.</p>
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
