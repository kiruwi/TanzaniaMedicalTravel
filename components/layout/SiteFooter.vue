<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <NuxtLink class="site-footer__brand-link" to="/">
          <img class="site-footer__brand-mark" src="/images/logo-mark.svg" alt="" aria-hidden="true">
          <span class="site-footer__brand-text">TMT</span>
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
          <li><NuxtLink to="/auth/login">Patient login</NuxtLink></li>
          <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig()
const supportEmail = config.public.supportEmail
</script>

<style scoped>
.site-footer {
  --color-heading: #b9d3cf;
  --color-paragraph: #b9d3cf;
  margin-top: 4rem;
  padding: 3rem 0;
  background: #0c2629;
  color: #d7ebe8;
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
  color: #f4fbf9;
  font-size: 1.15rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer__brand-mark {
  width: 2.6rem;
  height: 2.6rem;
  flex: 0 0 auto;
}

.site-footer__brand-text {
  font-weight: 700;
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
  color: #b9d3cf;
  margin-bottom: 0;
}

.site-footer li,
.site-footer a {
  color: #f4fbf9;
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
