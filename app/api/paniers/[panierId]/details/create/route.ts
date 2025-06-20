import { prisma } from "@/lib/prisma";
import { DetailPanierForm, PanierRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest, { params }: PanierRouteParams) {
    const { panierId } = await params;
    const data: DetailPanierForm = await request.json();

    const produits = data.produits;

    const panier = await prisma.panier.findUnique({
        where: {id: parseInt(panierId)}
    });

    if(!panier) return new Response("Panier Not Found", { status: 404 });
    
    for (let i=0; i < produits.length; i++) {
        produits[i].prixTotalHT = produits[i].prixUnitaire * produits[i].qtte;
        produits[i].panierId = parseInt(panierId);
        produits[i].prixTotalTTC = produits[i].prixTotalHT * 0.16 // 16% (TVA)
    }

    try {
        await prisma.detailPanier.createMany({
            data: produits           
        });

        return new Response(JSON.stringify("Detail Panier Added!"), { status: 201 });
    } catch (error) {
        return new Response("Invalid Formdd", { status: 201 });
    }
}





 