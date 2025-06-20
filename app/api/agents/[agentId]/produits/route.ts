import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const selection = {
        id: true,
        designation: true,
        prixUnitaire: true,
        teneur: {
            select: {
                valeur: true
            }
        },
        qtteDisponible: true,
        devise: {
            select: {
                symbole: true
            }
        }
    }
    
    const data = await Pagination(request, 'produit', null, selection, null);

    return new Response(JSON.stringify(data), { status: 201 });
}


 