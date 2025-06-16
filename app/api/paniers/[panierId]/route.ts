import { prisma } from "@/lib/prisma";

interface RouteParams {
    panierId: string
}

export async function GET(req: Request, { params } : { params: RouteParams }) {
    const { panierId } = await params;

    try {
        const panier = await prisma.panier.findUnique({
            where: { id: parseInt(panierId, 10) }
        });

        return new Response(JSON.stringify(panier), { status: 201 });        
    } catch (error) {
        return new Response('not existed');
    }
}

