import { type NextRequest, NextResponse } from "next/server"

// Simulated database storage (in production, use real database)
const registrations: any[] = []

export async function GET() {
  // In production, fetch from database
  return NextResponse.json(registrations)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newRegistration = {
      id: `reg-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    }
    registrations.push(newRegistration)

    // Also save to localStorage for persistence across sessions
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("registrations") || "[]"
      const all = JSON.parse(stored)
      all.push(newRegistration)
      localStorage.setItem("registrations", JSON.stringify(all))
    }

    return NextResponse.json(newRegistration, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create registration" }, { status: 400 })
  }
}
