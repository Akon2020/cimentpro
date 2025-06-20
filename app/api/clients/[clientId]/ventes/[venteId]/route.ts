import { prisma } from "@/lib/prisma";
import { VenteRouteParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: VenteRouteParams ) {
    const { venteId } = await params;

    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId) },
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
            client: {
                select: {
                    nom_complet: true
                }
            },
            // agent: {
            //     select: {
            //         nom: true,
            //         postnom: true
            //     }
            // },
        }
    });

    if (!vente) return new Response("Vente Not Found", { status: 201 });

    return new Response(JSON.stringify(vente), { status: 201 });
}

