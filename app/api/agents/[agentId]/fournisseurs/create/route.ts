import { Fournisseur } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { AgentRouteParams } from "../../../../../../prisma/definitions";

export async function POST(request: NextRequest, { params }: AgentRouteParams) {
    const data: Fournisseur = await request.json();
    const { agentId } = await params;

    try {
        const fournisseur = await prisma.fournisseur.create({
            data: {
                ...data,
                agentId: parseInt(agentId)
            }
        });
        return new Response(JSON.stringify(fournisseur), { status: 201 });
        
    } catch (error) {
        return new Response("Invalid Form!", { status: 201 });
    }
}

