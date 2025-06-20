import { prisma } from "@/lib/prisma";
import { AdresseRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: AdresseRouteParams) {
    const { agentId, adresseId } = await params; 
    const change_type = parseInt(adresseId, 10);

    try {
        const adresse = await prisma.adresse.delete({
            where: {
                id: change_type,
                agentId: parseInt(agentId, 10)
            }
        });
        
        return new Response("Adresse was deleted", {status:200});
        
    } catch (error) {
        return new Response("Adresse not found", { status: 404 });
    }
}
