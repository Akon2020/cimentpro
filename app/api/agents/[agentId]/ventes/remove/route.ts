import { prisma } from "@/lib/prisma";
import { VenteRouteParams } from "@/prisma/definitions";

export async function DELETE(req: Request, { params }: VenteRouteParams) {
    const { venteId } = await params;

    try {
        const vente = await prisma.vente.delete({
            where: { id: parseInt(venteId, 10) }
        })
        return new Response("Vente Deleted", { status: 201 });
    } catch (error) {
        return new Response("vente not found", { status: 201 });
    }
}