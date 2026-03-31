<template>
  <div class="auth-layout">
    <div class="container auth-layout__wrap">
      <div class="auth-layout__panel">
        <NuxtLink class="auth-layout__brand" to="/">
          Tanzania Medical Travel
        </NuxtLink>
        <div class="auth-layout__copy">
          <span class="eyebrow">Patient access</span>
          <h1>Secure sign-in for consultations, quotes, and travel coordination.</h1>
          <p>
            Patients can manage profiles, review treatment plans, upload records, and track travel logistics from one place.
          </p>
        </div>
      </div>
      <div class="auth-layout__card surface-card">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  background: #eef5f3;
}

.auth-layout__wrap {
  display: grid;
  gap: 2rem;
  align-items: center;
  grid-template-columns: 1.1fr 0.9fr;
}

.auth-layout__panel {
  padding: 1rem 0;
}

.auth-layout__brand {
  display: inline-flex;
  margin-bottom: 2rem;
  color: var(--color-primary);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.auth-layout__copy p {
  max-width: 34rem;
  color: var(--color-text-soft);
}

.auth-layout__card {
  padding: 2rem;
}

@media (max-width: 900px) {
  .auth-layout__wrap {
    grid-template-columns: 1fr;
  }
}
</style>
