import { NextResponse } from "next/server"
import { addUser, db } from "@/lib/db"
import type { Role } from "@/lib/rbac"

export async function GET() {
  return NextResponse.json({ users: db.users })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { username, email, role } = body || {}
  if (!username || !email) return NextResponse.json({ error: "username and email are required" }, { status: 400 })
  const validRoles: Role[] = ["Viewer", "Editor", "Administrator"]
  if (!validRoles.includes(role)) return NextResponse.json({ error: "invalid role" }, { status: 400 })
  const user = addUser({ username, email, role })
  return NextResponse.json({ user })
}
