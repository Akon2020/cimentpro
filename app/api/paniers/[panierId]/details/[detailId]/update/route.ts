import { DetailPanier } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { DetailRouteParams } from "@/prisma/definitions";


export async function PUT (request: Request, { params }: DetailRouteParams) {
    const { panierId, detailId } = await params;
    const data: DetailPanier = await request.json();
    let prixTotal = data.qtte * data.prixUnitaire
    
    const panier = await prisma.panier.findUnique({
        where: { id: parseInt(panierId)}
    });

    if (!panier) return new Response("Panier Not Found", { status: 404 });


    const detailPanier = await prisma.detailPanier.findUnique({
        where: { id: parseInt(detailId)}
    });

    if (!detailPanier) return new Response("Detail Not Found", { status: 404 });

    try {
        const detailPanier = await prisma.detailPanier.update({
            where: {
                id: parseInt(detailId),
                panierId: parseInt(panierId)
            },
            data: {
                ...data,
                prixTotal: prixTotal
            }
        });

        return new Response("Detail updated!", { status: 200 });
    } catch (error) {
        return new Response("Detail Achat not found", { status: 404 });
    }
    
}




