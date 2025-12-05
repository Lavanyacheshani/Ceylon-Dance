import { type NextRequest, NextResponse } from "next/server"
import { COURSES } from "@/lib/products"

export async function GET() {
  return NextResponse.json(COURSES)
}

export async function POST(request: NextRequest) {
  try {
    const course = await request.json()
    // In production, save to database
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 400 })
  }
}
