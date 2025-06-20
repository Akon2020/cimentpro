

import { Pagination, UpdateCaisse } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const idCommande = searchParams.get('id');

    
    const data = await Pagination(request, 'commande', null, null, null);
    
    return new Response(JSON.stringify(data));
}

