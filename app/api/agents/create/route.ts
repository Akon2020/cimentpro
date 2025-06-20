import { Agent } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server"; 


export async function POST(request: NextRequest) {
    // Valid form
    const data: Agent = await request.json();
    const nom_complet = `${data.nom + ' ' + data.postnom}`
    
    const verify = async (email: string) => {
        return await prisma.agent.findUnique({
            where: { email: email }
        });
    }

    const user = await verify(data.email);   

    if (!user) {
        const user = await prisma.agent.create({
            data: {
                ...data,
                nom_complet: nom_complet
            }
        });
        
        return new Response("Agent created!", { status: 201 });
    }
    return new Response(JSON.stringify(data), { status: 201 });
}

