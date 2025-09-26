export type Role = "Viewer" | "Editor" | "Administrator"
export type ServiceRole = "Reader" | "Writer" | "Manager"
export type Action = "read" | "write" | "delete" | "configure"

const userRoleMatrix: Record<Role, Action[]> = {
  Viewer: ["read"],
  Editor: ["read", "write"],
  Administrator: ["read", "write", "delete", "configure"],
}

const serviceRoleMatrix: Record<ServiceRole, Action[]> = {
  Reader: ["read"],
  Writer: ["read", "write"],
  Manager: ["read", "write", "delete", "configure"],
}

export function isAllowedUser(role: Role, action: Action) {
  return userRoleMatrix[role]?.includes(action) ?? false
}

export function isAllowedService(role: ServiceRole, action: Action) {
  return serviceRoleMatrix[role]?.includes(action) ?? false
}

export const actionsMap = {
  "Upload file": "write",
  "Read object": "read",
  "Delete object": "delete",
  "Change settings": "configure",
} as const

export type DisplayAction = keyof typeof actionsMap
