<template>
  <form class="form surface-card" @submit.prevent="submit">
    <div class="grid-two">
      <label class="form-group">
        <span>Patient name</span>
        <input v-model="form.full_name" required type="text" />
      </label>
      <label class="form-group">
        <span>Email</span>
        <input v-model="form.email" required type="email" />
      </label>
      <label class="form-group">
        <span>Desired treatment</span>
        <input v-model="form.treatment_interest" required type="text" />
      </label>
      <label class="form-group">
        <span>Preferred travel month</span>
        <input v-model="form.travel_window" type="text" placeholder="June 2026" />
      </label>
    </div>
    <label class="form-group">
      <span>Clinical summary</span>
      <textarea v-model="form.diagnosis_summary" rows="5" />
    </label>
    <button class="button" :disabled="pending" type="submit">
      {{ pending ? 'Submitting...' : 'Request quote' }}
    </button>
    <p v-if="status" class="form__status">{{ status }}</p>
  </form>
</template>

<script setup>
const form = reactive({
  full_name: '',
  email: '',
  treatment_interest: '',
  travel_window: '',
  diagnosis_summary: ''
})

const pending = ref(false)
const status = ref('')

async function submit() {
  pending.value = true
  status.value = ''

  try {
    await $fetch('/api/quotes/create', {
      method: 'POST',
      body: form
    })
    status.value = 'Quote request submitted. A case coordinator will contact you.'
  } catch (error) {
    status.value = error?.data?.statusMessage || 'Unable to submit right now.'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.form {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
}

.form-group {
  display: grid;
  gap: 0.45rem;
}

.form-group span {
  font-weight: 400;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
}

.form__status {
  color: var(--color-primary);
  margin-bottom: 0;
}
</style>
