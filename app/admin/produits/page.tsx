import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Eye, Edit, Trash2, Package } from "lucide-react"

const produits = [
  {
    id: "PROD001",
    nom: "Ciment Portland CEM I 42.5",
    categorie: "Ciment",
    prix: 8.5,
    stock: 1250,
    stockMin: 100,
    statut: "Actif",
    description: "Ciment Portland de haute qualité pour construction",
  },
  {
    id: "PROD002",
    nom: "Ciment Blanc CEM I 52.5",
    categorie: "Ciment",
    prix: 12.0,
    stock: 850,
    stockMin: 50,
    statut: "Actif",
    description: "Ciment blanc pour finitions et travaux décoratifs",
  },
  {
    id: "PROD003",
    nom: "Ciment Rapide CEM I 42.5 R",
    categorie: "Ciment",
    prix: 9.2,
    stock: 45,
    stockMin: 100,
    statut: "Stock Faible",
    description: "Ciment à prise rapide pour urgences",
  },
  {
    id: "PROD004",
    nom: "Mortier Prêt à l'Emploi",
    categorie: "Mortier",
    prix: 6.8,
    stock: 2100,
    stockMin: 200,
    statut: "Actif",
    description: "Mortier prémélangé pour maçonnerie",
  },
  {
    id: "PROD005",
    nom: "Béton Prêt à l'Emploi C25/30",
    categorie: "Béton",
    prix: 85.0,
    stock: 0,
    stockMin: 10,
    statut: "Rupture",
    description: "Béton prêt pour coulage direct",
  },
]

export default function ProduitsPage() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Produits" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Produits</h1>
            <p className="text-muted-foreground">Gérez votre catalogue de produits</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Produit
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
                  <Input placeholder="Rechercher un produit..." className="pl-8" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Toutes catégories</SelectItem>
                  <SelectItem value="ciment">Ciment</SelectItem>
                  <SelectItem value="mortier">Mortier</SelectItem>
                  <SelectItem value="beton">Béton</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="stock-faible">Stock Faible</SelectItem>
                  <SelectItem value="rupture">Rupture</SelectItem>
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
              <CardTitle className="text-sm font-medium">Total Produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produits.length}</div>
              <p className="text-xs text-muted-foreground">Dans le catalogue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produits.filter((p) => p.statut === "Actif").length}</div>
              <p className="text-xs text-muted-foreground">Disponibles à la vente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {produits.filter((p) => p.statut === "Stock Faible").length}
              </div>
              <p className="text-xs text-muted-foreground">Nécessitent réapprovisionnement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ruptures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {produits.filter((p) => p.statut === "Rupture").length}
              </div>
              <p className="text-xs text-muted-foreground">Produits en rupture</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Catalogue des Produits</CardTitle>
            <CardDescription>Tous vos produits et leur état de stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Stock Min</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produits.map((produit) => (
                    <TableRow key={produit.id}>
                      <TableCell className="font-medium">{produit.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produit.nom}</div>
                          <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                            {produit.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{produit.categorie}</TableCell>
                      <TableCell>€{produit.prix.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={produit.stock <= produit.stockMin ? "text-red-600 font-medium" : ""}>
                          {produit.stock}
                        </span>
                      </TableCell>
                      <TableCell>{produit.stockMin}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            produit.statut === "Actif"
                              ? "default"
                              : produit.statut === "Stock Faible"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {produit.statut}
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
