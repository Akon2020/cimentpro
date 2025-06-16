import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams { 
    utilisateurId: string, 
    contactId: string 
}

export async function PUT (req: NextRequest, { params }: { params : RouteParams}) {
    const { utilisateurId, contactId } = await params; 
    const change_type = parseInt(contactId, 10);
    
    const data = await req.json();

    try {
        await prisma.contact.update({
            where: {
                id: change_type,
                utilisateurId: parseInt(utilisateurId, 10)
            },
            data: data
        });
        
        return new Response("Contact was updated", {status:200});
        
    } catch (error) {
        return new Response("Contact not found", { status: 404 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: RouteParams }) {
    const { utilisateurId, contactId } = await params; 
    const change_type = parseInt(contactId, 10);

    try {
        await prisma.contact.delete({
            where: {
                id: change_type,
                utilisateurId: parseInt(utilisateurId, 10)
            }
        });
        
        return new Response("Contact was deleted", {status:200});
        
    } catch (error) {
        return new Response("Contact not found", { status: 404 });
    }
}
