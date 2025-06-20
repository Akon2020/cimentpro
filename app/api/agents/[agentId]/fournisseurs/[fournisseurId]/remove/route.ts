import { prisma } from "@/lib/prisma";
import { FournisseurRouteParams } from "@/prisma/definitions";


export async function DELETE(request: Request, { params }: FournisseurRouteParams) {
    const { fournisseurId, agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if(!agent) return new Response("Agent Not  Found!", { status: 404 }); 

    try {
        await prisma.fournisseur.delete({
            where: { id: parseInt(fournisseurId) }
        });

        return new Response("Fournisseur Removed!", { status: 201 });
    } catch (error) {
        return new Response("Fournisseur not found!", { status: 404 });    
    }
}

