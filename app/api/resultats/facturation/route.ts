import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET (req: NextRequest) {
    const requestParams = req.nextUrl.searchParams;
    const search = requestParams.get('search');

    // const fectures = await prisma.achat.findMany(
    //     search ? {
    //         where: { OR: [{ createdAt: search ? { contains: search, mode: 'insensitive' } : undefined }] }
    //     } : {});
    
    return new Response('You Got The Link...');
}

