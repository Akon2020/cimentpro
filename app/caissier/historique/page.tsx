"use client"

import { useState } from "react"
import { CaissierLayout } from "@/components/CaissierLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { History, Eye, Receipt, FileText, CalendarIcon, Filter, Download } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

const historiqueVentes = [
  {
    id: "VTE-001",
    numeroRecu: "RCU-001",
    date: "2024-01-15",
    heure: "09:15",
    client: "Jean Kouassi",
    telephone: "+243 01 02 03 04",
    produits: [
      {
        nom: "Ciment 32.5",
        quantite: 10,
        prixUnitaire: 6500,
        prixOriginal: 6500,
        total: 65000,
        moyenPaiement: "Espèces",
      },
    ],
    total: 65000,
    statut: "Payé",
    moyensPaiement: "Espèces",
    caissier: "Marie Dupont",
    notes: "Client régulier",
  },
  {
    id: "VTE-002",
    numeroRecu: "RCU-002",
    date: "2024-01-15",
    heure: "10:30",
    client: "Marie Diallo",
    telephone: "+243 05 06 07 08",
    produits: [
      {
        nom: "Ciment 42.5",
        quantite: 5,
        prixUnitaire: 7000,
        prixOriginal: 7200,
        total: 35000,
        moyenPaiement: "Carte Bancaire",
      },
    ],
    total: 35000,
    statut: "Payé",
    moyensPaiement: "Carte Bancaire",
    caissier: "Marie Dupont",
    notes: "Remise fidélité appliquée",
  },
  {
    id: "VTE-003",
    numeroRecu: "RCU-003",
    date: "2024-01-15",
    heure: "11:45",
    client: "Paul Mensah",
    telephone: "+243 07 08 09 10",
    produits: [
      {
        nom: "Ciment 32.5",
        quantite: 15,
        prixUnitaire: 6500,
        prixOriginal: 6500,
        total: 97500,
        moyenPaiement: "Mobile Money",
      },
      {
        nom: "Mortier Prêt",
        quantite: 8,
        prixUnitaire: 4600,
        prixOriginal: 4800,
        total: 36800,
        moyenPaiement: "Espèces",
      },
    ],
    total: 134300,
    statut: "Payé",
    moyensPaiement: "Mobile Money, Espèces",
    caissier: "Marie Dupont",
    notes: "Paiement mixte",
  },
  {
    id: "VTE-004",
    numeroRecu: "RCU-004",
    date: "2024-01-14",
    heure: "14:20",
    client: "Aminata Traoré",
    telephone: "+243 09 10 11 12",
    produits: [
      {
        nom: "Ciment 42.5",
        quantite: 20,
        prixUnitaire: 7200,
        prixOriginal: 7200,
        total: 144000,
        moyenPaiement: "Virement",
      },
    ],
    total: 144000,
    statut: "Payé",
    moyensPaiement: "Virement",
    caissier: "Marie Dupont",
    notes: "Commande entreprise",
  },
]

