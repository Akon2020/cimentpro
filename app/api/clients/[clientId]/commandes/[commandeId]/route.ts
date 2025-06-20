import { prisma } from "@/lib/prisma";
import { CommandeParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: CommandeParams ) {
    const { commandeId } = await params;

    const commande = await prisma.commande.findUnique({
        where: { id: parseInt(commandeId) },
        select: {
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
                    nom_complet: true
                }
            },
        }
    });

    if (!commande) return new Response("Commande Not Found", { status: 201 });

    return new Response(JSON.stringify(commande), { status: 201 });
}





