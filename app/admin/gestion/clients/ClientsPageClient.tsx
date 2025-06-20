"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Edit, Trash2, Eye, Users, Building, TrendingUp } from "lucide-react"
import { createClient, updateClient, deleteClient, getAllClients } from "@/actions/clients"

const sexes = ["HOMME", "FEMME"]

export default function ClientsPageClient() {
  const [clients, setClients] = useState<any[]>([])
  const [filteredClients, setFilteredClients] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({ email: "", nom: "", postnom: "", sexe: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const refreshClients = async () => {
    const res = await getAllClients()
    const data = res?.data || []
    setClients(data)
    setFilteredClients(data)
  }

  useEffect(() => {
    refreshClients()
  }, [])

  useEffect(() => {
    let result = clients
    if (searchTerm) {
      result = result.filter(
        (a) =>
          a.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.role?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredClients(result)
  }, [clients, searchTerm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingClient) {
        await updateClient(editingClient.id, formData)
        toast({ title: "Client modifié", description: "Mise à jour réussie." })
      } else {
        await createClient(formData)
        toast({ title: "Client ajouté", description: "Nouveau client créé." })
      }
      refreshClients()
      setFormData({ nom: "", postnom: "", email: "", sexe: "" })
      setEditingClient(null)
      setIsModalOpen(false)
    } catch (err) {
      toast({ title: "Erreur", description: "Échec de l'enregistrement", variant: "destructive" })
    }

    setIsSubmitting(false)
  }

  const handleEdit = (client: any) => {
    setEditingClient(client)
    setFormData({
      email: client.email || "",
      nom: client.nom || "",
      postnom: client.postnom || "",
      sexe: client.sexe || "",
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      await deleteClient(id)
      toast({ title: "Client supprimé", description: "Suppression réussie." })
      refreshClients()
    }
  }

  const clientsActifs = clients.filter(c => c.statut === "Actif").length
  const chiffreAffairesTotal = clients.reduce((sum, c) => sum + (c.chiffreAffaires || 0), 0)
  const commandesTotales = clients.reduce((sum, c) => sum + (c.totalCommandes || 0), 0)

  return (
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
                setFormData({ email: "", nom: "", postnom: "", sexe: "" })
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
                  <Label htmlFor="nom">Nom *</Label>
                  <Input id="nom" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="postnom">Postnom *</Label>
                  <Input id="postnom" value={formData.postnom} onChange={(e) => setFormData({ ...formData, postnom: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="sexe">Sexe</Label>
                  <Select value={formData.sexe} onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      {sexes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Annuler</Button>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">Clients enregistrés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsActifs}</div>
            <p className="text-xs text-muted-foreground">{Math.round((clientsActifs / (clients.length || 1)) * 100)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">CA Total</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chiffreAffairesTotal.toLocaleString()} CDF</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commandesTotales}</div>
            <p className="text-xs text-muted-foreground">Moy: {Math.round((commandesTotales / (clients.length || 1)))} par client</p>
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
            <Input placeholder="Nom, postnom, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Clients</CardTitle>
          <CardDescription>Tous vos clients enregistrés</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sexe</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.nom} {client.postnom}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.sexe}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(client)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(client.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