export default function HistoriquePage() {
  const [recherche, setRecherche] = useState("")
  const [filtreStatut, setFiltreStatut] = useState("tous")
  const [filtrePaiement, setFiltrePaiement] = useState("tous")
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()
  const [venteSelectionnee, setVenteSelectionnee] = useState<(typeof historiqueVentes)[0] | null>(null)
  const [dialogOuvert, setDialogOuvert] = useState(false)
  const { toast } = useToast()

  const ventesFiltrees = historiqueVentes.filter((vente) => {
    const matchRecherche =
      vente.client.toLowerCase().includes(recherche.toLowerCase()) ||
      vente.numeroRecu.toLowerCase().includes(recherche.toLowerCase()) ||
      vente.telephone.includes(recherche)

    const matchStatut = filtreStatut === "tous" || vente.statut.toLowerCase() === filtreStatut

    const matchPaiement =
      filtrePaiement === "tous" || vente.moyensPaiement.toLowerCase().includes(filtrePaiement.toLowerCase())

    const dateVente = new Date(vente.date)
    const matchDate = (!dateDebut || dateVente >= dateDebut) && (!dateFin || dateVente <= dateFin)

    return matchRecherche && matchStatut && matchPaiement && matchDate
  })

  const voirDetails = (vente: (typeof historiqueVentes)[0]) => {
    setVenteSelectionnee(vente)
    setDialogOuvert(true)
  }

  const reimprimer = (vente: (typeof historiqueVentes)[0], type: "recu" | "facture") => {
    toast({
      title: `${type === "recu" ? "Reçu" : "Facture"} réimprimé`,
      description: `${type === "recu" ? "Reçu" : "Facture"} ${vente.numeroRecu} généré avec succès`,
    })
  }

  const exporterDonnees = () => {
    toast({
      title: "Export en cours",
      description: "Les données sont en cours d'exportation...",
    })
  }

  const totalVentes = ventesFiltrees.reduce((sum, vente) => sum + vente.total, 0)
  const nombreVentes = ventesFiltrees.length

  return (
    <CaissierLayout breadcrumbs={[{ label: "Historique des Ventes" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Historique des Ventes</h1>
            <p className="text-muted-foreground">Consultez toutes vos transactions passées</p>
          </div>
          <Button onClick={exporterDonnees} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes Filtrées</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nombreVentes}</div>
              <p className="text-xs text-muted-foreground">Transactions trouvées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVentes.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Total des ventes filtrées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nombreVentes > 0 ? Math.round(totalVentes / nombreVentes).toLocaleString() : 0} CDF
              </div>
              <p className="text-xs text-muted-foreground">Moyenne par transaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtres et Recherche
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recherche</label>
                <Input
                  placeholder="Client, N° reçu, téléphone..."
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
                    <SelectItem value="payé">Payé</SelectItem>
                    <SelectItem value="annulé">Annulé</SelectItem>
                    <SelectItem value="remboursé">Remboursé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Moyen de Paiement</label>
                <Select value={filtrePaiement} onValueChange={setFiltrePaiement}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les moyens</SelectItem>
                    <SelectItem value="espèces">Espèces</SelectItem>
                    <SelectItem value="carte">Carte Bancaire</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="virement">Virement</SelectItem>
                    <SelectItem value="chèque">Chèque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Période</label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateDebut} onSelect={setDateDebut} locale={fr} />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFin} onSelect={setDateFin} locale={fr} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {(dateDebut || dateFin) && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Période:</span>
                {dateDebut && <span>Du {format(dateDebut, "dd/MM/yyyy", { locale: fr })}</span>}
                {dateDebut && dateFin && <span>au</span>}
                {dateFin && <span>{format(dateFin, "dd/MM/yyyy", { locale: fr })}</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateDebut(undefined)
                    setDateFin(undefined)
                  }}
                >
                  Effacer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Liste des ventes */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Transactions</CardTitle>
            <CardDescription>
              {ventesFiltrees.length} transaction{ventesFiltrees.length > 1 ? "s" : ""} trouvée
              {ventesFiltrees.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ventesFiltrees.length === 0 ? (
              <div className="text-center py-8">
                <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune transaction trouvée</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Reçu</TableHead>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Produits</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ventesFiltrees.map((vente) => (
                    <TableRow key={vente.id}>
                      <TableCell className="font-medium">{vente.numeroRecu}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(vente.date).toLocaleDateString("fr-FR")}</div>
                          <div className="text-muted-foreground">{vente.heure}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{vente.client}</div>
                          <div className="text-muted-foreground">{vente.telephone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {vente.produits.map((p, i) => (
                            <div key={i}>
                              {p.nom} ({p.quantite})
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{vente.total.toLocaleString()} CDF</TableCell>
                      <TableCell>
                        <div className="text-sm">{vente.moyensPaiement}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{vente.statut}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => voirDetails(vente)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => reimprimer(vente, "recu")}>
                            <Receipt className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => reimprimer(vente, "facture")}>
                            <FileText className="h-4 w-4" />
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
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Détails de la Vente</DialogTitle>
            </DialogHeader>
            {venteSelectionnee && (
              <div className="space-y-6">
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Informations de Vente</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">N° Reçu:</span>
                        <span className="font-medium">{venteSelectionnee.numeroRecu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(venteSelectionnee.date).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Heure:</span>
                        <span>{venteSelectionnee.heure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Caissier:</span>
                        <span>{venteSelectionnee.caissier}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Informations Client</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nom:</span>
                        <span className="font-medium">{venteSelectionnee.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Téléphone:</span>
                        <span>{venteSelectionnee.telephone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Moyens de paiement:</span>
                        <span>{venteSelectionnee.moyensPaiement}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Produits détaillés */}
                <div>
                  <h3 className="font-semibold mb-3">Détail des Produits</h3>
                  <div className="space-y-3">
                    {venteSelectionnee.produits.map((produit, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{produit.nom}</p>
                            <p className="text-sm text-muted-foreground">Quantité: {produit.quantite} sacs</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{produit.total.toLocaleString()} CDF</p>
                            <p className="text-sm text-muted-foreground">{produit.moyenPaiement}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Prix unitaire: </span>
                            <span className="font-medium">{produit.prixUnitaire.toLocaleString()} CDF</span>
                            {produit.prixOriginal !== produit.prixUnitaire && (
                              <span className="ml-2 line-through text-red-500">
                                {produit.prixOriginal.toLocaleString()} CDF
                              </span>
                            )}
                          </div>
                          <div>
                            {produit.prixOriginal !== produit.prixUnitaire && (
                              <div>
                                <span className="text-muted-foreground">Remise: </span>
                                <span className="text-green-600 font-medium">
                                  {(
                                    ((produit.prixOriginal - produit.prixUnitaire) / produit.prixOriginal) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-lg">Total de la vente:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {venteSelectionnee.total.toLocaleString()} CDF
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {venteSelectionnee.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm bg-yellow-50 p-3 rounded-lg">{venteSelectionnee.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setDialogOuvert(false)} className="flex-1">
                    Fermer
                  </Button>
                  <Button onClick={() => reimprimer(venteSelectionnee, "recu")} variant="outline" className="flex-1">
                    <Receipt className="mr-2 h-4 w-4" />
                    Réimprimer Reçu
                  </Button>
                  <Button onClick={() => reimprimer(venteSelectionnee, "facture")} className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Réimprimer Facture
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
