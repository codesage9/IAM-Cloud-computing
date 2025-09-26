"use client"

import { useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function UserForm() {
  const { toast } = useToast()
  const { mutate: mutateUsers } = useSWR("/api/users", fetcher)
  const { mutate: mutateServices } = useSWR("/api/service-ids", fetcher)
  const [mode, setMode] = useState<"user" | "service">("user")
  const [role, setRole] = useState("Viewer")
  const [srole, setSrole] = useState("Writer")

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant={mode === "user" ? "default" : "secondary"} onClick={() => setMode("user")}>
            User
          </Button>
          <Button variant={mode === "service" ? "default" : "secondary"} onClick={() => setMode("service")}>
            Service ID
          </Button>
        </div>

        {mode === "user" ? (
          <UserCreate role={role} setRole={setRole} mutate={mutateUsers} toast={toast} />
        ) : (
          <ServiceCreate srole={srole} setSrole={setSrole} mutate={mutateServices} toast={toast} />
        )}
      </div>
      <div className="text-sm text-muted-foreground">
        Assign roles to control permissions across actions like read, write, delete, and configure.
      </div>
    </div>
  )
}

function UserCreate({ role, setRole, mutate, toast }: any) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, role }),
        })
        const json = await res.json()
        if (!res.ok) return toast({ title: "Error", description: json?.error || "Failed", variant: "destructive" })
        await mutate()
        setUsername("")
        setEmail("")
        toast({ title: "Created", description: `User ${json?.user?.username} created` })
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Viewer">Viewer</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Administrator">Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Create User</Button>
    </form>
  )
}

function ServiceCreate({ srole, setSrole, mutate, toast }: any) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await fetch("/api/service-ids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, role: srole }),
        })
        const json = await res.json()
        if (!res.ok) return toast({ title: "Error", description: json?.error || "Failed", variant: "destructive" })
        await mutate()
        setName("")
        setDescription("")
        toast({ title: "Created", description: `Service ID ${json?.service?.name} created` })
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="sid-name">Service ID Name</Label>
        <Input id="sid-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sid-desc">Description</Label>
        <Input id="sid-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Select value={srole} onValueChange={setSrole}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reader">Reader</SelectItem>
            <SelectItem value="Writer">Writer</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Create Service ID</Button>
    </form>
  )
}
