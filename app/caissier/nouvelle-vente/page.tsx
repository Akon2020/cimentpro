"use client"

import { useState } from "react"
import { CaissierLayout } from "@/components/CaissierLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Minus, ShoppingCart, Receipt, FileText, Settings, CreditCard, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateBonCommande, generateFacture, formatCommandeForPDF } from "@/utils/pdfGenerator"

const produits = [
  { id: "ciment-32.5", nom: "Ciment 32.5", prix: 6500, unite: "sac de 50kg", stock: 1250 },
  { id: "ciment-42.5", nom: "Ciment 42.5", prix: 7200, unite: "sac de 50kg", stock: 850 },
  { id: "mortier", nom: "Mortier Prêt", prix: 4800, unite: "sac de 25kg", stock: 500 },
]

const moyensPaiement = [
  { id: "especes", nom: "Espèces", icon: "💵" },
  { id: "carte", nom: "Carte Bancaire", icon: "💳" },
  { id: "mobile", nom: "Mobile Money", icon: "📱" },
  { id: "virement", nom: "Virement", icon: "🏦" },
  { id: "cheque", nom: "Chèque", icon: "📝" },
]

const devises = [
  { id: "cdf", nom: "CDF", symbole: "CDF", taux: 1, defaut: true },
  { id: "usd", nom: "Dollar US", symbole: "$", taux: 0.0016 },
  { id: "eur", nom: "Euro", symbole: "€", taux: 0.0015 },
  { id: "gbp", nom: "Livre Sterling", symbole: "£", taux: 0.0013 },
  { id: "cad", nom: "Dollar Canadien", symbole: "CAD", taux: 0.0022 },
]

interface ProduitVente {
  id: string
  cleUnique: string // Combinaison produit + moyen de paiement + devise
  nom: string
  prixOriginal: number
  prixPersonnalise: number
  quantite: number
  total: number
  moyenPaiement: string
  moyenPaiementNom: string
  devise: string
  deviseNom: string
  deviseSymbole: string
  tauxChange: number
  totalCDF: number // Total converti en CDF pour les calculs
}

