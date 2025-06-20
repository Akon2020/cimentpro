"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#155E75] to-[#164E63] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-6 w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
                <CardTitle className="text-3xl mb-2 text-red-600">Erreur critique</CardTitle>
                <CardDescription className="text-lg">
                  Une erreur critique s'est produite dans l'application.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Détails de l'erreur */}
                {process.env.NODE_ENV === "development" && (
                  <div className="bg-gray-50 p-4 rounded-lg text-left">
                    <h4 className="font-semibold mb-2">Détails de l'erreur :</h4>
                    <pre className="text-sm text-red-600 overflow-auto">{error.message}</pre>
                    {error.digest && <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>}
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                  <Button size="lg" className="w-full bg-[#155E75] hover:bg-[#164E63]" onClick={reset}>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Réessayer
                  </Button>

                  <Button variant="outline" size="lg" className="w-full" onClick={() => (window.location.href = "/")}>
                    Retour à l'accueil
                  </Button>
                </div>

                {/* Contact */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Erreur persistante ?</strong> Contactez immédiatement le support technique.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </body>
    </html>
  )
}
