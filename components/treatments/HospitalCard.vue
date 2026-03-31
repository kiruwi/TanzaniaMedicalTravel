<template>
  <article class="hospital-card surface-card">
    <span class="status-badge">{{ hospital.city }}</span>
    <h3>{{ hospital.name }}</h3>
    <p>{{ hospital.specialtyFocus }}</p>
    <p class="hospital-card__summary">{{ hospital.summary }}</p>
    <NuxtLink class="hospital-card__link" :to="`/hospitals/${hospital.slug}`">View hospital</NuxtLink>
  </article>
</template>

<script setup>
defineProps({
  hospital: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.hospital-card {
  padding: 1.5rem;
}

.hospital-card__summary {
  color: var(--color-text-soft);
}

.hospital-card__link {
  color: var(--color-primary);
  font-weight: 400;
}
</style>
