import { prisma } from "@/lib/prisma";

interface RouteParams { 
    utilisateurId: string
}

export async function GET(req: Request, { params }: { params: RouteParams}) {
    const teneurs = await prisma.teneur.findMany({});
    return new Response(JSON.stringify(teneurs), { status: 200 });
}

export async function POST(req: Request) {
    // This action belongs to the agent with the role of "gerant"
    
    const { valeur, utilisateurId } = await req.json();

    const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            id: parseInt(utilisateurId, 10)
        }
    });

    if (!utilisateur) {
        return new Response(JSON.stringify({ error: "The user dosn't exist" }), { status: 404 });
    }

    if (utilisateur.role === 'agent' && utilisateur.poste === "gerant") {
        await prisma.teneur.create({
            data: {
                valeur: parseFloat(valeur),
                utilisateurId: parseInt(utilisateurId, 10)
            }
        });
        return new Response("Teneur was Created", { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid form" }), { status: 404 });
}


