import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    return new Response("This route...", { status: 501 });
}

export async function POST(req: Request) {
    const { utilisateurId } = await req.json();

    try {
        await prisma.panier.create({
            data: { utilisateurId: utilisateurId }
        });
    
        return new Response("Panier Created!", { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });
    }
}

