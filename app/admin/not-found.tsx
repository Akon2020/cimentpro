"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Home, ArrowLeft, Settings } from "lucide-react"

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#155E75] to-[#164E63] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/admin/dashboard">
            <h1 className="text-3xl font-bold text-white mb-2">CimentPro Admin</h1>
          </Link>
          <p className="text-gray-200">Page d'administration non trouvée</p>
        </div>

        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-6 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <Shield className="h-12 w-12 text-[#155E75]" />
            </div>
            <CardTitle className="text-3xl mb-2">Page non trouvée</CardTitle>
            <CardDescription className="text-lg">
              Cette page d'administration n'existe pas ou vous n'avez pas les permissions nécessaires.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Suggestions Admin */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center justify-center">
                <Settings className="mr-2 h-5 w-5" />
                Pages d'administration disponibles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/commandes">
                  <Button variant="outline" size="sm" className="w-full">
                    Commandes
                  </Button>
                </Link>
                <Link href="/admin/produits">
                  <Button variant="outline" size="sm" className="w-full">
                    Produits
                  </Button>
                </Link>
                <Link href="/admin/stock">
                  <Button variant="outline" size="sm" className="w-full">
                    Stock
                  </Button>
                </Link>
                <Link href="/admin/clients">
                  <Button variant="outline" size="sm" className="w-full">
                    Clients
                  </Button>
                </Link>
                <Link href="/admin/utilisateurs">
                  <Button variant="outline" size="sm" className="w-full">
                    Utilisateurs
                  </Button>
                </Link>
                <Link href="/admin/rapports">
                  <Button variant="outline" size="sm" className="w-full">
                    Rapports
                  </Button>
                </Link>
              </div>
            </div>

            {/* Actions principales */}
            <div className="space-y-4">
              <Link href="/admin/dashboard">
                <Button size="lg" className="w-full bg-[#155E75] hover:bg-[#164E63]">
                  <Shield className="mr-2 h-5 w-5" />
                  Retour au Dashboard
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    Site public
                  </Button>
                </Link>
              </div>
            </div>

            {/* Aide */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Problème d'accès ?</strong> Vérifiez vos permissions ou contactez l'administrateur système.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
