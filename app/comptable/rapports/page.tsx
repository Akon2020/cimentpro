"use client";

import { useState } from "react";
import { ComptableLayout } from "@/components/ComptableLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Truck,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

// Données simulées pour les rapports
const rapportVentes = {
  periode: "Janvier 2024",
  totalVentes: 2450000,
  nombreCommandes: 156,
  panierMoyen: 15705,
  croissanceVentes: 12.5,
  croissanceCommandes: 8.3,
  topProduits: [
    { nom: "Ciment 42.5", quantite: 450, chiffre: 3240000 },
    { nom: "Ciment 32.5", quantite: 380, chiffre: 2470000 },
    { nom: "Mortier Prêt", quantite: 120, chiffre: 576000 },
  ],
  ventesParJour: [
    { jour: "Lundi", ventes: 350000 },
    { jour: "Mardi", ventes: 420000 },
    { jour: "Mercredi", ventes: 380000 },
    { jour: "Jeudi", ventes: 450000 },
    { jour: "Vendredi", ventes: 520000 },
    { jour: "Samedi", ventes: 330000 },
  ],
};

const rapportStock = {
  totalProduits: 15,
  valeursStock: 8750000,
  produitsEnRupture: 2,
  produitsAlerte: 3,
  mouvements: [
    { produit: "Ciment 42.5", entrees: 200, sorties: 180, stock: 870 },
    { produit: "Ciment 32.5", entrees: 150, sorties: 165, stock: 1085 },
    { produit: "Mortier Prêt", entrees: 80, sorties: 75, stock: 425 },
  ],
};

const rapportLivraisons = {
  totalLivraisons: 89,
  livraisonsReussies: 85,
  tauxReussite: 95.5,
  delaiMoyen: 2.3,
  livraisonsProgrammees: 12,
  livraisonsEnCours: 8,
  livreurs: [
    { nom: "Amadou Diallo", livraisons: 25, taux: 96 },
    { nom: "Kouadio Yao", livraisons: 22, taux: 95 },
    { nom: "Sekou Traore", livraisons: 20, taux: 100 },
  ],
};

