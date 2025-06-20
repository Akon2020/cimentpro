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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckCircle, Search, Eye, CalendarIcon, Filter, Download, FileText } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

const commandesValidees = [
  {
    id: "VTE-001",
    numeroRecu: "RCU-001",
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
    dateCommande: "2024-01-15",
    heureCommande: "09:15",
    dateValidation: "2024-01-15",
    heureValidation: "09:20",
    caissier: "Marie Dupont",
    comptable: "Paul Martin",
    statut: "Validé",
    moyensPaiement: "Espèces",
    notes: "Client régulier",
  },
  {
    id: "VTE-002",
    numeroRecu: "RCU-002",
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
    dateCommande: "2024-01-15",
    heureCommande: "10:30",
    dateValidation: "2024-01-15",
    heureValidation: "10:35",
    caissier: "Marie Dupont",
    comptable: "Paul Martin",
    statut: "Validé",
    moyensPaiement: "Carte Bancaire",
    notes: "Remise fidélité appliquée",
  },
  {
    id: "VTE-003",
    numeroRecu: "RCU-003",
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
    dateCommande: "2024-01-15",
    heureCommande: "11:45",
    dateValidation: "2024-01-15",
    heureValidation: "11:50",
    caissier: "Marie Dupont",
    comptable: "Paul Martin",
    statut: "Validé",
    moyensPaiement: "Mobile Money, Espèces",
    notes: "Paiement mixte",
  },
  {
    id: "VTE-004",
    numeroRecu: "RCU-004",
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
    dateCommande: "2024-01-14",
    heureCommande: "14:20",
    dateValidation: "2024-01-14",
    heureValidation: "14:25",
    caissier: "Marie Dupont",
    comptable: "Paul Martin",
    statut: "Validé",
    moyensPaiement: "Virement",
    notes: "Commande entreprise",
  },
]

export default function CommandesValideesPage() {
  const [recherche, setRecherche] = useState("")
  const [filtrePaiement, setFiltrePaiement] = useState("tous")
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()
  const [commandeSelectionnee, setCommandeSelectionnee] = useState<(typeof commandesValidees)[0] | null>(null)
  const [dialogOuvert, setDialogOuvert] = useState(false)
  const { toast } = useToast()

  const commandesFiltrees = commandesValidees.filter((commande) => {
    const matchRecherche =
      commande.client.toLowerCase().includes(recherche.toLowerCase()) ||
      commande.numeroRecu.toLowerCase().includes(recherche.toLowerCase()) ||
      commande.telephone.includes(recherche)

    const matchPaiement =
      filtrePaiement === "tous" || commande.moyensPaiement.toLowerCase().includes(filtrePaiement.toLowerCase())

    const dateCommande = new Date(commande.dateCommande)
    const matchDate = (!dateDebut || dateCommande >= dateDebut) && (!dateFin || dateCommande <= dateFin)

    return matchRecherche && matchPaiement && matchDate
  })

  const voirDetails = (commande: (typeof commandesValidees)[0]) => {
    setCommandeSelectionnee(commande)
    setDialogOuvert(true)
  }

  const exporterDonnees = () => {
    toast({
      title: "Export en cours",
      description: "Les données sont en cours d'exportation...",
    })
  }

  const genererRapport = () => {
    toast({
      title: "Rapport généré",
      description: "Le rapport des commandes validées a été généré",
    })
  }

  const totalCommandes = commandesFiltrees.length
  const totalMontant = commandesFiltrees.reduce((sum, commande) => sum + commande.total, 0)
  const panierMoyen = totalCommandes > 0 ? Math.round(totalMontant / totalCommandes) : 0

  return (
    <ComptableLayout breadcrumbs={[{ label: "Commandes Validées" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Commandes Validées</h1>
            <p className="text-muted-foreground">Historique des commandes traitées et validées</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={exporterDonnees} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button onClick={genererRapport}>
              <FileText className="mr-2 h-4 w-4" />
              Rapport
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Validées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCommandes}</div>
              <p className="text-xs text-muted-foreground">Commandes traitées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMontant.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Total des ventes validées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{panierMoyen.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Moyenne par commande</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Recherche</label>
                <Input
                  placeholder="Client, N° reçu, téléphone..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
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

        {/* Liste des commandes */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Commandes Validées</CardTitle>
            <CardDescription>
              {commandesFiltrees.length} commande{commandesFiltrees.length > 1 ? "s" : ""} trouvée
              {commandesFiltrees.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {commandesFiltrees.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune commande validée trouvée</p>
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
                    <TableHead>Caissier</TableHead>
                    <TableHead>Validation</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commandesFiltrees.map((commande) => (
                    <TableRow key={commande.id}>
                      <TableCell className="font-medium">{commande.numeroRecu}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(commande.dateCommande).toLocaleDateString("fr-FR")}</div>
                          <div className="text-muted-foreground">{commande.heureCommande}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{commande.client}</div>
                          <div className="text-muted-foreground">{commande.telephone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {commande.produits.map((p, i) => (
                            <div key={i}>
                              {p.nom} ({p.quantite})
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{commande.total.toLocaleString()} CDF</TableCell>
                      <TableCell>
                        <div className="text-sm">{commande.moyensPaiement}</div>
                      </TableCell>
                      <TableCell className="text-sm">{commande.caissier}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(commande.dateValidation).toLocaleDateString("fr-FR")}</div>
                          <div className="text-muted-foreground">{commande.heureValidation}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => voirDetails(commande)}>
                          <Eye className="h-4 w-4" />
                        </Button>
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
              <DialogTitle>Détails de la Commande Validée</DialogTitle>
            </DialogHeader>
            {commandeSelectionnee && (
              <div className="space-y-6">
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Informations de Commande</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">N° Reçu:</span>
                        <span className="font-medium">{commandeSelectionnee.numeroRecu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date commande:</span>
                        <span>{new Date(commandeSelectionnee.dateCommande).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Heure commande:</span>
                        <span>{commandeSelectionnee.heureCommande}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Caissier:</span>
                        <span>{commandeSelectionnee.caissier}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Informations de Validation</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date validation:</span>
                        <span>{new Date(commandeSelectionnee.dateValidation).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Heure validation:</span>
                        <span>{commandeSelectionnee.heureValidation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Comptable:</span>
                        <span>{commandeSelectionnee.comptable}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Statut:</span>
                        <Badge className="bg-green-500">{commandeSelectionnee.statut}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations client */}
                <div>
                  <h3 className="font-semibold mb-3">Informations Client</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nom:</span>
                      <span className="font-medium">{commandeSelectionnee.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Téléphone:</span>
                      <span>{commandeSelectionnee.telephone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Moyens de paiement:</span>
                      <span>{commandeSelectionnee.moyensPaiement}</span>
                    </div>
                  </div>
                </div>

                {/* Produits détaillés */}
                <div>
                  <h3 className="font-semibold mb-3">Détail des Produits</h3>
                  <div className="space-y-3">
                    {commandeSelectionnee.produits.map((produit, index) => (
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
                    <span className="font-semibold text-lg">Total de la commande:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {commandeSelectionnee.total.toLocaleString()} CDF
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {commandeSelectionnee.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm bg-yellow-50 p-3 rounded-lg">{commandeSelectionnee.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setDialogOuvert(false)} className="flex-1">
                    Fermer
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Reçu réimprimé",
                        description: `Reçu ${commandeSelectionnee.numeroRecu} généré avec succès`,
                      })
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Réimprimer Reçu
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ComptableLayout>
  )
}
