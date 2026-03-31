import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler(async (event) => {
  assertRole(event, ['patient', 'coordinator', 'admin'])

  const body = await readBody(event)

  if (!body?.fileName || !body?.contentType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'fileName and contentType are required'
    })
  }

  return {
    uploadUrl: `/uploads/${Date.now()}-${body.fileName}`,
    expiresIn: 300
  }
})
