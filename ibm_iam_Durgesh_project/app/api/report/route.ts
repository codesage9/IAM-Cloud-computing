export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export async function GET() {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const drawText = (text: string, x: number, y: number, size = 12, bold = false) => {
    page.drawText(text, { x, y, size, font: bold ? fontBold : font, color: rgb(0.1, 0.1, 0.1) })
  }

  let y = 800
  drawText("IBM Cloud IAM Lab Report", 50, y, 18, true)
  y -= 24
  drawText("Summary", 50, y, 14, true)
  y -= 18

  const total = db.logs.length
  const allowed = db.logs.filter((l) => l.result === "allowed").length
  const denied = total - allowed

  drawText(`Total actions: ${total}`, 50, y)
  y -= 16
  drawText(`Allowed: ${allowed}`, 50, y)
  y -= 16
  drawText(`Denied: ${denied}`, 50, y)
  y -= 24

  drawText("IAM Policy Matrix", 50, y, 14, true)
  y -= 18

  const rows = [
    ["Role", "Read", "Write", "Delete", "Configure"],
    ["Viewer", "Yes", "-", "-", "-"],
    ["Editor", "Yes", "Yes", "-", "-"],
    ["Administrator", "Yes", "Yes", "Yes", "Yes"],
  ]
  rows.forEach((r) => {
    drawText(r.join("  |  "), 50, y)
    y -= 16
  })
  y -= 8

  drawText("Access Logs (latest 30)", 50, y, 14, true)
  y -= 18
  db.logs.slice(0, 30).forEach((l) => {
    const line = `${new Date(l.timestamp).toLocaleString()} | ${l.subjectType}:${l.subject} | ${l.action} | ${l.result}`
    drawText(line, 50, y)
    y -= 14
    if (y < 60) {
      y = 780
      pdfDoc.addPage()
    }
  })

  const pdfBytes = await pdfDoc.save()
  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="iam-lab-report.pdf"`,
    },
  })
}
