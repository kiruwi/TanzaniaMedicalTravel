export function getRequestRole(event) {
  return event.context.userRole || getHeader(event, 'x-user-role') || 'public'
}

export function assertRole(event, allowedRoles = []) {
  const role = getRequestRole(event)

  if (!allowedRoles.includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Insufficient permissions'
    })
  }

  return role
}
