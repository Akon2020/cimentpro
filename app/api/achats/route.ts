import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    
    const selection = {
        statut: true,
        utilisateur: {
            select: {
                nom_complet: true,
            }
        },
        panier: {
            select: {
                DetailPanier: {
                    select: {
                        produit: {
                            select: {
                                designation: true,
                            }
                        },
                        qtte: true,
                        prixUnitaire: true,
                        prixTotal: true
                    }
                }
            }
        },
        paiement: {
            select: {
                montant: true,
                devise: {
                    select: {
                        nom: true,
                        code: true,
                        symbole: true,
                    }
                },
            }
        },
        fournisseur: {
            select: {
                nom: true,
                email: true
            }
        }
    }

    const data = await Pagination(request, 'achat', null, selection, null);
    
    return new Response(JSON.stringify(data), { status: 501 });
}





