import { stripe } from "@/lib/stripe"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { items, total } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    // Create checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100), // Convert to pence
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/shop/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/shop`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Stripe error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
