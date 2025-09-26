import { NextResponse } from "next/server"
import { db, addLog } from "@/lib/db"
import { actionsMap, isAllowedService } from "@/lib/rbac"

export async function POST(req: Request) {
  const body = await req.json()
  const { serviceId, bucketId, action } = body || {}
  if (!serviceId || !bucketId || !action)
    return NextResponse.json({ error: "serviceId, bucketId, action required" }, { status: 400 })
  const svc = db.serviceIds.find((s) => s.id === serviceId)
  const bucket = db.buckets.find((b) => b.id === bucketId)
  if (!svc) return NextResponse.json({ error: "service not found" }, { status: 404 })
  if (!bucket) return NextResponse.json({ error: "bucket not found" }, { status: 404 })

  const mapped = (actionsMap as any)[action] as "read" | "write" | "delete" | "configure"
  const allowed = isAllowedService(svc.role, mapped)
  addLog({ subjectType: "service", subject: svc.name, action: mapped, result: allowed ? "allowed" : "denied" })

  return NextResponse.json({ service: svc.name, bucket: bucket.name, action, result: allowed ? "allowed" : "denied" })
}
