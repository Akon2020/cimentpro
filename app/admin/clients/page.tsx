import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Eye, Edit, Trash2, Users, TrendingUp, Building } from "lucide-react"

const clients = [
  {
    id: "CLI001",
    nom: "Entreprise ABC",
    contact: "Jean Dupont",
    email: "jean.dupont@abc.com",
    telephone: "01 23 45 67 89",
    adresse: "123 Rue de la Construction, 75001 Paris",
    type: "Entreprise",
    statut: "Actif",
    dateCreation: "2023-06-15",
    derniereCommande: "2024-01-15",
    totalCommandes: 15,
    chiffreAffaires: 125000,
  },
  {
    id: "CLI002",
    nom: "Construction XYZ",
    contact: "Marie Martin",
    email: "marie.martin@xyz.com",
    telephone: "01 34 56 78 90",
    adresse: "456 Avenue du Bâtiment, 69000 Lyon",
    type: "Entreprise",
    statut: "Actif",
    dateCreation: "2023-03-20",
    derniereCommande: "2024-01-14",
    totalCommandes: 22,
    chiffreAffaires: 185000,
  },
  {
    id: "CLI003",
    nom: "Bâtiment 123",
    contact: "Pierre Durand",
    email: "pierre.durand@bat123.com",
    telephone: "01 45 67 89 01",
    adresse: "789 Boulevard des Travaux, 13000 Marseille",
    type: "PME",
    statut: "Actif",
    dateCreation: "2023-09-10",
    derniereCommande: "2024-01-13",
    totalCommandes: 8,
    chiffreAffaires: 65000,
  },
  {
    id: "CLI004",
    nom: "Travaux Publics Pro",
    contact: "Sophie Leroy",
    email: "sophie.leroy@tpp.com",
    telephone: "01 56 78 90 12",
    adresse: "321 Rue des Infrastructures, 33000 Bordeaux",
    type: "Grande Entreprise",
    statut: "Actif",
    dateCreation: "2022-11-05",
    derniereCommande: "2024-01-12",
    totalCommandes: 35,
    chiffreAffaires: 320000,
  },
  {
    id: "CLI005",
    nom: "Rénovation Express",
    contact: "Luc Bernard",
    email: "luc.bernard@renov.com",
    telephone: "01 67 89 01 23",
    adresse: "654 Place de la Rénovation, 59000 Lille",
    type: "Particulier Pro",
    statut: "Inactif",
    dateCreation: "2023-12-01",
    derniereCommande: "2023-12-20",
    totalCommandes: 3,
    chiffreAffaires: 12000,
  },
]

export default function ClientsPage() {
  const clientsActifs = clients.filter((c) => c.statut === "Actif").length
  const chiffreAffairesTotal = clients.reduce((sum, c) => sum + c.chiffreAffaires, 0)
  const commandesTotales = clients.reduce((sum, c) => sum + c.totalCommandes, 0)

  return (
    <AdminLayout breadcrumbs={[{ label: "Clients" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Clients</h1>
            <p className="text-muted-foreground">Gérez votre portefeuille client</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Client
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
                  <Input placeholder="Rechercher un client..." className="pl-8" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les types</SelectItem>
                  <SelectItem value="entreprise">Entreprise</SelectItem>
                  <SelectItem value="pme">PME</SelectItem>
                  <SelectItem value="grande-entreprise">Grande Entreprise</SelectItem>
                  <SelectItem value="particulier-pro">Particulier Pro</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">+2 nouveaux ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientsActifs}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((clientsActifs / clients.length) * 100)}% du portefeuille
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CA Total</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{chiffreAffairesTotal.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Chiffre d'affaires cumulé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandesTotales}</div>
              <p className="text-xs text-muted-foreground">
                Moyenne: {Math.round(commandesTotales / clients.length)} par client
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Clients</CardTitle>
            <CardDescription>Tous vos clients et leurs informations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Commandes</TableHead>
                    <TableHead>CA</TableHead>
                    <TableHead>Dernière Commande</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.nom}</div>
                          <div className="text-sm text-muted-foreground">{client.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.contact}</div>
                          <div className="text-sm text-muted-foreground">{client.email}</div>
                          <div className="text-sm text-muted-foreground">{client.telephone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{client.type}</Badge>
                      </TableCell>
                      <TableCell>{client.totalCommandes}</TableCell>
                      <TableCell>€{client.chiffreAffaires.toLocaleString()}</TableCell>
                      <TableCell>{new Date(client.derniereCommande).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>
                        <Badge variant={client.statut === "Actif" ? "default" : "secondary"}>{client.statut}</Badge>
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
