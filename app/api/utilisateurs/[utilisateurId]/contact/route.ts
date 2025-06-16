
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams { 
    utilisateurId: string
}

export async function GET(req: NextRequest, { params }: { params: RouteParams}) {
    
    const { utilisateurId } = await params; 

    const contact = await prisma.contact.findMany({
        where: { utilisateurId: parseInt(utilisateurId, 10) }
    });

    if (!contact) {
        return new Response("Contact not found", { status: 404 });
    }
    
    return new Response(JSON.stringify(contact), {status:200});
}

export async function POST(req: NextRequest, { params }: { params: RouteParams}) {
    const { utilisateurId } = await params; 

    const data = await req.json();

    const contact = await prisma.contact.create({
        data: {
            ...data,
            utilisateurId: utilisateurId
        }
    });

    return new Response("Contact was added", {status:201});
}