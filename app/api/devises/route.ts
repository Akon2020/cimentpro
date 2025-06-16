import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const devises = await prisma.devise.findMany({});
    return new Response(JSON.stringify(devises), { status: 200 });
}

