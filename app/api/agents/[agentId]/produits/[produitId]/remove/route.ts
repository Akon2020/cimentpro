import { prisma } from "@/lib/prisma";
import { ProduitRouteParams } from "@/prisma/definitions";

export async function DELETE(req: Request, { params }: ProduitRouteParams) {
    const { agentId, produitId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not Exist", { status: 404 });
    
    const produit = await prisma.produit.findUnique({
        where: { id: parseInt(produitId) }
    });
    
    if (!produit) return new Response("Produit Not Exist", { status: 404 });

    try {
        await prisma.produit.delete({
            where: { id: parseInt(produitId) }
        });
        
        const produits = await prisma.produit.findMany({});

        return new Response(JSON.stringify(produits), { status: 201 }); 

    } catch (error) {
        return new Response(JSON.stringify({ error: "Error" }), { status: 404 });
    }    
}

