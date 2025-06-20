import { prisma } from "@/lib/prisma";
import { AchatParams } from "@/prisma/definitions";

export async function DELETE (req: Request, { params }: AchatParams) {
    const { achatId } = await params;

    try {

        const achat = await prisma.achat.delete({
            where: { id: parseInt(achatId, 10) }
        });

        return new Response("Achat removed!", { status: 201 });    
    } catch (error) {
        return new Response("Achat not found", { status: 404 });    
    }
}