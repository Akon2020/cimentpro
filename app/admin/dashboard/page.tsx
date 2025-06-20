"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Package, Users, ShoppingCart, DollarSign } from "lucide-react"
import dynamic from "next/dynamic"

// Import dynamique des composants individuels
const SalesBarChart = dynamic(() => import("@/components/charts/sales-bar-chart"), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Chargement du graphique...</div>,
})

const ProductPieChart = dynamic(() => import("@/components/charts/product-pie-chart"), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Chargement du graphique...</div>,
})

const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Fév", sales: 3000, orders: 198 },
  { month: "Mar", sales: 5000, orders: 300 },
  { month: "Avr", sales: 4500, orders: 278 },
  { month: "Mai", sales: 6000, orders: 389 },
  { month: "Jun", sales: 5500, orders: 349 },
]

const productData = [
  { name: "Ciment Portland", value: 400, color: "#155E75" },
  { name: "Ciment Blanc", value: 300, color: "#0891B2" },
  { name: "Ciment Rapide", value: 200, color: "#06B6D4" },
  { name: "Mortier", value: 100, color: "#67E8F9" },
]

const recentOrders = [
  { id: "CMD001", client: "Entreprise ABC", montant: 15000, statut: "En cours" },
  { id: "CMD002", client: "Construction XYZ", montant: 25000, statut: "Livré" },
  { id: "CMD003", client: "Bâtiment 123", montant: 8000, statut: "En attente" },
  { id: "CMD004", client: "Travaux Publics", montant: 32000, statut: "Livré" },
]

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€45,231</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +20.1% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +180.1% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                -19% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +201 depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Aperçu des Ventes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">{mounted && <SalesBarChart data={salesData} />}</CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Répartition des Produits</CardTitle>
              <CardDescription>Ventes par catégorie de produits</CardDescription>
            </CardHeader>
            <CardContent>{mounted && <ProductPieChart data={productData} />}</CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes Récentes</CardTitle>
            <CardDescription>Vous avez 265 commandes ce mois-ci.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.client}</p>
                  </div>
                  <div className="ml-auto font-medium">€{order.montant.toLocaleString()}</div>
                  <Badge
                    variant={
                      order.statut === "Livré" ? "default" : order.statut === "En cours" ? "secondary" : "outline"
                    }
                    className="ml-2"
                  >
                    {order.statut}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
