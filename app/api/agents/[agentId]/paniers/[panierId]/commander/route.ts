import { Commande } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { GetDetailPanier } from "@/prisma/utils";
import { NextRequest } from "next/server";

interface RouteParams {
    params: {
        agentId: string,
        panierId: string
    }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    const { agentId, panierId } = await params;
    const form: Commande = await request.json();
    form.dateLivraison = form.dateLivraison ? new Date(form.dateLivraison) : new Date();
    
    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) },
        select: { nom: true, postnom: true }
    });

    const enregistrerPar = `${agent?.nom} ${agent?.postnom}`

    if (!agent) return new Response("Agent not found", { status: 404 });

    const panier = await prisma.panier.findUnique({
        where: { id: parseInt(panierId) }
    });

    if (!panier) return new Response("Panier not found", { status: 404 });

    try {
        const detailsPanier = await GetDetailPanier(parseInt(panierId));   
        
        const commande = await prisma.commande.create({
            data: {
                ...form,
                panierId: parseInt(panierId),
                enregistrerPar: enregistrerPar
            }
        });
        
        return new Response(JSON.stringify(commande), { status: 201 });
    } catch (error) {
        return new Response('Invalid Form', { status: 404 });
    }
}

