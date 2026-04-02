<template>
  <section class="home-why section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Why patients choose this model</span>
        <h2 class="section-title-swoosh">Why patients and families feel safe choosing us.</h2>
      </div>
      <div class="why__grid">
        <article v-for="item in reasons" :key="item.title" class="surface-card why__card">
          <span :class="['why__icon', `why__icon--${item.icon}`]" aria-hidden="true">
            <svg v-if="item.icon === 'support'" viewBox="0 0 24 24" fill="none">
              <path d="M12 4.5a5 5 0 0 1 5 5v1.25a2 2 0 0 0 .59 1.41l.62.62a1 1 0 0 1-.71 1.72H6.5a1 1 0 0 1-.71-1.72l.62-.62A2 2 0 0 0 7 10.75V9.5a5 5 0 0 1 5-5Z" />
              <path d="M9.5 16.5a2.5 2.5 0 0 0 5 0" />
              <path d="M9 8.75a3 3 0 0 1 6 0" />
            </svg>
            <svg v-else-if="item.icon === 'pricing'" viewBox="0 0 24 24" fill="none">
              <path d="M12 3.5v17" />
              <path d="M15.5 7.25c0-1.52-1.54-2.75-3.5-2.75S8.5 5.73 8.5 7.25 9.89 9.7 12 10.2c2.11.5 3.5 1.39 3.5 2.8 0 1.52-1.54 2.75-3.5 2.75S8.5 14.52 8.5 13" />
              <path d="M6.5 5.5h11" />
              <path d="M6.5 18.5h11" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path d="M12 19.5s-6-3.55-6-8.45A3.56 3.56 0 0 1 9.5 7.5c1.1 0 1.9.48 2.5 1.25.6-.77 1.4-1.25 2.5-1.25A3.56 3.56 0 0 1 18 11.05c0 4.9-6 8.45-6 8.45Z" />
              <path d="M10 12h4" />
              <path d="M12 10v4" />
            </svg>
          </span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const reasons = [
  {
    icon: 'support',
    title: 'One team by your side',
    copy: 'You do not have to chase hospitals, doctors, flights, and updates alone. We help bring everything together for you.'
  },
  {
    icon: 'pricing',
    title: 'Clear pricing before you travel',
    copy: 'We help you understand likely treatment, travel, and stay costs early so you can plan with fewer surprises.'
  },
  {
    icon: 'trust',
    title: 'Trusted hospital options',
    copy: 'We help match you with hospital and specialist options that fit your needs, timeline, and comfort level.'
  }
]
</script>

<style scoped>
.home-why {
  background: #e7f0ed;
}

.section-heading {
  justify-items: center;
  text-align: center;
}

.section-heading h2 {
  max-width: 18ch;
  font-size: clamp(1.94rem, 3.42vw, 3.02rem);
}

.why__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.why__card {
  display: grid;
  gap: 0.9rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
}

.why__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.why__icon--support {
  background: linear-gradient(145deg, rgba(15, 118, 110, 0.16), rgba(6, 60, 55, 0.08));
  color: #0b6b64;
  border: 1px solid rgba(15, 118, 110, 0.18);
}

.why__icon--pricing {
  background: linear-gradient(145deg, rgba(217, 119, 6, 0.18), rgba(180, 83, 9, 0.08));
  color: #b45309;
  border: 1px solid rgba(217, 119, 6, 0.2);
}

.why__icon--trust {
  background: linear-gradient(145deg, rgba(22, 101, 52, 0.18), rgba(21, 94, 117, 0.08));
  color: #166534;
  border: 1px solid rgba(22, 101, 52, 0.18);
}

.why__icon svg {
  width: 1.5rem;
  height: 1.5rem;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.why__card h3 {
  margin-bottom: 0;
}

.why__card p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

@media (max-width: 900px) {
  .why__grid {
    grid-template-columns: 1fr;
  }
}
</style>
