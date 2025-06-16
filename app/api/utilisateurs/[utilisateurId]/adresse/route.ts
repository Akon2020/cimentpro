
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams { 
    utilisateurId: string
}

export async function GET(req: NextRequest, { params }: { params: RouteParams}) {
    
    const { utilisateurId } = await params; 

    const adresse = await prisma.adresse.findFirst({
        where: { utilisateurId: parseInt(utilisateurId, 10) }
    });

    if (!adresse) {
        return new Response("Adresse not found", { status: 404 });
    }
    
    return new Response(JSON.stringify(adresse), {status:200});
}

export async function POST(req: NextRequest, { params }: { params: RouteParams}) {
    const { utilisateurId } = await params; 

    const data = await req.json();

    const adresse = await prisma.adresse.create({
        data: {
            ...data,
            utilisateurId: parseInt(utilisateurId, 10)
        }
    });

    return new Response("Adresse was added", {status:201});
}