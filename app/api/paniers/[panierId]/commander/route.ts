import { prisma } from "@/lib/prisma";
import { PanierParams } from "@/prisma/definitions";
import { CreateMouvementCaisse, UpdateCaisse } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: PanierParams) {
    const data = await req.json();
    data.type_mouvement = 'SORTIE'
    data.categorie = 'COMMANDE'
    const { panierId } = await params;
    const dateLivraisonEffective = new Date(data.dateLivraisonEffective);
    let total_ttc = 0;
    let total_ht = 0;

    if (panierId) {
        const panier = await prisma.panier.findUnique({
            where: { id: parseInt(panierId) }
        });

        if (!panier) return new Response("Panier not found", { status: 201 });

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
                moyen_paiement: data.moyen_paiement,
                deviseId: data.deviseId,
                caisseId: parseInt(data.caisseId)
            }
        });

        const commande = await prisma.commande.create({
            data: {
                panierId: panier.id,
                nom: data.client.nom ? data.client.nom : null,
                tel: data.client.tel ? data.client.tel : null,
                type_client: data.type_client,
                clientId: data.clientId ? parseInt(data.clientId) : null,
                paiementId: paiement.id,
                adresseId: data.adresseId ? parseInt(data.adresseId) : null,
                contactId: data.contactId ? parseInt(data.contactId) : null,
                fournisseurId: data.fournisseurId ? parseInt(data.fournisseurId) : null,
                notes: data.notes ? data.notes : null,
                dateLivraisonEffective: dateLivraisonEffective,
                adresseLivraison: data.adresseLivraison ? data.adresseLivraison : null,
                enregistrerParId: data.enregistrerParId ? parseInt(data.enregistrerParId) : null
            }
        });

        UpdateCaisse(total_ht, data);
        CreateMouvementCaisse(total_ht, commande.id, data);

        return new Response("Commande created!", { status: 201 });

    }
    
    return new Response("Invalid Form!", { status: 201 });
} 

