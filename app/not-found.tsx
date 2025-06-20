"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calculator, CreditCard, ArrowLeft, HelpCircle, Lock } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#155E75] to-[#164E63] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-white mb-2">CimentPro</h1>
          </Link>
          <p className="text-gray-200">Oops! Cette page n&apos;existe pas</p>
        </div>

        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-6 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-6xl font-bold text-[#155E75]">404</span>
            </div>
            <CardTitle className="text-3xl mb-2">Page non trouvée</CardTitle>
            <CardDescription className="text-lg">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Suggestions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center justify-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Que souhaitez-vous faire ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    Accueil
                  </Button>
                </Link>
                <Link href="/caissier/dashboard">
                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Caissier
                  </Button>
                </Link>
                <Link href="/comptable/dashboard">
                  <Button variant="outline" className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Comptable
                  </Button>
                </Link>
                <Link href="/admin/login">
                  <Button variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Administration
                  </Button>
                </Link>
              </div>
            </div>

            {/* Actions principales */}
            <div className="space-y-4">
              <Link href="/">
                <Button size="lg" className="w-full bg-[#155E75] hover:bg-[#164E63]">
                  <Home className="mr-2 h-5 w-5" />
                  Retour à l&apos;accueil
                </Button>
              </Link>

              <Button variant="outline" size="lg" className="w-full" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Page précédente
              </Button>
            </div>

            {/* Liens utiles */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-3">Liens utiles</h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/" className="text-[#155E75] hover:underline">
                  Accueil
                </Link>
                <Link href="/login" className="text-[#155E75] hover:underline">
                  Connexion
                </Link>
                <Link href="/register" className="text-[#155E75] hover:underline">
                  Inscription
                </Link>
                <Link href="/admin/login" className="text-[#155E75] hover:underline">
                  Administration
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Besoin d'aide ?</strong> Contactez notre support à{" "}
                <a href="mailto:support@cimentpro.com" className="underline">
                  support@cimentpro.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-200 text-sm">
          <p>&copy; {new Date().getFullYear()} CimentPro. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}
