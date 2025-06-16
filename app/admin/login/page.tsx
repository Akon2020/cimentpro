"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"

export default function AdminLoginPage() {
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

    // Accepter les identifiants admin ou demo
    if (
      (formData.email === "admin@cimentpro.com" && formData.password === "admin123") ||
      (formData.email === "demo@cimentpro.com" && formData.password === "demo123")
    ) {
      router.push("/admin/dashboard")
    } else {
      alert("Identifiants incorrects. Utilisez: admin@cimentpro.com / admin123 ou demo@cimentpro.com / demo123")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#155E75] to-[#164E63] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-[#155E75] rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Administration</CardTitle>
          <CardDescription>Connectez-vous à votre espace d'administration</CardDescription>
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
                  placeholder="admin@cimentpro.com"
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
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#155E75] hover:bg-[#164E63]" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Démo:</strong> Utilisez les identifiants suivants :
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Email: admin@cimentpro.com
              <br />
              Mot de passe: admin123
            </p>
            <p className="text-xs text-blue-600 mt-2">
              Ou utilisez demo@cimentpro.com / demo123 pour un accès utilisateur
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
