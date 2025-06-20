import { prisma } from "@/lib/prisma";
import { PanierRouteParams } from "@/prisma/definitions";


export async function GET({ params }: PanierRouteParams) {
    const { agentId, panierId } = await params;

    // verify panier with statut* attr
    const detailPanier = await prisma.detailPanier.findFirst({
        where: { 
            panierId: parseInt(panierId), 
            // panier: link with panier table*
        }
    });
    return new Response(JSON.stringify(detailPanier), { status: 201});
}

