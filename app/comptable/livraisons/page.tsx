"use client"

import { useState } from "react"
import { ComptableLayout } from "@/components/ComptableLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Truck, Search, Eye, CheckCircle, Clock, Package, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const livraisons = [
  {
    id: "LIV-001",
    numeroCommande: "VTE-001",
    numeroRecu: "RCU-001",
    client: "Jean Kouassi",
    telephone: "+243 01 02 03 04",
    adresse: "Cocody, Abidjan",
    produits: [{ nom: "Ciment 32.5", quantite: 10, prixUnitaire: 6500, total: 65000 }],
    total: 65000,
    dateCommande: "2024-01-15",
    dateLivraison: "2024-01-16",
    heureLivraison: "08:30",
    statut: "Livré",
    livreur: "Amadou Diallo",
    notes: "Livraison effectuée avec succès",
  },
  {
    id: "LIV-002",
    numeroCommande: "VTE-002",
    numeroRecu: "RCU-002",
    client: "Marie Diallo",
    telephone: "+243 05 06 07 08",
    adresse: "Plateau, Abidjan",
    produits: [{ nom: "Ciment 42.5", quantite: 5, prixUnitaire: 7200, total: 36000 }],
    total: 36000,
    dateCommande: "2024-01-15",
    dateLivraison: null,
    heureLivraison: null,
    statut: "En cours",
    livreur: "Kouadio Yao",
    notes: "Livraison programmée pour demain matin",
  },
  {
    id: "LIV-003",
    numeroCommande: "VTE-003",
    numeroRecu: "RCU-003",
    client: "Paul Mensah",
    telephone: "+243 07 08 09 10",
    adresse: "Marcory, Abidjan",
    produits: [{ nom: "Ciment 32.5", quantite: 20, prixUnitaire: 6500, total: 130000 }],
    total: 130000,
    dateCommande: "2024-01-15",
    dateLivraison: null,
    heureLivraison: null,
    statut: "Programmé",
    livreur: "Sekou Traore",
    notes: "Client demande livraison après 14h",
  },
  {
    id: "LIV-004",
    numeroCommande: "VTE-004",
    numeroRecu: "RCU-004",
    client: "Aminata Traoré",
    telephone: "+243 09 10 11 12",
    adresse: "Yopougon, Abidjan",
    produits: [{ nom: "Ciment 42.5", quantite: 25, prixUnitaire: 7200, total: 180000 }],
    total: 180000,
    dateCommande: "2024-01-14",
    dateLivraison: "2024-01-15",
    heureLivraison: "10:15",
    statut: "Livré",
    livreur: "Ibrahim Kone",
    notes: "Livraison urgente - Client satisfait",
  },
]

