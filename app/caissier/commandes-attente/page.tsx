"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const commandesEnAttente = [
  {
    id: "CMD-001",
    numeroReservation: "RSV-001",
    client: "Sophie Martin",
    telephone: "+243 01 02 03 04",
    produits: [
      { nom: "Ciment 42.5", quantite: 15, prixUnitaire: 7200, total: 108000 },
    ],
    total: 108000,
    dateReservation: "2024-01-15",
    heureReservation: "08:30",
    statut: "En attente",
    notes: "Livraison urgente demandée",
  },
  {
    id: "CMD-002",
    numeroReservation: "RSV-002",
    client: "Luc Bernard",
    telephone: "+243 05 06 07 08",
    produits: [
      { nom: "Ciment 32.5", quantite: 8, prixUnitaire: 6500, total: 52000 },
      { nom: "Mortier Prêt", quantite: 5, prixUnitaire: 4800, total: 24000 },
    ],
    total: 76000,
    dateReservation: "2024-01-15",
    heureReservation: "10:15",
    statut: "En attente",
    notes: "",
  },
  {
    id: "CMD-003",
    numeroReservation: "RSV-003",
    client: "Aminata Traoré",
    telephone: "+243 07 08 09 10",
    produits: [
      { nom: "Ciment 42.5", quantite: 25, prixUnitaire: 7200, total: 180000 },
    ],
    total: 180000,
    dateReservation: "2024-01-14",
    heureReservation: "16:45",
    statut: "En attente",
    notes: "Client VIP",
  },
];

export default function CommandesAttentePage() {
  const [recherche, setRecherche] = useState("");
  const [commandeSelectionnee, setCommandeSelectionnee] = useState<
    (typeof commandesEnAttente)[0] | null
  >(null);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const commandesFiltrees = commandesEnAttente.filter(
    (commande) =>
      commande.client.toLowerCase().includes(recherche.toLowerCase()) ||
      commande.numeroReservation
        .toLowerCase()
        .includes(recherche.toLowerCase()) ||
      commande.telephone.includes(recherche)
  );

  const voirDetails = (commande: (typeof commandesEnAttente)[0]) => {
    setCommandeSelectionnee(commande);
    setDialogOuvert(true);
  };

  const validerPaiement = async (commande: (typeof commandesEnAttente)[0]) => {
    setIsValidating(true);

    // Simulation du traitement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Paiement validé !",
      description: `Commande ${commande.numeroReservation} validée et transférée en comptabilité`,
    });

    setIsValidating(false);
    setDialogOuvert(false);
  };

  return (
    <CaissierLayout breadcrumbs={[{ label: "Commandes en Attente" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Commandes en Attente
            </h1>
            <p className="text-muted-foreground">
              Réservations en ligne à valider
            </p>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {commandesFiltrees.length} commande
            {commandesFiltrees.length > 1 ? "s" : ""} en attente
          </Badge>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total en Attente
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {commandesEnAttente.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Commandes à traiter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valeur Totale
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {commandesEnAttente
                  .reduce((sum, cmd) => sum + cmd.total, 0)
                  .toLocaleString()}{" "}
                CDF
              </div>
              <p className="text-xs text-muted-foreground">
                Chiffre d'affaires potentiel
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commande Moyenne
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {commandesEnAttente.length > 0
                  ? Math.round(
                      commandesEnAttente.reduce(
                        (sum, cmd) => sum + cmd.total,
                        0
                      ) / commandesEnAttente.length
                    ).toLocaleString()
                  : 0}{" "}
                CDF
              </div>
              <p className="text-xs text-muted-foreground">Panier moyen</p>
            </CardContent>
          </Card>
        </div>

        {/* Recherche */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Rechercher une Commande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Rechercher par nom client, numéro de réservation ou téléphone..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Liste des commandes */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Commandes</CardTitle>
            <CardDescription>
              {commandesFiltrees.length} commande
              {commandesFiltrees.length > 1 ? "s" : ""} trouvée
              {commandesFiltrees.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {commandesFiltrees.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Aucune commande en attente
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Réservation</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Produits</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commandesFiltrees.map((commande) => (
                    <TableRow key={commande.id}>
                      <TableCell className="font-medium">
                        {commande.numeroReservation}
                      </TableCell>
                      <TableCell>{commande.client}</TableCell>
                      <TableCell>{commande.telephone}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {commande.produits.map((p, i) => (
                            <div key={i}>
                              {p.nom} ({p.quantite})
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {commande.total.toLocaleString()} CDF
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {new Date(
                              commande.dateReservation
                            ).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="text-muted-foreground">
                            {commande.heureReservation}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-orange-500">
                          {commande.statut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => voirDetails(commande)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => voirDetails(commande)}
                          >
                            Valider
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog de détails */}
        <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la Commande</DialogTitle>
            </DialogHeader>
            {commandeSelectionnee && (
              <div className="space-y-6">
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Informations de Réservation
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">
                          N° Réservation:
                        </span>{" "}
                        {commandeSelectionnee.numeroReservation}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Date:</span>{" "}
                        {new Date(
                          commandeSelectionnee.dateReservation
                        ).toLocaleDateString("fr-FR")}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Heure:</span>{" "}
                        {commandeSelectionnee.heureReservation}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Informations Client</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Nom:</span>{" "}
                        {commandeSelectionnee.client}
                      </p>
                      <p>
                        <span className="text-muted-foreground">
                          Téléphone:
                        </span>{" "}
                        {commandeSelectionnee.telephone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Produits */}
                <div>
                  <h3 className="font-semibold mb-3">Produits Commandés</h3>
                  <div className="space-y-2">
                    {commandeSelectionnee.produits.map((produit, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{produit.nom}</p>
                          <p className="text-sm text-muted-foreground">
                            {produit.prixUnitaire.toLocaleString()} CDF ×{" "}
                            {produit.quantite}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {produit.total.toLocaleString()} CDF
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {produit.quantite} sacs
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {commandeSelectionnee.total.toLocaleString()} CDF
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {commandeSelectionnee.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm bg-yellow-50 p-3 rounded-lg">
                      {commandeSelectionnee.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOuvert(false)}
                    className="flex-1"
                  >
                    Fermer
                  </Button>
                  <Button
                    onClick={() => validerPaiement(commandeSelectionnee)}
                    disabled={isValidating}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {isValidating ? "Validation..." : "Valider le Paiement"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CaissierLayout>
  );
}
