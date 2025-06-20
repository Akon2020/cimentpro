import { AgentRouteParams } from "@/prisma/definitions";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: AgentRouteParams) {
    const { agentId } = await params;

    const condition = {
        agentId: parseInt(agentId)
    }

    const selection = {
        id: true,
        nom: true,
        statut: true,
        createdAt: true,
        // paiement: {
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
        }
    }

    const data = await Pagination(request, 'commande', null, selection, null);

    return new Response(JSON.stringify(data), { status: 201 });
}

 