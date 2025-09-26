"use client"

import useSWR from "swr"
import { useState } from "react"
import { fetcher } from "@/lib/fetcher"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const actions = ["Upload file", "Read object", "Delete object", "Change settings"]

export function RoleTester() {
  const { data } = useSWR<{ users: any[] }>("/api/users", fetcher)
  const [userId, setUserId] = useState<string>("")
  const [action, setAction] = useState<string>(actions[1])
  const [result, setResult] = useState<null | { user: string; action: string; result: "allowed" | "denied" }>(null)

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <Select value={userId} onValueChange={setUserId}>
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {(data?.users ?? []).map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.username} ({u.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={action} onValueChange={setAction}>
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              {actions.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            className="w-full"
            onClick={async () => {
              if (!userId) return
              const res = await fetch("/api/policies/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
              })
              const json = await res.json()
              setResult(json)
            }}
          >
            Test
          </Button>
        </div>
      </div>

      {result && (
        <Card>
          <CardContent className="py-4">
            <div className={["font-medium", result.result === "allowed" ? "text-green-600" : "text-red-600"].join(" ")}>
              {result.user} → {result.action}: {result.result === "allowed" ? "Allowed ✅" : "Denied ❌"}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
