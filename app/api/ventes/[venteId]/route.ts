import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams {
    venteId: string
}

export async function GET(req: Request, { params }: { params: RouteParams}) {
    const { venteId } = await params;

    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId, 10) }
    });

    if (!vente) {
        return new Response("vente not found", { status: 201 });        
    }

    return new Response(JSON.stringify(vente), { status: 201 });
}

export async function PUT(req: NextRequest, { params }: { params: RouteParams}) {
    const requestParams = req.nextUrl.searchParams;
    const panierId = requestParams.get('panierId');
    const { venteId } = await params;
    const data = await req.json();
    let total_ttc = 0;
    let total_ht = 0;
    
    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId, 10) }
    });

    if (!vente) {
        return new Response("vente not found", { status: 201 });        
    }

    const detail_panier = await prisma.detailPanier.findMany({
        where: { panierId: vente.panierId },
        select: {
            produitId: true,
            qtte: true,
            prixTotal: true
        }
    });

    for (let i = 0; i < detail_panier.length; i++) {
        total_ht += detail_panier[i].prixTotal;
    }

    let paiementId = 0
    const paiement = await prisma.paiement.findUnique({
        where: { id: vente.paiementId }
    });

    if (paiement) {
        paiementId = paiement.id
    }

    try {
        if (panierId) {
            if (vente.panierId == parseInt(panierId, 10)) {
                if (data.type_acheteur !== 'nouveau') {
                    // Paiement...
                    await prisma.paiement.update({
                        where: { id: vente.paiementId },
                        data: { 
                            montant: data.total_ht,
                            deviseId: data.deviseId,
                            moyen_paiement: data.moyen_paiement
                        }
                    });

                    // vente
                    await prisma.vente.update({
                        where: {
                            id: vente.id
                        },
                        data: {
                            panierId: parseInt(panierId, 10),
                            type_acheteur: data.type_acheteur,
                            statut: data.statut,
                            total_ttc: total_ttc,
                            total_ht: total_ht,
                            paiementId: paiementId,
                            fournisseurId: data.fournisseurId ? data.fournisseurId : null,
                            clientId: data.clientId ? data.clientId : null,
                            agentId: parseInt(data.agentId, 10),
                            enregisterParId: data.utilisateurId
                        }
                    }); 

                    // Update vente...
                    const produits = await prisma.produit.updateMany({
                        where: {
                            id: {
                                in: detail_panier.map(item => item.produitId)
                            }
                        },
                        data: {
                            qtte: {
                                decrement: detail_panier.find(item => item.produitId === item.produitId)?.qtte || 0
                            }
                        }
                    });
                    return new Response("Vente updated!", { status: 201 });        
                }
            }            
        }

        if (!panierId) {
            return new Response("Panier not found", { status: 404 });        
        }
                
    } catch (error) {
        return new Response("Invalid form", { status: 201 });        
    }    

    return new Response(JSON.stringify(vente), { status: 201 });
}


export async function DELETE(req: Request, { params }: { params: RouteParams}) {
    const { venteId } = await params;

    try {
        const vente = await prisma.vente.delete({
            where: { id: parseInt(venteId, 10) }
        })
        return new Response("Vente Deleted", { status: 201 });
    } catch (error) {
        return new Response("vente not found", { status: 201 });
    }
}