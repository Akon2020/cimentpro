"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Package, TrendingUp, AlertTriangle, Download, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const fournisseurs = [
  { id: "F001", nom: "Cimenterie Nationale", contact: "+243 XX XX XX XX" },
  { id: "F002", nom: "Holcim RDC", contact: "+243 YY YY YY YY" },
  { id: "F003", nom: "LafargeHolcim", contact: "+243 ZZ ZZ ZZ ZZ" },
]

const produits = [
  { id: "ciment-32.5", nom: "Ciment 32.5", unite: "sac de 50kg" },
  { id: "ciment-42.5", nom: "Ciment 42.5", unite: "sac de 50kg" },
  { id: "mortier", nom: "Mortier Prêt", unite: "sac de 25kg" },
]

const approvisionnements = [
  {
    id: "APP-001",
    date: "2024-01-15",
    fournisseur: "Cimenterie Nationale",
    produit: "Ciment 32.5",
    quantite: 500,
    prixUnitaire: 5800,
    total: 2900000,
    statut: "Reçu",
    bonLivraison: "BL-2024-001",
  },
  {
    id: "APP-002",
    date: "2024-01-14",
    fournisseur: "Holcim RDC",
    produit: "Ciment 42.5",
    quantite: 300,
    prixUnitaire: 6200,
    total: 1860000,
    statut: "Reçu",
    bonLivraison: "BL-2024-002",
  },
  {
    id: "APP-003",
    date: "2024-01-13",
    fournisseur: "LafargeHolcim",
    produit: "Mortier Prêt",
    quantite: 200,
    prixUnitaire: 4000,
    total: 800000,
    statut: "En Transit",
    bonLivraison: "BL-2024-003",
  },
]

export default function ApprovisionnementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fournisseur: "",
    produit: "",
    quantite: "",
    prixUnitaire: "",
    bonLivraison: "",
    dateReception: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'enregistrement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Approvisionnement enregistré",
      description: "L'entrée de stock a été enregistrée avec succès",
    })

    // Reset form
    setFormData({
      fournisseur: "",
      produit: "",
      quantite: "",
      prixUnitaire: "",
      bonLivraison: "",
      dateReception: "",
      notes: "",
    })
    setIsModalOpen(false)
    setIsSubmitting(false)
  }

  const totalApprovisionnements = approvisionnements.reduce((sum, app) => sum + app.total, 0)
  const approvisionnementsMois = approvisionnements.length
  const enTransit = approvisionnements.filter((app) => app.statut === "En Transit").length

  return (
    <AdminLayout breadcrumbs={[{ label: "Approvisionnement" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion de l'Approvisionnement</h1>
            <p className="text-muted-foreground">Gérez les entrées de stock et fournisseurs</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#155E75] hover:bg-[#164E63]">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Approvisionnement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Enregistrer un Approvisionnement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fournisseur">Fournisseur *</Label>
                    <Select
                      value={formData.fournisseur}
                      onValueChange={(value) => setFormData({ ...formData, fournisseur: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un fournisseur" />
                      </SelectTrigger>
                      <SelectContent>
                        {fournisseurs.map((fournisseur) => (
                          <SelectItem key={fournisseur.id} value={fournisseur.nom}>
                            {fournisseur.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="produit">Produit *</Label>
                    <Select
                      value={formData.produit}
                      onValueChange={(value) => setFormData({ ...formData, produit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un produit" />
                      </SelectTrigger>
                      <SelectContent>
                        {produits.map((produit) => (
                          <SelectItem key={produit.id} value={produit.nom}>
                            {produit.nom} ({produit.unite})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantite">Quantité *</Label>
                    <Input
                      id="quantite"
                      type="number"
                      value={formData.quantite}
                      onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                      placeholder="Quantité reçue"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prixUnitaire">Prix Unitaire (CDF) *</Label>
                    <Input
                      id="prixUnitaire"
                      type="number"
                      value={formData.prixUnitaire}
                      onChange={(e) => setFormData({ ...formData, prixUnitaire: e.target.value })}
                      placeholder="Prix d'achat unitaire"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bonLivraison">Bon de Livraison</Label>
                    <Input
                      id="bonLivraison"
                      value={formData.bonLivraison}
                      onChange={(e) => setFormData({ ...formData, bonLivraison: e.target.value })}
                      placeholder="Numéro du bon de livraison"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateReception">Date de Réception *</Label>
                    <Input
                      id="dateReception"
                      type="date"
                      value={formData.dateReception}
                      onChange={(e) => setFormData({ ...formData, dateReception: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Notes sur la livraison..."
                  />
                </div>

                {formData.quantite && formData.prixUnitaire && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total de l'approvisionnement:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {(Number.parseInt(formData.quantite) * Number.parseInt(formData.prixUnitaire)).toLocaleString()}{" "}
                        CDF
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.fournisseur ||
                      !formData.produit ||
                      !formData.quantite ||
                      !formData.prixUnitaire ||
                      !formData.dateReception
                    }
                    className="flex-1 bg-[#155E75] hover:bg-[#164E63]"
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer"}
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
              <CardTitle className="text-sm font-medium">Valeur Approvisionnements</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApprovisionnements.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approvisionnements</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvisionnementsMois}</div>
              <p className="text-xs text-muted-foreground">Livraisons ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Transit</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enTransit}</div>
              <p className="text-xs text-muted-foreground">Livraisons en cours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fournisseurs Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fournisseurs.length}</div>
              <p className="text-xs text-muted-foreground">Partenaires</p>
            </CardContent>
          </Card>
        </div>

        {/* Table des approvisionnements */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Historique des Approvisionnements</CardTitle>
                <CardDescription>Toutes les entrées de stock enregistrées</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Prix Unitaire</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvisionnements.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{new Date(app.date).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{app.fournisseur}</TableCell>
                    <TableCell>{app.produit}</TableCell>
                    <TableCell>{app.quantite}</TableCell>
                    <TableCell>{app.prixUnitaire.toLocaleString()} CDF</TableCell>
                    <TableCell>{app.total.toLocaleString()} CDF</TableCell>
                    <TableCell>
                      <Badge
                        variant={app.statut === "Reçu" ? "default" : "secondary"}
                        className={app.statut === "Reçu" ? "bg-green-500" : "bg-orange-500"}
                      >
                        {app.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
