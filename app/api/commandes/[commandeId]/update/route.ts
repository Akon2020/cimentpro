import { prisma } from "@/lib/prisma";
import { CommandeParams } from "@/prisma/definitions";


export async function PUT (req: Request, { params }: CommandeParams ) {
    const { commandeId } = await params;
    const data = await req.json();
    const dateLivraisonEffective = new Date(data.dateLivraisonEffective);
    let total_ttc = 0;
    let total_ht = 0;

    const commande = await prisma.commande.findUnique({
        where: { id: parseInt(commandeId) },
    })

    if (!commande) return new Response("Commande Not Found", { status: 201 });

    const detail_panier = await prisma.detailPanier.findMany({
        where: { panierId: commande.panierId },
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

    try {
        const paiement = await prisma.paiement.update({
            where: { id: commande.paiementId },
            data: { 
                montant: data.total_ht,
                deviseId: data.deviseId,
                moyen_paiement: data.moyen_paiement
            }
        });

        await prisma.commande.update({
            where: { id: commande.id },
            data: {
                panierId: commande.panierId,
                nom: data.client.nom ? data.client.nom : null,
                tel: data.client.tel ? data.client.tel : null,
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
        return new Response("Commande updated!", { status: 201 });
    } catch (error) {
        return new Response("Commande updated failed!", { status: 201 });
    }    
}
