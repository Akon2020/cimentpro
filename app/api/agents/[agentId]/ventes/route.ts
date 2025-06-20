import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const condition = {
        statut: 'CONFIRME'
    }

    const selection = {
        id: true,
        statut: true,
        paiements: {
            select: {
                totalHT: true,
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
            },
        },
        fournisseur: {
            select: {
                nom: true,
            },
        },
        agent: {
            select: {
                nom_complet: true,
            }
        }
    }
    
    const data = await Pagination(request, 'vente', condition, selection, null);

    return new Response(JSON.stringify(data), { status: 201 });
}


 