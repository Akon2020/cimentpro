"use client";

import { ComptableLayout } from "@/components/ComptableLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Package,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";

const commandesALivrer = [
  {
    id: "VTE-001",
    numeroRecu: "RCU-001",
    client: "Isaac Akonkwa",
    produit: "Ciment 32.5",
    quantite: 10,
    montant: 65000,
    dateVente: "2024-01-15",
    statut: "Payé",
  },
  {
    id: "VTE-002",
    numeroRecu: "RCU-002",
    client: "Ernest K.",
    produit: "Ciment 42.5",
    quantite: 5,
    montant: 36000,
    dateVente: "2024-01-15",
    statut: "Payé",
  },
  {
    id: "VTE-003",
    numeroRecu: "RCU-003",
    client: "Elie R.",
    produit: "Ciment 32.5",
    quantite: 20,
    montant: 130000,
    dateVente: "2024-01-15",
    statut: "Payé",
  },
];

const livraisonsJour = [
  {
    id: "LIV-001",
    commande: "VTE-004",
    client: "Janvier Mugisho",
    produit: "Ciment 42.5",
    quantite: 15,
    heureLivraison: "08:30",
  },
  {
    id: "LIV-002",
    commande: "VTE-005",
    client: "Daniel Tambwe",
    produit: "Ciment 32.5",
    quantite: 8,
    heureLivraison: "10:15",
  },
];

export default function ComptableDashboard() {
  const commandesEnAttente = commandesALivrer.length;
  const livraisonsEffectuees = livraisonsJour.length;
  const totalLivraisons = commandesEnAttente + livraisonsEffectuees;

  return (
    <ComptableLayout breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de Bord Comptable
            </h1>
            <p className="text-muted-foreground">
              Gérez les livraisons et vérifications
            </p>
          </div>
          <Link href="/comptable/recherche">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              Rechercher Commande
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">À Livrer</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandesEnAttente}</div>
              <p className="text-xs text-muted-foreground">
                Commandes en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Livrées Aujourd'hui
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{livraisonsEffectuees}</div>
              <p className="text-xs text-muted-foreground">
                Livraisons effectuées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Livraisons
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLivraisons}</div>
              <p className="text-xs text-muted-foreground">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficacité</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">Taux de livraison</p>
            </CardContent>
          </Card>
        </div>

        {/* Recherche rapide */}
        <Card>
          <CardHeader>
            <CardTitle>Recherche Rapide</CardTitle>
            <CardDescription>
              Rechercher une commande par numéro de reçu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Numéro de reçu (ex: RCU-001)"
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Commandes à livrer */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Commandes à Livrer</CardTitle>
                <CardDescription>
                  Commandes payées en attente de livraison
                </CardDescription>
              </div>
              <Link href="/comptable/livraisons">
                <Button variant="outline">Voir tout</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Reçu</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date Vente</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commandesALivrer.map((commande) => (
                  <TableRow key={commande.id}>
                    <TableCell className="font-medium">
                      {commande.numeroRecu}
                    </TableCell>
                    <TableCell>{commande.client}</TableCell>
                    <TableCell>{commande.produit}</TableCell>
                    <TableCell>{commande.quantite} sacs</TableCell>
                    <TableCell>
                      {commande.montant.toLocaleString()} CDF
                    </TableCell>
                    <TableCell>
                      {new Date(commande.dateVente).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{commande.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Livrer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Livraisons du jour */}
        <Card>
          <CardHeader>
            <CardTitle>Livraisons Effectuées Aujourd'hui</CardTitle>
            <CardDescription>Historique des livraisons du jour</CardDescription>
          </CardHeader>
          <CardContent>
            {livraisonsJour.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucune livraison effectuée aujourd'hui
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Livraison</TableHead>
                    <TableHead>N° Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Heure Livraison</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {livraisonsJour.map((livraison) => (
                    <TableRow key={livraison.id}>
                      <TableCell className="font-medium">
                        {livraison.id}
                      </TableCell>
                      <TableCell>{livraison.commande}</TableCell>
                      <TableCell>{livraison.client}</TableCell>
                      <TableCell>{livraison.produit}</TableCell>
                      <TableCell>{livraison.quantite} sacs</TableCell>
                      <TableCell>{livraison.heureLivraison}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </ComptableLayout>
  );
}
