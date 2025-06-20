import { prisma } from "@/lib/prisma";
import { AgentRouteParams } from "@/prisma/definitions";

export async function GET(req: Request, { params }: AgentRouteParams) {
    // const { agentId } = await params; 
    
    // const user = await prisma.agent.findUnique({
    //     where: { id: parseInt(agentId) }
    // })

    // if (!user) return new Response("User isn't exist", { status: 400 }) 

    return new Response(JSON.stringify('user'), { status: 201 });
}



