<template>
  <form class="form surface-card" @submit.prevent="submit">
    <div class="grid-two">
      <label class="form-group">
        <span>Full name</span>
        <input v-model="form.full_name" required type="text" />
      </label>
      <label class="form-group">
        <span>Email</span>
        <input v-model="form.email" required type="email" />
      </label>
      <label class="form-group">
        <span>Phone</span>
        <input v-model="form.phone" type="tel" />
      </label>
      <label class="form-group">
        <span>Country</span>
        <input v-model="form.country" required type="text" />
      </label>
    </div>
    <label class="form-group">
      <span>Treatment interest</span>
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
      <span>Message</span>
      <textarea v-model="form.message" rows="5"></textarea>
    </label>
    <button class="button" :disabled="pending" type="submit">
      {{ pending ? 'Sending...' : 'Submit inquiry' }}
    </button>
    <p v-if="status" class="form__status">{{ status }}</p>
  </form>
</template>

<script setup>
const { groupedTreatmentOptions } = await useTreatmentOptions()

const form = reactive({
  full_name: '',
  email: '',
  phone: '',
  country: '',
  treatment_interest: '',
  message: ''
})

const pending = ref(false)
const status = ref('')

async function submit() {
  pending.value = true
  status.value = ''

  try {
    await $fetch('/api/inquiries/create', {
      method: 'POST',
      body: form
    })

    status.value = 'Inquiry submitted. A coordinator should review it shortly.'
    Object.assign(form, {
      full_name: '',
      email: '',
      phone: '',
      country: '',
      treatment_interest: '',
      message: ''
    })
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
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
  background: #fff;
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

.form__status {
  color: var(--color-primary);
  margin-bottom: 0;
}
</style>
