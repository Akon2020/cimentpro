import { prisma } from "@/lib/prisma";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

interface RouteParams {
    params: {
        agentId: string,
        mouvementId: string
    }
}

export async function GET(request: NextRequest, { params }: RouteParams ) {
    const { agentId, mouvementId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    })

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    const cond = {
        agentid: parseInt(agentId),
        mouvementId: parseInt(mouvementId)
    }

    const data = await Pagination(request, 'mouvementCaisse', cond, null, null);
    return new Response(JSON.stringify(data), { status: 201 });
}

