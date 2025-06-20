import { Produit } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";

export async function POST(request: Request, { params }: AgentRouteParams) {
    const data: Produit = await request.json();
    const { agentId } = await params;

    try {
        const produit = await prisma.produit.create({
            data: {
                ...data,
                agentId: parseInt(agentId)
            }
        });

        return new Response(JSON.stringify(produit), { status: 201 });
        
    } catch (error) {
        return new Response("Invalid Form", { status: 404 });
    }    
}

