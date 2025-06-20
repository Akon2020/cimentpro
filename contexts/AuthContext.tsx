"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser({ ...parsedUser, token })
      } catch (error) {
        console.error("Erreur lors du parsing des données utilisateur:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }
    setLoading(false)
  }, [])

  // Redirection si non authentifié
  useEffect(() => {
    if (!loading && !user && pathname !== "/" && pathname !== "/login" && pathname !== "/register") {
      // Sauvegarder la page demandée pour redirection après connexion
      localStorage.setItem("redirect_after_login", pathname)
      router.push("/login")
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)

      // Simulation d'un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Vérification des identifiants de démonstration
      if (email === "demo@cimentpro.com" && password === "demo123") {
        // Simulation des données utilisateur
        const userData = {
          id: "demo-user-001",
          email: "demo@cimentpro.com",
          name: "Utilisateur Démo",
          token: "demo-token-" + Date.now(),
        }

        setUser(userData)
        localStorage.setItem("auth_token", userData.token)
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            id: userData.id,
            email: userData.email,
            name: userData.name,
          }),
        )

        // Redirection vers la page demandée ou reservation
        const redirectPath = localStorage.getItem("redirect_after_login") || "/reservation"
        localStorage.removeItem("redirect_after_login")
        router.push(redirectPath)

        return true
      } else {
        // Identifiants incorrects
        return false
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)

      // Simulation d'un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulation de validation
      if (email === "demo@cimentpro.com") {
        // Email déjà utilisé
        return false
      }

      // Simulation de création de compte réussie
      const userData = {
        id: "user-" + Date.now(),
        email: email,
        name: name,
        token: "token-" + Date.now(),
      }

      setUser(userData)
      localStorage.setItem("auth_token", userData.token)
      localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: userData.id,
          email: userData.email,
          name: userData.name,
        }),
      )

      router.push("/reservation")
      return true
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    localStorage.removeItem("redirect_after_login")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
