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
import { Plus, Search, Edit, Trash2, Eye, Percent, TrendingUp, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

const teneurs = [
  {
    id: "TEN-001",
    valeur: "32.5",
    nom: "Ciment Portland 32.5",
    description: "Ciment de résistance normale pour construction générale",
    unite: "MPa",
    statut: "Actif",
    dateCreation: "2023-01-15",
    produitsAssocies: 5,
    utilisation: "Construction résidentielle, travaux généraux",
  },
  {
    id: "TEN-002",
    valeur: "42.5",
    nom: "Ciment Portland 42.5",
    description: "Ciment haute résistance pour ouvrages spéciaux",
    unite: "MPa",
    statut: "Actif",
    dateCreation: "2023-01-15",
    produitsAssocies: 3,
    utilisation: "Ouvrages d'art, construction industrielle",
  },
  {
    id: "TEN-003",
    valeur: "52.5",
    nom: "Ciment Portland 52.5",
    description: "Ciment très haute résistance pour projets spécialisés",
    unite: "MPa",
    statut: "Actif",
    dateCreation: "2023-06-20",
    produitsAssocies: 2,
    utilisation: "Ponts, barrages, structures précontraintes",
  },
  {
    id: "TEN-004",
    valeur: "25.0",
    nom: "Ciment Portland 25.0",
    description: "Ciment de faible résistance pour applications spécifiques",
    unite: "MPa",
    statut: "Inactif",
    dateCreation: "2022-11-05",
    produitsAssocies: 1,
    utilisation: "Travaux de finition, enduits",
  },
]

export default function TeneursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeneur, setEditingTeneur] = useState<(typeof teneurs)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    valeur: "",
    nom: "",
    description: "",
    unite: "MPa",
    utilisation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'enregistrement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: editingTeneur ? "Teneur modifiée" : "Teneur ajoutée",
      description: editingTeneur
        ? "Les informations de la teneur ont été mises à jour"
        : "La nouvelle teneur a été ajoutée avec succès",
    })

    // Reset form
    setFormData({
      valeur: "",
      nom: "",
      description: "",
      unite: "MPa",
      utilisation: "",
    })
    setEditingTeneur(null)
    setIsModalOpen(false)
    setIsSubmitting(false)
  }

  const handleEdit = (teneur: (typeof teneurs)[0]) => {
    setEditingTeneur(teneur)
    setFormData({
      valeur: teneur.valeur,
      nom: teneur.nom,
      description: teneur.description,
      unite: teneur.unite,
      utilisation: teneur.utilisation,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette teneur ?")) {
      toast({
        title: "Teneur supprimée",
        description: "La teneur a été supprimée avec succès",
      })
    }
  }

  const filteredTeneurs = teneurs.filter(
    (teneur) =>
      teneur.valeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teneur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teneur.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const teneursActives = teneurs.filter((t) => t.statut === "Actif").length
  const totalProduits = teneurs.reduce((sum, t) => sum + t.produitsAssocies, 0)

  return (
    <AdminLayout breadcrumbs={[{ label: "Gestion" }, { label: "Teneurs" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Teneurs</h1>
            <p className="text-muted-foreground">Gérez les différentes teneurs de résistance des ciments</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingTeneur(null)
                  setFormData({
                    valeur: "",
                    nom: "",
                    description: "",
                    unite: "MPa",
                    utilisation: "",
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Teneur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingTeneur ? "Modifier la Teneur" : "Nouvelle Teneur"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="valeur">Valeur de Teneur *</Label>
                    <Input
                      id="valeur"
                      value={formData.valeur}
                      onChange={(e) => setFormData({ ...formData, valeur: e.target.value })}
                      placeholder="ex: 32.5, 42.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unite">Unité *</Label>
                    <Input
                      id="unite"
                      value={formData.unite}
                      onChange={(e) => setFormData({ ...formData, unite: e.target.value })}
                      placeholder="MPa"
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
                    placeholder="ex: Ciment Portland 32.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description détaillée de la teneur et ses caractéristiques"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="utilisation">Domaines d'Utilisation</Label>
                  <Textarea
                    id="utilisation"
                    value={formData.utilisation}
                    onChange={(e) => setFormData({ ...formData, utilisation: e.target.value })}
                    placeholder="Décrivez les domaines d'application recommandés"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Information :</h4>
                  <p className="text-sm text-blue-700">
                    La teneur indique la résistance à la compression du ciment après 28 jours de durcissement. Plus la
                    valeur est élevée, plus le ciment est résistant.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Enregistrement..." : editingTeneur ? "Modifier" : "Ajouter"}
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
              <CardTitle className="text-sm font-medium">Total Teneurs</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teneurs.length}</div>
              <p className="text-xs text-muted-foreground">Teneurs configurées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teneurs Actives</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teneursActives}</div>
              <p className="text-xs text-muted-foreground">En utilisation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits Associés</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProduits}</div>
              <p className="text-xs text-muted-foreground">Produits utilisant ces teneurs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teneur Max</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...teneurs.map((t) => Number.parseFloat(t.valeur)))} MPa
              </div>
              <p className="text-xs text-muted-foreground">Résistance maximale</p>
            </CardContent>
          </Card>
        </div>

        {/* Recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher une Teneur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par valeur, nom ou description..."
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
            <CardTitle>Liste des Teneurs</CardTitle>
            <CardDescription>Toutes les teneurs de résistance configurées</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Valeur</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Utilisation</TableHead>
                  <TableHead>Produits</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeneurs.map((teneur) => (
                  <TableRow key={teneur.id}>
                    <TableCell className="font-medium">{teneur.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {teneur.valeur} {teneur.unite}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{teneur.nom}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-sm">{teneur.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate text-sm text-muted-foreground">{teneur.utilisation}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{teneur.produitsAssocies}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={teneur.statut === "Actif" ? "default" : "secondary"}>{teneur.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(teneur)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(teneur.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
