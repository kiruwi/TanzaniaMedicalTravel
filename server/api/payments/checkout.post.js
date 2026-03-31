import Stripe from 'stripe'
import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler(async (event) => {
  assertRole(event, ['patient', 'coordinator', 'admin'])

  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body?.amount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'amount is required'
    })
  }

  if (!config.stripeSecretKey) {
    return {
      checkoutUrl: '/patient/payments',
      mode: 'stub'
    }
  }

  const stripe = new Stripe(config.stripeSecretKey)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${config.public.siteUrl}/patient/payments`,
    cancel_url: `${config.public.siteUrl}/patient/payments`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: body.currency || 'usd',
          unit_amount: Number(body.amount),
          product_data: {
            name: body.description || 'Medical travel payment'
          }
        }
      }
    ]
  })

  return {
    checkoutUrl: session.url
  }
})
