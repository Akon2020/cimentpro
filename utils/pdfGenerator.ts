import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface CommandeData {
  id: string
  date: string
  client: string
  telephone?: string
  email?: string
  adresse: string
  produits: Array<{
    nom: string
    quantite: number
    prixUnitaire: number
    total: number
  }>
  total: number
  statut: string
  notes?: string
  dateLivraison?: string
}

interface EntrepriseInfo {
  nom: string
  adresse: string
  telephone: string
  email: string
  siret?: string
}

const entrepriseInfo: EntrepriseInfo = {
  nom: "CimentPro SARL",
  adresse: "123 Avenue de la maison\n01000 Bukavu, République Democratique du Congo",
  telephone: "+243 XXX XXX XXX XXX",
  email: "contact@cimentpro.com",
  siret: "0987654321",
}

export class PDFGenerator {
  private doc: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number

  constructor() {
    this.doc = new jsPDF()
    this.pageWidth = this.doc.internal.pageSize.width
    this.pageHeight = this.doc.internal.pageSize.height
    this.margin = 20
  }

  private addHeader(titre: string) {
    // Logo/Titre de l'entreprise
    this.doc.setFillColor(21, 94, 117) // Couleur CimentPro
    this.doc.rect(0, 0, this.pageWidth, 40, "F")

    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(24)
    this.doc.setFont("helvetica", "bold")
    this.doc.text("CimentPro", this.margin, 25)

    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "normal")
    this.doc.text(titre, this.pageWidth - this.margin - 60, 25)

