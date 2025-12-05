// Stripe webhook for handling payment events
// This handles Checkout Session completion

import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20",
})

export async function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): Promise<Stripe.Event | null> {
  try {
    const event = stripe.webhooks.constructEvent(body, signature, secret)
    return event
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return null
  }
}

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata as any
  const studentName = metadata?.studentName || session.customer_details?.name || "Unknown"
  const email = session.customer_email || session.customer_details?.email || ""

  // Save registration data
  const registrationData = {
    id: session.id,
    fullName: studentName,
    email,
    phone: session.customer_details?.phone || "",
    age: "",
    course: metadata?.courseId,
    courseName: session.line_items?.data[0]?.description || "",
    coursePrice: session.amount_total || 0,
    preferredTimeSlot: "",
    date: new Date().toISOString(),
    status: "confirmed",
    paymentId: session.id,
  }

  // In production, save this to your database
  console.log("Payment completed:", registrationData)

  return registrationData
}
