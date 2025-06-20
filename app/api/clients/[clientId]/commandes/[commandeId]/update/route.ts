import { Commande } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { CommandeParams } from "@/prisma/definitions";
import { NextRequest } from "next/server";


export async function PUT (request: NextRequest, { params }: CommandeParams ) {
    const { agentId, commandeId } = await params;
    const data: Commande = await request.json();

    data.dateLivraison = data.dateLivraison ? new Date(data.dateLivraison) : new Date();

    const commande = await prisma.client.findUnique({
        where: { id: parseInt(commandeId) }
    });

    if (!commande) return new Response("Commande Not Found", { status: 404 });

    try {
        const updateCommande = await prisma.commande.update({
            where: { id: commande.id },
            data: data
        });

        return new Response("Commande was updated!", { status: 201 });
    } catch (error) {
        return new Response("Something went wrong", { status: 404 });
    }
}