
import { prisma } from "@/lib/prisma";

interface RouteParams {
    deviseId: string;
}
export async function GET(req: Request, { params }: { params: RouteParams}) {
    const { deviseId } = await req.json();
}