import { prisma } from "@/lib/prisma";

interface RouteParams {
    params: {
        caisseId: string
    }
}

export async function GET (request: Request, {params}: RouteParams) {
    const { caisseId } = await params;

    const caisse = await prisma.caisse.findMany({
        select: {
            nom: true,
            devise: {
                select: {
                    nom: true,
                    symbole: true
                }
            },
            statut: true,
        }
    });

    return new Response(JSON.stringify(caisse), { status: 201 });
}



