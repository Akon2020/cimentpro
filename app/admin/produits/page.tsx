"use client";

import type React from "react";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Plus, Eye, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Données simulées des autres entités
const teneurs = [
  { id: "TEN-001", valeur: "32.5", nom: "Ciment Portland 32.5" },
  { id: "TEN-002", valeur: "42.5", nom: "Ciment Portland 42.5" },
  { id: "TEN-003", valeur: "52.5", nom: "Ciment Portland 52.5" },
];

const devises = [
  { id: "DEV-001", code: "CDF", symbole: "CDF" },
  { id: "DEV-002", code: "USD", symbole: "$" },
  { id: "DEV-003", code: "EUR", symbole: "€" },
  { id: "DEV-004", code: "CDF", symbole: "FC" },
];

const fournisseurs = [
  { id: "FRN-001", nom: "Cimenterie Nationale" },
  { id: "FRN-002", nom: "Holcim Côte d'Ivoire" },
  { id: "FRN-003", nom: "LafargeHolcim" },
];

const produits = [
  {
    id: "PROD001",
    nom: "Ciment Portland CEM I 42.5",
    reference: "CP-42.5-001",
    categorie: "Ciment",
    teneur: "42.5",
    teneurNom: "Ciment Portland 42.5",
    prixAchat: 5800,
    prixVente: 7200,
    devise: "CDF",
    deviseSymbole: "CDF",
    fournisseur: "Cimenterie Nationale",
    fournisseurId: "FRN-001",
    stock: 1250,
    stockMin: 100,
    stockMax: 2000,
    unite: "sac de 50kg",
    statut: "Actif",
    description: "Ciment Portland de haute qualité pour construction",
    dateCreation: "2023-01-15",
    poids: 50,
    dimensions: "40x30x15 cm",
  },
  {
    id: "PROD002",
    nom: "Ciment Blanc CEM I 52.5",
    reference: "CB-52.5-001",
    categorie: "Ciment",
    teneur: "52.5",
    teneurNom: "Ciment Portland 52.5",
    prixAchat: 8500,
    prixVente: 12000,
    devise: "CDF",
    deviseSymbole: "CDF",
    fournisseur: "Holcim Côte d'Ivoire",
    fournisseurId: "FRN-002",
    stock: 850,
    stockMin: 50,
    stockMax: 1500,
    unite: "sac de 50kg",
    statut: "Actif",
    description: "Ciment blanc pour finitions et travaux décoratifs",
    dateCreation: "2023-02-20",
    poids: 50,
    dimensions: "40x30x15 cm",
  },
  {
    id: "PROD003",
    nom: "Ciment Rapide CEM I 42.5 R",
    reference: "CR-42.5-001",
    categorie: "Ciment",
    teneur: "42.5",
    teneurNom: "Ciment Portland 42.5",
    prixAchat: 6200,
    prixVente: 9200,
    devise: "CDF",
    deviseSymbole: "CDF",
    fournisseur: "LafargeHolcim",
    fournisseurId: "FRN-003",
    stock: 45,
    stockMin: 100,
    stockMax: 800,
    unite: "sac de 50kg",
    statut: "Stock Faible",
    description: "Ciment à prise rapide pour urgences",
    dateCreation: "2023-03-10",
    poids: 50,
    dimensions: "40x30x15 cm",
  },
  {
    id: "PROD004",
    nom: "Mortier Prêt à l'Emploi",
    reference: "MPE-001",
    categorie: "Mortier",
    teneur: "32.5",
    teneurNom: "Ciment Portland 32.5",
    prixAchat: 4200,
    prixVente: 6800,
    devise: "CDF",
    deviseSymbole: "CDF",
    fournisseur: "Cimenterie Nationale",
    fournisseurId: "FRN-001",
    stock: 2100,
    stockMin: 200,
    stockMax: 3000,
    unite: "sac de 25kg",
    statut: "Actif",
    description: "Mortier prémélangé pour maçonnerie",
    dateCreation: "2023-04-05",
    poids: 25,
    dimensions: "35x25x12 cm",
  },
];

const categories = ["Ciment", "Mortier", "Béton", "Additifs"];

