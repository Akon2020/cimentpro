import { prisma } from "@/lib/prisma";

interface RouteParams { 
    panierId: string, 
    detailPanierId: string 
}

export async function GET (req: Request, { params }: { params: RouteParams }) {
    const { panierId, detailPanierId } = await params;
    const detailPanier = await prisma.detailPanier.findUnique({
        where: {
            id: parseInt(detailPanierId, 10),
            panierId: parseInt(panierId, 10)
        }
    });

    if (!detailPanier) {
        return new Response(JSON.stringify({ error: "Detail Achat not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(detailPanier), { status: 201 });
}


export async function PUT (req: Request, { params }: { params: RouteParams }) {
    const { panierId, detailPanierId } = await params;
    const data = await req.json();

    try {
        const updateddetailPanier = await prisma.detailPanier.update({
            where: {
                id: parseInt(detailPanierId, 10),
                panierId: parseInt(panierId, 10)
            },
            data: {
                produitId: parseInt(data.produitId, 10),
                qtte: parseInt(data.qtte, 10),
                prixUnitaire: parseFloat(data.prixUnitaire),
                prixTotal: parseFloat(data.prixUnitaire) * parseInt(data.qtte, 10)
            }
        });

        return new Response(JSON.stringify(updateddetailPanier), { status: 200 });
    } catch (error) {
        return new Response("Detail Achat not found", { status: 404 });
    }
    
}


export async function DELETE (req: Request, { params }: { params: RouteParams }) {
    const { panierId, detailPanierId } = await params;

    try {
        await prisma.detailPanier.delete({
            where: {
                id: parseInt(detailPanierId, 10),
                panierId: parseInt(panierId, 10)
            }
        });

        return new Response("Detail Achat deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Detail Achat not found", { status: 404 });
    }
}

