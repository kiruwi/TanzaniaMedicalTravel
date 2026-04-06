export function getRequestRole(event) {
  return event.context.userRole || 'public'
}

export function assertAuthenticated(event) {
  if (!event.context.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: event.context.authError || 'Authentication required'
    })
  }

  return event.context.userId
}

export function assertRole(event, allowedRoles = []) {
  if (!allowedRoles.includes('public')) {
    assertAuthenticated(event)
  }

  const role = getRequestRole(event)

  if (!allowedRoles.includes(role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Insufficient permissions'
    })
  }

  return role
}
