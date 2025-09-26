"use client"

import useSWR from "swr"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { fetcher } from "@/lib/fetcher"
import { useToast } from "@/hooks/use-toast"

type Bucket = {
  id: string
  name: string
  region: string
  storageClass: string
  encryption: boolean
  dispersion: boolean
}

export function COSForm() {
  const { toast } = useToast()
  const { data, mutate } = useSWR<{ buckets: Bucket[] }>("/api/cos", fetcher)
  const [form, setForm] = useState({
    name: "",
    region: "us-south",
    storageClass: "standard",
    encryption: true,
    dispersion: true,
  })
  const [creating, setCreating] = useState(false)
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          setCreating(true)
          try {
            const res = await fetch("/api/cos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(form),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json?.error || "Failed to create bucket")
            await mutate()
            toast({ title: "Bucket created", description: `Bucket ${json?.bucket?.name} created successfully.` })
          } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" })
          } finally {
            setCreating(false)
          }
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Bucket name</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input id="region" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="storageClass">Storage class</Label>
          <Input
            id="storageClass"
            value={form.storageClass}
            onChange={(e) => setForm({ ...form, storageClass: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="encryption">Encryption enabled</Label>
          <Switch
            id="encryption"
            checked={form.encryption}
            onCheckedChange={(v) => setForm({ ...form, encryption: v })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dispersion">Data dispersion enabled</Label>
          <Switch
            id="dispersion"
            checked={form.dispersion}
            onCheckedChange={(v) => setForm({ ...form, dispersion: v })}
          />
        </div>
        <Button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create Bucket"}
        </Button>
      </form>

      <div className="space-y-3">
        <h3 className="font-medium">Existing Buckets</h3>
        <div className="grid gap-3">
          {(data?.buckets ?? []).map((b) => (
            <Card key={b.id}>
              <CardContent className="py-4 text-sm">
                <div className="font-medium">{b.name}</div>
                <div className="text-muted-foreground">
                  Region: {b.region} • Class: {b.storageClass}
                </div>
                <div className="text-muted-foreground">
                  Encryption: {b.encryption ? "on" : "off"} • Dispersion: {b.dispersion ? "on" : "off"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
