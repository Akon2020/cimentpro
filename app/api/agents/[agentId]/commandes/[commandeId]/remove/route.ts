import { prisma } from "@/lib/prisma";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

interface RouteParams {
    params : {
        commandeId: string,
        agentId: string
    }
}

export async function DELETE (request: NextRequest, { params }: RouteParams ) {
    const { commandeId, agentId } = await params;

    try {
        await prisma.commande.delete({
            where: { id: parseInt(commandeId) }
        });

        const condition = { agentId: parseInt(agentId) }
    
        const selection = {
            id: true,
            nom: true,
            statut: true,
            createdAt: true,
            Paiement: {
                select: {
                    totalHT: true,
                    totalTTC: true,
                    modePaiement: true,
                    devise: {
                        select: {
                            symbole: true
                        }
                    }
                }
            },
            Client: {
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
    
        const data = await Pagination(request, 'commande', condition, selection, null);

        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        return new Response("Commande Not Found", { status: 404 });
    }
}

