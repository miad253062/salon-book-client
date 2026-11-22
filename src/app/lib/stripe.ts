import 'server-only'

import Stripe from 'stripe'

const apiKey = process.env.STRIPE_SECRET_KEY

if (!apiKey) {
  console.warn('[stripe] STRIPE_SECRET_KEY is not set — checkout requests will fail.')
}

export const stripe = new Stripe(apiKey ?? '')
