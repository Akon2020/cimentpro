"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Download, Plus, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Footer from "@/components/Footer";
import Link from "next/link"
import { generateBonCommande, generateFacture, formatCommandeForPDF } from "@/utils/pdfGenerator"

// Données de test
const commandesData = [
  {
    id: "CMD-001",
    date: "2024-01-15",
    produit: "Ciment 32.5",
    quantite: 50,
    prixUnitaire: 6500,
    total: 325000,
    statut: "livree",
    client: "Isaac Akonkwa",
    telephone: "+243 01 02 03 04",
    email: "akonkwaushindi@email.com",
    adresse: "Bukavu, Sud-Kivu\nRDC",
    notes: "Livraison avant 14h",
  },
  {
    id: "CMD-002",
    date: "2024-01-18",
    produit: "Ciment 42.5",
    quantite: 25,
    prixUnitaire: 7200,
    total: 180000,
    statut: "en-preparation",
    client: "Ernest K.",
    telephone: "+243 05 06 07 08",
    email: "ernest.k@email.com",
    adresse: "Plateau, Sud-Kivu\nRDC",
    notes: "Accès difficile, prévoir grue",
  },
  {
    id: "CMD-003",
    date: "2024-01-20",
    produit: "Ciment 32.5",
    quantite: 100,
    prixUnitaire: 6500,
    total: 650000,
    statut: "confirmee",
    client: "Elie R.",
    telephone: "+243 07 08 09 10",
    email: "elie.r@email.com",
    adresse: "Bukavu, Sud-Kivu\nRDC",
    notes: "",
  },
]

const getStatutBadge = (statut: string) => {
  switch (statut) {
    case "confirmee":
      return <Badge variant="secondary">Confirmée</Badge>
    case "en-preparation":
      return <Badge className="bg-orange-500">En préparation</Badge>
    case "livree":
      return <Badge className="bg-green-500">Livrée</Badge>
    default:
      return <Badge variant="outline">{statut}</Badge>
  }
}

export default function CommandesPage() {
  const { user, logout } = useAuth()
  const [selectedCommande, setSelectedCommande] = useState<(typeof commandesData)[0] | null>(null)

  const handleDownloadBon = (commande: (typeof commandesData)[0]) => {
    const formattedCommande = formatCommandeForPDF(commande)
    generateBonCommande(formattedCommande)
  }

  const handleDownloadFacture = (commande: (typeof commandesData)[0]) => {
    const formattedCommande = formatCommandeForPDF(commande)
    generateFacture(formattedCommande)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-[#155E75]">CimentPro</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Bonjour, {user.name}</span>
                  <Link href="/reservation">
                    <Button className="bg-[#155E75] hover:bg-[#164E63]">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouvelle commande
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={logout} className="text-gray-600 hover:text-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">Consultez l'historique et le statut de vos commandes</p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#155E75]">{commandesData.length}</div>
              <p className="text-sm text-gray-600">Total commandes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {commandesData.filter((c) => c.statut === "livree").length}
              </div>
              <p className="text-sm text-gray-600">Livrées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">
                {commandesData.filter((c) => c.statut === "en-preparation").length}
              </div>
              <p className="text-sm text-gray-600">En cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#155E75]">
                {commandesData.reduce((sum, c) => sum + c.total, 0).toLocaleString()} CDF
              </div>
              <p className="text-sm text-gray-600">Montant total</p>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des commandes */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commandesData.map((commande) => (
                  <TableRow key={commande.id}>
                    <TableCell className="font-medium">{commande.id}</TableCell>
                    <TableCell>{new Date(commande.date).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{commande.produit}</TableCell>
                    <TableCell>{commande.quantite} sacs</TableCell>
                    <TableCell>{commande.total.toLocaleString()} CDF</TableCell>
                    <TableCell>{getStatutBadge(commande.statut)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedCommande(commande)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails de la commande {selectedCommande?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedCommande && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-semibold mb-2">Informations générales</h3>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Référence:</strong> {selectedCommande.id}
                                      </p>
                                      <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(selectedCommande.date).toLocaleDateString("fr-FR")}
                                      </p>
                                      <p>
                                        <strong>Statut:</strong> {getStatutBadge(selectedCommande.statut)}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-2">Client</h3>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Nom:</strong> {selectedCommande.client}
                                      </p>
                                      <p>
                                        <strong>Adresse:</strong> {selectedCommande.adresse}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold mb-2">Détails de la commande</h3>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                      <span>{selectedCommande.produit}</span>
                                      <span>{selectedCommande.quantite} sacs</span>
                                    </div>
                                    <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                                      <span>Total:</span>
                                      <span className="text-[#155E75]">
                                        {selectedCommande.total.toLocaleString()} CDF
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex space-x-3">
                                  <Button
                                    className="flex-1 bg-[#155E75] hover:bg-[#164E63]"
                                    onClick={() => handleDownloadBon(selectedCommande)}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger le bon
                                  </Button>
                                  {selectedCommande.statut === "livree" && (
                                    <Button
                                      variant="outline"
                                      className="flex-1"
                                      onClick={() => handleDownloadFacture(selectedCommande)}
                                    >
                                      <Download className="mr-2 h-4 w-4" />
                                      Facture
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm" onClick={() => handleDownloadBon(commande)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Section pour nouvelle commande */}
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Besoin d'une nouvelle commande ?</h3>
            <p className="text-gray-600 mb-6">Créez une nouvelle réservation en quelques clics</p>
            <Link href="/reservation">
              <Button className="bg-[#155E75] hover:bg-[#164E63]">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle réservation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
