import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react"

const commandes = [
  {
    id: "CMD001",
    client: "Entreprise ABC",
    date: "2024-01-15",
    montant: 15000,
    statut: "En cours",
    produits: ["Ciment Portland", "Mortier"],
    quantite: "50 sacs",
  },
  {
    id: "CMD002",
    client: "Construction XYZ",
    date: "2024-01-14",
    montant: 25000,
    statut: "Livré",
    produits: ["Ciment Blanc", "Ciment Rapide"],
    quantite: "100 sacs",
  },
  {
    id: "CMD003",
    client: "Bâtiment 123",
    date: "2024-01-13",
    montant: 8000,
    statut: "En attente",
    produits: ["Ciment Portland"],
    quantite: "25 sacs",
  },
  {
    id: "CMD004",
    client: "Travaux Publics",
    date: "2024-01-12",
    montant: 32000,
    statut: "Livré",
    produits: ["Mortier", "Ciment Portland"],
    quantite: "150 sacs",
  },
  {
    id: "CMD005",
    client: "Rénovation Pro",
    date: "2024-01-11",
    montant: 12000,
    statut: "Annulé",
    produits: ["Ciment Blanc"],
    quantite: "40 sacs",
  },
]

export default function CommandesPage() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Commandes" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h1>
            <p className="text-muted-foreground">Gérez toutes les commandes de vos clients</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Commande
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher par ID ou client..." className="pl-8" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="en-cours">En cours</SelectItem>
                  <SelectItem value="livre">Livré</SelectItem>
                  <SelectItem value="en-attente">En attente</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandes.length}</div>
              <p className="text-xs text-muted-foreground">+2 nouvelles aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandes.filter((c) => c.statut === "En cours").length}</div>
              <p className="text-xs text-muted-foreground">Commandes à traiter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandes.filter((c) => c.statut === "Livré").length}</div>
              <p className="text-xs text-muted-foreground">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{commandes.reduce((sum, c) => sum + c.montant, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total des commandes</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Commandes</CardTitle>
            <CardDescription>Toutes les commandes de vos clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Produits</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commandes.map((commande) => (
                    <TableRow key={commande.id}>
                      <TableCell className="font-medium">{commande.id}</TableCell>
                      <TableCell>{commande.client}</TableCell>
                      <TableCell>{new Date(commande.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">{commande.produits.join(", ")}</div>
                      </TableCell>
                      <TableCell>{commande.quantite}</TableCell>
                      <TableCell>€{commande.montant.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            commande.statut === "Livré"
                              ? "default"
                              : commande.statut === "En cours"
                                ? "secondary"
                                : commande.statut === "Annulé"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {commande.statut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
