"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const rows = [
  { role: "Viewer", perms: { Read: "✓", Write: "—", Delete: "—", Configure: "—" } },
  { role: "Editor", perms: { Read: "✓", Write: "✓", Delete: "—", Configure: "—" } },
  { role: "Administrator", perms: { Read: "✓", Write: "✓", Delete: "✓", Configure: "✓" } },
]

export function PolicyMatrix() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Policy Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 text-sm">
          <div className="font-medium">Role</div>
          <div className="font-medium">Read</div>
          <div className="font-medium">Write</div>
          <div className="font-medium">Delete</div>
          <div className="font-medium">Configure</div>
          {rows.map((r) => (
            <>
              <div key={`${r.role}-role`} className="font-medium">
                {r.role}
              </div>
              <div key={`${r.role}-read`}>{r.perms.Read}</div>
              <div key={`${r.role}-write`}>{r.perms.Write}</div>
              <div key={`${r.role}-delete`}>{r.perms.Delete}</div>
              <div key={`${r.role}-configure`}>{r.perms.Configure}</div>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
