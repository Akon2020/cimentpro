import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
    const ventes = await prisma.vente.findMany({
        // // where: {},
        // select: {
        //     statut: true,
        //     utilisateur: {
        //         select: {
        //             nom_complet: true,
        //         }
        //     },
        //     panier: {
        //         select: {
        //             DetailAchat: {
        //                 select: {
        //                     produit: {
        //                         select: {
        //                             designation: true,
        //                         }
        //                     },
        //                     qtte: true,
        //                     prixUnitaire: true,
        //                     prixTotal: true
        //                 }
        //             }
        //         }
        //     },
        //     paiement: {
        //         select: {
        //             montant: true,
        //             devise: {
        //                 select: {
        //                     nom: true,
        //                     code: true,
        //                     symbole: true,
        //                 }
        //             },
        //         }
        //     },
        //     fournisseur: {
        //         select: {
        //             nom: true,
        //             email: true
        //         }
        //     }
        // }
    });
    return new Response(JSON.stringify(ventes), { status: 201 });
} 

export async function POST(req: NextRequest) {
    const requestParams = req.nextUrl.searchParams;
    const panierId = requestParams.get('panierId');
    const data = await req.json();
    let total_ttc = 0;
    let total_ht = 0;
    const nom_complet =  data.nouveau_client.nom + ' ' + data.nouveau_client.postnom

    try {
        if (panierId) {    
            const panier = await prisma.panier.findUnique({
                where: { 
                    id: parseInt(panierId, 10),
                    // statut: "en_cours"
                }
            });

            if (!panier) {
                return new Response("Panier not found", { status: 404 });
            }

            const detail_panier = await prisma.detailPanier.findMany({
                where: { panierId: panier.id },
                select: {
                    produitId: true,
                    qtte: true,
                    prixTotal: true
                }
            });

            for (let i = 0; i < detail_panier.length; i++) {
                total_ht += detail_panier[i].prixTotal;
            }

            total_ttc = (total_ht) * 0.16; // Pour une taxe de 16%

            const paiement = await prisma.paiement.create({
                data: {
                    montant: total_ht,
                    deviseId: parseInt(data.deviseId, 10),
                    moyen_paiement: data.moyen_paiement,
                }
            });

            if (data.type_acheteur === 'nouveau') {
                const user = await prisma.utilisateur.create({
                    data: {
                        nom: data.nouveau_client.nom,
                        postnom: data.nouveau_client.postnom,
                        nom_complet: nom_complet,
                        email: data.nouveau_client.email
                    }
                });

                const contact = await prisma.contact.create({
                    data: {
                        tel: data.nouveau_client.tel,
                        utilisateurId: 1
                    }
                });

                const vente = await prisma.vente.create({
                    data: {
                        panierId: parseInt(panierId, 10),
                        type_acheteur: 'client',
                        total_ttc: total_ttc,
                        total_ht: total_ht,
                        paiementId: paiement.id,
                        clientId: 1,
                        enregisterParId: data.utilisateurId
                    }
                }); 

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
                return new Response(JSON.stringify('vente successed!'), { status : 201 });
            }


            if (data.type_acheteur !== 'nouveau') {
                await prisma.vente.create({
                    data: {
                        panierId: parseInt(panierId, 10),
                        type_acheteur: data.type_acheteur,
                        total_ttc: total_ttc,
                        total_ht: total_ht,
                        paiementId: paiement.id,
                        fournisseurId: data.fournisseurId ? data.fournisseurId : null,
                        clientId: data.clientId ? data.clientId : null,
                        agentId: parseInt(data.agentId, 10),
                        enregisterParId: data.utilisateurId
                    }
                }); 

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

                return new Response("Vente successed", { status : 201 });
            }

            return new Response("Vente successed", { status : 201 });
        }
    } catch (error) {
        return new Response("Invalid Form", { status : 201 });        
    }    
}