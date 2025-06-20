"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Eye, UserCog, Users, Shield, Filter } from "lucide-react"
import { createAgent, updateAgent, deleteAgent, getSingleAgent, getAllAgents } from "@/actions/agents"
import { useToast } from "@/hooks/use-toast"

const roles = ["ADMIN", "AGENT"]
const postes = ["DIRECTEUR", "SECRETAIRE", "CAISSIER", "GERANT"]
const sexes = ["HOMME", "FEMME"]

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [filteredAgents, setFilteredAgents] = useState<any[]>([])
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedStatut, setSelectedStatut] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAgent, setEditingAgent] = useState<any | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nom: "",
    postnom: "",
    email: "",
    role: "",
    poste: "",
    sexe: "",
    picture: "",
  })

  const refreshAgents = async () => {
    const res = await getAllAgents()
    const data = res?.data || []
    setAgents(data)
    setFilteredAgents(data)
  }

  useEffect(() => {
    refreshAgents()
  }, [])

  useEffect(() => {
    let result = agents

    if (selectedRole && selectedRole !== "all") {
      result = result.filter((a) => a.role === selectedRole)
    }

    if (selectedStatut && selectedStatut !== "all") {
      result = result.filter((a) => (a.statut || "Actif") === selectedStatut)
    }

    if (searchTerm) {
      result = result.filter(
        (a) =>
          a.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.role?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAgents(result)
  }, [agents, selectedRole, selectedStatut, searchTerm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingAgent) {
        await updateAgent(editingAgent.id, formData)
        toast({ title: "Agent modifié", description: "Mise à jour réussie." })
      } else {
        await createAgent(formData)
        toast({ title: "Agent ajouté", description: "Nouveau agent créé." })
      }

      refreshAgents()
      setFormData({ nom: "", postnom: "", email: "", role: "", poste: "", sexe: "", picture: "" })
      setEditingAgent(null)
      setIsModalOpen(false)
    } catch (err) {
      toast({ title: "Erreur", description: "Impossible d’enregistrer l’agent", variant: "destructive" })
    }

    setIsSubmitting(false)
  }

  const handleEdit = (agent: any) => {
    setEditingAgent(agent)
    setFormData({
      nom: agent.nom || "",
      postnom: agent.postnom || "",
      email: agent.email || "",
      role: agent.role || "",
      poste: agent.poste || "",
      sexe: agent.sexe || "",
      picture: agent.picture || "",
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer cet agent ?")) {
      await deleteAgent(id)
      toast({ title: "Agent supprimé", description: "L’agent a été supprimé avec succès" })
      refreshAgents()
    }
  }

  const agentsActifs = agents.length
  const totalSalaires = 0

  return (
    <AdminLayout breadcrumbs={[{ label: "Agents" }]}>
      <div className="space-y-6">
        {/* Header + filtre */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Agents</h1>
            <p className="text-muted-foreground">Gérez vos employés et leurs informations</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingAgent(null)
                  setFormData({
                    nom: "",
                    postnom: "",
                    email: "",
                    role: "",
                    poste: "",
                    sexe: "",
                    picture: "",
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingAgent ? "Modifier l'Agent" : "Nouvel Agent"}</DialogTitle>
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

                <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Rôle</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="poste">Poste</Label>
                    <Select value={formData.poste} onValueChange={(value) => setFormData({ ...formData, poste: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un poste" />
                      </SelectTrigger>
                      <SelectContent>
                        {postes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
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

                <div className="flex space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Enregistrement..." : editingAgent ? "Modifier" : "Ajouter"}
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
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agents.length}</div>
              <p className="text-xs text-muted-foreground">Employés enregistrés</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agents Actifs</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentsActifs}</div>
              <p className="text-xs text-muted-foreground">En service</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus des agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSalaires.toLocaleString()} CDF</div>
              <p className="text-xs text-muted-foreground">Entrées totales</p>
            </CardContent>
          </Card>
        </div>


        {/* Filtres */}
        <Card>
          <CardHeader><CardTitle>Filtres</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input placeholder="Recherche par nom, email ou rôle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Rôle" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={selectedStatut} onValueChange={setSelectedStatut}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Statut" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filtrer</Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader><CardTitle>Liste des Agents</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom complet</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Sexe</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map(agent => (
                  <TableRow key={agent.id}>
                    <TableCell>{agent.nom_complet || "N/A"}</TableCell>
                    <TableCell>{agent.email || "N/A"}</TableCell>
                    <TableCell><Badge>{agent.role || "N/A"}</Badge></TableCell>
                    <TableCell>{agent.poste || "N/A"}</TableCell>
                    <TableCell>{agent.sexe || "N/A"}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(agent)}><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(agent.id)}><Trash2 className="h-4 w-4" /></Button>
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
