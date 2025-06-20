import { prisma } from "@/lib/prisma";
import { MouvementRouteParams } from "@/prisma/definitions";


export async function GET(req: Request, { params }: MouvementRouteParams) {
    const { mouvementId, agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if(!agent) return new Response("Agent Not  Found!", { status: 404 }); 

    const mouvemnent = await prisma.mouvementCaisse.findUnique({
        where: { id: parseInt(mouvementId) }
    });

    if (!mouvemnent) return new Response("Mouvement Caisse Not found!", { status: 404 });

    return new Response(JSON.stringify(mouvemnent), { status: 201 });
    
} 

