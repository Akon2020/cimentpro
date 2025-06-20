import { prisma } from "@/lib/prisma";
import { TeneurRouteParams } from "@/prisma/definitions";

export async function GET(req: Request, { params }: TeneurRouteParams) {
    const { teneurId } = await params;

    const teneur = await prisma.teneur.findUnique({
        where: { id: parseInt(teneurId) }
    });

    if (!teneur) return new Response("Teneur Not Found!", { status: 404 });

    return new Response(JSON.stringify(teneur), { status: 200 });
} 