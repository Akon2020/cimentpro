"use client"

import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Download, TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react"
import dynamic from "next/dynamic"

// Import dynamique des composants de graphiques
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false })
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false })
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false })
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false })
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then((mod) => mod.AreaChart), { ssr: false })
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), { ssr: false })
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false })

const ventesData = [
  { mois: "Jan", ventes: 45000, commandes: 120, clients: 85 },
  { mois: "Fév", ventes: 52000, commandes: 135, clients: 92 },
  { mois: "Mar", ventes: 48000, commandes: 128, clients: 88 },
  { mois: "Avr", ventes: 61000, commandes: 156, clients: 105 },
  { mois: "Mai", ventes: 55000, commandes: 142, clients: 98 },
  { mois: "Jun", ventes: 67000, commandes: 168, clients: 112 },
]

const produitsData = [
  { nom: "Ciment Portland", ventes: 320000, pourcentage: 45, couleur: "#155E75" },
  { nom: "Ciment Blanc", ventes: 180000, pourcentage: 25, couleur: "#0891B2" },
  { nom: "Mortier", ventes: 144000, pourcentage: 20, couleur: "#06B6D4" },
  { nom: "Béton", ventes: 72000, pourcentage: 10, couleur: "#67E8F9" },
]

const clientsData = [
  { type: "Grandes Entreprises", nombre: 15, ca: 450000 },
  { type: "PME", nombre: 45, ca: 280000 },
  { type: "Particuliers Pro", nombre: 120, ca: 180000 },
  { type: "Artisans", nombre: 85, ca: 90000 },
]

export default function RapportsPage() {
  return (
    <AdminLayout breadcrumbs={[{ label: "Rapports" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapports et Analyses</h1>
            <p className="text-muted-foreground">Analysez les performances de votre entreprise</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres de Période</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <DatePickerWithRange />
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type de rapport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ventes">Ventes</SelectItem>
                  <SelectItem value="produits">Produits</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button>Générer Rapport</Button>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CA Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€328,000</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12.5% vs période précédente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">849</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8.2% vs période précédente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">265</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +15.3% vs période précédente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€386</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                -2.1% vs période précédente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Évolution des Ventes</CardTitle>
              <CardDescription>Chiffre d'affaires et nombre de commandes par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ventesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="ventes"
                      stackId="1"
                      stroke="#155E75"
                      fill="#155E75"
                      fillOpacity={0.6}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="commandes" stroke="#0891B2" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Ventes par Produit</CardTitle>
              <CardDescription>Performance des différentes catégories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={produitsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ nom, pourcentage }) => `${nom} (${pourcentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="ventes"
                    >
                      {produitsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.couleur} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analyse par Type de Client</CardTitle>
              <CardDescription>Répartition du chiffre d'affaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clientsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="ca" fill="#155E75" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé des Performances</CardTitle>
            <CardDescription>Indicateurs clés de performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-semibold">Top 3 Produits</h4>
                {produitsData.slice(0, 3).map((produit, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{produit.nom}</span>
                    <span className="text-sm font-medium">€{produit.ventes.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Croissance Mensuelle</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ventes</span>
                  <span className="text-sm font-medium text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Commandes</span>
                  <span className="text-sm font-medium text-green-600">+8.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nouveaux Clients</span>
                  <span className="text-sm font-medium text-green-600">+15.3%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Objectifs</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>CA Mensuel</span>
                    <span>87% atteint</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#155E75] h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Nouveaux Clients</span>
                    <span>112% atteint</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
