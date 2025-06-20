import { prisma } from "@/lib/prisma";
import { MouvementParams } from "@/prisma/definitions";

export async function DELETE (req: Request, { params }: MouvementParams ) {
    const { mouvementId } = await params;

    try {
        await prisma.mouvementCaisse.delete({
            where: {
                id: parseInt(mouvementId, 10)
            }
        });    

        return new Response("mouvementCaisse Removed", { status: 200 }); 

    } catch (error) {
        return new Response(JSON.stringify({ error: "mouvementCaisse Not found" }), { status: 404 });
    } 
}
