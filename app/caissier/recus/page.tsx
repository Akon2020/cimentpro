"use client";

import { useState } from "react";
import { CaissierLayout } from "@/components/CaissierLayout";
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
} from "@/components/ui/dialog";
import {
  Receipt,
  Search,
  Eye,
  Download,
  FileText,
  Printer,
  Mail,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recusGeneres = [
  {
    id: "RCU-001",
    numeroVente: "VTE-001",
    type: "Reçu Client",
    date: "2024-01-15",
    heure: "09:15",
    client: "Jean Kouassi",
    montant: 65000,
    statut: "Généré",
    format: "PDF",
    taille: "245 KB",
    telechargements: 2,
  },
  {
    id: "RCU-002",
    numeroVente: "VTE-002",
    type: "Facture",
    date: "2024-01-15",
    heure: "10:30",
    client: "Marie Diallo",
    montant: 35000,
    statut: "Généré",
    format: "PDF",
    taille: "198 KB",
    telechargements: 1,
  },
  {
    id: "RCU-003",
    numeroVente: "VTE-003",
    type: "Reçu Client",
    date: "2024-01-15",
    heure: "11:45",
    client: "Paul Mensah",
    montant: 134300,
    statut: "Généré",
    format: "PDF",
    taille: "267 KB",
    telechargements: 3,
  },
  {
    id: "FAC-003",
    numeroVente: "VTE-003",
    type: "Facture",
    date: "2024-01-15",
    heure: "11:45",
    client: "Paul Mensah",
    montant: 134300,
    statut: "Généré",
    format: "PDF",
    taille: "289 KB",
    telechargements: 1,
  },
  {
    id: "RCU-004",
    numeroVente: "VTE-004",
    type: "Reçu Client",
    date: "2024-01-14",
    heure: "14:20",
    client: "Aminata Traoré",
    montant: 144000,
    statut: "Généré",
    format: "PDF",
    taille: "234 KB",
    telechargements: 0,
  },
];

export default function RecusPage() {
  const [recherche, setRecherche] = useState("");
  const [filtreType, setFiltreType] = useState("tous");
  const [recuSelectionne, setRecuSelectionne] = useState<
    (typeof recusGeneres)[0] | null
  >(null);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const { toast } = useToast();

  const recusFiltres = recusGeneres.filter((recu) => {
    const matchRecherche =
      recu.client.toLowerCase().includes(recherche.toLowerCase()) ||
      recu.id.toLowerCase().includes(recherche.toLowerCase()) ||
      recu.numeroVente.toLowerCase().includes(recherche.toLowerCase());

    const matchType =
      filtreType === "tous" ||
      recu.type.toLowerCase().includes(filtreType.toLowerCase());

    return matchRecherche && matchType;
  });

  const voirDetails = (recu: (typeof recusGeneres)[0]) => {
    setRecuSelectionne(recu);
    setDialogOuvert(true);
  };

  const telecharger = (recu: (typeof recusGeneres)[0]) => {
    toast({
      title: "Téléchargement démarré",
      description: `${recu.type} ${recu.id} en cours de téléchargement`,
    });
  };

  const reimprimer = (recu: (typeof recusGeneres)[0]) => {
    toast({
      title: "Réimpression en cours",
      description: `${recu.type} ${recu.id} envoyé à l'imprimante`,
    });
  };

  const envoyerEmail = (recu: (typeof recusGeneres)[0]) => {
    toast({
      title: "Email envoyé",
      description: `${recu.type} ${recu.id} envoyé par email au client`,
    });
  };

  const totalRecus = recusFiltres.length;
  const totalTelechargements = recusFiltres.reduce(
    (sum, recu) => sum + recu.telechargements,
    0
  );

  return (
    <CaissierLayout breadcrumbs={[{ label: "Reçus et Factures" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Reçus et Factures
            </h1>
            <p className="text-muted-foreground">
              Gérez tous vos documents générés
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {totalRecus} document{totalRecus > 1 ? "s" : ""}
          </Badge>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Documents
              </CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecus}</div>
              <p className="text-xs text-muted-foreground">Reçus et factures</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reçus Clients
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recusFiltres.filter((r) => r.type === "Reçu Client").length}
              </div>
              <p className="text-xs text-muted-foreground">Documents clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Factures</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recusFiltres.filter((r) => r.type === "Facture").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Documents comptables
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Téléchargements
              </CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTelechargements}</div>
              <p className="text-xs text-muted-foreground">
                Total téléchargements
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Recherche et Filtres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Recherche
                </label>
                <Input
                  placeholder="Client, N° reçu, N° vente..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Type de Document
                </label>
                <Select value={filtreType} onValueChange={setFiltreType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les types</SelectItem>
                    <SelectItem value="reçu">Reçus Clients</SelectItem>
                    <SelectItem value="facture">Factures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents Générés</CardTitle>
            <CardDescription>
              {recusFiltres.length} document{recusFiltres.length > 1 ? "s" : ""}{" "}
              trouvé
              {recusFiltres.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recusFiltres.length === 0 ? (
              <div className="text-center py-8">
                <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucun document trouvé</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>N° Vente</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Téléchargements</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recusFiltres.map((recu) => (
                    <TableRow key={recu.id}>
                      <TableCell className="font-medium">{recu.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            recu.type === "Reçu Client"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {recu.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{recu.numeroVente}</TableCell>
                      <TableCell>{recu.client}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {new Date(recu.date).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="text-muted-foreground">
                            {recu.heure}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {recu.montant.toLocaleString()} CDF
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {recu.taille}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{recu.telechargements}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => voirDetails(recu)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => telecharger(recu)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => reimprimer(recu)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => envoyerEmail(recu)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog de détails */}
        <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails du Document</DialogTitle>
            </DialogHeader>
            {recuSelectionne && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">N° Document:</span>
                    <p className="font-medium">{recuSelectionne.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">{recuSelectionne.type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">N° Vente:</span>
                    <p className="font-medium">{recuSelectionne.numeroVente}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Client:</span>
                    <p className="font-medium">{recuSelectionne.client}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p>
                      {new Date(recuSelectionne.date).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Heure:</span>
                    <p>{recuSelectionne.heure}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Montant:</span>
                    <p className="font-medium">
                      {recuSelectionne.montant.toLocaleString()} CDF
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Format:</span>
                    <p>{recuSelectionne.format}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Taille:</span>
                    <p>{recuSelectionne.taille}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Téléchargements:
                    </span>
                    <p>{recuSelectionne.telechargements}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOuvert(false)}
                    className="flex-1"
                  >
                    Fermer
                  </Button>
                  <Button
                    onClick={() => telecharger(recuSelectionne)}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CaissierLayout>
  );
}
