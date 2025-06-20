import { Teneur } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { TeneurRouteParams } from "@/prisma/definitions";

export async function PUT(request: Request, { params }: TeneurRouteParams) {
    // Not validated
    const { agentId, teneurId } = await params;
    const data: Teneur = await request.json();
    
    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    const teneur = await prisma.teneur.findUnique({
        where: { id: parseInt(teneurId) }
    });

    if (!teneur) return new Response("Teneur Not Found", { status: 404 });
    
    try {
        await prisma.teneur.update({
            where: { id: parseInt(teneurId, 10) },
            data: data
        });

        return new Response("Teneur was updated", { status: 200 });    

    } catch (error) {
        return new Response("Teneur not found", { status: 200 });
    }
}
 