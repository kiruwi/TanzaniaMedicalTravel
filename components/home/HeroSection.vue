<template>
  <section class="hero section">
    <div class="container hero__grid">
      <div class="hero__copy">
        <span class="eyebrow">Medical travel coordination</span>
        <h1>Get the treatment you need with caring travel support every step of the way.</h1>
        <p>
          Tanzania Medical Travel helps you find trusted hospitals, understand your options clearly, and plan your trip with confidence
          so you can focus on feeling better.
        </p>
        <div class="hero__actions">
          <NuxtLink class="button" to="/quote-request">Get my quote</NuxtLink>
          <NuxtLink class="button button--ghost" to="/treatments">See treatments</NuxtLink>
        </div>
      </div>
      <div class="hero__panel surface-card">
        <div class="hero__metric">
          <strong>48h</strong>
          <span>Talk to a coordinator quickly and start getting answers fast</span>
        </div>
        <div class="hero__metric">
          <strong>One team</strong>
          <span>Medical guidance, travel planning, and stay support handled together for you</span>
        </div>
        <div class="hero__metric">
          <strong>Door to door</strong>
          <span>From your first message to arrival and follow-up, we help keep the journey simple</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: #eef6f4;
}

.hero__grid {
  display: grid;
  gap: 2rem;
  align-items: center;
  grid-template-columns: 1.2fr 0.8fr;
}

.hero__copy p {
  max-width: 42rem;
  color: var(--color-text-soft);
  font-size: 1rem;
}

.hero__copy h1 {
  font-size: clamp(2.52rem, 4.5vw, 4.14rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
}

.hero__panel {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.86);
  border-color: rgba(214, 229, 225, 0.9);
}

.hero__metric {
  padding: 1.25rem;
  border-radius: 1rem;
  background: var(--color-surface-muted);
}

.hero__metric strong {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--color-primary);
  font-size: 1.8rem;
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
}
</style>