export default function NouvelleVentePage() {
  const [client, setClient] = useState({
    nom: "",
    telephone: "",
    adresse: "",
  })
  const [produitSelectionne, setProduitSelectionne] = useState("")
  const [quantite, setQuantite] = useState(1)
  const [moyenPaiementSelectionne, setMoyenPaiementSelectionne] = useState("especes")
  const [deviseSelectionnee, setDeviseSelectionnee] = useState("cdf")
  const [panier, setPanier] = useState<ProduitVente[]>([])
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [produitEnEdition, setProduitEnEdition] = useState<ProduitVente | null>(null)
  const [dialogOuvert, setDialogOuvert] = useState(false)
  const { toast } = useToast()

  const convertirPrix = (prix: number, tauxSource: number, tauxCible: number) => {
    // Convertir d'abord en CDF puis vers la devise cible
    const prixCDF = prix / tauxSource
    return prixCDF * tauxCible
  }

  const ajouterAuPanier = () => {
    const produit = produits.find((p) => p.id === produitSelectionne)
    const moyenPaiement = moyensPaiement.find((m) => m.id === moyenPaiementSelectionne)
    const devise = devises.find((d) => d.id === deviseSelectionnee)

    if (!produit || !moyenPaiement || !devise) return

    // Créer une clé unique basée sur le produit, moyen de paiement ET devise
    const cleUnique = `${produit.id}-${moyenPaiementSelectionne}-${deviseSelectionnee}`

    const produitExistant = panier.find((p) => p.cleUnique === cleUnique)

    // Convertir le prix vers la devise sélectionnée
    const prixConverti = convertirPrix(produit.prix, 1, devise.taux) // Prix de base en CDF

    if (produitExistant) {
      // Si le produit avec ce moyen de paiement et cette devise existe déjà, augmenter la quantité
      const nouvelleQuantite = produitExistant.quantite + quantite
      const nouveauTotal = nouvelleQuantite * produitExistant.prixPersonnalise
      const nouveauTotalCDF = nouveauTotal / devise.taux

      setPanier(
        panier.map((p) =>
          p.cleUnique === cleUnique
            ? {
                ...p,
                quantite: nouvelleQuantite,
                total: nouveauTotal,
                totalCDF: nouveauTotalCDF,
              }
            : p,
        ),
      )
      toast({
        title: "Quantité mise à jour",
        description: `${produit.nom} (${moyenPaiement.nom}, ${devise.nom}) - Quantité: ${nouvelleQuantite}`,
      })
    } else {
      // Sinon, ajouter un nouveau produit
      const total = prixConverti * quantite
      const totalCDF = total / devise.taux

      const nouveauProduit: ProduitVente = {
        id: produit.id,
        cleUnique: cleUnique,
        nom: produit.nom,
        prixOriginal: prixConverti,
        prixPersonnalise: prixConverti,
        quantite: quantite,
        total: total,
        moyenPaiement: moyenPaiementSelectionne,
        moyenPaiementNom: moyenPaiement.nom,
        devise: deviseSelectionnee,
        deviseNom: devise.nom,
        deviseSymbole: devise.symbole,
        tauxChange: devise.taux,
        totalCDF: totalCDF,
      }
      setPanier([...panier, nouveauProduit])
      toast({
        title: "Produit ajouté",
        description: `${produit.nom} (${moyenPaiement.nom}, ${devise.nom}) ajouté au panier`,
      })
    }

    setProduitSelectionne("")
    setQuantite(1)
    setMoyenPaiementSelectionne("especes")
    setDeviseSelectionnee("cdf")
  }

  const retirerDuPanier = (cleUnique: string) => {
    const produit = panier.find((p) => p.cleUnique === cleUnique)
    setPanier(panier.filter((p) => p.cleUnique !== cleUnique))
    if (produit) {
      toast({
        title: "Produit retiré",
        description: `${produit.nom} (${produit.moyenPaiementNom}, ${produit.deviseNom}) retiré du panier`,
      })
    }
  }

  const modifierQuantite = (cleUnique: string, nouvelleQuantite: number) => {
    if (nouvelleQuantite <= 0) {
      retirerDuPanier(cleUnique)
      return
    }

    setPanier(
      panier.map((p) => {
        if (p.cleUnique === cleUnique) {
          const nouveauTotal = nouvelleQuantite * p.prixPersonnalise
          const nouveauTotalCDF = nouveauTotal / p.tauxChange
          return {
            ...p,
            quantite: nouvelleQuantite,
            total: nouveauTotal,
            totalCDF: nouveauTotalCDF,
          }
        }
        return p
      }),
    )
  }

  const ouvrirEditionProduit = (produit: ProduitVente) => {
    setProduitEnEdition({ ...produit })
    setDialogOuvert(true)
  }

  const sauvegarderModifications = () => {
    if (!produitEnEdition) return

    // Vérifier si le moyen de paiement ou la devise a changé
    const ancienneCle = produitEnEdition.cleUnique
    const nouvelleCle = `${produitEnEdition.id}-${produitEnEdition.moyenPaiement}-${produitEnEdition.devise}`

    if (ancienneCle !== nouvelleCle) {
      // Si le moyen de paiement ou la devise a changé, vérifier s'il n'y a pas de conflit
      const produitExistant = panier.find((p) => p.cleUnique === nouvelleCle)
      if (produitExistant) {
        toast({
          title: "Conflit détecté",
          description:
            "Ce produit avec ce moyen de paiement et cette devise existe déjà. Fusionnez les quantités ou choisissez d'autres paramètres.",
          variant: "destructive",
        })
        return
      }

      // Mettre à jour la clé unique
      produitEnEdition.cleUnique = nouvelleCle
    }

    // Recalculer les totaux
    const nouveauTotal = produitEnEdition.quantite * produitEnEdition.prixPersonnalise
    const nouveauTotalCDF = nouveauTotal / produitEnEdition.tauxChange

    setPanier(
      panier.map((p) =>
        p.cleUnique === ancienneCle
          ? {
              ...produitEnEdition,
              total: nouveauTotal,
              totalCDF: nouveauTotalCDF,
            }
          : p,
      ),
    )

    setDialogOuvert(false)
    setProduitEnEdition(null)

    toast({
      title: "Modifications sauvegardées",
      description: "Les paramètres du produit ont été mis à jour",
    })
  }

  const totalVenteCDF = panier.reduce((sum, produit) => sum + produit.totalCDF, 0)
  const nombreArticles = panier.reduce((sum, produit) => sum + produit.quantite, 0)

  // Grouper les produits par devise pour l'affichage du résumé
  const resumeParDevise = panier.reduce(
    (acc, produit) => {
      if (!acc[produit.deviseSymbole]) {
        acc[produit.deviseSymbole] = 0
      }
      acc[produit.deviseSymbole] += produit.total
      return acc
    },
    {} as Record<string, number>,
  )

  // Grouper par moyen de paiement
  const resumeParPaiement = panier.reduce(
    (acc, produit) => {
      if (!acc[produit.moyenPaiementNom]) {
        acc[produit.moyenPaiementNom] = 0
      }
      acc[produit.moyenPaiementNom] += produit.totalCDF
      return acc
    },
    {} as Record<string, number>,
  )

  const traiterVente = async () => {
    if (!client.nom || !client.telephone || panier.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les informations client et ajouter des produits",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    const numeroCommande = `VTE-${Date.now()}`

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
        prixUnitaire: p.prixPersonnalise,
        prixOriginal: p.prixOriginal,
        total: p.total,
        totalCDF: p.totalCDF,
        moyenPaiement: p.moyenPaiementNom,
        devise: p.deviseNom,
        deviseSymbole: p.deviseSymbole,
        tauxChange: p.tauxChange,
        remise:
          p.prixOriginal !== p.prixPersonnalise
            ? (((p.prixOriginal - p.prixPersonnalise) / p.prixOriginal) * 100).toFixed(1) + "%"
            : "0%",
      })),
      total: totalVenteCDF,
      statut: "payee",
      notes: notes,
      moyensPaiement: Object.keys(resumeParPaiement).join(", "),
      devises: Object.keys(resumeParDevise).join(", "),
      detailsPaiement: resumeParPaiement,
      detailsDevises: resumeParDevise,
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const formattedData = formatCommandeForPDF(venteData)
    generateBonCommande(formattedData)
    generateFacture(formattedData)

    toast({
      title: "Vente enregistrée !",
      description: `Numéro de commande: ${numeroCommande}. Reçu et facture générés.`,
    })

    setClient({ nom: "", telephone: "", adresse: "" })
    setPanier([])
    setNotes("")
    setIsProcessing(false)
  }

  return (
    <CaissierLayout breadcrumbs={[{ label: "Nouvelle Vente" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nouvelle Vente</h1>
          <p className="text-muted-foreground">
            Enregistrer une nouvelle transaction avec prix, paiements et devises personnalisés
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
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
                    onChange={(e) => setClient({ ...client, nom: e.target.value })}
                    placeholder="Nom complet du client"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    value={client.telephone}
                    onChange={(e) => setClient({ ...client, telephone: e.target.value })}
                    placeholder="+243 XX XX XX XX"
                  />
                </div>
                <div>
                  <Label htmlFor="adresse">Adresse</Label>
                  <Textarea
                    id="adresse"
                    value={client.adresse}
                    onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                    placeholder="Adresse du client"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ajouter un Produit</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez ajouter le même produit plusieurs fois avec des moyens de paiement et devises différents
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="produit">Produit</Label>
                  <Select value={produitSelectionne} onValueChange={setProduitSelectionne}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      {produits.map((produit) => (
                        <SelectItem key={produit.id} value={produit.id}>
                          {produit.nom} - {produit.prix.toLocaleString()} CDF ({produit.stock} en stock)
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
                      onChange={(e) => setQuantite(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                      min="1"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => setQuantite(quantite + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="moyen-paiement-ajout">Moyen de paiement</Label>
                    <Select value={moyenPaiementSelectionne} onValueChange={setMoyenPaiementSelectionne}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {moyensPaiement.map((moyen) => (
                          <SelectItem key={moyen.id} value={moyen.id}>
                            <span className="flex items-center">
                              <span className="mr-2">{moyen.icon}</span>
                              {moyen.nom}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="devise-ajout">Devise</Label>
                    <Select value={deviseSelectionnee} onValueChange={setDeviseSelectionnee}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {devises.map((devise) => (
                          <SelectItem key={devise.id} value={devise.id}>
                            <span className="flex items-center">
                              <DollarSign className="mr-2 h-4 w-4" />
                              {devise.nom} ({devise.symbole})
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Aperçu du prix converti */}
                {produitSelectionne && deviseSelectionnee !== "cdf" && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Prix converti:</strong>{" "}
                      {convertirPrix(
                        produits.find((p) => p.id === produitSelectionne)?.prix || 0,
                        1,
                        devises.find((d) => d.id === deviseSelectionnee)?.taux || 1,
                      ).toFixed(2)}{" "}
                      {devises.find((d) => d.id === deviseSelectionnee)?.symbole}
                    </p>
                  </div>
                )}

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

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Panier ({panier.length} ligne{panier.length > 1 ? "s" : ""}, {nombreArticles} article
                  {nombreArticles > 1 ? "s" : ""})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {panier.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aucun produit dans le panier</p>
                ) : (
                  <div className="space-y-4">
                    {panier.map((produit) => (
                      <div key={produit.cleUnique} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{produit.nom}</h4>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>
                                Prix: {produit.prixPersonnalise.toFixed(2)} {produit.deviseSymbole}
                                {produit.prixOriginal !== produit.prixPersonnalise && (
                                  <span className="line-through ml-2 text-red-500">
                                    {produit.prixOriginal.toFixed(2)} {produit.deviseSymbole}
                                  </span>
                                )}
                              </p>
                              <p>Quantité: {produit.quantite}</p>
                              <p className="flex items-center">
                                <CreditCard className="h-3 w-3 mr-1" />
                                {produit.moyenPaiementNom}
                              </p>
                              <p className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {produit.deviseNom}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => ouvrirEditionProduit(produit)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                            <div className="text-right">
                              <p className="font-medium">
                                {produit.total.toFixed(2)} {produit.deviseSymbole}
                              </p>
                              {produit.devise !== "cdf" && (
                                <p className="text-xs text-muted-foreground">
                                  ≈ {produit.totalCDF.toLocaleString()} CDF
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => modifierQuantite(produit.cleUnique, produit.quantite - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{produit.quantite}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => modifierQuantite(produit.cleUnique, produit.quantite + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => retirerDuPanier(produit.cleUnique)}>
                            Retirer
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-3">
                      {/* Résumé par devise */}
                      {Object.keys(resumeParDevise).length > 1 && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium mb-2">Répartition par devise:</h4>
                          {Object.entries(resumeParDevise).map(([devise, montant]) => (
                            <div key={devise} className="flex justify-between text-sm">
                              <span>{devise}:</span>
                              <span>
                                {typeof montant === "number" ? montant.toFixed(2) : montant} {devise}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Résumé par moyen de paiement */}
                      {Object.keys(resumeParPaiement).length > 1 && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-medium mb-2">Répartition par paiement (CDF):</h4>
                          {Object.entries(resumeParPaiement).map(([moyen, montant]) => (
                            <div key={moyen} className="flex justify-between text-sm">
                              <span>{moyen}:</span>
                              <span>{montant.toLocaleString()} CDF</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total (CDF):</span>
                        <span className="text-green-600">{totalVenteCDF.toLocaleString()} CDF</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Moyens de paiement: {Object.keys(resumeParPaiement).join(", ")}</p>
                        <p>Devises: {Object.keys(resumeParDevise).join(", ")}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

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
                      Reçu généré avec prix et devises personnalisés
                    </li>
                    <li className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Facture avec détails des paiements et conversions
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={traiterVente}
                  disabled={isProcessing || !client.nom || !client.telephone || panier.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isProcessing ? "Traitement en cours..." : "Valider la Vente"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog d'édition de produit */}
        <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Personnaliser le Produit</DialogTitle>
            </DialogHeader>
            {produitEnEdition && (
              <div className="space-y-4">
                <div>
                  <Label>Produit</Label>
                  <p className="font-medium">{produitEnEdition.nom}</p>
                </div>

                <div>
                  <Label htmlFor="prix-personnalise">Prix unitaire</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="prix-personnalise"
                      type="number"
                      step="0.01"
                      value={produitEnEdition.prixPersonnalise}
                      onChange={(e) =>
                        setProduitEnEdition({
                          ...produitEnEdition,
                          prixPersonnalise: Number(e.target.value) || 0,
                        })
                      }
                    />
                    <span className="text-sm font-medium">{produitEnEdition.deviseSymbole}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Prix original: {produitEnEdition.prixOriginal.toFixed(2)} {produitEnEdition.deviseSymbole}
                  </p>
                </div>

                <div>
                  <Label htmlFor="quantite-edition">Quantité</Label>
                  <Input
                    id="quantite-edition"
                    type="number"
                    min="1"
                    value={produitEnEdition.quantite}
                    onChange={(e) =>
                      setProduitEnEdition({
                        ...produitEnEdition,
                        quantite: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="moyen-paiement">Moyen de paiement</Label>
                    <Select
                      value={produitEnEdition.moyenPaiement}
                      onValueChange={(value) => {
                        const moyen = moyensPaiement.find((m) => m.id === value)
                        setProduitEnEdition({
                          ...produitEnEdition,
                          moyenPaiement: value,
                          moyenPaiementNom: moyen?.nom || "",
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {moyensPaiement.map((moyen) => (
                          <SelectItem key={moyen.id} value={moyen.id}>
                            <span className="flex items-center">
                              <span className="mr-2">{moyen.icon}</span>
                              {moyen.nom}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="devise-edition">Devise</Label>
                    <Select
                      value={produitEnEdition.devise}
                      onValueChange={(value) => {
                        const devise = devises.find((d) => d.id === value)
                        if (devise) {
                          // Convertir le prix vers la nouvelle devise
                          const nouveauPrix = convertirPrix(
                            produitEnEdition.prixPersonnalise,
                            produitEnEdition.tauxChange,
                            devise.taux,
                          )
                          setProduitEnEdition({
                            ...produitEnEdition,
                            devise: value,
                            deviseNom: devise.nom,
                            deviseSymbole: devise.symbole,
                            tauxChange: devise.taux,
                            prixPersonnalise: nouveauPrix,
                            prixOriginal: convertirPrix(
                              produitEnEdition.prixOriginal,
                              produitEnEdition.tauxChange,
                              devise.taux,
                            ),
                          })
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {devises.map((devise) => (
                          <SelectItem key={devise.id} value={devise.id}>
                            <span className="flex items-center">
                              <DollarSign className="mr-2 h-4 w-4" />
                              {devise.nom} ({devise.symbole})
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total ({produitEnEdition.deviseSymbole}):</span>
                    <span className="font-medium">
                      {(produitEnEdition.quantite * produitEnEdition.prixPersonnalise).toFixed(2)}{" "}
                      {produitEnEdition.deviseSymbole}
                    </span>
                  </div>
                  {produitEnEdition.devise !== "cdf" && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Équivalent CDF:</span>
                      <span>
                        {(
                          (produitEnEdition.quantite * produitEnEdition.prixPersonnalise) /
                          produitEnEdition.tauxChange
                        ).toLocaleString()}{" "}
                        CDF
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Attention: Changer le moyen de paiement ou la devise peut créer une nouvelle ligne si ce produit
                  existe déjà avec ces paramètres
                </p>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setDialogOuvert(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button onClick={sauvegarderModifications} className="flex-1">
                    Sauvegarder
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CaissierLayout>
  )
}
