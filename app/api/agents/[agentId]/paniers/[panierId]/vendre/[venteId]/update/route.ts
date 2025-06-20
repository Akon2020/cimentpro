import { prisma } from "@/lib/prisma";
import { VenteRouteParams } from "@/prisma/definitions";
// import { GetDetailPanier } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: VenteRouteParams ) {
    const { venteId, panierId } = await params;
    const form = await request.json();
    let totalTTC = 0;
    let totalHT = 0;
    
    const vente = await prisma.vente.findUnique({
        where: { id: parseInt(venteId)},
        select: { id: true,  panierId: true }
    });

    if (!vente) return new Response("vente not found", { status: 201 });
    
    const panier = await prisma.panier.findUnique({
        where: {id: parseInt(panierId)},
        select: {id: true, agentId: true}
    });

    if (!panier) return new Response('Panier Not Found!', { status: 404 });
    // Gere la difference des produits
    try {
        if (panierId) {
            if (vente.panierId == parseInt(panierId)) {
                // const DetailsDuPanier = await GetDetailPanier(panier.id);
                // const destockage = await DestockageVente(DetailsDuPanier);

                // const update_vente = await prisma.vente.update({
                //     where: { id: vente.id },
                //     data: {
                //         panierId: parseInt(panierId, 10),
                //         typeAcheteur: data.typeAcheteur,
                //         statut: data.statut,
                //         fournisseurId: data.fournisseurId ? data.fournisseurId : null,
                //         clientId: data.clientId ? data.clientId : null,
                //         agentId: parseInt(data.agentId, 10),
                //         // enregistrerParId: data.utilisateurId
                //     }
                // }); 

                // const paiement = await prisma.paiement.update({
                //     where: { id: vente.panierId },
                //     data: {
                //         modePaiement: data.modePaiement,
                //         deviseId: data.deviseId,
                //         caisseId: data.caisseId
                //     }
                // });
                
                // if (data.typeAcheteur !== 'NOUVEAU') {
                //     // Paiement...
                //     const paiement = await prisma.paiement.update({
                //         where: { id: vente.paiementId },
                //         data: { 
                //             montant: data.totalHT,
                //             deviseId: data.deviseId,
                //             modePaiement: data.modePaiement
                //         }
                //     });

                //     return new Response("Vente updated!", { status: 201 });        
                // }

                return new Response(JSON.stringify(form));
            }            
        }    
        return new Response(JSON.stringify({ vente, panier }), { status: 201 });
    } catch (error) {
        return new Response("Invalid form", { status: 201 });        
    }
}