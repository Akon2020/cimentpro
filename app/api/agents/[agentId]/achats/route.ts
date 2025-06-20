import { AgentRouteParams } from "@/prisma/definitions";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: AgentRouteParams) {
    const { agentId } = await params;

    const condition = {
        agentId: parseInt(agentId)
    }

    const data = await Pagination(request, 'achat', condition, null, null);

    return new Response(JSON.stringify(data), { status: 201 });
}

