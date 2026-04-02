<template>
  <article class="doctor-card surface-card">
    <span v-if="showBadge" class="status-badge">{{ doctor.specialty }}</span>
    <h3>{{ doctor.name }}</h3>
    <p>{{ doctor.title }}</p>
    <p class="doctor-card__summary">{{ doctor.summary }}</p>
    <NuxtLink class="doctor-card__link" :to="`/doctors/${doctor.slug}`">View doctor</NuxtLink>
  </article>
</template>

<script setup>
defineProps({
  doctor: {
    type: Object,
    required: true
  },
  showBadge: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.doctor-card {
  padding: 1.5rem;
}

.doctor-card p {
  margin-bottom: 0.5rem;
}

.doctor-card__summary {
  color: var(--color-text-soft);
}

.doctor-card__link {
  color: var(--color-primary);
  font-weight: 400;
}
</style>
