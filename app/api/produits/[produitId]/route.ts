import { prisma } from "@/lib/prisma";
import { ProduitParams } from "@/prisma/definitions";


export async function GET(req: Request, { params }: ProduitParams) {
    const { produitId } = await params;
    
    const product = await prisma.produit.findUnique({
        where: {
            id: parseInt(produitId, 10),
        }
    });

    return new Response(JSON.stringify(product), { status: 200 });
}

