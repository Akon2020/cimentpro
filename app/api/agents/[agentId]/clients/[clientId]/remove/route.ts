import { prisma } from "@/lib/prisma";
import { ClientRouteParams } from "@/prisma/definitions";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest, { params }: ClientRouteParams) {
    const { clientId } = await params;

    try {
        await prisma.client.delete({
            where: { id: parseInt(clientId) }
        });

        const newList = await Pagination(request, 'client', null, null, null);

        return new Response (JSON.stringify(newList), { status: 201 })
    } catch (error) {
        return new Response ("Not found!", { status: 500 })
    }

}