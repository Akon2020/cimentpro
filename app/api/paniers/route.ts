import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    return new Response("This route...", { status: 501 });
}



