import { AdminLayout } from "@/components/AdminLayout"
import ClientsPageClient from "./ClientsPageClient"

export default function ClientsPage() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Gestion" }, { label: "Clients" }]}>
      <ClientsPageClient />
    </AdminLayout>
  )
}
