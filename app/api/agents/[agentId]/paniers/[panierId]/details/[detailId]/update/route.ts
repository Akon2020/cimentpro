import { DetailPanier } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { DetailRouteParams } from "@/prisma/definitions";
import { FindVente, PrixUnitaireSystem, UpdateDetailPanier, RetraitPaiement } from "@/prisma/utils";
import { NextRequest } from "next/server";


export async function PUT (request: NextRequest, { params }: DetailRouteParams) {
    const { agentId, panierId, detailId } = await params;
    const form: DetailPanier = await request.json();
    form.prixUnitaire = await PrixUnitaireSystem(form.produitId, form.prixUnitaire);
    form.prixTotalHT = form.qtte * form.prixUnitaire;
    form.prixTotalTTC = form.prixTotalHT * 0.16;
    
    const panier = await prisma.panier.findUnique({
        where: { id: parseInt(panierId)}
    });

    if (!panier) return new Response("Panier Not Found", { status: 404 });

    const detailPanier = await prisma.detailPanier.findUnique({
        where: { id: parseInt(detailId) },
    });

    if (!detailPanier) return new Response("Detail Not Found", { status: 404 });

    try {
        let differenceRecue = 0;
        if (detailPanier.qtte > form.qtte) {
            if (detailPanier.id == parseInt(detailId)) {
                differenceRecue = detailPanier.qtte - form.qtte;
                const vente = await FindVente(detailPanier.panierId);
                
                let montantRetrait = differenceRecue * form.prixUnitaire;
                let data = {
                    detailId: detailPanier.id,
                    produitId: form.produitId,
                    montantRetrait: montantRetrait,
                    modePaiement: form.modePaiement
                }

                if (vente) {
                    
                    // const updateDetailPanier = await UpdateDetailPanier(detailPanier.id, form);
                    // const variation = await VariationProduitVente(updateDetailPanier.produitId, 'inc', differenceRecue);
                    // await UpdateVente(vente.id, 'dec', montantRetrait, nouveauPrixTotalTTC);
                    
                    // const retraitPaiement = await RetraitPaiement(vente, data); // complited
                    
                    // const caisse = await prisma.caisse.findUnique({
                    //     where: { id: paiement.caisseId },
                    //     select: {soldeActuel: true}
                    // });

                    // if (caisse?.soldeActuel) if (caisse?.soldeActuel < montantRetrait) return new Response("Solde insuffisant!", {status: 404});
                    // await UpdateCaisses(paiement.caisseId, 'dec', montantRetrait);                
                    // "Detail updated!"
                    return new Response(JSON.stringify('updateDetailPanier'), { status: 201 });
                }
                
                return new Response("Vente Not Found!", { status: 404 });
            } // 
            return new Response(JSON.stringify("The Id* in param is same in form. Don't change it"), { status: 200 });
        }

        // let differenceRemue = 0; 
        // if (detailPanier.qtte < form.qtte) { // Decrementation
        //     if (detailPanier.id == parseInt(detailId) && detailPanier.produitId == form.produitId) {
        //         differenceRemue = form.qtte - detailPanier.qtte;
        //         // Update totalHT and totalTTC In vente Table
        //         const vente = await FindVente(detailPanier.panierId);
                
        //         let montantDAjout = differenceRemue * form.prixUnitaire;
        //         if (vente) {
        //             // Mis à jour du detail du panier
        //             const updateDetailPanier = await UpdateDetailPanier(detailPanier.id, form);
        //             let nouveauPrixTotalHT = updateDetailPanier.prixTotalHT - detailPanier.prixTotalHT
        //             let nouveauPrixTotalTTC = updateDetailPanier.prixTotalTTC - detailPanier.prixTotalTTC
                    
        //             // Verifier la disponibilité
        //             const produit = await prisma.produit.findUnique({
        //                 where: { id: form.produitId },
        //                 select: { id: true, qtteDisponible: true }
        //             });
                    
        //             // Recupere la qtte en sock disponible
        //             if (produit) if (produit?.qtteDisponible < differenceRemue) return new Response("Qtté Non Disponible en stock");
        //             produit ? await VartiationProduitVente(produit?.id, 'dec', differenceRemue) : '';
        //             await UpdateVente(vente.id, 'inc', nouveauPrixTotalHT, nouveauPrixTotalTTC);
        //             const paiement = await UpdatePaiement(vente.paiementId, 'inc', montantDAjout);
        //             await UpdateCaisses(paiement.caisseId, 'inc', montantDAjout);                    
                
        //             return new Response("Detail Updated!", { status: 201 });
        //         }
        //         return new Response("Vente Not Found!", { status: 404 });
        //     }

        //     return new Response("Pas de modification...", { status: 200 });
        // }

        // if (detailPanier.qtte == form.qtte) return new Response("Detail Mis a jour", { status: 201 });
        
    } catch (error) {
        return new Response("Invalid Form!", { status: 404 });
    }
}






