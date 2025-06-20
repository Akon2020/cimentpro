import { prisma } from "@/lib/prisma";
import { ClientRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest, { params }: ClientRouteParams) {
    const { clientId } = await params;

    try {
        await prisma.client.delete({
            where: { id: parseInt(clientId) }
        })
        return new Response ("Removed", { status: 201 })
    } catch (error) {
        return new Response ("Not found!", { status: 500 })
    }

}