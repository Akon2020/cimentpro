import { Devise } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";


export async function POST(request: Request, { params }: AgentRouteParams ) {
    const data: Devise = await request.json();
    const { agentId } = await params;

    try {
        const devise = await prisma.devise.create({
            data: {
                ...data,
                agentId: parseInt(agentId)
            }
        })
        return new Response("Devise created!", { status: 200 });
    } catch (error) {
        return new Response("Invalid Form", { status: 404 });
    }
        
}

 