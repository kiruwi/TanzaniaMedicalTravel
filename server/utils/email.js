import { Resend } from 'resend'

function getServerEnv(...names) {
  for (const name of names) {
    const value = process.env[name]

    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  return ''
}

export async function sendTransactionalEmail({ to, subject, html }) {
  const config = useRuntimeConfig()
  const resendApiKey = config.resendApiKey || getServerEnv('NUXT_RESEND_API_KEY', 'RESEND_API_KEY')
  const resendFrom =
    config.resendFrom || getServerEnv('NUXT_RESEND_FROM', 'RESEND_FROM') || 'care@example-medical-travel.com'

  if (!resendApiKey) {
    return {
      skipped: true
    }
  }

  const resend = new Resend(resendApiKey)

  return resend.emails.send({
    from: resendFrom,
    to,
    subject,
    html
  })
}
