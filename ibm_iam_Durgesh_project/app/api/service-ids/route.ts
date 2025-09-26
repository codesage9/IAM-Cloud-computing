import { NextResponse } from "next/server"
import { addServiceID, db } from "@/lib/db"
import type { ServiceRole } from "@/lib/rbac"

export async function GET() {
  return NextResponse.json({ services: db.serviceIds })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description = "", role } = body || {}
  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 })
  const valid: ServiceRole[] = ["Reader", "Writer", "Manager"]
  if (!valid.includes(role)) return NextResponse.json({ error: "invalid role" }, { status: 400 })
  const service = addServiceID({ name, description, role })
  return NextResponse.json({ service })
}
