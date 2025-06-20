import { Panier } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const data: Panier = await request.json();

    if (data.agentId) {
        const agent = await prisma.agent.findUnique({
            where: { id: data.agentId }
        });

        if (!agent) return new Response("Agent Not found", { status: 201 }); 
    }

    try {
        await prisma.panier.create({
            data: data
        });
    
        return new Response("Panier Created!", { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });
    }
}

 