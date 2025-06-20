import { prisma } from "@/lib/prisma";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

interface RoutePage {
    params: {
        fournisseurId: string
    }
}

export async function GET(request: NextRequest, { params }: RoutePage) {
    const { fournisseurId } = await params;
    const fournisseur = await prisma.fournisseur.findUnique({
        where: { id: parseInt(fournisseurId) },
        select: {
            id: true,
            nom: true,
            email: true,
            codePostale: true,
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
    
    return new Response(JSON.stringify(fournisseur), { status: 201 });
}




