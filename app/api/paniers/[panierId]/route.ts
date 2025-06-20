
import { prisma } from "@/lib/prisma";
import { PanierParams } from "@/prisma/definitions";

export async function GET(req: Request, { params } : PanierParams) {
    const { panierId } = await params;

    const panier = await prisma.panier.findUnique({
        where: { id: parseInt(panierId, 10) }
    });

    if(!panier) return new Response('Panier Not Existed', { status: 404 });


    return new Response(JSON.stringify(panier), { status: 201 });
}

