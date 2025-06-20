import { prisma } from "@/lib/prisma";
import { ContactRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: ContactRouteParams) {
    const { agentId, contactId } = await params; 
    const change_type = parseInt(contactId, 10);

    try {
        await prisma.contact.delete({
            where: {
                id: change_type,
                agentId: parseInt(agentId, 10)
            }
        });
        
        return new Response("Contact was deleted", {status:200});
        
    } catch (error) {
        return new Response("Contact not found", { status: 404 });
    }
}