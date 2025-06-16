import { prisma } from "@/lib/prisma";

interface RouteParams { 
    utilisateurId: string
    teneurId: string
}

export async function GET(req: Request, { params }: { params: RouteParams}) {
    const { teneurId, utilisateurId } = await params;

    const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            id: parseInt(utilisateurId)
        }
    });

    if (!utilisateur) {
        return new Response(JSON.stringify({ error: "The user dosn't exist" }), { status: 404 });
    }

    const teneurs = await prisma.teneur.findUnique({
        where: {
            id: parseInt(teneurId, 10)
        }
    });

    return new Response(JSON.stringify(teneurs), { status: 200 });
}

export async function PUT(req: Request, { params }: { params: RouteParams}) {
    // Not validated
    const { utilisateurId, teneurId } = await params;
    const { valeur } = await req.json();
    
    const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            id: parseInt(utilisateurId)
        }
    });

    if (!utilisateur) {
        return new Response(JSON.stringify({ error: "The user dosn't exist" }), { status: 404 });
    }

    try {
        await prisma.teneur.update({
            where: {
                id: parseInt(teneurId, 10),
                utilisateurId: parseInt(utilisateurId)
            },
            data: {
                valeur: parseFloat(valeur)
            }
        });

        return new Response("Teneur was updated", { status: 200 });    

    } catch (error) {
        return new Response("Teneur not found", { status: 200 });
    }
}

export async function DELETE(req: Request, { params }: { params: RouteParams}) {
    const { utilisateurId, teneurId } = await params;
    
    const utilisateur = await prisma.utilisateur.findUnique({
        where: {
            id: parseInt(utilisateurId)
        }
    });

    if (!utilisateur) {
        return new Response(JSON.stringify({ error: "The user dosn't exist" }), { status: 404 });
    }

    if (utilisateur.role === 'agent' && utilisateur.poste === "gerant") {
        await prisma.teneur.delete({
            where: {
                id: parseInt(teneurId, 10),
                utilisateurId: parseInt(utilisateurId)
            }
        });
        return new Response("Teneur was Deleted", { status: 200 });
    }

    return new Response(JSON.stringify({ error: "You can't execute this action" }), { status: 404 });
}
