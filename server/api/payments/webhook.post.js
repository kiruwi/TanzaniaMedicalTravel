export default defineEventHandler(async (event) => {
  const payload = await readRawBody(event)

  return {
    received: true,
    size: payload?.length || 0
  }
})
