import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

interface RouteParams {
    params: {
        agentId: string,
        commandeId: string
    }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { agentId, commandeId } = await params;

    const condition = {
        agentId: parseInt(agentId),
        commandeId: parseInt(commandeId)
    }

    const selection = {
        id: true,
        nom: true,
        statut: true,
        createdAt: true,
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

 