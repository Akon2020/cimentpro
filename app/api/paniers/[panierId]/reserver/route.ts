import { prisma } from "@/lib/prisma";
import { PanierParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: PanierParams ) {
    const data = await req.json();
    const { panierId } = await params;

    if (panierId) {
        const panier = await prisma.panier.findUnique({
            where: { id: parseInt(panierId) }
        });

        if (!panier) {
            return new Response("Panier Not Found", { status: 404 });
        }

        try {
            const date = new Date(data.dateLivraisonSouhaitee);
            const reservation = await prisma.reservation.create({
                data: {
                    panierId: panier.id,
                    nom: data.client_ordinaire.nom,
                    tel: data.client_ordinaire.tel,
                    dateLivraisonSouhaitee: date,
                    adresseLivraison: data.adresseLivraison ? data.adresseLivraison : null,
                    type_client: data.type_client ? data.type_client : null,
                    adresseId: data.adresseId ? parseInt(data.adresseId) : null,
                    clientId: data.clientId ? parseInt(data.clientId) : null,
                    contactId: data.contactId ? parseInt(data.contactId) : null,
                    enregistrerParId: data.enregistrerParId ? parseInt(data.enregistrerParId, 10): null,
                    fournisseurId: data.fournisseurId ? parseInt(data.fournisseurId) : null,
                    notes: data.notes ? data.notes : null
                }
            });
            return new Response("Reservation successed!", { status: 201 });
        } catch (error) {
            return new Response("Invalid Form", { status: 201 });
        }
    }
}