export default function RapportsPage() {
  const [periodeSelectionnee, setPeriodeSelectionnee] = useState("mois");
  const [dateDebut, setDateDebut] = useState<Date>();
  const [dateFin, setDateFin] = useState<Date>();
  const { toast } = useToast();

  const genererRapport = (type: string) => {
    toast({
      title: "Rapport généré",
      description: `Le rapport ${type} a été généré avec succès`,
    });
  };

  const exporterRapport = (type: string, format: string) => {
    toast({
      title: "Export en cours",
      description: `Export du rapport ${type} en format ${format}...`,
    });
  };

  return (
    <ComptableLayout breadcrumbs={[{ label: "Rapports" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Rapports Comptables
            </h1>
            <p className="text-muted-foreground">
              Analyses et statistiques détaillées
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => genererRapport("complet")} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Rapport Complet
            </Button>
            <Button onClick={() => exporterRapport("complet", "PDF")}>
              <Download className="mr-2 h-4 w-4" />
              Exporter PDF
            </Button>
          </div>
        </div>

        {/* Sélection de période */}
        <Card>
          <CardHeader>
            <CardTitle>Période d'Analyse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Période
                </label>
                <Select
                  value={periodeSelectionnee}
                  onValueChange={setPeriodeSelectionnee}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jour">Aujourd'hui</SelectItem>
                    <SelectItem value="semaine">Cette semaine</SelectItem>
                    <SelectItem value="mois">Ce mois</SelectItem>
                    <SelectItem value="trimestre">Ce trimestre</SelectItem>
                    <SelectItem value="annee">Cette année</SelectItem>
                    <SelectItem value="personnalise">
                      Période personnalisée
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {periodeSelectionnee === "personnalise" && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Date de début
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateDebut
                            ? format(dateDebut, "dd/MM/yyyy", { locale: fr })
                            : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateDebut}
                          onSelect={setDateDebut}
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Date de fin
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFin
                            ? format(dateFin, "dd/MM/yyyy", { locale: fr })
                            : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateFin}
                          onSelect={setDateFin}
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rapports par onglets */}
        <Tabs defaultValue="ventes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ventes">Rapport des Ventes</TabsTrigger>
            <TabsTrigger value="stock">Rapport de Stock</TabsTrigger>
            <TabsTrigger value="livraisons">Rapport des Livraisons</TabsTrigger>
          </TabsList>

          {/* Rapport des Ventes */}
          <TabsContent value="ventes" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Chiffre d'Affaires
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportVentes.totalVentes.toLocaleString()} CDF
                  </div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />+
                    {rapportVentes.croissanceVentes}% vs mois précédent
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Nombre de Commandes
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportVentes.nombreCommandes}
                  </div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />+
                    {rapportVentes.croissanceCommandes}% vs mois précédent
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Panier Moyen
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportVentes.panierMoyen.toLocaleString()} CDF
                  </div>
                  <p className="text-xs text-muted-foreground">Par commande</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Période</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportVentes.periode}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Période analysée
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Produits</CardTitle>
                  <CardDescription>Produits les plus vendus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rapportVentes.topProduits.map((produit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{produit.nom}</p>
                          <p className="text-sm text-muted-foreground">
                            {produit.quantite} sacs vendus
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {produit.chiffre.toLocaleString()} CDF
                          </p>
                          <Badge variant="outline">#{index + 1}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ventes par Jour</CardTitle>
                  <CardDescription>Répartition hebdomadaire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rapportVentes.ventesParJour.map((jour, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">{jour.jour}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(jour.ventes / 520000) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-20 text-right">
                            {jour.ventes.toLocaleString()} CDF
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => exporterRapport("ventes", "PDF")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter PDF
              </Button>
              <Button
                onClick={() => exporterRapport("ventes", "Excel")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter Excel
              </Button>
            </div>
          </TabsContent>

          {/* Rapport de Stock */}
          <TabsContent value="stock" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Valeur du Stock
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportStock.valeursStock.toLocaleString()} CDF
                  </div>
                  <p className="text-xs text-muted-foreground">Valeur totale</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Produits
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportStock.totalProduits}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Références actives
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ruptures
                  </CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {rapportStock.produitsEnRupture}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Produits en rupture
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {rapportStock.produitsAlerte}
                  </div>
                  <p className="text-xs text-muted-foreground">Stock faible</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mouvements de Stock</CardTitle>
                <CardDescription>
                  Entrées et sorties par produit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rapportStock.mouvements.map((mouvement, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{mouvement.produit}</h4>
                        <Badge variant="outline">
                          Stock: {mouvement.stock}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Entrées:
                          </span>
                          <span className="font-medium text-green-600">
                            +{mouvement.entrees}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Sorties:
                          </span>
                          <span className="font-medium text-red-600">
                            -{mouvement.sorties}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-2">
              <Button
                onClick={() => exporterRapport("stock", "PDF")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter PDF
              </Button>
              <Button
                onClick={() => exporterRapport("stock", "Excel")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter Excel
              </Button>
            </div>
          </TabsContent>

          {/* Rapport des Livraisons */}
          <TabsContent value="livraisons" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Livraisons
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportLivraisons.totalLivraisons}
                  </div>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taux de Réussite
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {rapportLivraisons.tauxReussite}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rapportLivraisons.livraisonsReussies} réussies
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Délai Moyen
                  </CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rapportLivraisons.delaiMoyen} jours
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Temps de livraison
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    En Cours
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {rapportLivraisons.livraisonsEnCours}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Livraisons actives
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance des Livreurs</CardTitle>
                <CardDescription>Statistiques par livreur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rapportLivraisons.livreurs.map((livreur, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{livreur.nom}</p>
                        <p className="text-sm text-muted-foreground">
                          {livreur.livraisons} livraisons
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            livreur.taux >= 98
                              ? "default"
                              : livreur.taux >= 95
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            livreur.taux >= 98
                              ? "bg-green-500"
                              : livreur.taux >= 95
                              ? "bg-blue-500"
                              : "bg-orange-500"
                          }
                        >
                          {livreur.taux}% réussite
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-2">
              <Button
                onClick={() => exporterRapport("livraisons", "PDF")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter PDF
              </Button>
              <Button
                onClick={() => exporterRapport("livraisons", "Excel")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter Excel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ComptableLayout>
  );
}
