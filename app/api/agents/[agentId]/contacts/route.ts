
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: AgentRouteParams) {
    
    const { agentId } = await params; 

    const contact = await prisma.contact.findMany({
        where: { agentId: parseInt(agentId, 10) }
    });

    if (!contact) {
        return new Response("Contact not found", { status: 404 });
    }
    
    return new Response(JSON.stringify(contact), {status:200});
}

