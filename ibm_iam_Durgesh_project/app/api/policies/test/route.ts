import { NextResponse } from "next/server"
import { db, addLog } from "@/lib/db"
import { actionsMap, isAllowedUser } from "@/lib/rbac"

export async function POST(req: Request) {
  const body = await req.json()
  const { userId, action } = body || {}
  if (!userId || !action) return NextResponse.json({ error: "userId and action are required" }, { status: 400 })
  const user = db.users.find((u) => u.id === userId)
  if (!user) return NextResponse.json({ error: "user not found" }, { status: 404 })

  // Map display action to RBAC action
  const mapped = (actionsMap as any)[action] as "read" | "write" | "delete" | "configure"
  const allowed = isAllowedUser(user.role, mapped)
  addLog({ subjectType: "user", subject: user.username, action: mapped, result: allowed ? "allowed" : "denied" })

  return NextResponse.json({ user: user.username, action, result: allowed ? "allowed" : "denied" })
}
