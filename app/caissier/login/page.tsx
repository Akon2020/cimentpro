"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { CreditCard, User } from "lucide-react"

export default function CaissierLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de l'authentification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Pour la démo, on accepte caissier@cimentpro.com / caissier123
    if (formData.email === "caissier@cimentpro.com" && formData.password === "caissier123") {
      router.push("/caissier/dashboard")
    } else {
      alert("Identifiants incorrects. Utilisez: caissier@cimentpro.com / caissier123")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Espace Caissier</CardTitle>
          <CardDescription>Connectez-vous à votre espace de caisse</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="caissier@cimentpro.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Démo:</strong> Utilisez les identifiants suivants :
            </p>
            <p className="text-sm text-green-700 mt-1">
              Email: caissier@cimentpro.com
              <br />
              Mot de passe: caissier123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
