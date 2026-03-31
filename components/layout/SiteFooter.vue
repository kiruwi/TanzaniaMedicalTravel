<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <h2>Tanzania Medical Travel</h2>
        <p>
          Trusted hospitals, caring guidance, and smoother medical travel from your first enquiry to safe arrival.
        </p>
      </div>

      <div>
        <h3>Care pathways</h3>
        <ul class="stack">
          <li><NuxtLink to="/treatments/cardiology">Cardiology</NuxtLink></li>
          <li><NuxtLink to="/treatments/orthopedics">Orthopedics</NuxtLink></li>
          <li><NuxtLink to="/treatments/ivf">Fertility</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3>Company</h3>
        <ul class="stack">
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3>Patient support</h3>
        <ul class="stack">
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
  padding: 3.5rem 0;
  background: #0c2629;
  color: #d7ebe8;
}

.site-footer__grid {
  display: grid;
  gap: 1.5rem 2rem;
  grid-template-columns: 1.4fr repeat(3, 1fr);
}

.site-footer__brand {
  display: grid;
  gap: 0.85rem;
}

.site-footer h2,
.site-footer h3 {
  margin-bottom: 0;
}

.site-footer h3 {
  font-size: 0.99rem;
}

.site-footer .stack {
  gap: 0.6rem;
}

.site-footer__brand p {
  max-width: 30ch;
  color: #b9d3cf;
  margin-bottom: 0;
}

.site-footer li,
.site-footer a {
  color: #f4fbf9;
}

@media (max-width: 900px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
