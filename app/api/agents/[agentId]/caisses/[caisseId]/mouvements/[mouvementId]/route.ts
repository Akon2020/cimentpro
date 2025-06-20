import { prisma } from "@/lib/prisma";
import { MouvementParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: MouvementParams ) {
    const { caisseId, mouvementId } = await params;

    const mouvementCaisse = await prisma.mouvementCaisse.findUnique({
        where: { id: parseInt(mouvementId), caisseId: parseInt(caisseId) },
        select: {
            caisse: {
                select: {
                    nom: true
                }
            },
            type_mouvement: true,
            montant: true,
            description: true 
        }
    });

    if (!mouvementCaisse) return new Response("Mouvement Caisse not Found", { status: 404 });

    return new Response(JSON.stringify(mouvementCaisse), { status: 201 });
}



