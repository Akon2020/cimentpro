import { prisma } from "@/lib/prisma";
import { ClientRouteParams } from "@/prisma/definitions";

export async function GET(request: Request, { params }: ClientRouteParams) {
    const { clientId } = await params;

    const client = await prisma.client.findUnique({
        where: { id: parseInt(clientId) },
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
            commandes: true // Paiement...
        }
    });

    if (!client) return new Response("Client Not Found", { status: 404 });

    return new Response(JSON.stringify(client), { status: 201 });

}