export default function ProduitsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduit, setEditingProduit] = useState<
    (typeof produits)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("Ciment");
  const [filterStatut, setFilterStatut] = useState("Actif");
  const [formData, setFormData] = useState({
    nom: "",
    reference: "",
    categorie: "Ciment",
    teneurId: "32.5",
    prixAchat: "",
    prixVente: "",
    deviseId: "CDF",
    fournisseurId: "FRN-001",
    stockMin: "",
    stockMax: "",
    unite: "",
    description: "",
    poids: "",
    dimensions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'enregistrement
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: editingProduit ? "Produit modifié" : "Produit ajouté",
      description: editingProduit
        ? "Les informations du produit ont été mises à jour"
        : "Le nouveau produit a été ajouté avec succès",
    });

    // Reset form
    setFormData({
      nom: "",
      reference: "",
      categorie: "Ciment",
      teneurId: "32.5",
      prixAchat: "",
      prixVente: "",
      deviseId: "CDF",
      fournisseurId: "FRN-001",
      stockMin: "",
      stockMax: "",
      unite: "",
      description: "",
      poids: "",
      dimensions: "",
    });
    setEditingProduit(null);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handleEdit = (produit: (typeof produits)[0]) => {
    setEditingProduit(produit);
    setFormData({
      nom: produit.nom,
      reference: produit.reference,
      categorie: produit.categorie,
      teneurId: produit.teneur,
      prixAchat: produit.prixAchat.toString(),
      prixVente: produit.prixVente.toString(),
      deviseId: produit.devise,
      fournisseurId: produit.fournisseurId,
      stockMin: produit.stockMin.toString(),
      stockMax: produit.stockMax.toString(),
      unite: produit.unite,
      description: produit.description,
      poids: produit.poids.toString(),
      dimensions: produit.dimensions,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès",
      });
    }
  };

  const filteredProduits = produits.filter((produit) => {
    const matchesSearch =
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategorie =
      !filterCategorie || produit.categorie === filterCategorie;
    const matchesStatut = !filterStatut || produit.statut === filterStatut;

    return matchesSearch && matchesCategorie && matchesStatut;
  });

  const totalProduits = produits.length;
  const produitsActifs = produits.filter((p) => p.statut === "Actif").length;
  const produitsStockFaible = produits.filter(
    (p) => p.statut === "Stock Faible"
  ).length;
  const valeurStock = produits.reduce(
    (sum, p) => sum + p.stock * p.prixVente,
    0
  );

  return (
    <AdminLayout breadcrumbs={[{ label: "Produits" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion des Produits
            </h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue de produits
            </p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingProduit(null);
                  setFormData({
                    nom: "",
                    reference: "",
                    categorie: "Ciment",
                    teneurId: "32.5",
                    prixAchat: "",
                    prixVente: "",
                    deviseId: "CDF",
                    fournisseurId: "FRN-001",
                    stockMin: "",
                    stockMax: "",
                    unite: "",
                    description: "",
                    poids: "",
                    dimensions: "",
                  });
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Produit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduit ? "Modifier le Produit" : "Nouveau Produit"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom du Produit *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      placeholder="Nom du produit"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reference">Référence *</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) =>
                        setFormData({ ...formData, reference: e.target.value })
                      }
                      placeholder="Référence unique"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categorie">Catégorie *</Label>
                    <Select
                      value={formData.categorie}
                      onValueChange={(value) =>
                        setFormData({ ...formData, categorie: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((categorie) => (
                          <SelectItem key={categorie} value={categorie}>
                            {categorie}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="teneur">Teneur *</Label>
                    <Select
                      value={formData.teneurId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, teneurId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une teneur" />
                      </SelectTrigger>
                      <SelectContent>
                        {teneurs.map((teneur) => (
                          <SelectItem key={teneur.id} value={teneur.valeur}>
                            {teneur.nom} ({teneur.valeur})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="prixAchat">Prix d'Achat *</Label>
                    <Input
                      id="prixAchat"
                      type="number"
                      value={formData.prixAchat}
                      onChange={(e) =>
                        setFormData({ ...formData, prixAchat: e.target.value })
                      }
                      placeholder="Prix d'achat"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prixVente">Prix de Vente *</Label>
                    <Input
                      id="prixVente"
                      type="number"
                      value={formData.prixVente}
                      onChange={(e) =>
                        setFormData({ ...formData, prixVente: e.target.value })
                      }
                      placeholder="Prix de vente"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="devise">Devise *</Label>
                    <Select
                      value={formData.deviseId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, deviseId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Devise" />
                      </SelectTrigger>
                      <SelectContent>
                        {devises.map((devise) => (
                          <SelectItem key={devise.id} value={devise.code}>
                            {devise.code} ({devise.symbole})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="fournisseur">Fournisseur *</Label>
                  <Select
                    value={formData.fournisseurId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, fournisseurId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {fournisseurs.map((fournisseur) => (
                        <SelectItem key={fournisseur.id} value={fournisseur.id}>
                          {fournisseur.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="stockMin">Stock Minimum *</Label>
                    <Input
                      id="stockMin"
                      type="number"
                      value={formData.stockMin}
                      onChange={(e) =>
                        setFormData({ ...formData, stockMin: e.target.value })
                      }
                      placeholder="Stock min"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockMax">Stock Maximum *</Label>
                    <Input
                      id="stockMax"
                      type="number"
                      value={formData.stockMax}
                      onChange={(e) =>
                        setFormData({ ...formData, stockMax: e.target.value })
                      }
                      placeholder="Stock max"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="unite">Unité *</Label>
                    <Input
                      id="unite"
                      value={formData.unite}
                      onChange={(e) =>
                        setFormData({ ...formData, unite: e.target.value })
                      }
                      placeholder="ex: sac de 50kg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="poids">Poids (kg)</Label>
                    <Input
                      id="poids"
                      type="number"
                      value={formData.poids}
                      onChange={(e) =>
                        setFormData({ ...formData, poids: e.target.value })
                      }
                      placeholder="Poids en kg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) =>
                        setFormData({ ...formData, dimensions: e.target.value })
                      }
                      placeholder="ex: 40x30x15 cm"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Description détaillée du produit"
                  />
                </div>

                {formData.prixAchat && formData.prixVente && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Marge bénéficiaire:</span>
                        <div className="text-lg font-bold text-blue-600">
                          {((Number.parseInt(formData.prixVente) -
                            Number.parseInt(formData.prixAchat)) /
                            Number.parseInt(formData.prixAchat)) *
                            100}
                          %
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Bénéfice par unité:</span>
                        <div className="text-lg font-bold text-green-600">
                          {Number.parseInt(formData.prixVente) -
                            Number.parseInt(formData.prixAchat)}{" "}
                          {formData.deviseId}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting
                      ? "Enregistrement..."
                      : editingProduit
                      ? "Modifier"
                      : "Ajouter"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select
                value={filterCategorie}
                onValueChange={setFilterCategorie}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes catégories</SelectItem>
                  {categories.map((categorie) => (
                    <SelectItem key={categorie} value={categorie}>
                      {categorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatut} onValueChange={setFilterStatut}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Stock Faible">Stock Faible</SelectItem>
                  <SelectItem value="Rupture">Rupture</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Produits
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProduits}</div>
              <p className="text-xs text-muted-foreground">Dans le catalogue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produits Actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produitsActifs}</div>
              <p className="text-xs text-muted-foreground">
                Disponibles à la vente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Stock Faible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {produitsStockFaible}
              </div>
              <p className="text-xs text-muted-foreground">
                Nécessitent réapprovisionnement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valeur Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {valeurStock.toLocaleString()} CDF
              </div>
              <p className="text-xs text-muted-foreground">
                Valeur totale du stock
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Catalogue des Produits</CardTitle>
            <CardDescription>
              Tous vos produits et leurs informations détaillées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Teneur</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProduits.map((produit) => (
                  <TableRow key={produit.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{produit.nom}</div>
                        <div className="text-sm text-muted-foreground">
                          Réf: {produit.reference} | {produit.unite}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{produit.categorie}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{produit.teneur}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {produit.prixVente.toLocaleString()}{" "}
                          {produit.deviseSymbole}
                        </div>
                        <div className="text-muted-foreground">
                          Achat: {produit.prixAchat.toLocaleString()}{" "}
                          {produit.deviseSymbole}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{produit.fournisseur}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{produit.stock}</div>
                        <div className="text-muted-foreground">
                          Min: {produit.stockMin} | Max: {produit.stockMax}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          produit.statut === "Actif"
                            ? "default"
                            : produit.statut === "Stock Faible"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {produit.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(produit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(produit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
