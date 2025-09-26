"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UsersTable() {
  const { data: users } = useSWR<{ users: any[] }>("/api/users", fetcher)
  const { data: services } = useSWR<{ services: any[] }>("/api/service-ids", fetcher)
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-4 gap-2 font-medium">
            <div>Username</div>
            <div>Email</div>
            <div>Role</div>
            <div>ID</div>
          </div>
          <div className="mt-2 space-y-1">
            {(users?.users ?? []).map((u) => (
              <div key={u.id} className="grid grid-cols-4 gap-2">
                <div>{u.username}</div>
                <div className="truncate">{u.email}</div>
                <div>{u.role}</div>
                <div className="truncate">{u.id}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Service IDs</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-4 gap-2 font-medium">
            <div>Name</div>
            <div>Description</div>
            <div>Role</div>
            <div>ID</div>
          </div>
          <div className="mt-2 space-y-1">
            {(services?.services ?? []).map((s) => (
              <div key={s.id} className="grid grid-cols-4 gap-2">
                <div>{s.name}</div>
                <div className="truncate">{s.description}</div>
                <div>{s.role}</div>
                <div className="truncate">{s.id}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
