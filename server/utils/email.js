import { Resend } from 'resend'

export async function sendTransactionalEmail({ to, subject, html }) {
  const config = useRuntimeConfig()

  if (!config.resendApiKey) {
    return {
      skipped: true
    }
  }

  const resend = new Resend(config.resendApiKey)

  return resend.emails.send({
    from: process.env.RESEND_FROM || 'care@example-medical-travel.com',
    to,
    subject,
    html
  })
}
