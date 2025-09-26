import type { Role, ServiceRole, Action } from "./rbac"

export type User = { id: string; username: string; email: string; role: Role }
export type Bucket = {
  id: string
  name: string
  region: string
  storageClass: string
  encryption: boolean
  dispersion: boolean
}
export type ServiceID = { id: string; name: string; description?: string; role: ServiceRole }
export type LogEntry = {
  id: string
  subjectType: "user" | "service"
  subject: string
  action: Action
  result: "allowed" | "denied"
  timestamp: number
}

type DB = {
  users: User[]
  buckets: Bucket[]
  serviceIds: ServiceID[]
  logs: LogEntry[]
}

const globalAny = globalThis as any
if (!globalAny.__IAM_LAB_DB__) {
  const now = Date.now()
  globalAny.__IAM_LAB_DB__ = {
    users: [
      { id: "u_alice", username: "Alice", email: "alice@example.com", role: "Viewer" },
      { id: "u_bob", username: "Bob", email: "bob@example.com", role: "Editor" },
      { id: "u_carol", username: "Carol", email: "carol@example.com", role: "Administrator" },
    ],
    buckets: [
      {
        id: "b_default",
        name: "default-bucket",
        region: "us-south",
        storageClass: "standard",
        encryption: true,
        dispersion: true,
      },
    ],
    serviceIds: [],
    logs: [
      {
        id: "l1",
        subjectType: "user",
        subject: "Alice",
        action: "read",
        result: "allowed",
        timestamp: now - 1000 * 60 * 60,
      },
      {
        id: "l2",
        subjectType: "user",
        subject: "Alice",
        action: "delete",
        result: "denied",
        timestamp: now - 1000 * 58 * 60,
      },
    ],
  } as DB
}

export const db: DB = globalAny.__IAM_LAB_DB__

// Helpers
export function addUser(u: Omit<User, "id">) {
  const id = `u_${cryptoRandom()}`
  const user = { id, ...u }
  db.users.push(user)
  return user
}

export function addBucket(b: Omit<Bucket, "id">) {
  const id = `b_${cryptoRandom()}`
  const bucket = { id, ...b }
  db.buckets.push(bucket)
  return bucket
}

export function addServiceID(s: Omit<ServiceID, "id">) {
  const id = `s_${cryptoRandom()}`
  const sid = { id, ...s }
  db.serviceIds.push(sid)
  return sid
}

export function addLog(e: Omit<LogEntry, "id" | "timestamp">) {
  const id = `l_${cryptoRandom()}`
  const entry = { id, timestamp: Date.now(), ...e }
  db.logs.unshift(entry)
  return entry
}

function cryptoRandom() {
  // basic random id (not crypto-secure, sufficient for demo)
  return Math.random().toString(36).slice(2, 9)
}
