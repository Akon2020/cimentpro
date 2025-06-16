"use client";

import type React from "react";

import { useState } from "react";
import { ComptableLayout } from "@/components/ComptableLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Package, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Données simulées des commandes
const commandesData = [
  {
    id: "VTE-001",
    numeroRecu: "RCU-001",
    client: "Isaac Akonkwa",
    telephone: "+243 01 02 03 04",
    produits: [
      { nom: "Ciment 32.5", quantite: 10, prixUnitaire: 6500, total: 65000 },
    ],
    total: 65000,
    dateVente: "2024-01-15",
    heureVente: "09:15",
    statut: "Payé",
    caissier: "Marie Dupont",
    notes: "Client régulier",
  },
  {
    id: "VTE-002",
    numeroRecu: "RCU-002",
    client: "Ernest K.",
    telephone: "+243 05 06 07 08",
    produits: [
      { nom: "Ciment 42.5", quantite: 5, prixUnitaire: 7200, total: 36000 },
    ],
    total: 36000,
    dateVente: "2024-01-15",
    heureVente: "10:30",
    statut: "Payé",
    caissier: "Marie Dupont",
    notes: "",
  },
  {
    id: "VTE-003",
    numeroRecu: "RCU-003",
    client: "Elie R.",
    telephone: "+243 07 08 09 10",
    produits: [
      { nom: "Ciment 32.5", quantite: 20, prixUnitaire: 6500, total: 130000 },
    ],
    total: 130000,
    dateVente: "2024-01-15",
    heureVente: "11:45",
    statut: "Livré",
    caissier: "Marie Dupont",
    notes: "Livraison urgente",
    dateLivraison: "2024-01-15",
    heureLivraison: "14:30",
  },
];

export default function RechercheCommandePage() {
  const [numeroRecu, setNumeroRecu] = useState("");
  const [commandeTrouvee, setCommandeTrouvee] = useState<
    (typeof commandesData)[0] | null
  >(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const { toast } = useToast();

  const rechercherCommande = async () => {
    if (!numeroRecu.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un numéro de reçu",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setCommandeTrouvee(null);

    // Simulation de recherche
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const commande = commandesData.find(
      (c) => c.numeroRecu.toLowerCase() === numeroRecu.toLowerCase()
    );

    if (commande) {
      setCommandeTrouvee(commande);
      toast({
        title: "Commande trouvée",
        description: `Commande ${commande.numeroRecu} trouvée`,
      });
    } else {
      toast({
        title: "Commande non trouvée",
        description: "Aucune commande ne correspond à ce numéro de reçu",
        variant: "destructive",
      });
    }

    setIsSearching(false);
  };

  const procederLivraison = async () => {
    if (!commandeTrouvee) return;

    setIsDelivering(true);

    // Simulation de livraison
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mettre à jour le statut
    setCommandeTrouvee({
      ...commandeTrouvee,
      statut: "Livré",
      dateLivraison: new Date().toISOString().split("T")[0],
      heureLivraison: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    toast({
      title: "Livraison effectuée",
      description:
        "La commande a été marquée comme livrée et le stock a été mis à jour",
    });

    setIsDelivering(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      rechercherCommande();
    }
  };

  return (
    <ComptableLayout breadcrumbs={[{ label: "Rechercher Commande" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Rechercher une Commande
          </h1>
          <p className="text-muted-foreground">
            Recherchez une commande par numéro de reçu pour procéder à la
            livraison
          </p>
        </div>

        {/* Formulaire de recherche */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Recherche par Numéro de Reçu
            </CardTitle>
            <CardDescription>
              Saisissez le numéro de reçu présenté par le client
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="numeroRecu">Numéro de Reçu</Label>
              <div className="flex space-x-2">
                <Input
                  id="numeroRecu"
                  value={numeroRecu}
                  onChange={(e) => setNumeroRecu(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: RCU-001"
                  className="flex-1"
                />
                <Button
                  onClick={rechercherCommande}
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSearching ? "Recherche..." : "Rechercher"}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Instructions :</h4>
              <ul className="text-sm space-y-1">
                <li>
                  • Le client doit présenter son reçu avec le numéro de commande
                </li>
                <li>• Vérifiez l'identité du client avant la livraison</li>
                <li>
                  • Le stock sera automatiquement mis à jour après livraison
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Résultats de recherche */}
        {commandeTrouvee && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Détails de la Commande
                </span>
                <Badge
                  variant={
                    commandeTrouvee.statut === "Livré" ? "default" : "secondary"
                  }
                  className={
                    commandeTrouvee.statut === "Livré"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }
                >
                  {commandeTrouvee.statut}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Informations de Vente</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">N° Reçu:</span>
                      <span className="font-medium">
                        {commandeTrouvee.numeroRecu}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        N° Commande:
                      </span>
                      <span className="font-medium">{commandeTrouvee.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Date de vente:
                      </span>
                      <span>
                        {new Date(commandeTrouvee.dateVente).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Heure de vente:
                      </span>
                      <span>{commandeTrouvee.heureVente}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Caissier:</span>
                      <span>{commandeTrouvee.caissier}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Informations Client</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nom:</span>
                      <span className="font-medium">
                        {commandeTrouvee.client}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Téléphone:</span>
                      <span>{commandeTrouvee.telephone}</span>
                    </div>
                    {commandeTrouvee.notes && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notes:</span>
                        <span>{commandeTrouvee.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Produits commandés */}
              <div>
                <h3 className="font-semibold mb-3">Produits Commandés</h3>
                <div className="space-y-3">
                  {commandeTrouvee.produits.map((produit, index) => (
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
                  <span className="font-semibold">Total de la commande:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {commandeTrouvee.total.toLocaleString()} CDF
                  </span>
                </div>
              </div>

              {/* Informations de livraison */}
              {commandeTrouvee.statut === "Livré" &&
                commandeTrouvee.dateLivraison && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center text-green-600">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Livraison Effectuée
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Date de livraison:
                          </span>
                          <span>
                            {new Date(
                              commandeTrouvee.dateLivraison
                            ).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Heure de livraison:
                          </span>
                          <span>{commandeTrouvee.heureLivraison}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              {/* Actions */}
              {commandeTrouvee.statut !== "Livré" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="mr-2 h-5 w-5 text-orange-600" />
                        <h4 className="font-medium text-orange-800">
                          Vérifications avant livraison
                        </h4>
                      </div>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>✓ Vérifier l'identité du client</li>
                        <li>✓ Contrôler le numéro de reçu</li>
                        <li>✓ Vérifier la disponibilité des produits</li>
                        <li>✓ Préparer les produits pour la livraison</li>
                      </ul>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Voir Détails
                      </Button>
                      <Button
                        onClick={procederLivraison}
                        disabled={isDelivering}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {isDelivering
                          ? "Livraison en cours..."
                          : "Procéder à la Livraison"}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Exemples de numéros de reçu pour la démo */}
        <Card>
          <CardHeader>
            <CardTitle>Démonstration</CardTitle>
            <CardDescription>
              Numéros de reçu disponibles pour tester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {commandesData.map((commande) => (
                <div
                  key={commande.numeroRecu}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{commande.numeroRecu}</span>
                    <Badge
                      variant={
                        commande.statut === "Livré" ? "default" : "secondary"
                      }
                      className={
                        commande.statut === "Livré"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }
                    >
                      {commande.statut}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {commande.client}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => setNumeroRecu(commande.numeroRecu)}
                  >
                    Utiliser ce numéro
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ComptableLayout>
  );
}
