import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const idCommande = searchParams.get('id');

    const commandes = await prisma.commande.findMany({
        // where: { OR: [{ id: idCommande ? { contains: id, mode: 'insensitive' } : undefined }]}
    });
    return new Response(JSON.stringify(commandes));
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const panierId = searchParams.get('panierId');
    const dateLivraisonEffective = new Date(data.dateLivraisonEffective);
    let total_ttc = 0;
    let total_ht = 0;

    if (panierId) {
        const panier = await prisma.panier.findUnique({
            where: { id: parseInt(panierId) }
        });

        if (!panier) {
            return new Response("Panier not found", { status: 201 });
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

        const paiement = await prisma.paiement.create({
            data: {
                montant: total_ht,
                moyen_paiement: data.moyen_paiement,
                deviseId: data.deviseId
            }
        });

        const commande = await prisma.commande.create({
            data: {
                panierId: panier.id,
                nom: data.client_ordinaire.nom ? data.client_ordinaire.nom : null,
                tel: data.client_ordinaire.tel ? data.client_ordinaire.tel : null,
                type_client: data.type_client,
                clientId: data.clientId ? data.clientId : null,
                paiementId: paiement.id,
                adresseId: data.adresseId ? data.adresseId : null,
                contactId: data.contactId ? data.contactId : null,
                fournisseurId: data.fournisseurId ? data.fournisseurId : null,
                notes: data.notes ? data.notes : null,
                dateLivraisonEffective: dateLivraisonEffective,
                adresseLivraison: data.adresseLivraison ? data.adresseLivraison : null,
                enregistrerParId: data.enregistrerParId ? data.enregistrerParId : null
            }
        });

    }
    
    return new Response("got");
}