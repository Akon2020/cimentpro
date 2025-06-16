"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Package, BarChart3, CreditCard, Send, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link";
import Footer from "@/components/Footer";
// import {getAllUsers} from "../actions/users"

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactForm, setContactForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    sujet: "",
    sujetAutre: "",
    message: "",
  })
  const { toast } = useToast()

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       const data = await getAllUsers();
  //       console.log(data);
  //     } catch (error) {
  //       console.log('error:', error)
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })

    // Reset form
    setContactForm({
      nom: "",
      email: "",
      telephone: "",
      entreprise: "",
      sujet: "",
      sujetAutre: "",
      message: "",
    })
    setIsContactModalOpen(false)
    setIsSubmitting(false)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[#155E75]">CimentPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-[#155E75] hover:text-[#164E63]"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="text-[#155E75] border-[#155E75] hover:bg-[#155E75] hover:text-white"
                >
                  Inscription
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button className="bg-[#155E75] hover:bg-[#164E63]">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#155E75] to-[#164E63] text-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Contenu (slogan et CTA) */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Gérez vos commandes de ciment en toute simplicité
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200 max-w-xl mx-auto md:mx-0">
              Solution complète pour la gestion de vos commandes de ciment 32.5
              et 42.5. Réservez, suivez et gérez vos commandes en quelques
              clics.
            </p>
            <div className="space-x-4">
              <Link href="/reservation">
                <Button
                  size="lg"
                  className="bg-white text-[#155E75] hover:bg-gray-100"
                >
                  Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white bg-[#155E75] border-white hover:bg-white hover:text-[#155E75]"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/hero.png"
              alt="Hero"
              className="w-full max-w-md md:max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités clés
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour gérer vos commandes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 text-[#155E75] mx-auto mb-4" />
                <CardTitle>Réserver un produit</CardTitle>
                <CardDescription>
                  Réservez facilement vos sacs de ciment 32.5 ou 42.5 avec
                  calcul automatique des prix
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-[#155E75] mx-auto mb-4" />
                <CardTitle>Suivre une commande</CardTitle>
                <CardDescription>
                  Suivi en temps réel de vos commandes avec statuts détaillés et
                  notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-[#155E75] mx-auto mb-4" />
                <CardTitle>Gérer vos paiements</CardTitle>
                <CardDescription>
                  Interface simple pour gérer vos paiements et télécharger vos
                  reçus
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos clients nous font confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Isaac Akonkwa",
                company: "Akon Construction",
                text: "Interface très intuitive, je peux gérer toutes mes commandes facilement.",
              },
              {
                name: "Ernest K.",
                company: "Make it",
                text: "Le suivi en temps réel des commandes est un vrai plus pour mon activité.",
              },
              {
                name: "Elie R.",
                company: "Dreamland",
                text: "Excellent service client et plateforme très professionnelle.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#155E75] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Rejoignez des centaines d&apos;entreprises qui nous font confiance
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-[#155E75] hover:bg-gray-100"
              >
                Créer un compte
              </Button>
            </Link>

            {/* Modal de contact */}
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white bg-[#155E75] border-white hover:bg-white hover:text-[#155E75]"
                >
                  Nous contacter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-2xl">
                    <Mail className="mr-2 h-6 w-6 text-[#155E75]" />
                    Contactez-nous
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom complet *</Label>
                      <Input
                        id="nom"
                        value={contactForm.nom}
                        onChange={(e) => setContactForm({ ...contactForm, nom: e.target.value })}
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={contactForm.telephone}
                        onChange={(e) => setContactForm({ ...contactForm, telephone: e.target.value })}
                        placeholder="+243 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="entreprise">Entreprise (Si vous en avez une)</Label>
                      <Input
                        id="entreprise"
                        value={contactForm.entreprise}
                        onChange={(e) => setContactForm({ ...contactForm, entreprise: e.target.value })}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sujet">Sujet *</Label>
                    <Select
                      value={contactForm.sujet}
                      onValueChange={(value) => setContactForm({ ...contactForm, sujet: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="information">Demande d&apos;information</SelectItem>
                        <SelectItem value="devis">Demande de devis</SelectItem>
                        <SelectItem value="support">Support technique</SelectItem>
                        <SelectItem value="partenariat">Partenariat</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {contactForm.sujet === "autre" && (
                    <div>
                      <Label htmlFor="sujetAutre">Veuillez préciser votre sujet *</Label>
                      <Input
                        id="sujetAutre"
                        value={contactForm.sujetAutre || ""}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, sujetAutre: e.target.value })
                        }
                        placeholder="Ex: Recrutement, Sponsoring..."
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Décrivez votre demande en détail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      Autres moyens de contact
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        +243 XXX XXX XXX
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        contact@cimentpro.com
                      </p>
                      <p className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        123 Avenue Maison, République Démocratique du Congo
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsContactModalOpen(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !contactForm.nom ||
                        !contactForm.email ||
                        !contactForm.sujet ||
                        !contactForm.message
                      }
                      className="flex-1 bg-[#155E75] hover:bg-[#164E63]"
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
