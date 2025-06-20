import { prisma } from "@/lib/prisma";
import { FournisseurRouteParams } from "@/prisma/definitions";
import { Pagination } from "@/prisma/utils";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest, { params }: FournisseurRouteParams) {
    const { fournisseurId, agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId)}
    });

    if(!agent) return new Response("Agent Not  Found!", { status: 404 }); 

    try {
        await prisma.fournisseur.delete({
            where: { id: parseInt(fournisseurId) }
        });

        const selection = {
            id: true,
            nom: true, 
            adresses: {
                select: {
                    adresse: true
                }
            },
            contacts: {
                select: {
                    tel: true
                }   
            }
        }

        const fournisseurs = await Pagination(request, 'fournisseur', null, selection, null);
        return new Response(JSON.stringify(fournisseurs), { status: 201 });
    } catch (error) {
        return new Response("Fournisseur not found!", { status: 404 });    
    }
}

