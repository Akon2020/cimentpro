import { prisma } from "@/lib/prisma";
import { DeviseRouteParams } from "@/prisma/definitions";


export async function DELETE(req: Request, { params }: DeviseRouteParams) {
    const { deviseId } = await params;

    const devise = await prisma.devise.findUnique({
        where: { id: parseInt(deviseId)}
    });

    if (!devise) return new Response("Devise Not Found!", { status: 404 });

    await prisma.devise.delete({
        where: { id: parseInt(deviseId)}
    });

    return new Response("Devise Deleted!", { status: 404 });

} 