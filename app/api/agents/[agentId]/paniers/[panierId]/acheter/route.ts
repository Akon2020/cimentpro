import { Achat, Paiement } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { PanierRouteParams } from "@/prisma/definitions";
import { CreateMouvementCaisse, UpdateCaisse, updateCaisseMouvement } from "@/prisma/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, { params }: PanierRouteParams) {
    const { panierId } = await params;
    const data = await request.json();
    data.type_mouvement = 'ENTREE';
    // data.categorie = 'ACHAT';
    let montant = 0;

    try {
        const panier = await prisma.panier.findUnique({
            where: {  id: parseInt(panierId) }
        });

        if (!panier) return new Response("Panier not found", { status: 404 });

        const detail_panier = await prisma.detailPanier.findMany({
            where: { panierId: parseInt(panierId) },
            select: {
                produitId: true,
                qtte: true,
                prixTotal: true
            }
        });

        for (let i = 0; i < detail_panier.length; i++) {
            montant += detail_panier[i].prixTotal;
        }

        const resultCaisse = await UpdateCaisse(request, montant, data);
        if (typeof resultCaisse == 'object' && Object.keys(resultCaisse).length == 0) return resultCaisse;
        
        const paiement = await prisma.paiement.create({
            data: {
                montant: montant,
                deviseId: parseInt(data.deviseId),
                modePaiement: data.modePaiement,
                caisseId: parseInt(data.caisseId)
            }
        });

        const achat = await prisma.achat.create({
            data: {
                panierId: parseInt(panierId),
                fournisseurId: parseInt(data.fournisseurId),
                paiementId: paiement.id,
                agentId: parseInt(data.agentId)
            }
        });        

        const produits = await prisma.produit.updateMany({
            where: { id: { in: detail_panier.map(item => item.produitId) } },
            data: { qtteDisponible: { increment: detail_panier.find(item => item.produitId === item.produitId)?.qtte || 0 } }
        });
        
    //     // Diminuer sur la caisse...
    // resultCaisse* contain the timestamp values of caisse table
    //     // let default_type_mouvement: TypeMouvement = 'ENTREE'
        
    //     CreateMouvementCaisse(montant, achat.id, data);
        return new Response(JSON.stringify("Achat Successed!"), { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 400 });
    }
} 





