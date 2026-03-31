<template>
  <section class="surface-card admin-copy">
    <h2>Content</h2>
    <p>Content workflow should cover homepage sections, FAQs, blog entries, destination content, and structured SEO review before publish.</p>
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
