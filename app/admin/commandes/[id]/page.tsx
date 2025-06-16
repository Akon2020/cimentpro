import { notFound } from "next/navigation"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit } from "lucide-react"
import Link from "next/link"

// Simulation de données
const commandes = [
  {
    id: "CMD001",
    client: "Entreprise ABC",
    date: "2024-01-15",
    montant: 15000,
    statut: "En cours",
    produits: ["Ciment Portland", "Mortier"],
    quantite: "50 sacs",
    adresse: "123 Rue Example, Paris",
    telephone: "01 23 45 67 89",
    email: "contact@abc.com",
  },
  // ... autres commandes
]

interface PageProps {
  params: {
    id: string
  }
}

export default function CommandeDetailPage({ params }: PageProps) {
  const commande = commandes.find((c) => c.id === params.id)

  // Si la commande n'existe pas, déclencher la page 404
  if (!commande) {
    notFound()
  }

  return (
    <AdminLayout breadcrumbs={[{ label: "Commandes", href: "/admin/commandes" }, { label: commande.id }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/commandes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Commande {commande.id}</h1>
              <p className="text-muted-foreground">Détails de la commande</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </div>

        {/* Détails de la commande */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Référence</p>
                  <p className="font-semibold">{commande.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{new Date(commande.date).toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Montant</p>
                  <p className="font-semibold">€{commande.montant.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <Badge variant={commande.statut === "En cours" ? "secondary" : "default"}>{commande.statut}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nom</p>
                <p className="font-semibold">{commande.client}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{commande.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                <p>{commande.telephone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                <p>{commande.adresse}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
