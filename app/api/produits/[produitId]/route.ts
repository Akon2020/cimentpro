import { prisma } from "@/lib/prisma";

interface RouteParams { 
    produitId: string 
}

export async function GET(req: Request, { params }: { params: RouteParams }) {
    const { produitId } = await params;
    
    const product = await prisma.produit.findUnique({
        where: {
            id: parseInt(produitId, 10),
        }
    });

    return new Response(JSON.stringify(product), { status: 200 });
}

export async function PUT(req: Request, { params }: { params: RouteParams }) {
    const { produitId } = await params;
    const { designation, prix, description } = await req.json();
    
    try {
        await prisma.produit.update({
            where: {
                id: parseInt(produitId, 10)
            },
            data: {
                designation,
                prix: parseFloat(prix),
                description
            }
        });

        return new Response("Produit was updated", { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }   
}

export async function DELETE(req: Request, { params }: { params: RouteParams}) {
    const { produitId } = await params;

    try {
        await prisma.produit.delete({
            where: {
                id: parseInt(produitId, 10)
            }
        });    

        return new Response("Produit was deleted", { status: 200 }); 

    } catch (error) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }    
}