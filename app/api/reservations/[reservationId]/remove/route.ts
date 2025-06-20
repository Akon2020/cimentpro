import { prisma } from "@/lib/prisma";
import { ReservationParams } from "@/prisma/definitions";

export async function DELETE(req: Request, { params }: ReservationParams) {
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
