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
import { Plus, Search, Edit, Trash2, Eye, Users, Building, TrendingUp, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const clients = [
  {
    id: "CLI-001",
    nom: "Jean Kouassi",
    prenom: "Jean",
    email: "jean.kouassi@email.com",
    telephone: "+243 01 02 03 04",
    entreprise: "Kouassi Construction",
    type: "Entreprise",
    statut: "Actif",
    dateInscription: "2023-06-15",
    adresse: "Cocody, Abidjan",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    totalCommandes: 15,
    chiffreAffaires: 1250000,
  },
  {
    id: "CLI-002",
    nom: "Marie Diallo",
    prenom: "Marie",
    email: "marie.diallo@email.com",
    telephone: "+243 05 06 07 08",
    entreprise: "Diallo BTP",
    type: "PME",
    statut: "Actif",
    dateInscription: "2023-03-20",
    adresse: "Plateau, Abidjan",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    totalCommandes: 22,
    chiffreAffaires: 1850000,
  },
  {
    id: "CLI-003",
    nom: "Paul Mensah",
    prenom: "Paul",
    email: "paul.mensah@email.com",
    telephone: "+243 07 08 09 10",
    entreprise: "",
    type: "Particulier",
    statut: "Actif",
    dateInscription: "2023-09-10",
    adresse: "Yopougon, Abidjan",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    totalCommandes: 8,
    chiffreAffaires: 650000,
  },
  {
    id: "CLI-004",
    nom: "Sophie Martin",
    prenom: "Sophie",
    email: "sophie.martin@email.com",
    telephone: "+243 09 10 11 12",
    entreprise: "Martin & Fils",
    type: "Entreprise",
    statut: "Inactif",
    dateInscription: "2022-11-05",
    adresse: "Marcory, Abidjan",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    totalCommandes: 35,
    chiffreAffaires: 3200000,
  },
]

const typesClient = ["Particulier", "PME", "Entreprise", "Grande Entreprise"]

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<(typeof clients)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    entreprise: "",
    type: "",
    adresse: "",
    ville: "",
    pays: "Côte d'Ivoire",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'enregistrement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: editingClient ? "Client modifié" : "Client ajouté",
      description: editingClient
        ? "Les informations du client ont été mises à jour"
        : "Le nouveau client a été ajouté avec succès",
    })

    // Reset form
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      entreprise: "",
      type: "",
      adresse: "",
      ville: "",
      pays: "Côte d'Ivoire",
    })
    setEditingClient(null)
    setIsModalOpen(false)
    setIsSubmitting(false)
  }

  const handleEdit = (client: (typeof clients)[0]) => {
    setEditingClient(client)
    setFormData({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      entreprise: client.entreprise,
      type: client.type,
      adresse: client.adresse,
      ville: client.ville,
      pays: client.pays,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé avec succès",
      })
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const clientsActifs = clients.filter((c) => c.statut === "Actif").length
  const chiffreAffairesTotal = clients.reduce((sum, c) => sum + c.chiffreAffaires, 0)
  const commandesTotales = clients.reduce((sum, c) => sum + c.totalCommandes, 0)

  return (
    <AdminLayout breadcrumbs={[{ label: "Gestion" }, { label: "Clients" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Clients</h1>
            <p className="text-muted-foreground">Gérez votre portefeuille client</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingClient(null)
                  setFormData({
                    nom: "",
                    prenom: "",
                    email: "",
                    telephone: "",
                    entreprise: "",
                    type: "",
                    adresse: "",
                    ville: "",
                    pays: "Côte d'Ivoire",
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingClient ? "Modifier le Client" : "Nouveau Client"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      placeholder="Prénom du client"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Nom du client"
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
                      placeholder="email@example.com"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="entreprise">Entreprise</Label>
                    <Input
                      id="entreprise"
                      value={formData.entreprise}
                      onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                      placeholder="Nom de l'entreprise (optionnel)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type de Client *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesClient.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Enregistrement..." : editingClient ? "Modifier" : "Ajouter"}
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
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">Clients enregistrés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientsActifs}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((clientsActifs / clients.length) * 100)}% du portefeuille
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CA Total</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{chiffreAffairesTotal.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Chiffre d'affaires cumulé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commandesTotales}</div>
              <p className="text-xs text-muted-foreground">
                Moyenne: {Math.round(commandesTotales / clients.length)} par client
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher un Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, entreprise ou type..."
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
            <CardTitle>Liste des Clients</CardTitle>
            <CardDescription>Tous vos clients et leurs informations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>CA</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {client.prenom} {client.nom}
                        </div>
                        {client.entreprise && <div className="text-sm text-muted-foreground">{client.entreprise}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{client.email}</div>
                        <div className="text-muted-foreground">{client.telephone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-3 w-3" />
                        <div>
                          <div>{client.ville}</div>
                          <div className="text-muted-foreground">{client.pays}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.totalCommandes}</TableCell>
                    <TableCell>{client.chiffreAffaires.toLocaleString()} CDF</TableCell>
                    <TableCell>
                      <Badge variant={client.statut === "Actif" ? "default" : "secondary"}>{client.statut}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(client)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(client.id)}>
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
