import { prisma } from "@/lib/prisma";
import { VenteRouteParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: VenteRouteParams ) {
    const { venteId } = await params;

    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId) },
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
            client: {
                select: {
                    nom_complet: true
                }
            },
        }
    });

    if (!vente) return new Response("Vente Not Found", { status: 201 });

    const paiement = await prisma.paiement.findMany ({
        where: { id: vente.id },
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

    return new Response(JSON.stringify({vente, paiement}), { status: 201 });
}




