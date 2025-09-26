"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/cos", label: "COS Deployment" },
  { href: "/iam", label: "IAM Policies" },
  { href: "/role-tester", label: "Role Tester" },
  { href: "/service-auth", label: "Service Auth" },
]

export function HeaderNav() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center justify-between h-14">
      <Link href="/" className="font-semibold">
        IBM Cloud IAM Lab
      </Link>
      <ul className="hidden md:flex items-center gap-4">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={[
                  "text-sm px-3 py-2 rounded-md",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")}
              >
                {l.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
