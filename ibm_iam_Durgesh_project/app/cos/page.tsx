import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { COSForm } from "@/components/cos/cos-form"

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">COS Deployment Simulator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Bucket</CardTitle>
        </CardHeader>
        <CardContent>
          <COSForm />
        </CardContent>
      </Card>
    </div>
  )
}
