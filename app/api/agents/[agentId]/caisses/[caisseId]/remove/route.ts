import { prisma } from "@/lib/prisma";
import { CaisseRouteParams } from "@/prisma/definitions";


export async function DELETE (req: Request, { params }: CaisseRouteParams ) {
    const { caisseId, agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if(!agent) return new Response("Agent Not  Found!", { status: 404 }); 

    try {
        await prisma.caisse.delete({
            where: {
                id: parseInt(caisseId, 10)
            }
        });    

        return new Response("Caisse Removed", { status: 200 }); 

    } catch (error) {
        return new Response(JSON.stringify({ error: "Caisse Not found" }), { status: 404 });
    } 
}

