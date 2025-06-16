import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const fournisseurs = await prisma.fournisseur.findMany({});
    return new Response(JSON.stringify(fournisseurs), { status: 201 });
}

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const fournisseur = await prisma.fournisseur.create({
            data: data
        });
        return new Response("Fournisseur created!", { status: 201 });
    } catch (error) {
        return new Response("Invalid Form!", { status: 201 });
    }
}


