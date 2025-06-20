"use client"

import type React from "react"

import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && pathname !== "/" && pathname !== "/login" && pathname !== "/register") {
      localStorage.setItem("redirect_after_login", pathname)
      router.push("/login")
    }
  }, [user, loading, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#155E75]"></div>
      </div>
    )
  }

  if (!user && pathname !== "/" && pathname !== "/login" && pathname !== "/register") {
    return null
  }

  return <>{children}</>
}
