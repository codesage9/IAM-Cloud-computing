import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-balance">IBM Cloud IAM Lab Portal</h1>
        <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
          Learn how IBM Cloud IAM secures access to Cloud Object Storage (COS) through hands-on simulations and
          role-based policies, with exportable reports.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/cos">
            <Button>Start Lab</Button>
          </Link>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>High-level Architecture</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-md border bg-card p-4">
            <img
              src="/iam-to-cos-to-services-architecture-diagram.jpg"
              alt="Diagram: IAM ↔ COS ↔ Services"
              className="w-full h-auto rounded"
            />
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Configure IAM users, roles, and service IDs</li>
            <li>• Simulate COS bucket deployment with security options</li>
            <li>• Test permissions via RBAC policy checks</li>
            <li>• Log all actions and export a PDF report</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
