<template>
  <form class="surface-card upload-form">
    <h2>Medical records upload</h2>
    <p>This starter component is intended to connect to signed Supabase uploads in a later phase.</p>
    <label class="upload-form__dropzone">
      <span>Select file</span>
      <input type="file" />
    </label>
  </form>
</template>

<style scoped>
.upload-form {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
}

.upload-form__dropzone {
  display: grid;
  place-items: center;
  min-height: 180px;
  border: 2px dashed var(--color-border);
  border-radius: 1rem;
  background: var(--color-surface-muted);
}

.upload-form__dropzone input {
  margin-top: 1rem;
}
</style>
