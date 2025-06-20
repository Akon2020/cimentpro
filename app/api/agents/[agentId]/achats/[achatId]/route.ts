import { prisma } from "@/lib/prisma";
import { AchatRouteParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: AchatRouteParams) {
    const { agentId, achatId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not Found!", { status: 404 });

    const achat = await prisma.achat.findUnique({
        where: { id: parseInt(achatId) },
        select: {
            id: true,
            statut: true,
            createdAt: true,
            fournisseur: {
                select: {
                    nom: true
                }
            },
            paiements: {
                select: {
                    totalHT: true,
                    totalTTC: true,
                    modePaiement: true,
                    devise: {
                        select: {
                            symbole: true
                        }
                    }
                }
            },
        }
    });

    if (!achat) return new Response("Achat Not Found!", { status: 404 });

    return new Response(JSON.stringify(achat), { status: 201 });
}

