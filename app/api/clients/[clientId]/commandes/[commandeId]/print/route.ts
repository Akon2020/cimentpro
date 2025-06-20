import { prisma } from "@/lib/prisma";
import { CommandeParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: CommandeParams ) {
    const { commandeId } = await params;

    const commande = await prisma.commande.findUnique({
        where: { id: parseInt(commandeId) },
        select: {
            id: true,
            enregistrerPar: true,
            entreprise: {
                select: {
                    nom: true,
                    email: true,
                    codePostale: true,
                    site: true,
                    logo: true
                }
            },
            panier: {
                select: {
                    detailPaniers: {
                        select: {
                            produit: {
                                select: {
                                    designation: true
                                }
                            },
                            qtte: true,
                            prixUnitaire: true,
                            prixTotalHT: true
                        }
                    }
                }
            },
            statut: true,
            dateLivraison: true,
            adresseLivraison: true,
            notes: true,
            client: {
                select: {
                    nom: true,
                    postnom: true
                }
            },
            agent: {
                select: {
                    nom: true,
                    postnom: true
                }
            },
            fournisseur: {
                select: {
                    nom: true
                }
            },
        }
    });

    if (!commande) return new Response("Commande Not Found", { status: 201 });

    const paiement = await prisma.paiement.findMany ({
        where: { id: commande.id },
        select: {
            modePaiement: true,
            totalHT: true,
            totalTTC: true,
            devise: {
                select: {
                    symbole: true
                }
            }
        }
    });

    return new Response(JSON.stringify({commande, paiement}), { status: 201 });
}




