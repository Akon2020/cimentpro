import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams {
    params: {
        agentId: string,
        venteId: string
    }
}

export async function GET (request: NextRequest, { params }: RouteParams) {
    const { agentId, venteId } = await params;

    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId) },
        select: {
            id: true,
            createdAt: true,
            enregistrerPar: true,
            panier: {
                select: {
                    detailPaniers: {
                        select: {
                            produit: {
                                select: {
                                    designation: true,
                                    devise: {
                                        select: {
                                            symbole: true
                                        }
                                    }
                                }
                            },
                            qtte: true,
                            prixTotalHT: true,
                            // prixTotalTTC: true,
                            prixUnitaire: true,
                        }
                    }
                }
            },
            client: {
                select: {
                    nom_complet: true,
                }
            },
            agent: {
                select: {
                    nom_complet: true,
                }
            },
            fournisseur: {
                select: {
                    nom: true
                }
            },
            entreprise: {
                select: {
                    nom: true,
                    email: true,
                    logo: true
                }
            }
        }
    });

    if (!vente) return new Response ("Vente Not Found", { status: 404 });

    const paiement = await prisma.paiement.findMany({
        where: { venteId: vente.id },
        select: {
            totalHT: true,
            totalTTC: true,
            modePaiement: true
        }
    });

    try {
        return new Response (JSON.stringify({vente, paiement}), { status: 404 });
    } catch (error) {
        return new Response ("Print Echec", { status: 404 });
    }
    return new Response('done');
}