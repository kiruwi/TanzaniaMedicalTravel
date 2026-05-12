<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <NuxtLink class="site-footer__brand-link" to="/">
          <img class="site-footer__brand-mark" src="/images/logo-mark.svg" alt="" aria-hidden="true">
          <span class="site-footer__brand-wordmark" aria-label="Tanzania Medical Travel">
            <span>Tanzania</span>
            <span class="site-footer__brand-wordmark-emphasis">Medical</span>
            <span class="site-footer__brand-wordmark-subline">Travel</span>
          </span>
        </NuxtLink>
        <p>
          Trusted hospitals, caring guidance, and smoother medical travel from your first enquiry to safe arrival.
        </p>
      </div>

      <div class="site-footer__group">
        <h3>Care pathways</h3>
        <ul class="site-footer__links">
          <li><NuxtLink to="/treatments/cardiology">Cardiology</NuxtLink></li>
          <li><NuxtLink to="/treatments/orthopedics">Orthopedics</NuxtLink></li>
          <li><NuxtLink to="/treatments/ivf">Fertility</NuxtLink></li>
        </ul>
      </div>

      <div class="site-footer__group">
        <h3>Company</h3>
        <ul class="site-footer__links">
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>

      <div class="site-footer__group">
        <h3>Patient support</h3>
        <ul class="site-footer__links">
          <li><a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a></li>
          <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
const supportEmail = 'info@traveltotanzania.com'
</script>

<style scoped>
.site-footer {
  --color-heading: var(--color-text-on-dark-muted-alt);
  --color-paragraph: var(--color-text-on-dark-muted-alt);
  margin-top: 4rem;
  padding: 3rem 0;
  background: var(--color-footer-bg);
  color: var(--color-text-on-dark-soft);
}

.site-footer__grid {
  display: grid;
  gap: 1.25rem 1.5rem;
  align-items: start;
  grid-template-columns: minmax(0, 1.35fr) repeat(3, minmax(0, 0.8fr));
}

.site-footer__brand {
  display: grid;
  gap: 0.75rem;
  align-content: start;
}

.site-footer__brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  width: fit-content;
  color: var(--color-text-on-dark-strong);
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.site-footer__brand-mark {
  width: 2.6rem;
  height: 2.6rem;
  flex: 0 0 auto;
}

.site-footer__brand-wordmark {
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  column-gap: 0.32rem;
  row-gap: 0.08rem;
  flex: 0 1 auto;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1;
}

.site-footer__brand-wordmark-emphasis {
  font-weight: 600;
}

.site-footer__brand-wordmark-subline {
  grid-column: 1 / -1;
}

.site-footer__group {
  display: grid;
  gap: 0.65rem;
  align-content: start;
}

.site-footer h3 {
  margin-bottom: 0;
}

.site-footer h3 {
  font-size: 0.99rem;
}

.site-footer__links {
  display: grid;
  gap: 0.4rem;
}

.site-footer__brand p {
  max-width: 30ch;
  color: var(--color-text-on-dark-muted-alt);
  margin-bottom: 0;
}

.site-footer li,
.site-footer a {
  color: var(--color-text-on-dark-strong);
  font-weight: inherit;
}

.site-footer a {
  line-height: 1.35;
}

@media (max-width: 900px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
