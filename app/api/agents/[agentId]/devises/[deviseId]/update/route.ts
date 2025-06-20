import { Devise } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { DeviseRouteParams } from "@/prisma/definitions";


export async function PUT (request: Request, { params }: DeviseRouteParams) {
    const { deviseId, agentId } = await params;
    const data: Devise = await request.json();

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if (!agent) return new Response("Agent Not Found!", { status: 404 });

    const devise = await prisma.devise.findUnique({
        where: { id: parseInt(deviseId)}
    });

    if (!devise) return new Response("Devise Not Found!", { status: 404 });

    try {

        await prisma.devise.update({
            where: { id: devise.id },
            data: data
        });

        return new Response("Devise Updated!", { status: 201 });   
    } catch (error) {
        return new Response("Invalid Form!", { status: 201 });   
    }
}  