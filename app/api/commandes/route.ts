
import { Pagination, UpdateCaisse } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const idCommande = searchParams.get('id');

    
    const data = await Pagination(req, 'commande', null, null, null);
    
    return new Response(JSON.stringify(data));
}
