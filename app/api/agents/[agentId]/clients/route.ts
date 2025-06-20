import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET (request: NextRequest) {
    
    const requestParams = request.nextUrl.searchParams;
    const search = requestParams.get('search');

    const condition = search ? {
        OR: [{ nom_complet: search ? { contains: search, mode: 'insensitive' } : undefined }] 
    } : {}

    const selection = {
        picture: true,
        nom_complet: true,
        email: true,
        adresses: {
            select: {
                ville: true,
                adresse: true
            }
        }
    }

    const clients = await Pagination(request, 'client', condition, selection, null);

    return new Response(JSON.stringify(clients), { status: 201 });
}

