
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: AgentRouteParams) {
    
    const { agentId } = await params; 

    const adresse = await prisma.adresse.findFirst({
        where: { agentId: parseInt(agentId, 10) }
    });

    if (!adresse) {
        return new Response("Adresse not found", { status: 404 });
    }
    
    return new Response(JSON.stringify(adresse), {status:200});
}

