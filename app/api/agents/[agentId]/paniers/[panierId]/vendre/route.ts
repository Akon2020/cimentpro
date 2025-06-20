import { prisma } from "@/lib/prisma";
import { PanierRouteParams } from "@/prisma/definitions";
import { checkTable, GetDetailPanier, GetProduit, Paiement, VariationCaisse, VariationStockage, Vente } from "@/prisma/utils";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest, { params }: PanierRouteParams) {
    const { panierId, agentId } = await params;
    const form = await request.json();
    
    try {
        if (panierId && agentId) {
            const panier = await checkTable('panier', panierId);
            if (!panier) return new Response("Panier Not Found!", { status: 404 });

            const DetailsDuPanier = await GetDetailPanier(panier?.id);
            const ProduitsDisponible = await GetProduit(DetailsDuPanier);
            
            for (let i = 0; i < DetailsDuPanier.length; i++) {
                const Detail = DetailsDuPanier[i];
                if (Detail.qtte > ProduitsDisponible[i].qtteDisponible) return new Response(`Produit ${ProduitsDisponible[i].designation} N'est Pas Disponible en Stock`, { status: 404 });
            }

            let nouveauClient: any | null = null;
            if (form.typeAcheteur === 'NOUVEAU') {
                try {
                    nouveauClient = await prisma.client.create({
                        data: {
                            nom: form.client.nom,
                            nom_complet: form.client.nom,
                            email: form.client.email
                        }
                    });

                    if (nouveauClient) {
                        await prisma.contact.create({
                            data: {
                                tel: form.client.tel,
                                clientId: nouveauClient.id
                            }
                        });

                        await prisma.adresse.create({
                            data: {
                                adresse: form.client.adresse,
                                clientId: nouveauClient.id
                            }
                        });
                    }
                    
                } catch (error) {
                    return new Response("Formulaire Client Invalide", { status : 404 });
                }
            }

            let data = {
                ...form,
                panierId: parseInt(panierId)
            };

            const vente = await Vente(DetailsDuPanier, agentId, data, nouveauClient);            
            const paiement = await Paiement(DetailsDuPanier, null, vente.id, null);
            const destockage = await VariationStockage (DetailsDuPanier, null, true, null);
            const encaissement = await VariationCaisse(DetailsDuPanier, null, true, null);
            
            // const clotureCaisse = await VerifyClotureCaisse(form.enregistrerParId);
            // CreateMouvementCaisse(totalHT, vente.id, form);
            
            return new Response(JSON.stringify({ vente, paiement }), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        return new Response("Invalid Form", { status : 201 });        
    }    
} 

 