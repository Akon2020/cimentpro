"use client";

import { CaissierLayout } from "@/components/CaissierLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  ShoppingCart,
  Clock,
  DollarSign,
  Plus,
  Eye,
  Receipt,
} from "lucide-react";
import Link from "next/link";

const ventesJour = [
  {
    id: "VTE-001",
    heure: "09:15",
    client: "Jean Kouassi",
    produit: "Ciment 32.5",
    quantite: 10,
    montant: 65000,
    statut: "Payé",
  },
  {
    id: "VTE-002",
    heure: "10:30",
    client: "Marie Diallo",
    produit: "Ciment 42.5",
    quantite: 5,
    montant: 36000,
    statut: "Payé",
  },
  {
    id: "VTE-003",
    heure: "11:45",
    client: "Paul Mensah",
    produit: "Ciment 32.5",
    quantite: 20,
    montant: 130000,
    statut: "Payé",
  },
];

const commandesAttente = [
  {
    id: "CMD-001",
    client: "Sophie Martin",
    produit: "Ciment 42.5",
    quantite: 15,
    montant: 108000,
    dateReservation: "2024-01-15",
  },
  {
    id: "CMD-002",
    client: "Luc Bernard",
    produit: "Ciment 32.5",
    quantite: 8,
    montant: 52000,
    dateReservation: "2024-01-15",
  },
];

export default function CaissierDashboard() {
  const totalVentesJour = ventesJour.reduce(
    (sum, vente) => sum + vente.montant,
    0
  );
  const nombreVentesJour = ventesJour.length;
  const commandesEnAttente = commandesAttente.length;

  return (
    <CaissierLayout breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de Bord Caissier
            </h1>
            <p className="text-muted-foreground">
              Gérez vos ventes et encaissements
            </p>
          </div>
          <Link href="/caissier/nouvelle-vente">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Vente
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ventes du Jour
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalVentesJour.toLocaleString()} CDF
              </div>
              <p className="text-xs text-muted-foreground">
                {nombreVentesJour} transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nombreVentesJour}</div>
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandesEnAttente}</div>
              <p className="text-xs text-muted-foreground">
                Commandes à valider
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Panier Moyen
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nombreVentesJour > 0
                  ? Math.round(
                      totalVentesJour / nombreVentesJour
                    ).toLocaleString()
                  : 0}{" "}
                CDF
              </div>
              <p className="text-xs text-muted-foreground">Moyenne du jour</p>
            </CardContent>
          </Card>
        </div>

        {/* Ventes du jour */}
        <Card>
          <CardHeader>
            <CardTitle>Ventes du Jour</CardTitle>
            <CardDescription>
              Toutes les transactions effectuées aujourd'hui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventesJour.map((vente) => (
                  <TableRow key={vente.id}>
                    <TableCell className="font-medium">{vente.id}</TableCell>
                    <TableCell>{vente.heure}</TableCell>
                    <TableCell>{vente.client}</TableCell>
                    <TableCell>{vente.produit}</TableCell>
                    <TableCell>{vente.quantite} sacs</TableCell>
                    <TableCell>{vente.montant.toLocaleString()} CDF</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{vente.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Receipt className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Commandes en attente */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Commandes en Attente de Validation</CardTitle>
                <CardDescription>
                  Réservations en ligne à valider
                </CardDescription>
              </div>
              <Link href="/caissier/commandes-attente">
                <Button variant="outline">Voir tout</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date Réservation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commandesAttente.map((commande) => (
                  <TableRow key={commande.id}>
                    <TableCell className="font-medium">{commande.id}</TableCell>
                    <TableCell>{commande.client}</TableCell>
                    <TableCell>{commande.produit}</TableCell>
                    <TableCell>{commande.quantite} sacs</TableCell>
                    <TableCell>
                      {commande.montant.toLocaleString()} CDF
                    </TableCell>
                    <TableCell>
                      {new Date(commande.dateReservation).toLocaleDateString(
                        "fr-FR"
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Valider Paiement
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </CaissierLayout>
  );
}
