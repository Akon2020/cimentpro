import { Caisse } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { CaisseRouteParams } from "@/prisma/definitions";

export async function PUT (request: Request, { params }: CaisseRouteParams ) {
    const { caisseId, agentId } = await params;
    const data: Caisse = await request.json();

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if(!agent) return new Response("Agent Not  Found!", { status: 404 }); 

    const caisse = await prisma.caisse.findUnique({
        where: { id: parseInt(caisseId) }
    });

    if (!caisse) return new Response("Caisse Not Found", { status: 404 });

    try {
        await prisma.caisse.update({
            where: { id: parseInt(caisseId) },
            data: {
                ...data,
                agentId: agent.id
            }
        });
        return new Response("Caisse Updated", { status: 201 });
    } catch (error) {
        return new Response("Caisse Not Found", { status: 201 });   
    }
}
