import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";

export async function GET(req: Request, { params }: AgentRouteParams) {
    const { agentId } = await params; 

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) },
        select: {
            id: true,
            nom_complet: true,
            email: true,
            sexe: true,
            picture: true,
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
            },
            achats: {
                select: {
                    id: true,
                    statut: true,
                    paiements: {
                        select: {
                            totalHT: true,
                            modePaiement: true,
                            devise: {
                                select: {
                                    symbole: true
                                }
                            }
                        }
                    }
                }
            },
            ventes: {
                select: {
                    id: true,
                    statut: true,
                    paiements: {
                        select: {
                            totalHT: true,
                            modePaiement: true,
                            devise: {
                                select: {
                                    symbole: true
                                }
                            }
                        }
                    }
                }
            },
            // commandes: true // Paiement...
        }
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    return new Response(JSON.stringify(agent), { status: 201 });
}



