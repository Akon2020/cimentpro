import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const achats = await prisma.achat.findMany({
        // where: {},
        select: {
            statut: true,
            utilisateur: {
                select: {
                    nom_complet: true,
                }
            },
            panier: {
                select: {
                    DetailPanier: {
                        select: {
                            produit: {
                                select: {
                                    designation: true,
                                }
                            },
                            qtte: true,
                            prixUnitaire: true,
                            prixTotal: true
                        }
                    }
                }
            },
            paiement: {
                select: {
                    montant: true,
                    devise: {
                        select: {
                            nom: true,
                            code: true,
                            symbole: true,
                        }
                    },
                }
            },
            fournisseur: {
                select: {
                    nom: true,
                    email: true
                }
            }
        }
    });
    return new Response(JSON.stringify(achats), { status: 501 });
}


export async function POST(req: Request) {
    const data = await req.json();
    let montant = 0;

    try {

        const panier = await prisma.panier.findUnique({
            where: { 
                id: parseInt(data.panierId, 10),
                // statut: "en_cours"
            }
        });

        if (!panier) {
            return new Response("Panier not found", { status: 404 });
        }

        const detail_panier = await prisma.detailPanier.findMany({
            where: { panierId: parseInt(data.panierId, 10) },
            select: {
                produitId: true,
                qtte: true,
                prixTotal: true
            }
        });

        for (let i = 0; i < detail_panier.length; i++) {
            montant += detail_panier[i].prixTotal;
        }

        const paiement = await prisma.paiement.create({
            data: {
                montant: montant,
                deviseId: parseInt(data.deviseId, 10),
                moyen_paiement: data.moyen_paiement,
            }
        });

        const achat = await prisma.achat.create({
            data: {
                panierId: parseInt(data.panierId, 10),
                fournisseurId: parseInt(data.fournisseurId),
                paiementId: paiement.id,
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
                    increment: detail_panier.find(item => item.produitId === item.produitId)?.qtte || 0
                }
            }
        });
        
        // Delete panier's status

        return new Response(JSON.stringify("Achat Successed!"), { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 400 });
    }
} 

