
import { Caisse } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";


export async function POST (request: Request, { params }: AgentRouteParams) {
    const data: Caisse = await request.json();
    const { agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    try {
        const caisse = await prisma.caisse.create({
            data: {
                ...data,
                agentId: parseInt(agentId)
            }
        });

        return new Response("Caisse Created!", { status: 201 });    
    } catch (error) {
        return new Response("Invalid Form!", { status: 201 });    
    }    
}

