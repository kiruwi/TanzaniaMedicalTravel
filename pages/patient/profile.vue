<template>
  <section class="surface-card profile-card">
    <h2>Patient profile</h2>
    <div class="grid-two">
      <div>
        <strong>Name</strong>
        <p>{{ displayName }}</p>
      </div>
      <div>
        <strong>Phone</strong>
        <p>{{ profile.phone || 'Not provided' }}</p>
      </div>
      <div>
        <strong>Country</strong>
        <p>{{ profile.country_of_residence || 'Not provided' }}</p>
      </div>
      <div>
        <strong>Preferred contact</strong>
        <p>{{ profile.preferred_contact_method || 'Not provided' }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

const { profile } = usePatient()
const displayName = computed(() => {
  const parts = [profile.value?.first_name, profile.value?.last_name].filter(Boolean)
  return parts.join(' ') || 'Not provided'
})
</script>

<style scoped>
.profile-card {
  padding: 1.5rem;
}

.profile-card p {
  color: var(--color-text-soft);
}
</style>
