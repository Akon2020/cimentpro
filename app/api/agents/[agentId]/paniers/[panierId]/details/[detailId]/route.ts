import { prisma } from "@/lib/prisma";
import { DetailRouteParams } from "@/prisma/definitions";


export async function GET (req: Request, { params }: DetailRouteParams) {
    const { panierId, detailId } = await params;
    const detailPanier = await prisma.detailPanier.findUnique({
        where: {
            id: parseInt(detailId),
            panierId: parseInt(panierId)
        }
    });

    if (!detailPanier) return new Response(JSON.stringify({ error: "Detail Achat not found" }), { status: 404 });

    return new Response(JSON.stringify(detailPanier), { status: 201 });
}


