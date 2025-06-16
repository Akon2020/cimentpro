"use client";

import { useState } from "react";
import { CaissierLayout } from "@/components/CaissierLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingCart, Receipt, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  generateBonCommande,
  generateFacture,
  formatCommandeForPDF,
} from "@/utils/pdfGenerator";

const produits = [
  {
    id: "ciment-32.5",
    nom: "Ciment 32.5",
    prix: 6500,
    unite: "sac de 50kg",
    stock: 1250,
  },
  {
    id: "ciment-42.5",
    nom: "Ciment 42.5",
    prix: 7200,
    unite: "sac de 50kg",
    stock: 850,
  },
  {
    id: "mortier",
    nom: "Mortier Prêt",
    prix: 4800,
    unite: "sac de 25kg",
    stock: 500,
  },
];

interface ProduitVente {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
  total: number;
}

export default function NouvelleVentePage() {
  const [client, setClient] = useState({
    nom: "",
    telephone: "",
    adresse: "",
  });
  const [produitSelectionne, setProduitSelectionne] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [panier, setPanier] = useState<ProduitVente[]>([]);
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const ajouterAuPanier = () => {
    const produit = produits.find((p) => p.id === produitSelectionne);
    if (!produit) return;

    const produitExistant = panier.find((p) => p.id === produit.id);
    if (produitExistant) {
      setPanier(
        panier.map((p) =>
          p.id === produit.id
            ? {
                ...p,
                quantite: p.quantite + quantite,
                total: (p.quantite + quantite) * p.prix,
              }
            : p
        )
      );
    } else {
      setPanier([
        ...panier,
        {
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          quantite: quantite,
          total: produit.prix * quantite,
        },
      ]);
    }

    setProduitSelectionne("");
    setQuantite(1);
  };

  const retirerDuPanier = (id: string) => {
    setPanier(panier.filter((p) => p.id !== id));
  };

  const modifierQuantite = (id: string, nouvelleQuantite: number) => {
    if (nouvelleQuantite <= 0) {
      retirerDuPanier(id);
      return;
    }

    setPanier(
      panier.map((p) =>
        p.id === id
          ? {
              ...p,
              quantite: nouvelleQuantite,
              total: nouvelleQuantite * p.prix,
            }
          : p
      )
    );
  };

  const totalVente = panier.reduce((sum, produit) => sum + produit.total, 0);

  const traiterVente = async () => {
    if (!client.nom || !client.telephone || panier.length === 0) {
      toast({
        title: "Erreur",
        description:
          "Veuillez remplir les informations client et ajouter des produits",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Générer un numéro de commande unique
    const numeroCommande = `VTE-${Date.now()}`;

    // Créer les données de vente
    const venteData = {
      id: numeroCommande,
      date: new Date().toISOString().split("T")[0],
      client: client.nom,
      telephone: client.telephone,
      email: "",
      adresse: client.adresse,
      produits: panier.map((p) => ({
        nom: p.nom,
        quantite: p.quantite,
        prixUnitaire: p.prix,
        total: p.total,
      })),
      total: totalVente,
      statut: "payee",
      notes: notes,
    };

    // Simulation du traitement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Générer le reçu et la facture
    const formattedData = formatCommandeForPDF(venteData);
    generateBonCommande(formattedData); // Reçu pour le client
    generateFacture(formattedData); // Facture pour la comptabilité

    toast({
      title: "Vente enregistrée !",
      description: `Numéro de commande: ${numeroCommande}. Reçu et facture générés.`,
    });

    // Reset du formulaire
    setClient({ nom: "", telephone: "", adresse: "" });
    setPanier([]);
    setNotes("");
    setIsProcessing(false);
  };

  return (
    <CaissierLayout breadcrumbs={[{ label: "Nouvelle Vente" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nouvelle Vente</h1>
          <p className="text-muted-foreground">
            Enregistrer une nouvelle transaction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulaire de vente */}
          <div className="space-y-6">
            {/* Informations client */}
            <Card>
              <CardHeader>
                <CardTitle>Informations Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nom">Nom du client *</Label>
                  <Input
                    id="nom"
                    value={client.nom}
                    onChange={(e) =>
                      setClient({ ...client, nom: e.target.value })
                    }
                    placeholder="Nom complet du client"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    value={client.telephone}
                    onChange={(e) =>
                      setClient({ ...client, telephone: e.target.value })
                    }
                    placeholder="+243 XXX XXX XXX"
                  />
                </div>
                <div>
                  <Label htmlFor="adresse">Adresse</Label>
                  <Textarea
                    id="adresse"
                    value={client.adresse}
                    onChange={(e) =>
                      setClient({ ...client, adresse: e.target.value })
                    }
                    placeholder="Adresse du client"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sélection produit */}
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un Produit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="produit">Produit</Label>
                  <Select
                    value={produitSelectionne}
                    onValueChange={setProduitSelectionne}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      {produits.map((produit) => (
                        <SelectItem key={produit.id} value={produit.id}>
                          {produit.nom} - {produit.prix.toLocaleString()} CDF (
                          {produit.stock} en stock)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantite">Quantité</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantite(Math.max(1, quantite - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantite}
                      onChange={(e) =>
                        setQuantite(
                          Math.max(1, Number.parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-20 text-center"
                      min="1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantite(quantite + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={ajouterAuPanier}
                  disabled={!produitSelectionne}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter au Panier
                </Button>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes (optionnel)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes sur la vente..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Panier et récapitulatif */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Panier ({panier.length} article{panier.length > 1 ? "s" : ""})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {panier.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Aucun produit dans le panier
                  </p>
                ) : (
                  <div className="space-y-4">
                    {panier.map((produit) => (
                      <div
                        key={produit.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{produit.nom}</h4>
                          <p className="text-sm text-muted-foreground">
                            {produit.prix.toLocaleString()} CDF ×{" "}
                            {produit.quantite}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                modifierQuantite(
                                  produit.id,
                                  produit.quantite - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {produit.quantite}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                modifierQuantite(
                                  produit.id,
                                  produit.quantite + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {produit.total.toLocaleString()} CDF
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        {totalVente.toLocaleString()} CDF
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Finaliser la Vente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Après validation :</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <Receipt className="mr-2 h-4 w-4" />
                      Reçu généré pour le client
                    </li>
                    <li className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Facture générée pour la comptabilité
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={traiterVente}
                  disabled={
                    isProcessing ||
                    !client.nom ||
                    !client.telephone ||
                    panier.length === 0
                  }
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isProcessing ? "Traitement en cours..." : "Valider la Vente"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CaissierLayout>
  );
}
