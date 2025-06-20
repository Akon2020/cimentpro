import { Agent } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";


export async function PUT(request: Request, { params }: AgentRouteParams) {
    // Valid form
    const data: Agent = await request.json();
    const nom_complet = `${data.nom + ' ' + data.postnom}`
    const { agentId } = await params; 

    const user = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!user) return new Response("User wasn't found", { status: 201 }); 
    
    await prisma.agent.update({
        where: { id: parseInt(agentId, 10) },
        data: { 
            ...data
        }
    });

    return new Response("User updated", { status: 201 })
}
