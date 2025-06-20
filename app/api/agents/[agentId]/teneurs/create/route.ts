import { Teneur } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";

export async function POST(request: Request, { params }: AgentRouteParams) {
    // This action belongs to the agent with the role of "gerant"
    const { agentId } = await params;
    const data: Teneur = await request.json();

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId, 10) }
    });

    if (!agent)  return new Response(JSON.stringify({ error: "The user dosn't exist" }), { status: 404 });

    // if (agent.role === 'ADMIN') {
    try {
        await prisma.teneur.create({
            data: {
                ...data,
                agentId: parseInt(agentId)
            }
        });
        
        return new Response("Teneur Created!", { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid form" }), { status: 404 });        
    }
        
    // }

}

