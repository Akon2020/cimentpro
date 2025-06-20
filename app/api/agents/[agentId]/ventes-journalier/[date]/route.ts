import { prisma } from "@/lib/prisma";

interface ClotureVenteRoute {
    params: {
        date: string
    }
}

export async function GET (request: Request, { params }: ClotureVenteRoute) {
    const { date } = await params;

    const date_cloture = new Date(date);

    const startDayUTC = new Date(
        Date.UTC(
        date_cloture.getFullYear(),
        date_cloture.getMonth(),
        date_cloture.getDate(),
        0, 0, 0, 0 // Heure, minute, seconde, milliseconde
        )
    );

    const endDayUTC = new Date(
        Date.UTC(
        date_cloture.getFullYear(),
        date_cloture.getMonth(),
        date_cloture.getDate(),
        23, 59, 59, 999 // Heure, minute, seconde, milliseconde
        )
    ); 

    const ventesJournalier = await prisma.vente.findMany({
        where: {
            updatedAt: {
                gte: startDayUTC,
                lte: endDayUTC
            }
        },
        select: {
            id: true,
            statut: true,
            client: {
                select: {
                    nom_complet: true,
                }
            },
            agent: {
                select: {
                    nom_complet: true
                }
            },
            fournisseur: {
                select: {
                    nom: true
                }
            }
        }
    });

    return new Response (JSON.stringify(ventesJournalier), { status: 201 });
}

