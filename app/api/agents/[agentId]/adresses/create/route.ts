
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: AgentRouteParams) {
    const { agentId } = await params; 

    const data = await req.json();

    const adresse = await prisma.adresse.create({
        data: {
            ...data,
            agentId: parseInt(agentId, 10)
        }
    });

    return new Response("Adresse was added", {status:201});
}