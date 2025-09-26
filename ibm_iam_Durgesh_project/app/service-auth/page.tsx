import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceAuth } from "@/components/service-auth/service-auth"

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Service-to-Service Authorization</h1>
      <Card>
        <CardHeader>
          <CardTitle>Simulate Service ID → COS</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceAuth />
        </CardContent>
      </Card>
    </div>
  )
}
