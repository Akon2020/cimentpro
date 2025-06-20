import { prisma } from "@/lib/prisma";
import { VenteRouteParams } from "@/prisma/definitions";


export async function GET(req: Request, { params }: VenteRouteParams) {
    const { venteId, agentId } = await params;

    const agent = await prisma.vente.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId) }
    });

    if (!vente) return new Response("vente not found", { status: 404 });        

    return new Response(JSON.stringify(vente), { status: 201 });
}


