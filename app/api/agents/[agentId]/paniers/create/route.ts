import { Panier } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";

export async function POST(request: Request, { params }: AgentRouteParams) {
    const data: Panier = await request.json();
    const { agentId } = await params;

    const agent = await prisma.agent.findUnique({
        where: { id: parseInt(agentId) }
    });

    if (!agent) return new Response("Agent Not found", { status: 201 }); 

    try {
        // VERIFIER SI UN OANIER EST EN COURS
        // SINON, CREER UN.
        if (agentId) {
            const verifyPanier = await prisma.panier.findFirst({
                where: { 
                    agentId: parseInt(agentId),
                    statut: 'EN_COURS'
                }
            });

            if (!verifyPanier) {
                await prisma.panier.create({
                    data: { agentId: parseInt(agentId)}
                });

                return new Response("Panier Created!", { status: 201 });
            } else {

                // await prisma.panier.update({
                //     where: {
                //         agentId: parseInt(agentId),
                //         statut: 'EN_COURS'
                //     },
                //     data: { statut: 'EN_COURS' }
                // });

                return new Response("Statut updated!", { status: 201 });
            }
        
        }
        
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });
    }
}

 