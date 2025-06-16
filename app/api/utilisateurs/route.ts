import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server"; 

export async function GET(req: NextRequest) {
    // Create a pagination render, in util*

    const requestParams = req.nextUrl.searchParams;
    const search = requestParams.get('search');
    // const role = requestParams.get('role');
    // const poste = requestParams.get('poste');
    
    const users = await prisma.utilisateur.findMany(search ? {
        where: {
            OR: [{ nom_complet: search ? { contains: search, mode: 'insensitive' } : undefined }]
        }
    } : {});

    return new Response(JSON.stringify(users), { status: 200 }); 
}

export async function POST(req: Request) {
    // Valid form
    const data = await req.json();
    const nom_complet = `${data.nom + ' ' + data.postnom}`
    
    const verify = async (email: string) => {
        return await prisma.utilisateur.findUnique({
            where: { email: email }
        });
    }

    const user = await verify(data.email);   

    if (!user) {
        const user = await prisma.utilisateur.create({
            data: {
                ...data,
                nom_complet: nom_complet
            }
        });
        
        return new Response("User was created", { status: 201 });
    }
    return new Response(JSON.stringify(data), { status: 201 });
}

