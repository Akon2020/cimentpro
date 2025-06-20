import { Adresse } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AdresseRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function PUT (request: NextRequest, { params }: AdresseRouteParams) {
    const { agentId, adresseId } = await params; 
    const change_type = parseInt(adresseId, 10);
    
    const data: Adresse = await request.json();

    try {
        const adresse = await prisma.adresse.update({
            where: {
                id: change_type,
                agentId: parseInt(agentId, 10)
            },
            data: data
        });
        
        return new Response("Adresse was updated", {status:200});
        
    } catch (error) {
        return new Response("Adresse not found", { status: 404 });
    }
} 