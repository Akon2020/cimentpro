import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RouteParams {
    reservationId: string
}

export async function GET(req: Request, { params }: { params: RouteParams }) {
    const { reservationId } = await params;

    const reservation = await prisma.reservation.findUnique({
        where: { id: parseInt(reservationId) }
    });

    if (!reservation) {
        return new Response("Reservation not found", { status: 201 });
    }

    return new Response(JSON.stringify(reservation), { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: RouteParams }) {
    const { reservationId } = await params;
    const data = await req.json();
    const date = new Date(data.dateLivraisonSouhaitee);

    try {

        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(reservationId) }
        });

        if (!reservation) {
            return new Response("Reservation not found", { status: 201 });
        }
        
        const panier = await prisma.panier.findUnique({
            where: { id: reservation.panierId }
        });

        if (!panier) {
            return new Response("Panier Not Found", { status: 404 });
        }

        await prisma.reservation.update({
            where: { id: reservation.id },
            data: {
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
        return new Response("Update Successeful!", { status: 201 });
    } catch (error) {
        return new Response('Invalid Form', { status: 404 });
    }
}

export async function DELETE(req: Request, { params }: { params: RouteParams }) {
    const { reservationId } = await params;

    try {
        await prisma.reservation.delete({
            where: { id: parseInt(reservationId) }
        });

        return new Response('Delete Successed!');
        
    } catch (error) {
        return new Response('Reservation not found');
    }
}

