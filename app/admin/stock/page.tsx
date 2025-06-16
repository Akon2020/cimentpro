import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, TrendingUp, TrendingDown, AlertTriangle, Package } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const stockData = [
  {
    id: "PROD001",
    nom: "Ciment Portland CEM I 42.5",
    stockActuel: 1250,
    stockMin: 100,
    stockMax: 2000,
    entrepot: "Entrepôt A",
    derniereEntree: "2024-01-10",
    derniereSortie: "2024-01-15",
    valeur: 10625,
  },
  {
    id: "PROD002",
    nom: "Ciment Blanc CEM I 52.5",
    stockActuel: 850,
    stockMin: 50,
    stockMax: 1500,
    entrepot: "Entrepôt B",
    derniereEntree: "2024-01-08",
    derniereSortie: "2024-01-14",
    valeur: 10200,
  },
  {
    id: "PROD003",
    nom: "Ciment Rapide CEM I 42.5 R",
    stockActuel: 45,
    stockMin: 100,
    stockMax: 800,
    entrepot: "Entrepôt A",
    derniereEntree: "2024-01-05",
    derniereSortie: "2024-01-15",
    valeur: 414,
  },
  {
    id: "PROD004",
    nom: "Mortier Prêt à l'Emploi",
    stockActuel: 2100,
    stockMin: 200,
    stockMax: 3000,
    entrepot: "Entrepôt C",
    derniereEntree: "2024-01-12",
    derniereSortie: "2024-01-14",
    valeur: 14280,
  },
  {
    id: "PROD005",
    nom: "Béton Prêt à l'Emploi C25/30",
    stockActuel: 0,
    stockMin: 10,
    stockMax: 100,
    entrepot: "Entrepôt B",
    derniereEntree: "2024-01-01",
    derniereSortie: "2024-01-13",
    valeur: 0,
  },
]

function getStockStatus(actuel: number, min: number, max: number) {
  if (actuel === 0) return { status: "Rupture", color: "destructive", percentage: 0 }
  if (actuel <= min) return { status: "Stock Faible", color: "secondary", percentage: (actuel / max) * 100 }
  if (actuel >= max * 0.8) return { status: "Stock Élevé", color: "default", percentage: (actuel / max) * 100 }
  return { status: "Normal", color: "default", percentage: (actuel / max) * 100 }
}

export default function StockPage() {
  const valeurTotaleStock = stockData.reduce((sum, item) => sum + item.valeur, 0)
  const produitsEnRupture = stockData.filter((item) => item.stockActuel === 0).length
  const produitsStockFaible = stockData.filter(
    (item) => item.stockActuel > 0 && item.stockActuel <= item.stockMin,
  ).length

  return (
    <AdminLayout breadcrumbs={[{ label: "Stock" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion du Stock</h1>
            <p className="text-muted-foreground">Suivez et gérez vos niveaux de stock</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Mouvement de Stock
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
                  <SelectValue placeholder="Entrepôt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les entrepôts</SelectItem>
                  <SelectItem value="entrepot-a">Entrepôt A</SelectItem>
                  <SelectItem value="entrepot-b">Entrepôt B</SelectItem>
                  <SelectItem value="entrepot-c">Entrepôt C</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="faible">Stock Faible</SelectItem>
                  <SelectItem value="rupture">Rupture</SelectItem>
                  <SelectItem value="eleve">Stock Élevé</SelectItem>
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
              <CardTitle className="text-sm font-medium">Valeur Totale Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{valeurTotaleStock.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +5.2% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits en Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockData.filter((item) => item.stockActuel > 0).length}</div>
              <p className="text-xs text-muted-foreground">Sur {stockData.length} produits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{produitsStockFaible}</div>
              <p className="text-xs text-muted-foreground">Nécessitent réapprovisionnement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ruptures de Stock</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{produitsEnRupture}</div>
              <p className="text-xs text-muted-foreground">Produits indisponibles</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>État du Stock</CardTitle>
            <CardDescription>Niveaux de stock actuels pour tous les produits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Entrepôt</TableHead>
                    <TableHead>Stock Actuel</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Min/Max</TableHead>
                    <TableHead>Dernière Entrée</TableHead>
                    <TableHead>Dernière Sortie</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockData.map((item) => {
                    const stockInfo = getStockStatus(item.stockActuel, item.stockMin, item.stockMax)
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.nom}</div>
                            <div className="text-sm text-muted-foreground">{item.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.entrepot}</TableCell>
                        <TableCell>
                          <span className={item.stockActuel <= item.stockMin ? "text-red-600 font-medium" : ""}>
                            {item.stockActuel}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="w-full">
                            <Progress value={stockInfo.percentage} className="w-[60px]" />
                            <span className="text-xs text-muted-foreground">{Math.round(stockInfo.percentage)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {item.stockMin} / {item.stockMax}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(item.derniereEntree).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>{new Date(item.derniereSortie).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>€{item.valeur.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={stockInfo.color as any}>{stockInfo.status}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
