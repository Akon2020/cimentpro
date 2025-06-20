import { prisma } from "@/lib/prisma";
import { PanierRouteParams, ProduitsDisponible } from "@/prisma/definitions";
import { checkTable, CreatePaiement, GetDetailPanier, getNomComplet, GetProduit, UpdateCaisse, VerifyDevisePanier } from "@/prisma/utils";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest, { params }: PanierRouteParams) {
    const { panierId, agentId } = await params;
    const form = await request.json();
    form.categorie = 'VENTE'
    let totalTTC = 0;
    let totalHT = 0;
    
    try {
        if (panierId && agentId) {
            const panier = await checkTable('panier', panierId);
            if (!panier) return new Response("Panier Not Found!", { status: 404 });

            const DetailsDuPanier = await GetDetailPanier(panier?.id);
            const ProduitsDisponible = await GetProduit(DetailsDuPanier);
            
            for (let i = 0; i < DetailsDuPanier.length; i++) {
                const Detail = DetailsDuPanier[i];
                totalHT += Detail.prixTotalHT;
                if (Detail.qtte > ProduitsDisponible[i].qtteDisponible) return new Response(`Produit ${ProduitsDisponible[i].designation} N'est Pas Disponible en Stock`, { status: 404 });
            }

            // totalTTC = (totalHT) * 0.16; // Le TVA est de 16%

            const paiementForm = {
                montant: totalHT,
                modePaiement: form.modePaiement
            }

            const verification = await VerifyDevisePanier(DetailsDuPanier, paiementForm);

            // const t = await CaisseIncrement(detail_panier, form.deviseId);
            
            return new Response(JSON.stringify(verification), { status : 201 });

            // UpdateCaisse(request, totalHT, form);

            // let nouveauClient = null;
            // if (form.typeAcheteur === 'NOUVEAU') {
            //     nouveauClient = await prisma.client.create({
            //         form: {
            //             nom: form.form.nom,
            //             postnom: form.form.postnom ? form.form.postnom : null,
            //             nom_complet: getNomComplet(form.form),
            //             email: form.form.email
            //         }
            //     });

            //     if (form.form.tel) {
            //         await prisma.contact.create({
            //             form: {
            //                 tel: form.form.tel,
            //                 clientId: nouveauClient.id
            //             }
            //         });
            //     }

            //     if (form.form.adresse) {
            //         await prisma.adresse.create({
            //             form: {
            //                 ville: 'Put in into optional Field',
            //                 adresse: form.form.adresse,
            //                 clientId: nouveauClient.id
            //             }
            //         });
            //     }
            // }

            // const vente = await prisma.vente.create({
            //     form: {
            //         panierId: parseInt(panierId),
            //         typeAcheteur: form.typeAcheteur,
            //         totalTTC: totalTTC,
            //         totalHT: totalHT,
            //         paiementId: paiement.id,
            //         fournisseurId: form.fournisseurId && form.typeAcheteur == 'FOURNISSEUR' ? parseInt(form.fournisseurId) : null,
            //         clientId: form.clientId && form.typeAcheteur == 'CLIENT' ? parseInt(form.clientId) : nouveauClient ? nouveauClient?.id : null,
            //         agentId: parseInt(form.agentId)
            //         // add creeParId* attr. table
            //     }
            // });

            // const conversion = await ConversionDevise(request, agentId, detail_panier, form.deviseId);
            
            // return new Response(JSON.stringify(conversion));
            // // Verift and create a cloture caisse...
            // const clotureCaisse = await VerifyClotureCaisse(form.enregistrerParId);
            // CreateMouvementCaisse(totalHT, vente.id, form);
            return new Response("Vente Successed!", { status : 201 });
        }
    } catch (error) {
        return new Response("Invalid Form", { status : 201 });        
    }    
} 

 