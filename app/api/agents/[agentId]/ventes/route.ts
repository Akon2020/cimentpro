import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const condition = {
        statut: 'CONFIRME'
    }

    const selection = {
        statut: true,
        panier: true,
        // detailPanier: true,
        totalHT: true,
        totalTTC: true,
        typeAcheteur: true,
        paiement: {
            select: {
                devise: {
                    select: {
                        symbole: true
                    }
                }
            }
        },
        client: {
            select: {
                nom_complet: true,
                email: true,
                // contact: true,
            },
        },
        agent: {
            select: {
                nom_complet: true,
                poste: true
            }
        }
    }
    
    const data = await Pagination(request, 'vente', condition, selection, null);

    return new Response(JSON.stringify(data), { status: 201 });
}


 