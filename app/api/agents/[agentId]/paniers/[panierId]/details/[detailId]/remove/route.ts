import { prisma } from "@/lib/prisma";
import { DetailRouteParams } from "@/prisma/definitions";


export async function DELETE (request: Request, { params }: DetailRouteParams) {
    const { panierId, detailId } = await params;

    const panier = await prisma.panier.findUnique({
        where: { id: parseInt(panierId)}
    });

    if (!panier) return new Response("Panier Not Found", { status: 404 });


    const detailPanier = await prisma.detailPanier.findUnique({
        where: { id: parseInt(detailId)}
    });

    if (!detailPanier) return new Response("Detail Not Found", { status: 404 });


    try {
        await prisma.detailPanier.delete({
            where: {
                id: parseInt(detailId),
                panierId: parseInt(panierId)
            }
        });

        return new Response("Detail Achat deleted!", { status: 200 });
    } catch (error) {
        return new Response("Detail Achat not found", { status: 404 });
    }
}

