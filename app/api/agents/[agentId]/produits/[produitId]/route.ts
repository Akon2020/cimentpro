import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams {
    params : {
        produitId: string
    }
}

export async function GET (request: NextRequest, { params }: RouteParams ) {
    const { produitId } = await params;
    const produit = await prisma.produit.findUnique({
        where: { id: parseInt(produitId) }
    });

    if(!produit) return new Response ("Produit Not Found!", { status: 404 });

    return new Response(JSON.stringify(produit), { status: 201 });
}

