import { prisma } from "@/lib/prisma";
import { ClientRouteParams } from "@/prisma/definitions";

export async function GET(request: Request, { params }: ClientRouteParams) {
    const { clientId } = await params;

    const client = await prisma.client.findUnique({
        where: { id: parseInt(clientId) }
    });

    if (!client) return new Response("Client Not Found", { status: 404 });

    return new Response(JSON.stringify(client), { status: 201 });

}