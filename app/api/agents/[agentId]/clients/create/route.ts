import { prisma } from "@/lib/prisma";

interface RouteParams { 
    params: {
        agentId: string
    }
}

export async function POST(request: Request, { params }: RouteParams) {
    const { agentId } = await params;
    const data = await request.json();

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    try {
        await prisma.client.create({
            data: data
        });
        return new Response(JSON.stringify(agent), { status: 201 });   
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });   
    }
}

