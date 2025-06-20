import { prisma } from "@/lib/prisma";


export async function GET(request: Request) {
    const teneurs = await prisma.teneur.findMany({});
    return new Response(JSON.stringify(teneurs), { status: 200 });
}




