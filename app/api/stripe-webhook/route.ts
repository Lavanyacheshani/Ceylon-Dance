import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = (await headers()).get("stripe-signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return new Response("Webhook Error", { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object as any

      // Save registration to localStorage (in a real app, save to database)
      const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
      registrations.push({
        id: checkoutSession.id,
        fullName: checkoutSession.metadata?.studentName,
        email: checkoutSession.customer_email,
        phone: "N/A",
        age: "N/A",
        course: checkoutSession.metadata?.courseId,
        courseName: checkoutSession.line_items?.data[0]?.description,
        coursePrice: checkoutSession.amount_total,
        preferredTimeSlot: "N/A",
        date: new Date().toISOString(),
      })
      localStorage.setItem("registrations", JSON.stringify(registrations))
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response("Webhook received", { status: 200 })
}
