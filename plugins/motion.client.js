import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const revealSelector = [
    '.hero__copy h1',
    '.section-heading > h1',
    '.section-heading > h2',
    '.blog-article > h1',
    '.doctor-detail > h1',
    '.hospital-detail > h1',
    '.destination-detail > h1',
    '.treatment-overview > h1'
  ].join(', ')

  let lenis = null
  let observer = null
  let rafId = 0

  const revealElements = () => {
    if (!observer) {
      return
    }

    const elements = Array.from(document.querySelectorAll(revealSelector))

    for (const [index, element] of elements.entries()) {
      element.classList.add('reveal-section')
      element.style.setProperty('--reveal-delay', `${Math.min(index * 40, 180)}ms`)
      observer.observe(element)
    }
  }

  const destroyObserver = () => {
    observer?.disconnect()
    observer = null
  }

  const createObserver = () => {
    destroyObserver()

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12
    })

    revealElements()
  }

  const refreshMotion = () => {
    requestAnimationFrame(() => {
      createObserver()
      lenis?.resize()
    })
  }

  if (!prefersReducedMotion.matches) {
    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false
    })

    const raf = (time) => {
      lenis?.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)
  }

  nuxtApp.hook('app:mounted', refreshMotion)
  nuxtApp.hook('page:finish', refreshMotion)

  window.addEventListener('resize', refreshMotion)

  nuxtApp.hook('app:beforeUnmount', () => {
    window.removeEventListener('resize', refreshMotion)
    destroyObserver()
    if (rafId) {
      window.cancelAnimationFrame(rafId)
    }
    lenis?.destroy()
  })
})
