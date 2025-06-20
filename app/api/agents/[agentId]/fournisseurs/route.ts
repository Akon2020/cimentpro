import { prisma } from "@/lib/prisma";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    
    const data = await Pagination(request, 'fournisseur', null, null, null);

    return new Response(JSON.stringify(data), { status: 201 });
}




