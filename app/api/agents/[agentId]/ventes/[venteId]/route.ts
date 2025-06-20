import { prisma } from "@/lib/prisma";
import { VenteRouteParams } from "@/prisma/definitions";


export async function GET(req: Request, { params }: VenteRouteParams) {
    const { venteId, agentId } = await params;

    const agent = await prisma.vente.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId) },
        select: {
            id: true,
            statut: true,
            enregistrerPar: true,
            // paiements: {
            //     select: {
            //         totalHT: true,
            //         totalTTC: true,
            //         modePaiement: true,
            //         devise: {
            //             select: {
            //                 symbole: true
            //             }
            //         }
            //     }
            // },
            client: {
                select: {
                    picture: true,
                    nom_complet: true,
                    sexe: true,
                    adresses: {
                        select: {
                            ville: true,
                            adresse: true
                        }
                    },
                    contacts: {
                        select: {
                            tel: true
                        }
                    }
                }
            },
            fournisseur: {
                select: {
                    nom: true,
                    contacts: {
                        select: {
                            tel: true
                        }
                    }
                }
            },
            agent: {
                select: {
                    nom_complet: true,
                    role: true,
                    adresses: {
                        select: {
                            ville: true,
                            adresse: true
                        }
                    },
                    contacts: {
                        select: {
                            tel: true
                        }
                    }
                }
            },
        }
    });

    if (!vente) return new Response("vente not found", { status: 404 });        

    return new Response(JSON.stringify(vente), { status: 201 });
}


