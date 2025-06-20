"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Eye, Building2, Package, TrendingUp, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const fournisseurs = [
  {
    id: "FRN-001",
    nom: "Cimenterie Nationale",
    contact: "Amadou Traoré",
    email: "contact@cimenterie-nationale.ci",
    telephone: "+243 21 22 33 44",
    adresse: "Zone Industrielle de Vridi",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    specialite: "Ciment Portland",
    statut: "Actif",
    datePartenariat: "2020-01-15",
    totalCommandes: 45,
    montantTotal: 125000000,
    delaiLivraison: "3-5 jours",
  },
  {
    id: "FRN-002",
    nom: "Holcim Côte d'Ivoire",
    contact: "Marie Kouadio",
    email: "marie.kouadio@holcim.ci",
    telephone: "+243 21 33 44 55",
    adresse: "Boulevard Lagunaire",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    specialite: "Ciment Haute Performance",
    statut: "Actif",
    datePartenariat: "2019-06-20",
    totalCommandes: 38,
    montantTotal: 98000000,
    delaiLivraison: "2-4 jours",
  },
  {
    id: "FRN-003",
    nom: "LafargeHolcim",
    contact: "Jean-Baptiste Koffi",
    email: "jb.koffi@lafargeholcim.ci",
    telephone: "+243 21 44 55 66",
    adresse: "Rue des Cimentiers",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    specialite: "Mortier et Béton",
    statut: "Actif",
    datePartenariat: "2021-03-10",
    totalCommandes: 28,
    montantTotal: 72000000,
    delaiLivraison: "4-7 jours",
  },
  {
    id: "FRN-004",
    nom: "Ciments d'Afrique",
    contact: "Fatou Diallo",
    email: "fatou.diallo@ciments-afrique.com",
    telephone: "+243 21 55 66 77",
    adresse: "Zone Franche de Grand-Bassam",
    ville: "Grand-Bassam",
    pays: "Côte d'Ivoire",
    specialite: "Ciment Résistant",
    statut: "Inactif",
    datePartenariat: "2018-11-05",
    totalCommandes: 15,
    montantTotal: 35000000,
    delaiLivraison: "5-8 jours",
  },
]

const specialites = [
  "Ciment Portland",
  "Ciment Haute Performance",
  "Mortier et Béton",
  "Ciment Résistant",
  "Ciment Blanc",
  "Additifs",
]

