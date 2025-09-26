"use client"

import useSWR from "swr"
import { useState } from "react"
import { fetcher } from "@/lib/fetcher"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const actions = ["Read object", "Upload file", "Delete object", "Change settings"]

export function ServiceAuth() {
  const { data: services } = useSWR<{ services: any[] }>("/api/service-ids", fetcher)
  const { data: buckets } = useSWR<{ buckets: any[] }>("/api/cos", fetcher)
  const [serviceId, setServiceId] = useState<string>("")
  const [bucketId, setBucketId] = useState<string>("")
  const [action, setAction] = useState<string>(actions[1])
  const [result, setResult] = useState<null | {
    service: string
    bucket: string
    action: string
    result: "allowed" | "denied"
  }>(null)

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <Select value={serviceId} onValueChange={setServiceId}>
          <SelectTrigger>
            <SelectValue placeholder="Service ID" />
          </SelectTrigger>
          <SelectContent>
            {(services?.services ?? []).map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name} ({s.role})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={bucketId} onValueChange={setBucketId}>
          <SelectTrigger>
            <SelectValue placeholder="Bucket" />
          </SelectTrigger>
          <SelectContent>
            {(buckets?.buckets ?? []).map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={action} onValueChange={setAction}>
          <SelectTrigger>
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            {actions.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={async () => {
            if (!serviceId || !bucketId) return
            const res = await fetch("/api/service-ids/test", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ serviceId, bucketId, action }),
            })
            const json = await res.json()
            setResult(json)
          }}
        >
          Attempt
        </Button>
      </div>

      {result && (
        <Card>
          <CardContent className="py-4">
            <div className={["font-medium", result.result === "allowed" ? "text-green-600" : "text-red-600"].join(" ")}>
              {result.service} → {result.bucket}: {result.action} is {result.result}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
