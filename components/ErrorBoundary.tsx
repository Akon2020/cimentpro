"use client"

import type React from "react"
import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#155E75] to-[#164E63] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-6 w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
                <CardTitle className="text-3xl mb-2 text-red-600">Erreur inattendue</CardTitle>
                <CardDescription className="text-lg">
                  Une erreur s'est produite lors du chargement de cette page.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Détails de l'erreur en mode développement */}
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <div className="bg-gray-50 p-4 rounded-lg text-left">
                    <h4 className="font-semibold mb-2">Détails de l'erreur :</h4>
                    <pre className="text-sm text-red-600 overflow-auto">{this.state.error.message}</pre>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-[#155E75] hover:bg-[#164E63]"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Recharger la page
                  </Button>

                  <Link href="/">
                    <Button variant="outline" size="lg" className="w-full">
                      <Home className="mr-2 h-5 w-5" />
                      Retour à l'accueil
                    </Button>
                  </Link>
                </div>

                {/* Contact */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    Si le problème persiste, contactez le support technique à{" "}
                    <a href="mailto:support@cimentpro.com" className="underline">
                      support@cimentpro.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