export default function FournisseursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFournisseur, setEditingFournisseur] = useState<(typeof fournisseurs)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    nom: "",
    contact: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    pays: "Côte d'Ivoire",
    specialite: "",
    delaiLivraison: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'enregistrement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: editingFournisseur ? "Fournisseur modifié" : "Fournisseur ajouté",
      description: editingFournisseur
        ? "Les informations du fournisseur ont été mises à jour"
        : "Le nouveau fournisseur a été ajouté avec succès",
    })

    // Reset form
    setFormData({
      nom: "",
      contact: "",
      email: "",
      telephone: "",
      adresse: "",
      ville: "",
      pays: "Côte d'Ivoire",
      specialite: "",
      delaiLivraison: "",
    })
    setEditingFournisseur(null)
    setIsModalOpen(false)
    setIsSubmitting(false)
  }

  const handleEdit = (fournisseur: (typeof fournisseurs)[0]) => {
    setEditingFournisseur(fournisseur)
    setFormData({
      nom: fournisseur.nom,
      contact: fournisseur.contact,
      email: fournisseur.email,
      telephone: fournisseur.telephone,
      adresse: fournisseur.adresse,
      ville: fournisseur.ville,
      pays: fournisseur.pays,
      specialite: fournisseur.specialite,
      delaiLivraison: fournisseur.delaiLivraison,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      toast({
        title: "Fournisseur supprimé",
        description: "Le fournisseur a été supprimé avec succès",
      })
    }
  }

  const filteredFournisseurs = fournisseurs.filter(
    (fournisseur) =>
      fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fournisseur.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fournisseur.specialite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fournisseur.ville.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const fournisseursActifs = fournisseurs.filter((f) => f.statut === "Actif").length
  const montantTotalAchats = fournisseurs.reduce((sum, f) => sum + f.montantTotal, 0)
  const commandesTotales = fournisseurs.reduce((sum, f) => sum + f.totalCommandes, 0)

  return (
    <AdminLayout breadcrumbs={[{ label: "Gestion" }, { label: "Fournisseurs" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Fournisseurs</h1>
            <p className="text-muted-foreground">Gérez vos partenaires et fournisseurs</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingFournisseur(null)
                  setFormData({
                    nom: "",
                    contact: "",
                    email: "",
                    telephone: "",
                    adresse: "",
                    ville: "",
                    pays: "Côte d'Ivoire",
                    specialite: "",
                    delaiLivraison: "",
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Fournisseur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingFournisseur ? "Modifier le Fournisseur" : "Nouveau Fournisseur"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom de l'Entreprise *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Nom du fournisseur"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Personne de Contact *</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="Nom du contact"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@fournisseur.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="+243 XX XX XX XX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="adresse">Adresse *</Label>
                  <Input
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    placeholder="Adresse complète"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ville">Ville *</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      placeholder="Ville"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pays">Pays *</Label>
                    <Input
                      id="pays"
                      value={formData.pays}
                      onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                      placeholder="Pays"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialite">Spécialité *</Label>
                    <Select
                      value={formData.specialite}
                      onValueChange={(value) => setFormData({ ...formData, specialite: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une spécialité" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialites.map((specialite) => (
                          <SelectItem key={specialite} value={specialite}>
                            {specialite}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="delaiLivraison">Délai de Livraison</Label>
                    <Input
                      id="delaiLivraison"
                      value={formData.delaiLivraison}
                      onChange={(e) => setFormData({ ...formData, delaiLivraison: e.target.value })}
                      placeholder="ex: 3-5 jours"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Enregistrement..." : editingFournisseur ? "Modifier" : "Ajouter"}
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
              <CardTitle className="text-sm font-medium">Total Fournisseurs</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fournisseurs.length}</div>
              <p className="text-xs text-muted-foreground">Partenaires enregistrés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fournisseurs Actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fournisseursActifs}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((fournisseursActifs / fournisseurs.length) * 100)}% du réseau
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Montant Total Achats</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{montantTotalAchats.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Achats cumulés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandesTotales}</div>
              <p className="text-xs text-muted-foreground">
                Moyenne: {Math.round(commandesTotales / fournisseurs.length)} par fournisseur
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher un Fournisseur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, contact, spécialité ou ville..."
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
            <CardTitle>Liste des Fournisseurs</CardTitle>
            <CardDescription>Tous vos fournisseurs et partenaires</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Montant Total</TableHead>
                  <TableHead>Délai</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFournisseurs.map((fournisseur) => (
                  <TableRow key={fournisseur.id}>
                    <TableCell className="font-medium">{fournisseur.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{fournisseur.nom}</div>
                        <div className="text-sm text-muted-foreground">{fournisseur.contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{fournisseur.email}</div>
                        <div className="text-muted-foreground">{fournisseur.telephone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{fournisseur.specialite}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-3 w-3" />
                        <div>
                          <div>{fournisseur.ville}</div>
                          <div className="text-muted-foreground">{fournisseur.pays}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{fournisseur.totalCommandes}</TableCell>
                    <TableCell>{fournisseur.montantTotal.toLocaleString()} CDF</TableCell>
                    <TableCell>{fournisseur.delaiLivraison}</TableCell>
                    <TableCell>
                      <Badge variant={fournisseur.statut === "Actif" ? "default" : "secondary"}>
                        {fournisseur.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => console.log("View details")}>
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(fournisseur)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(fournisseur.id)}>
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
