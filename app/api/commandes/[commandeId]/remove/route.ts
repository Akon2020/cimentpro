import { prisma } from "@/lib/prisma";
import { CommandeParams } from "@/prisma/definitions";

export async function DELETE (req: Request, { params }: CommandeParams ) {
    const { commandeId } = await params;

    const commande = await prisma.commande.findUnique({
        where: { id: parseInt(commandeId) },
    })

    if (!commande) return new Response("Commande Not Found", { status: 404 });
    
    try {
        await prisma.commande.delete({
            where: { id: parseInt(commandeId) }
        });

        return new Response("Commande removed!", { status: 201 });
    } catch (error) {
        return new Response("Invalid Data!", { status: 201 });
    }
}