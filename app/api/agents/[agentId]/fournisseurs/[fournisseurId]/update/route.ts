import { Fournisseur } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { FournisseurRouteParams } from "@/prisma/definitions";

export async function PUT (request: Request, { params }: FournisseurRouteParams) {
    const { fournisseurId, agentId } = await params;
    const data: Fournisseur = await request.json();

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if(!agent) return new Response("Agent Not  Found!", { status: 404 }); 

    const fournisseur = await prisma.fournisseur.findUnique({
        where: { id: parseInt(fournisseurId) }
    });

    if (!fournisseur) return new Response("Fournisseur not found!", { status: 404 });

    try {
        await prisma.fournisseur.update({
            where: { id: parseInt(fournisseurId) },
            data: data
        });
        return new Response("Fournisseur updated!", { status: 201 });
    } catch (error) {
        return new Response("Fournisseur not found!", { status: 201 });        
    }    
}

