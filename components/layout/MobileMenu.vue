<template>
  <transition name="fade">
    <div v-if="open" class="mobile-menu">
      <div class="mobile-menu__panel">
        <div class="mobile-menu__header">
          <strong>Navigation</strong>
          <button type="button" @click="$emit('close')">Close</button>
        </div>
        <nav class="mobile-menu__links">
          <NuxtLink
            v-for="item in links"
            :key="item.to"
            :to="item.to"
            @click="$emit('close')"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  },
  links: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close'])
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  inset: 0;
  padding: 1rem;
  background: rgba(12, 38, 41, 0.5);
}

.mobile-menu__panel {
  max-width: 420px;
  margin-left: auto;
  padding: 1.25rem;
  border-radius: 1.25rem;
  background: #fff;
}

.mobile-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.mobile-menu__header button {
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: transparent;
}

.mobile-menu__links {
  display: grid;
  gap: 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
