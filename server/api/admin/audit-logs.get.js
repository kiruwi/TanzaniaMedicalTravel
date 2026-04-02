import { assertRole } from '~/server/utils/permissions'
import { getSupabaseAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])
  const supabase = getSupabaseAdmin()

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase service credentials are not configured'
    })
  }

  const { data: auditLogs, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    audit_logs: auditLogs || []
  }
})
