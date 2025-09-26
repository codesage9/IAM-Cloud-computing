import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "@/components/iam/user-form"
import { UsersTable } from "@/components/iam/users-table"
import { PolicyMatrix } from "@/components/iam/policy-matrix"

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">IAM Policy Explorer</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create User or Service ID</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
      <UsersTable />
      <PolicyMatrix />
    </div>
  )
}
