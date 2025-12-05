import "server-only"

import Stripe from "stripe"

const stripeKey = process.env.STRIPE_SECRET_KEY

if (!stripeKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Please add it to your environment variables."
  )
}

export const stripe = new Stripe(stripeKey)
