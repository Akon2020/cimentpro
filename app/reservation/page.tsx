"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const produits = [
  { id: "ciment-32.5", nom: "Ciment 32.5", prix: 6500, unite: "sac de 50kg" },
  { id: "ciment-42.5", nom: "Ciment 42.5", prix: 7200, unite: "sac de 50kg" },
];

export default function ReservationPage() {
  const { user, logout } = useAuth();
  const [produitSelectionne, setProduitSelectionne] = useState("");
  const [quantite, setQuantite] = useState(1);
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nom: user?.name || "",
    email: "",
    telephone: "",
    adresse: "",
    notes: "",
  });
  const [showModal, setShowModal] = useState(false);

  const produit = produits.find((p) => p.id === produitSelectionne);
  const total = produit ? produit.prix * quantite : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmerReservation = () => {
    // Simulation de l'enregistrement
    // alert("Réservation confirmée ! Vous recevrez un message de confirmation.");
    toast({
        title: "Réservation confirmée",
        description: "Vous recevrez un message de confirmation",
      })
    setShowModal(false);
    // Reset form
    setProduitSelectionne("");
    setQuantite(1);
    setFormData({
      nom: user?.name || "",
      email: "",
      telephone: "",
      adresse: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-[#155E75]">CimentPro</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Bonjour, {user.name}
                  </span>
                  <Link href="/commandes">
                    <Button
                      variant="ghost"
                      className="text-[#155E75] hover:text-[#164E63]"
                    >
                      Mes Commandes
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nouvelle Réservation
          </h1>
          <p className="text-gray-600">
            Réservez votre ciment en quelques étapes simples
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de réservation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-[#155E75]" />
                Détails de la réservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sélection du produit */}
                <div>
                  <Label htmlFor="produit">Type de ciment</Label>
                  <Select
                    value={produitSelectionne}
                    onValueChange={setProduitSelectionne}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un type de ciment" />
                    </SelectTrigger>
                    <SelectContent>
                      {produits.map((produit) => (
                        <SelectItem key={produit.id} value={produit.id}>
                          {produit.nom} - {produit.prix.toLocaleString()} CDF/
                          {produit.unite}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantité */}
                <div>
                  <Label htmlFor="quantite">Quantité</Label>
                  <div className="flex items-center space-x-3 mt-2">
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
                      className="w-24 text-center"
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
                    <span className="text-sm text-gray-500">
                      {produit?.unite}
                    </span>
                  </div>
                </div>

                {/* Informations client */}
                <div>
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="tel"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@exemple.com"
                  />
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) =>
                      setFormData({ ...formData, telephone: e.target.value })
                    }
                    placeholder="+243 XXX XXX XXX"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adresse">Adresse de livraison</Label>
                  <Textarea
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) =>
                      setFormData({ ...formData, adresse: e.target.value })
                    }
                    placeholder="Adresse complète de livraison"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Instructions spéciales, horaires de livraison..."
                  />
                </div>

                <Dialog open={showModal} onOpenChange={setShowModal}>
                  <DialogTrigger asChild>
                    <Button
                      type="submit"
                      className="w-full bg-[#155E75] hover:bg-[#164E63]"
                      disabled={
                        !produitSelectionne ||
                        !formData.nom ||
                        !formData.email ||
                        !formData.telephone ||
                        !formData.adresse
                      }
                    >
                      Confirmer la réservation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmer votre réservation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Résumé de la commande
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Produit:</span>
                            <span>{produit?.nom}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quantité:</span>
                            <span>
                              {quantite} {produit?.unite}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Prix unitaire:</span>
                            <span>{produit?.prix.toLocaleString()} CDF</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total:</span>
                            <span>{total.toLocaleString()} CDF</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Informations de livraison
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p>
                            <strong>Nom:</strong> {formData.nom}
                          </p>
                          {formData.email && (
                            <p>
                              <strong>Email:</strong> {formData.email}
                            </p>
                          )}
                          <p>
                            <strong>Téléphone:</strong> {formData.telephone}
                          </p>
                          <p>
                            <strong>Adresse:</strong> {formData.adresse}
                          </p>
                          {formData.notes && (
                            <p>
                              <strong>Notes:</strong> {formData.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowModal(false)}
                          className="flex-1"
                        >
                          Modifier
                        </Button>
                        <Button
                          onClick={confirmerReservation}
                          className="flex-1 bg-[#155E75] hover:bg-[#164E63]"
                        >
                          Confirmer
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </form>
            </CardContent>
          </Card>

          {/* Récapitulatif */}
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent>
              {produitSelectionne ? (
                <div className="space-y-4">
                  <div className="bg-[#155E75] text-white p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">{produit?.nom}</h3>
                    <p className="text-gray-200">{produit?.unite}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Prix unitaire:</span>
                      <span className="font-semibold">
                        {produit?.prix.toLocaleString()} CDF
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantité:</span>
                      <span className="font-semibold">{quantite}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-[#155E75]">
                          {total.toLocaleString()} CDF
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <p className="text-blue-800">
                      <strong>Note:</strong> Un acompte de 30% sera demandé à la
                      confirmation. Livraison sous 24-48h selon disponibilité.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Sélectionnez un produit pour voir le récapitulatif
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
