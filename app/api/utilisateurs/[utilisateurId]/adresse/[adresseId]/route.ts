import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams { 
    utilisateurId: string, 
    adresseId: string 
}

export async function PUT (req: NextRequest, { params }: { params : RouteParams}) {
    const { utilisateurId, adresseId } = await params; 
    const change_type = parseInt(adresseId, 10);
    
    const data = await req.json();

    try {
        const adresse = await prisma.adresse.update({
            where: {
                id: change_type,
                utilisateurId: parseInt(utilisateurId, 10)
            },
            data: data
        });
        
        return new Response("Adresse was updated", {status:200});
        
    } catch (error) {
        return new Response("Adresse not found", { status: 404 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: RouteParams }) {
    const { utilisateurId, adresseId } = await params; 
    const change_type = parseInt(adresseId, 10);

    try {
        const adresse = await prisma.adresse.delete({
            where: {
                id: change_type,
                utilisateurId: parseInt(utilisateurId, 10)
            }
        });
        
        return new Response("Adresse was deleted", {status:200});
        
    } catch (error) {
        return new Response("Adresse not found", { status: 404 });
    }
}
