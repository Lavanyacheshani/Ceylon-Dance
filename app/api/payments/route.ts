import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, studentName, email, amount, courseId } = await request.json()

    // In production, verify payment with Stripe and save to database
    const payment = {
      id: sessionId,
      studentName,
      email,
      amount,
      courseId,
      status: "completed",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process payment" }, { status: 400 })
  }
}

export async function GET() {
  // In production, fetch payments from database
  return NextResponse.json([])
}
