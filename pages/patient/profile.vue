<template>
  <section class="surface-card profile-card">
    <h2>Patient profile</h2>
    <div class="grid-two">
      <div>
        <strong>Name</strong>
        <p>{{ profile.first_name }} {{ profile.last_name }}</p>
      </div>
      <div>
        <strong>Phone</strong>
        <p>{{ profile.phone }}</p>
      </div>
      <div>
        <strong>Country</strong>
        <p>{{ profile.country_of_residence }}</p>
      </div>
      <div>
        <strong>Preferred contact</strong>
        <p>{{ profile.preferred_contact_method }}</p>
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
</script>

<style scoped>
.profile-card {
  padding: 1.5rem;
}

.profile-card p {
  color: var(--color-text-soft);
}
</style>
