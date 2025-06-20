import { Produit } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ProduitRouteParams } from "@/prisma/definitions";


export async function PUT(request: Request, { params }: ProduitRouteParams) {
    const { agentId, produitId } = await params;
    const data: Produit = await request.json();
    
    try {
        const produit = await prisma.produit.update({
            where: {
                id: parseInt(produitId, 10)
            },
            data: data
        });

        return new Response(JSON.stringify(produit), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }   
}
