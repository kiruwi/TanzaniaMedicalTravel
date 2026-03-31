const recentHits = new Map()

export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/')) {
    return
  }

  const ip = getRequestIP(event) || 'unknown'
  const key = `${ip}:${event.path}`
  const now = Date.now()
  const state = recentHits.get(key) || { count: 0, startedAt: now }

  if (now - state.startedAt > 60_000) {
    recentHits.set(key, { count: 1, startedAt: now })
    return
  }

  state.count += 1
  recentHits.set(key, state)

  if (state.count > 60) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests'
    })
  }
})
