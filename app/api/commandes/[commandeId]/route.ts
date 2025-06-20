import { prisma } from "@/lib/prisma";
import { CommandeParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: CommandeParams ) {
    const { commandeId } = await params;

    const commande = await prisma.commande.findUnique({
        where: { id: parseInt(commandeId) },
        select: {
            type_client: true,
            panier: {
                select: {
                    DetailPanier: {
                        select: {
                            produit: {
                                select: {
                                    designation: true
                                }
                            },
                            qtte: true,
                            prixUnitaire: true,
                            prixTotal: true
                        }
                    }
                }
            },
            paiement: {
                select: {
                    moyen_paiement: true,
                    montant: true,
                    devise: {
                        select: {
                            nom: true,
                            code: true
                        }
                    }
                }
            },
            notes: true,
            dateLivraisonEffective: true,
            adresseLivraison: true,
            statut: true
        }
    });

    if (!commande) return new Response("Commande Not Found", { status: 201 });

    return new Response(JSON.stringify(commande), { status: 201 });
}





