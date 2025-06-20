import { Achat } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { PanierRouteParams } from "@/prisma/definitions";
import { CreateMouvementCaisse, VariationStockage, GetDetailPanier, Paiement, UpdateCaisse, updateCaisseMouvement, VariationCaisse } from "@/prisma/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, { params }: PanierRouteParams) {
    const { agentId, panierId } = await params;
    const form: Achat = await request.json();
    
    const agent = await prisma.agent.findUnique({
            where: { id: parseInt(agentId) }
        });

    if (!agent) return new Response("Agent not found", { status: 404 });

    const panier = await prisma.panier.findUnique({
        where: { id: parseInt(panierId) }
    });

    if (!panier) return new Response("Panier not found", { status: 404 });

    try {

        const detailsPanier = await GetDetailPanier(parseInt(panierId));

        const achat = await prisma.achat.create({
            data: {
                fournisseurId: form.fournisseurId,
                panierId: parseInt(panierId),
                agentId: parseInt(agentId)
            }
        });

        const stockage = await VariationStockage (detailsPanier, true, null, null);
        const paiement = await Paiement (detailsPanier, achat.id, null, null);
        const decaissement = await VariationCaisse(detailsPanier, true, null, null);
        
        if (decaissement) return new Response(`Montant Not Disponible Pour La Caisse "${decaissement}"`, { status: 404 });

        // CreateMouvementCaisse(montant, achat.id, data);
        return new Response(JSON.stringify(decaissement), { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 400 });
    }
} 





