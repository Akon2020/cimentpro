import { prisma } from "@/lib/prisma";

interface ClotureVenteRoute {
    params: {
        dateCloture: string
    }
}

export async function GET (request: Request, { params }: ClotureVenteRoute) {
    const { dateCloture } = await params;

    const date = new Date(dateCloture);

    const startDayUTC = new Date(
        Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0, 0, 0, 0 // Heure, minute, seconde, milliseconde
        )
    );

    const endDayUTC = new Date(
        Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23, 59, 59, 999 // Heure, minute, seconde, milliseconde
        )
    ); 

    const clotureCaisse = await prisma.clotureCaisse.findFirst({
        where: {
            updatedAt: {
                gte: startDayUTC,
                lte: endDayUTC
            }
        }
    });

    if (!clotureCaisse) return new Response("Day Not Found!", { status: 404 });

    const ventes = await prisma.vente.findMany({
        where: {
            statut: 'CONFIRME', // Wait for the validation...
            updatedAt: {
                gte: startDayUTC,
                lte: endDayUTC
            }
        },
        select: {
            id: true,
            statut: true,
            total_ht: true,
            total_ttc: true,
            type_acheteur: true,
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
                    montant: true,
                    moyen_paiement: true,
                    devise: {
                        select: {
                            symbole: true
                        }
                    },
                    caisse: {
                        select: {
                            nom: true
                        }
                    }
                }
            }
        }
    });

    return new Response (JSON.stringify(ventes), { status: 201 });
}

