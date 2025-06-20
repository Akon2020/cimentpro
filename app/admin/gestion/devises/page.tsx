"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Eye, DollarSign, TrendingUp, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { createDevise, updateDevise, deleteDevise, getSingleDevise, getAllDevises } from "@/actions/devises"

const devises = [
  {
    id: "DEV-001",
    code: "CDF",
    nom: "Franc Congolais",
    symbole: "FC",
    tauxChange: 1.0,
    statut: "Actif",
    dateCreation: "2023-01-15",
    pays: "République Démocratique du Congo.",
    estPrincipale: true,
    description: "Devise principale utilisée en RDC",
  },
  {
    id: "DEV-002",
    code: "USD",
    nom: "Dollar Américain",
    symbole: "$",
    tauxChange: 0.0017,
    statut: "Actif",
    dateCreation: "2023-01-15",
    pays: "États-Unis",
    estPrincipale: false,
    description: "Devise internationale de référence",
  },
  {
    id: "DEV-003",
    code: "EUR",
    nom: "Euro",
    symbole: "€",
    tauxChange: 0.0015,
    statut: "Actif",
    dateCreation: "2023-01-15",
    pays: "Zone Euro",
    estPrincipale: false,
    description: "Devise européenne commune",
  },
  {
    id: "DEV-005",
    code: "GBP",
    nom: "Livre Sterling",
    symbole: "£",
    tauxChange: 0.0013,
    statut: "Inactif",
    dateCreation: "2023-03-10",
    pays: "Royaume-Uni",
    estPrincipale: false,
    description: "Devise du Royaume-Uni",
  },
]

export default function DevisesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDevise, setEditingDevise] = useState<(typeof devises)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    code: "",
    nom: "",
    symbole: "",
    tauxChange: "",
    pays: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'enregistrement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: editingDevise ? "Devise modifiée" : "Devise ajoutée",
      description: editingDevise
        ? "Les informations de la devise ont été mises à jour"
        : "La nouvelle devise a été ajoutée avec succès",
    })

    // Reset form
    setFormData({
      code: "",
      nom: "",
      symbole: "",
      tauxChange: "",
      pays: "",
      description: "",
    })
    setEditingDevise(null)
    setIsModalOpen(false)
    setIsSubmitting(false)
  }

  const handleEdit = (devise: (typeof devises)[0]) => {
    setEditingDevise(devise)
    setFormData({
      code: devise.code,
      nom: devise.nom,
      symbole: devise.symbole,
      tauxChange: devise.tauxChange.toString(),
      pays: devise.pays,
      description: devise.description,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    const devise = devises.find((d) => d.id === id)
    if (devise?.estPrincipale) {
      toast({
        title: "Suppression impossible",
        description: "Impossible de supprimer la devise principale",
        variant: "destructive",
      })
      return
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cette devise ?")) {
      toast({
        title: "Devise supprimée",
        description: "La devise a été supprimée avec succès",
      })
    }
  }

  const handleSetPrincipal = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir définir cette devise comme principale ?")) {
      toast({
        title: "Devise principale modifiée",
        description: "La devise principale a été mise à jour",
      })
    }
  }

  const filteredDevises = devises.filter(
    (devise) =>
      devise.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devise.pays.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const devisesActives = devises.filter((d) => d.statut === "Actif").length
  const devisePrincipale = devises.find((d) => d.estPrincipale)

  return (
    <AdminLayout breadcrumbs={[{ label: "Gestion" }, { label: "Devises" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Devises</h1>
            <p className="text-muted-foreground">Gérez les devises et taux de change</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingDevise(null)
                  setFormData({
                    code: "",
                    nom: "",
                    symbole: "",
                    tauxChange: "",
                    pays: "",
                    description: "",
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Devise
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingDevise ? "Modifier la Devise" : "Nouvelle Devise"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Code Devise *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      placeholder="ex: USD, EUR, CDF"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="symbole">Symbole *</Label>
                    <Input
                      id="symbole"
                      value={formData.symbole}
                      onChange={(e) => setFormData({ ...formData, symbole: e.target.value })}
                      placeholder="ex: $, €, CDF"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nom">Nom Complet *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="ex: Dollar Américain, Euro"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tauxChange">Taux de Change *</Label>
                  <Input
                    id="tauxChange"
                    type="number"
                    step="0.000001"
                    value={formData.tauxChange}
                    onChange={(e) => setFormData({ ...formData, tauxChange: e.target.value })}
                    placeholder="Taux par rapport à la devise principale"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Taux de conversion par rapport à la devise principale ({devisePrincipale?.code})
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Information :</h4>
                  <p className="text-sm text-yellow-700">
                    Le taux de change indique combien d'unités de cette devise équivalent à 1 unité de la devise
                    principale. Par exemple, si 1 USD = 3000 CDF, le taux pour USD sera 0.00034.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Enregistrement..." : editingDevise ? "Modifier" : "Ajouter"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Devises</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devises.length}</div>
              <p className="text-xs text-muted-foreground">Devises configurées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devises Actives</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devisesActives}</div>
              <p className="text-xs text-muted-foreground">En utilisation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devise Principale</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devisePrincipale?.code}</div>
              <p className="text-xs text-muted-foreground">{devisePrincipale?.nom}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux Moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(devises.reduce((sum, d) => sum + d.tauxChange, 0) / devises.length).toFixed(4)}
              </div>
              <p className="text-xs text-muted-foreground">Taux de change moyen</p>
            </CardContent>
          </Card>
        </div>

        {/* Devise principale */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Devise Principale
            </CardTitle>
            <CardDescription>Devise de référence pour tous les calculs</CardDescription>
          </CardHeader>
          <CardContent>
            {devisePrincipale && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-500 text-white">{devisePrincipale.code}</Badge>
                  <div>
                    <div className="font-medium">{devisePrincipale.nom}</div>
                    <div className="text-sm text-muted-foreground">
                      Symbole: {devisePrincipale.symbole} | Taux: {devisePrincipale.tauxChange}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-green-700">Devise de référence</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher une Devise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par code, nom ou pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Devises</CardTitle>
            <CardDescription>Toutes les devises et leurs taux de change</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Symbole</TableHead>
                  <TableHead>Taux de Change</TableHead>
                  <TableHead>Pays/Région</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevises.map((devise) => (
                  <TableRow key={devise.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {devise.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{devise.nom}</div>
                      <div className="text-sm text-muted-foreground max-w-[200px] truncate">{devise.description}</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-lg">{devise.symbole}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono">
                        {devise.tauxChange === 1 ? "1.000000" : devise.tauxChange.toFixed(6)}
                      </div>
                      {devise.tauxChange !== 1 && (
                        <div className="text-xs text-muted-foreground">
                          1 {devise.code} = {(1 / devise.tauxChange).toLocaleString()} {devisePrincipale?.code}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate">{devise.pays}</div>
                    </TableCell>
                    <TableCell>
                      {devise.estPrincipale ? (
                        <Badge className="bg-green-500">Principale</Badge>
                      ) : (
                        <Badge variant="outline">Secondaire</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={devise.statut === "Actif" ? "default" : "secondary"}>{devise.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(devise)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {!devise.estPrincipale && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleSetPrincipal(devise.id)}>
                              <Globe className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(devise.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
