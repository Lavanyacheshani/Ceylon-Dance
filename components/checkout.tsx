"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

interface CheckoutProps {
  productId: string
  studentEmail: string
  studentName: string
}

export default function Checkout({ productId, studentEmail, studentName }: CheckoutProps) {
  const startCheckoutSessionForProduct = useCallback(
    () => startCheckoutSession(productId, studentEmail, studentName),
    [productId, studentEmail, studentName],
  )

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: startCheckoutSessionForProduct }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
