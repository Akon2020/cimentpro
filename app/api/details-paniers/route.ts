import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams {
    panierId: string
}

export async function GET(req: NextRequest) {
    const requestParams = req.nextUrl.searchParams;
    const panierId = requestParams.get('panierId');
    
    if (panierId) {

        const panier = await prisma.panier.findUnique({
            where: { id: parseInt(panierId, 10) }
        });

        if (!panier) {
            return new Response("Detail not found", { status: 200 });
        }

        const detailPanier = await prisma.detailPanier.findMany({
            where: { panierId: parseInt(panierId, 10) }
        });
        return new Response(JSON.stringify(detailPanier), { status: 200 });
    }

    return new Response("Panier required", { status: 200 });    
}

export async function POST(req: NextRequest) {
    const requestParams = req.nextUrl.searchParams;
    const panierId = requestParams.get('panierId');

    const data = await req.json();

    const produits = data.produits;
    
    for (let i=0; i < produits.length; i++) {
        produits[i].produitId = parseInt(produits[i].produitId, 10);
        produits[i].qtte = parseInt(produits[i].qtte, 10);
        produits[i].prixUnitaire = parseFloat(produits[i].prixUnitaire);
        produits[i].prixTotal = parseFloat(produits[i].prixUnitaire) * parseFloat(produits[i].qtte);
        produits[i].panierId = panierId && parseInt(panierId[i], 10);
    }

    try {
        await prisma.detailPanier.createMany({
            data: produits           
        });

        return new Response("Detail Panier Added", { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });
    }
}





