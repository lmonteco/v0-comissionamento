import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  try {
    // Attempt to get salespeople count as a simple test
    const salespeopleCount = await prisma.salesperson.count()

    return NextResponse.json({
      status: "Database connection successful",
      salespeople: salespeopleCount,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "Database connection failed",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
