import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";

export async function DELETE(req: Request, { params }: AgentRouteParams) {
    const { agentId } = await params;

    try {
        await prisma.agent.delete({
            where: { id: parseInt(agentId, 10) }
        });
        return new Response("User was removed", { status: 201 });        
    } catch (error) {
        return new Response("User wasn't found", { status: 404 });
    }    
}
