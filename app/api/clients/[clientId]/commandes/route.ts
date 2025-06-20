
import { prisma } from "@/lib/prisma";
import { Pagination, UpdateCaisse } from "@/prisma/utils";
import { NextRequest } from "next/server";

interface RouteParams {
    params: {
        clientId: string,
        commandeId: string
    }
}

export async function GET(request: NextRequest, { params }: RouteParams ) {

    const { clientId, commandeId } = await params;

    const client = await prisma.client.findUnique({
        where: { id: parseInt(clientId) }
    });

    if (!client) return new Response("Client Not Found", { status: 404 });

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('id');
    if (search !== null) {
        parseInt(search);
    }

    // const condition = search ? {
    //     OR: [{ id: search ? { contains: search, mode: 'insensitive' } : undefined }] 
    // } : {};

    const cond = {
        clientId: client.id
        // commandeId: commande.id
    }
    
    const data = await Pagination(request, 'commande', cond, null, null);
    
    return new Response(JSON.stringify(data), { status: 201 });
}
