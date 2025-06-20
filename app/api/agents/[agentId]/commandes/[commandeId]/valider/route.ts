import { Commande } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { GetDetailPanier, Paiement, VariationCaisse, VariationStockage } from "@/prisma/utils";
import { NextRequest } from "next/server"; 

interface RouteParams {
    params : {
        commandeId: string,
        agentId: string
    }
}

export async function PUT (request: NextRequest, { params }: RouteParams ) {
    const { commandeId, agentId } = await params;
    const form: Commande = await request.json();

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent not found", { status: 404 });

    const commande = await prisma.commande.findUnique({
        where: { id: parseInt(commandeId) }
    });

    if (!commande) return new Response("Commande not found", { status: 404 });

    try {
        const validCommand = await prisma.commande.update({
            where: { id: parseInt(commandeId) },
            data: { statut: 'EN_COURS' }
        });

        const panier = await prisma.panier.findUnique({
            where: { id: commande.id }
        });

        let detailsPanier = panier && await GetDetailPanier(panier?.id);
        if (!detailsPanier) return new Response("detailsPanier not found", { status: 404 });

        const destockage = await VariationStockage(detailsPanier, false, false, true);
        if (destockage) return new Response(`Le Produit "${destockage}" N'est Pas Disponible En Stock.`, { status: 404 });        
        const paiement = await Paiement(detailsPanier, null, null, commande.id);
        const encaissement = await VariationCaisse(detailsPanier, null, null, true);

        return new Response(JSON.stringify('destockage'), { status: 201 });
    } catch (error) {
        return new Response("Commande Not Found", { status: 404 });
    } 
}

