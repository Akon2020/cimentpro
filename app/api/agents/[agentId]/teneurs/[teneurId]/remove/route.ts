import { prisma } from "@/lib/prisma";
import { TeneurRouteParams } from "@/prisma/definitions";

export async function DELETE(req: Request, { params }: TeneurRouteParams) {
    const { agentId, teneurId } = await params;
    
    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response(JSON.stringify({ error: "The user dosn't exist" }), { status: 404 });
    
    const teneur = await prisma.teneur.findUnique({
        where: { id: parseInt(teneurId) }
    });

    if (!teneur) return new Response("Teneur not exist", { status: 404 });


    // if (agent.role === 'ADMIN' && agent.poste === "gerant") {
    try {
        await prisma.teneur.delete({
            where: { id: parseInt(teneurId, 10) }
        });
        return new Response("Teneur was Deleted", { status: 200 });
    } catch (error) {
        return new Response("Error!", { status: 404 });
    }
        
    // }

}
