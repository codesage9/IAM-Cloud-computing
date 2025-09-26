import { NextResponse } from "next/server"
import { addBucket, db } from "@/lib/db"

export async function GET() {
  return NextResponse.json({ buckets: db.buckets })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, region = "us-south", storageClass = "standard", encryption = true, dispersion = true } = body || {}
  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 })
  const bucket = addBucket({ name, region, storageClass, encryption, dispersion })
  return NextResponse.json({ status: "success", bucket })
}
