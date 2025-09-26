import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleTester } from "@/components/role-tester/role-tester"

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Role-Based Permission Tester</h1>
      <Card>
        <CardHeader>
          <CardTitle>Test User Action</CardTitle>
        </CardHeader>
        <CardContent>
          <RoleTester />
        </CardContent>
      </Card>
    </div>
  )
}
