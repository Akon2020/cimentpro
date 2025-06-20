import { prisma } from "@/lib/prisma";
import { AchatParams } from "@/prisma/definitions";

export async function PUT (req: Request, { params }: AchatParams) {
    const { achatId } = await params;
    const data = await req.json();

    try {
        const achat = await prisma.achat.update({
            where: { id: parseInt(achatId, 10) },
            data: {
                panierId: data.panierId,
                statut: data.status,
                fournisseurId: data.fournisseurId,
                paiementId: data.paiementId,
                enregistrerParId: data.utilisateurId,
            }
        });

        return new Response("Achat Updated!", { status: 201 });

    } catch (error) {
        return new Response("Invalid Form", { status: 201 });    
    }
    

}