    // Reset couleur
    this.doc.setTextColor(0, 0, 0)
  }

  private addEntrepriseInfo(startY: number) {
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")

    const lines = [
      entrepriseInfo.nom,
      ...entrepriseInfo.adresse.split("\n"),
      `Tél: ${entrepriseInfo.telephone}`,
      `Email: ${entrepriseInfo.email}`,
      ...(entrepriseInfo.siret ? [`SIRET: ${entrepriseInfo.siret}`] : []),
    ]

    lines.forEach((line, index) => {
      this.doc.text(line, this.margin, startY + index * 5)
    })

    return startY + lines.length * 5 + 10
  }

  private addClientInfo(commande: CommandeData, startY: number) {
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold")
    this.doc.text("FACTURÉ À:", this.pageWidth - this.margin - 60, startY)

    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")

    const clientLines = [
      commande.client,
      ...commande.adresse.split("\n"),
      ...(commande.telephone ? [`Tél: ${commande.telephone}`] : []),
      ...(commande.email ? [`Email: ${commande.email}`] : []),
    ]

    clientLines.forEach((line, index) => {
      this.doc.text(line, this.pageWidth - this.margin - 60, startY + 15 + index * 5)
    })

    return Math.max(startY + clientLines.length * 5 + 25, startY + 50)
  }

  private addCommandeDetails(commande: CommandeData, startY: number, typePDF: "bon" | "facture") {
    // Informations de la commande
    this.doc.setFillColor(240, 240, 240)
    this.doc.rect(this.margin, startY, this.pageWidth - this.margin * 2, 25, "F")

    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "bold")

    const commandeInfo = [
      [`N° ${typePDF === "bon" ? "Bon" : "Facture"}:`, commande.id],
      ["Date:", new Date(commande.date).toLocaleDateString("fr-FR")],
      ["Statut:", commande.statut],
      ...(commande.dateLivraison
        ? [["Date livraison:", new Date(commande.dateLivraison).toLocaleDateString("fr-FR")]]
        : []),
    ]

    commandeInfo.forEach((info, index) => {
      const x = this.margin + 5 + index * 45
      this.doc.text(info[0], x, startY + 10)
      this.doc.setFont("helvetica", "normal")
      this.doc.text(info[1], x, startY + 18)
      this.doc.setFont("helvetica", "bold")
    })

    return startY + 35
  }

  private addProductTable(commande: CommandeData, startY: number) {
    const tableData = commande.produits.map((produit) => [
      produit.nom,
      produit.quantite.toString(),
      `${produit.prixUnitaire.toLocaleString()} CDF`,
      `${produit.total.toLocaleString()} CDF`,
    ])

    autoTable(this.doc, {
      startY: startY,
      head: [["Produit", "Quantité", "Prix unitaire", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [21, 94, 117],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30, halign: "center" },
        2: { cellWidth: 40, halign: "right" },
        3: { cellWidth: 40, halign: "right" },
      },
      margin: { left: this.margin, right: this.margin },
    })

    const finalY = (this.doc as any).lastAutoTable.finalY || startY + 40

    // Total
    this.doc.setFillColor(21, 94, 117)
    this.doc.rect(this.pageWidth - this.margin - 80, finalY + 5, 80, 15, "F")

    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold")
    this.doc.text("TOTAL:", this.pageWidth - this.margin - 75, finalY + 15)
    this.doc.text(`${commande.total.toLocaleString()} CDF`, this.pageWidth - this.margin - 5, finalY + 15, {
      align: "right",
    })

    this.doc.setTextColor(0, 0, 0)

    return finalY + 30
  }

  private addNotes(commande: CommandeData, startY: number) {
    if (!commande.notes) return startY

    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "bold")
    this.doc.text("Notes:", this.margin, startY)

    this.doc.setFont("helvetica", "normal")
    const splitNotes = this.doc.splitTextToSize(commande.notes, this.pageWidth - this.margin * 2)
    this.doc.text(splitNotes, this.margin, startY + 8)

    return startY + splitNotes.length * 5 + 15
  }

  private addFooter(typePDF: "bon" | "facture") {
    const footerY = this.pageHeight - 40

    this.doc.setFillColor(240, 240, 240)
    this.doc.rect(0, footerY, this.pageWidth, 40, "F")

    this.doc.setFontSize(8)
    this.doc.setFont("helvetica", "normal")

    const conditions =
      typePDF === "bon"
        ? [
            "Conditions de vente:",
            "• Acompte de 30% à la commande",
            "• Livraison sous 24-48h selon disponibilité",
            "• Paiement du solde à la livraison",
          ]
        : [
            "Conditions de paiement:",
            "• Paiement à 30 jours",
            "• Pénalités de retard: 3 fois le taux légal",
            "• Escompte pour paiement anticipé: 2%",
          ]

    conditions.forEach((condition, index) => {
      this.doc.text(condition, this.margin, footerY + 8 + index * 4)
    })

    // Date de génération
    this.doc.text(
      `Document généré le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}`,
      this.pageWidth - this.margin,
      this.pageHeight - 10,
      { align: "right" },
    )
  }

  generateBonCommande(commande: CommandeData): void {
    this.addHeader("BON DE COMMANDE")

    let currentY = 50
    currentY = this.addEntrepriseInfo(currentY)
    currentY = this.addClientInfo(commande, currentY)
    currentY = this.addCommandeDetails(commande, currentY, "bon")
    currentY = this.addProductTable(commande, currentY)
    currentY = this.addNotes(commande, currentY)

    this.addFooter("bon")

    this.doc.save(`bon-commande-${commande.id}.pdf`)
  }

  generateFacture(commande: CommandeData): void {
    this.addHeader("FACTURE")

    let currentY = 50
    currentY = this.addEntrepriseInfo(currentY)
    currentY = this.addClientInfo(commande, currentY)
    currentY = this.addCommandeDetails(commande, currentY, "facture")
    currentY = this.addProductTable(commande, currentY)
    currentY = this.addNotes(commande, currentY)

    this.addFooter("facture")

    this.doc.save(`facture-${commande.id}.pdf`)
  }
}

// Fonctions utilitaires pour générer les PDFs
export function generateBonCommande(commande: CommandeData) {
  const generator = new PDFGenerator()
  generator.generateBonCommande(commande)
}

export function generateFacture(commande: CommandeData) {
  const generator = new PDFGenerator()
  generator.generateFacture(commande)
}

// Fonction pour convertir les données de commande au format attendu
export function formatCommandeForPDF(commande: any): CommandeData {
  return {
    id: commande.id,
    date: commande.date,
    client: commande.client,
    telephone: commande.telephone,
    email: commande.email,
    adresse: commande.adresse,
    produits: Array.isArray(commande.produits)
      ? commande.produits.map((p: any) => ({
          nom: p.nom || p.produit || "Produit",
          quantite: p.quantite || 1,
          prixUnitaire: p.prixUnitaire || p.prix || 0,
          total: p.total || p.quantite * p.prixUnitaire || 0,
        }))
      : [
          {
            nom: commande.produit || "Produit",
            quantite: commande.quantite || 1,
            prixUnitaire: commande.prixUnitaire || commande.montant || 0,
            total: commande.total || commande.montant || 0,
          },
        ],
    total: commande.total || commande.montant || 0,
    statut: commande.statut,
    notes: commande.notes,
    dateLivraison: commande.dateLivraison || commande.dateLivraisonPrevue,
  }
}
