<template>
  <form class="form surface-card" @submit.prevent="submit">
    <div class="form__intro">
      <div>
        <span class="status-badge">Private intake</span>
        <h2>Tell us what kind of care plan you need.</h2>
      </div>
      <p>We use these details to prepare a treatment, travel, and accommodation estimate that feels specific rather than generic.</p>
    </div>

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
        <select v-model="form.treatment_interest" required>
          <option disabled value="">Select a treatment</option>
          <optgroup
            v-for="group in groupedTreatmentOptions"
            :key="group.label"
            :label="group.label"
          >
            <option
              v-for="option in group.options"
              :key="`${group.label}-${option.value}`"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </optgroup>
        </select>
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

    <div class="form__footer">
      <p class="form__helper">Sensitive details stay inside the intake workflow and are used to prepare your personalised quote.</p>
      <button class="button" :disabled="pending" type="submit">
        {{ pending ? 'Submitting...' : 'Request quote' }}
      </button>
    </div>

    <p v-if="status" class="form__status">{{ status }}</p>
  </form>
</template>

<script setup>
const { groupedTreatmentOptions } = await useTreatmentOptions()

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
  gap: 1.25rem;
  padding: clamp(1.4rem, 3vw, 2rem);
  background:
    radial-gradient(circle at top right, rgba(217, 119, 6, 0.1), transparent 24%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(238, 245, 243, 0.94));
}

.form__intro {
  display: grid;
  gap: 0.8rem;
  padding-bottom: 0.35rem;
}

.form__intro h2 {
  margin: 0.7rem 0 0;
  font-size: clamp(1.5rem, 2.4vw, 2.15rem);
  line-height: 1.1;
}

.form__intro p {
  max-width: 44rem;
  margin-bottom: 0;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

.form-group span {
  font-weight: 400;
  color: var(--color-heading);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.92);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(15, 118, 110, 0.45);
  box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.08);
  transform: translateY(-1px);
}

.form-group select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, var(--color-primary) 50%),
    linear-gradient(135deg, var(--color-primary) 50%, transparent 50%);
  background-position:
    calc(100% - 1.15rem) calc(50% - 0.15rem),
    calc(100% - 0.85rem) calc(50% - 0.15rem);
  background-size: 0.35rem 0.35rem, 0.35rem 0.35rem;
  background-repeat: no-repeat;
  padding-right: 2.8rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 10rem;
}

.form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.25rem;
}

.form__helper {
  max-width: 34rem;
  margin-bottom: 0;
  color: var(--color-text-soft);
}

.form__status {
  color: var(--color-primary);
  margin-bottom: 0;
  padding: 0.95rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(15, 118, 110, 0.08);
}

@media (max-width: 900px) {
  .form__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
