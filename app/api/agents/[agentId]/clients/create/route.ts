import { prisma } from "@/lib/prisma";

interface RouteParams { 
    params: {
        agentId: string
    }
}

export async function POST(request: Request, { params }: RouteParams) {
    const { agentId } = await params;
    const data = await request.json();

    try {
        const client = await prisma.client.create({
            data: data
        });
        return new Response(JSON.stringify(client), { status: 201 });   
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });   
    }
}

