"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Eye, Edit, Trash2, Users, Shield, UserCheck } from "lucide-react"
import { createUser, updateUser, deleteUser, getSingleUser, getAllUsers } from "@/actions/users"
import {useToast} from "@/hooks/use-toast"


/* const utilisateurs = [
  {
    id: "USR001",
    nom: "Admin",
    prenom: "Super",
    email: "admin@cimentpro.com",
    role: "Administrateur",
    statut: "Actif",
    dateCreation: "2023-01-01",
    derniereConnexion: "2024-01-15",
    permissions: ["Lecture", "Écriture", "Suppression", "Administration"],
  },
  {
    id: "USR002",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@cimentpro.com",
    role: "Gestionnaire",
    statut: "Actif",
    dateCreation: "2023-03-15",
    derniereConnexion: "2024-01-14",
    permissions: ["Lecture", "Écriture"],
  },
  {
    id: "USR003",
    nom: "Martin",
    prenom: "Marie",
    email: "marie.martin@cimentpro.com",
    role: "Commercial",
    statut: "Actif",
    dateCreation: "2023-06-20",
    derniereConnexion: "2024-01-15",
    permissions: ["Lecture", "Écriture"],
  },
  {
    id: "USR004",
    nom: "Leroy",
    prenom: "Sophie",
    email: "sophie.leroy@cimentpro.com",
    role: "Magasinier",
    statut: "Actif",
    dateCreation: "2023-09-10",
    derniereConnexion: "2024-01-13",
    permissions: ["Lecture"],
  },
  {
    id: "USR005",
    nom: "Bernard",
    prenom: "Luc",
    email: "luc.bernard@cimentpro.com",
    role: "Commercial",
    statut: "Inactif",
    dateCreation: "2023-11-05",
    derniereConnexion: "2023-12-20",
    permissions: ["Lecture", "Écriture"],
  },
] */

export default function UtilisateursPage() {
  const [utilisateurs, setUtilisateurs] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedStatut, setSelectedStatut] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [mode, setMode] = useState<"view" | "edit" | "create" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast} = useToast()

  const [formData, setFormData] = useState({
    nom: "",
    postnom: "",
    email: "",
    role: "",
    poste: "",
    sexe: "",
    picture: "",
  })

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      const data = await getAllUsers()
      console.log(data)
      setUtilisateurs(data || [])
      setFiltered(data || [])
    }
    fetchUtilisateurs()
  }, [])

  const refreshUsers = async () => {
    const data = await getAllUsers()
    setUtilisateurs(data || [])
    setFiltered(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Simulation d'enregistrement
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Utilisateur enregistré",
        description: "L'utilisateur a été enregistrée avec succès",
      })

      // Reset form
      setFormData({
        nom: "",
        postnom: "",
        email: "",
        role: "",
        poste: "",
        sexe: "",
        picture: "",
      })
      setIsModalOpen(false)
      setIsSubmitting(false)
    }


  // const roles = Array.from(new Set(utilisateurs.map(u => u.role)))
  const statuts = Array.from(new Set(utilisateurs.map(u => u.statut)))
  const utilisateursActifs = utilisateurs.filter((u) => u.statut === "Actif").length
  const administrateurs = utilisateurs.filter((u) => u.role === "admin").length
  const comptables = utilisateurs.filter((u) => u.role === "comptable").length

  useEffect(() => {
  let filtres = utilisateurs;

  if (selectedRole && selectedRole !== "all") {
    filtres = filtres.filter(u => u.role === selectedRole);
  }

  if (selectedStatut && selectedStatut !== "all") {
    filtres = filtres.filter(u => u.statut === selectedStatut);
  }

  setFiltered(filtres);
}, [selectedRole, selectedStatut, utilisateurs]);


  return (
    <AdminLayout breadcrumbs={[{ label: "Utilisateurs" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
            <p className="text-muted-foreground">Gérez les accès et permissions des utilisateurs</p>
          </div>
          <Button onClick={() => {
            setCurrentUser(null)
            setMode("create")
            setOpenDialog(true)
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Utilisateur
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Rechercher un utilisateur..." className="pl-8" />
                </div>
              </div>
              <Select onValueChange={setSelectedRole} value={selectedRole}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  {statuts.map((statut) => (
                    <SelectItem key={statut} value={statut}>{statut}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{utilisateurs.length}</div>
              <p className="text-xs text-muted-foreground">Comptes créés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{utilisateursActifs}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((utilisateursActifs / utilisateurs.length) * 100)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{administrateurs}</div>
              <p className="text-xs text-muted-foreground">Accès complet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comptables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comptables}</div>
              <p className="text-xs text-muted-foreground">Accès étendu</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Utilisateurs</CardTitle>
            <CardDescription>Tous les utilisateurs et leurs rôles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Sexe</TableHead>
                    <TableHead>Date de Création</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {utilisateurs.map((utilisateur) => (
                    <TableRow key={utilisateur.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {utilisateur.nom} {utilisateur.postnom}
                          </div>
                          <div className="text-sm text-muted-foreground">{utilisateur.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{utilisateur.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            utilisateur.role === "admin"
                              ? "default"
                              : utilisateur.role === "comptable"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {utilisateur.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{utilisateur.sexe}</TableCell>
                      <TableCell>{new Date(utilisateur.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>{utilisateur.poste}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={async () => {
                            const user = await getSingleUser(utilisateur.id)
                            setCurrentUser(user)
                            setMode("view")
                            setOpenDialog(true)
                          }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={async () => {
                            const user = await getSingleUser(utilisateur.id)
                            setCurrentUser(user)
                            setMode("edit")
                            setOpenDialog(true)
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={async () => {
                            await deleteUser(utilisateur.id)
                            toast({
                            title: "Utilisateur supprimé",
                            description: `L'utilisateur ${utilisateur.nom} ${utilisateur.postnom} a été supprimé`,
                            })
                            refreshUsers()
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
