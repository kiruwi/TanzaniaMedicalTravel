export default defineEventHandler((event) => {
  event.context.userId = getHeader(event, 'x-user-id') || null
  event.context.userRole = getHeader(event, 'x-user-role') || 'public'
})
