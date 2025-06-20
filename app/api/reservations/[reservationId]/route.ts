import { prisma } from "@/lib/prisma";
import { ReservationParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";


export async function GET(req: Request, { params }: ReservationParams) {
    const { reservationId } = await params;

    const reservation = await prisma.reservation.findUnique({
        where: { id: parseInt(reservationId) }
    });

    if (!reservation) {
        return new Response("Reservation not found", { status: 201 });
    }

    return new Response(JSON.stringify(reservation), { status: 404 });
}



