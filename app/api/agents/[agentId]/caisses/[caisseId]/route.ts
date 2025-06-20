import { prisma } from "@/lib/prisma";
import { CaisseRouteParams } from "@/prisma/definitions";

export async function GET (req: Request, { params }: CaisseRouteParams ) {
    const { caisseId, agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if (!agent) return new Response("Agent Not Found", { status: 404 });

    const caisse = await prisma.caisse.findUnique({
        where: { id: parseInt(caisseId) },
        select: {
            nom: true,
            description: true,
            soldeActuel: true,
            devise: {
                select: {
                    symbole: true
                }
            },
        }
    });

    const modePaiement = await prisma.paiement.groupBy({
        where: {caisseId: parseInt(caisseId)},
        by: ['modePaiement'],
        _sum: {
            montant: true
        }
        // paiements: {
        //     select: {
        //         id: true,
        //         montant: true,
        //         modePaiement: true
        //     },
        //     take: 5
        // }
    });

    if (!caisse) return new Response("Caisse not Found", { status: 404 });

    return new Response(JSON.stringify({
        caisse: caisse,
        modePaiement: modePaiement,
    }), { status: 201 });
} 

