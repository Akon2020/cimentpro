import { prisma } from "@/lib/prisma";
import { AchatParams } from "@/prisma/definitions";


export async function GET (req: Request, { params }: AchatParams) {
    const { achatId } = await params;

    const achat = await prisma.achat.findUnique({
        where: { id: parseInt(achatId, 10) },
        select: {
            statut: true,
            utilisateur: {
                select: {
                    nom_complet: true,
                }
            },
            panier: {
                select: {
                    DetailPanier: {
                        select: {
                            produit: {
                                select: {
                                    designation: true,
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
                    montant: true,
                    devise: {
                        select: {
                            nom: true,
                            code: true,
                            symbole: true,
                        }
                    },
                }
            },
            fournisseur: {
                select: {
                    nom: true,
                    email: true
                }
            }
        }
    });

    if (!achat) {
        return new Response("Achat not found", { status: 404 })
    }

    return new Response(JSON.stringify(achat), { status: 404 })
}



