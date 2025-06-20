import { prisma } from "@/lib/prisma";
import { MouvementRouteParams } from "@/prisma/definitions";

export async function GET (request: Request, { params }: MouvementRouteParams ) {
    const { caisseId } = await params;

    const mouvementCaisse = await prisma.mouvementCaisse.findMany({
        where: {caisseId: parseInt(caisseId)}
    });

    return new Response(JSON.stringify(mouvementCaisse), { status: 201 });
}



 