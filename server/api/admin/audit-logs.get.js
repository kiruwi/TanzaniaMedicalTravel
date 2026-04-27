import { assertRole } from '~/server/utils/permissions'
import { getSupabaseUser } from '~/server/utils/supabase'
import { searchAccessLogs } from '~/server/utils/access-log'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])
  const supabase = getSupabaseUser(event)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
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
    audit_logs: auditLogs || [],
    access_logs: await searchAccessLogs({
      limit: 100
    })
  }
})
