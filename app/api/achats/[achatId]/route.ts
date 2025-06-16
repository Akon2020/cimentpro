import { prisma } from "@/lib/prisma";

interface RouteParams {
    achatId: string
}

export async function GET (req: Request, { params }: { params : RouteParams}) {
    const { achatId } = await params;

    const achat = await prisma.achat.findUnique({
        where: { id: parseInt(achatId, 10) },
        select: {
            statut: true,
            utilisateur: {
                select: {
                    nom_complet: true,
                }
            },
            panier: {
                select: {
                    DetailPanier: {
                        select: {
                            produit: {
                                select: {
                                    designation: true,
                                }
                            },
                            qtte: true,
                            prixUnitaire: true,
                            prixTotal: true
                        }
                    }
                }
            },
            paiement: {
                select: {
                    montant: true,
                    devise: {
                        select: {
                            nom: true,
                            code: true,
                            symbole: true,
                        }
                    },
                }
            },
            fournisseur: {
                select: {
                    nom: true,
                    email: true
                }
            }
        }
    });

    if (!achat) {
        return new Response("Achat not found", { status: 404 })
    }

    return new Response(JSON.stringify(achat), { status: 404 })
}

export async function PUT (req: Request, { params }: { params : RouteParams}) {
    const { achatId } = await params;
    const data = await req.json();

    try {
        const achat = await prisma.achat.update({
            where: { id: parseInt(achatId, 10) },
            data: {
                panierId: data.panierId,
                statut: data.status,
                fournisseurId: data.fournisseurId,
                paiementId: data.paiementId,
                enregisterParId: data.utilisateurId,
            }
        });

        return new Response("Achat Updated!", { status: 201 });

    } catch (error) {
        return new Response("Invalid Form", { status: 201 });    
    }

}

export async function DELETE (req: Request, { params }: { params : RouteParams}) {
    const { achatId } = await params;

    try {

        const achat = await prisma.achat.delete({
            where: { id: parseInt(achatId, 10) }
        });

        return new Response("Achat removed!", { status: 201 });    
    } catch (error) {
        return new Response("Achat not found", { status: 404 });    
    }
}