export default function LivraisonsPage() {
  const [recherche, setRecherche] = useState("")
  const [filtreStatut, setFiltreStatut] = useState("tous")
  const [livraisonSelectionnee, setLivraisonSelectionnee] = useState<(typeof livraisons)[0] | null>(null)
  const [dialogOuvert, setDialogOuvert] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const livraisonsFiltrees = livraisons.filter((livraison) => {
    const matchRecherche =
      livraison.client.toLowerCase().includes(recherche.toLowerCase()) ||
      livraison.numeroCommande.toLowerCase().includes(recherche.toLowerCase()) ||
      livraison.numeroRecu.toLowerCase().includes(recherche.toLowerCase()) ||
      livraison.telephone.includes(recherche)

    const matchStatut = filtreStatut === "tous" || livraison.statut.toLowerCase() === filtreStatut

    return matchRecherche && matchStatut
  })

  const voirDetails = (livraison: (typeof livraisons)[0]) => {
    setLivraisonSelectionnee(livraison)
    setDialogOuvert(true)
  }

  const marquerLivree = async (livraison: (typeof livraisons)[0]) => {
    setIsUpdating(true)

    // Simulation de mise à jour
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Livraison confirmée",
      description: `Livraison ${livraison.id} marquée comme livrée`,
    })

    setIsUpdating(false)
    setDialogOuvert(false)
  }

  const statistiques = {
    total: livraisonsFiltrees.length,
    livrees: livraisonsFiltrees.filter((l) => l.statut === "Livré").length,
    enCours: livraisonsFiltrees.filter((l) => l.statut === "En cours").length,
    programmees: livraisonsFiltrees.filter((l) => l.statut === "Programmé").length,
  }

  return (
    <ComptableLayout breadcrumbs={[{ label: "Livraisons" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Livraisons</h1>
            <p className="text-muted-foreground">Suivez et gérez toutes les livraisons</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {statistiques.total} livraison{statistiques.total > 1 ? "s" : ""}
            </Badge>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Livraisons</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistiques.total}</div>
              <p className="text-xs text-muted-foreground">Toutes les livraisons</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livrées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statistiques.livrees}</div>
              <p className="text-xs text-muted-foreground">Livraisons terminées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Cours</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statistiques.enCours}</div>
              <p className="text-xs text-muted-foreground">En cours de livraison</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Programmées</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{statistiques.programmees}</div>
              <p className="text-xs text-muted-foreground">À programmer</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Recherche et Filtres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recherche</label>
                <Input
                  placeholder="Client, N° commande, N° reçu, téléphone..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Statut</label>
                <Select value={filtreStatut} onValueChange={setFiltreStatut}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
                    <SelectItem value="programmé">Programmé</SelectItem>
                    <SelectItem value="en cours">En cours</SelectItem>
                    <SelectItem value="livré">Livré</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des livraisons */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Livraisons</CardTitle>
            <CardDescription>
              {livraisonsFiltrees.length} livraison{livraisonsFiltrees.length > 1 ? "s" : ""} trouvée
              {livraisonsFiltrees.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {livraisonsFiltrees.length === 0 ? (
              <div className="text-center py-8">
                <Truck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune livraison trouvée</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Livraison</TableHead>
                    <TableHead>N° Commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Produits</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Livreur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {livraisonsFiltrees.map((livraison) => (
                    <TableRow key={livraison.id}>
                      <TableCell className="font-medium">{livraison.id}</TableCell>
                      <TableCell>{livraison.numeroCommande}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{livraison.client}</div>
                          <div className="text-muted-foreground">{livraison.telephone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {livraison.adresse}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {livraison.produits.map((p, i) => (
                            <div key={i}>
                              {p.nom} ({p.quantite})
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{livraison.total.toLocaleString()} CDF</TableCell>
                      <TableCell className="text-sm">{livraison.livreur}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            livraison.statut === "Livré"
                              ? "default"
                              : livraison.statut === "En cours"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            livraison.statut === "Livré"
                              ? "bg-green-500"
                              : livraison.statut === "En cours"
                                ? "bg-blue-500"
                                : "bg-orange-500"
                          }
                        >
                          {livraison.statut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => voirDetails(livraison)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {livraison.statut !== "Livré" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => voirDetails(livraison)}
                            >
                              Confirmer
                            </Button>
                          )}
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
              <DialogTitle>Détails de la Livraison</DialogTitle>
            </DialogHeader>
            {livraisonSelectionnee && (
              <div className="space-y-6">
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Informations de Livraison</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID Livraison:</span>
                        <span className="font-medium">{livraisonSelectionnee.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">N° Commande:</span>
                        <span>{livraisonSelectionnee.numeroCommande}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">N° Reçu:</span>
                        <span>{livraisonSelectionnee.numeroRecu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Livreur:</span>
                        <span>{livraisonSelectionnee.livreur}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Informations Client</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nom:</span>
                        <span className="font-medium">{livraisonSelectionnee.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Téléphone:</span>
                        <span>{livraisonSelectionnee.telephone}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Adresse:</span>
                        <p className="mt-1">{livraisonSelectionnee.adresse}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Dates</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date commande:</span>
                        <span>{new Date(livraisonSelectionnee.dateCommande).toLocaleDateString("fr-FR")}</span>
                      </div>
                      {livraisonSelectionnee.dateLivraison && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date livraison:</span>
                            <span>{new Date(livraisonSelectionnee.dateLivraison).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Heure livraison:</span>
                            <span>{livraisonSelectionnee.heureLivraison}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Statut</h3>
                    <Badge
                      variant={
                        livraisonSelectionnee.statut === "Livré"
                          ? "default"
                          : livraisonSelectionnee.statut === "En cours"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        livraisonSelectionnee.statut === "Livré"
                          ? "bg-green-500"
                          : livraisonSelectionnee.statut === "En cours"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }
                    >
                      {livraisonSelectionnee.statut}
                    </Badge>
                  </div>
                </div>

                {/* Produits */}
                <div>
                  <h3 className="font-semibold mb-3">Produits à Livrer</h3>
                  <div className="space-y-2">
                    {livraisonSelectionnee.produits.map((produit, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{produit.nom}</p>
                          <p className="text-sm text-muted-foreground">
                            {produit.prixUnitaire.toLocaleString()} CDF × {produit.quantite}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{produit.total.toLocaleString()} CDF</p>
                          <p className="text-sm text-muted-foreground">{produit.quantite} sacs</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {livraisonSelectionnee.total.toLocaleString()} CDF
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {livraisonSelectionnee.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm bg-yellow-50 p-3 rounded-lg">{livraisonSelectionnee.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setDialogOuvert(false)} className="flex-1">
                    Fermer
                  </Button>
                  {livraisonSelectionnee.statut !== "Livré" && (
                    <Button
                      onClick={() => marquerLivree(livraisonSelectionnee)}
                      disabled={isUpdating}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {isUpdating ? "Confirmation..." : "Marquer comme Livrée"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ComptableLayout>
  )
}
