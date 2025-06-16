import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {    
    const produits = await prisma.produit.findMany({});
    return new Response(JSON.stringify(produits), { status: 200 });
}

export async function POST(req: Request) {
    const { 
        designation, 
        prix, 
        description, 
        deviseId, 
        teneurId, 
        utilisateurId
    } = await req.json();

    try {
        await prisma.produit.create({
            data: {
                designation: designation,
                prix: parseFloat(prix),
                description: description,
                teneurId: parseInt(teneurId, 10),
                deviseId: parseInt(deviseId, 10),
                utilisateurId: utilisateurId
            }
        });

        return new Response("Produit was created", { status: 201 });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: typeof prix }), { status: 404 });
    }    
}

