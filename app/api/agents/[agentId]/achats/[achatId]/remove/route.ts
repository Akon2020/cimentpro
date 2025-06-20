import { prisma } from "@/lib/prisma";


interface RouteParams {
    params: {
        achatId: string
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    const { achatId } = await params;

    try {
        const vente = await prisma.vente.delete({
            where: { id: parseInt(achatId) }
        })
        return new Response("Achat Deleted", { status: 201 });
    } catch (error) {
        return new Response("Achat not found", { status: 404 });
    }
} 

