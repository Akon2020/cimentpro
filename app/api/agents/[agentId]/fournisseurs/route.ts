import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const requestParams = request.nextUrl.searchParams;
    const search = requestParams.get('search');

    const condition = search ? {
        OR: [{ nom: search ? { contains: search, mode: 'insensitive' } : undefined }] 
    } : {};

    const selection = {
        id: true,
        nom: true, 
        adresses: {
            select: {
                adresse: true
            }
        },
        contacts: {
            select: {
                tel: true
            }   
        }
    }
    
    const fournisseurs = await Pagination(request, 'fournisseur', condition, selection, null);

    return new Response(JSON.stringify(fournisseurs), { status: 201 });
}




