<template>
  <section class="hero section">
    <div class="container hero__grid">
      <div class="hero__copy">
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
  position: relative;
  min-height: 100vh;
  margin-top: -84px;
  padding-top: calc(84px + 5.5rem);
  padding-bottom: 5.5rem;
  background:
    var(--gradient-hero-overlay),
    url('/images/hero-image.webp') center center / cover no-repeat;
  color: var(--color-text-on-dark);
}

.hero__grid {
  display: grid;
  gap: 2rem;
  align-items: center;
  grid-template-columns: 1.2fr 0.8fr;
  min-height: calc(100vh - 84px);
  position: relative;
  z-index: 1;
}

.hero__copy {
  max-width: 44rem;
}

.hero__copy .eyebrow {
  display: inline-block;
  color: var(--color-text-on-dark-softer);
}

.hero__copy :deep(h1) {
  color: var(--color-text-on-dark);
  text-shadow: 0 12px 36px var(--color-shadow-hero-title);
}

.hero__copy p {
  max-width: 42rem;
  color: var(--color-text-on-dark-subtle);
  font-size: 1rem;
  text-shadow: 0 10px 24px var(--color-shadow-hero-copy);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
}

.hero__actions :deep(.button--ghost) {
  border-color: var(--color-border-on-dark-hover);
  color: var(--color-text-on-dark);
  background: var(--color-surface-overlay-soft);
}

.hero__actions :deep(.button--ghost:hover) {
  background: var(--color-surface-overlay-strong);
}

.hero__panel {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface-frost);
  border-color: var(--color-border-on-dark-soft);
  backdrop-filter: blur(18px);
}

.hero__metric {
  padding: 1.25rem;
  border-radius: 1rem;
  background: var(--color-surface-overlay);
}

.hero__metric strong {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--color-text-on-dark-accent);
  font-size: 1.8rem;
}

.hero__metric span {
  display: block;
  color: var(--color-text-on-dark-body);
  font-weight: var(--font-weight-copy);
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding-top: calc(84px + 4rem);
    padding-bottom: 4rem;
  }

  .hero__grid {
    min-height: auto;
  }
}
</style>
