import { prisma } from "@/lib/prisma";

interface RouteParams {
    fournisseurId: string
}

export async function PUT (req: Request, { params }: { params : RouteParams }) {
    const { fournisseurId } = await params;
    const data = await req.json();

    try {
        await prisma.fournisseur.update({
            where: { id: parseInt(fournisseurId, 10) },
            data: data
        });
        return new Response("Fournisseur updated!", { status: 201 });
    } catch (error) {
        return new Response("Fournisseur not found!", { status: 201 });        
    }    
}

export async function DELETE(req: Request, { params }: { params : RouteParams }) {
    const { fournisseurId } = await params;

    try {
        await prisma.fournisseur.delete({
            where: { id: parseInt(fournisseurId, 10) }
        });

        return new Response("Fournisseur Removed!", { status: 201 });
    } catch (error) {
        return new Response("Fournisseur not found!", { status: 404 });    
    }
}

