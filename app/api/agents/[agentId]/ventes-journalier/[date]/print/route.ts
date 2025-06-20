import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { totalmem } from "os";

interface RouteParams {
    params: {
        date: Date
    }
}

export async function GET (request: NextRequest, { params }: RouteParams) {
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

    const ventes = await prisma.vente.findMany({
        where: {
            updatedAt: {
                gte: startDayUTC,
                lte: endDayUTC
            }
        },
        select: {
            id: true,
            statut: true,
            panier: {
                select: {
                    detailPaniers: {
                        select: {
                            produit: {
                                select: {
                                    designation: true,
                                }
                            },
                            qtte: true,
                            prixUnitaire: true,
                            prixTotalHT: true
                        }
                    }
                }
            },
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
            },
            enregistrerPar: true,
            entreprise: {
                select: {
                    nom: true,
                    logo: true
                }
            }
        }
    });

    const paiements = await prisma.paiement.findMany({
        where: { venteId: { in: ventes.map(vente => vente.id) } },
        select: {
            id: true,
            totalHT: true,
            totalTTC: true,
            modePaiement: true,
            devise: {
                select: {
                    symbole: true
                }
            },
            venteId: true
        }
    });

    let list = [];
    let prixTotalHT = 0;
    let prixTotalTTC = 0;
    for (let i = 0; i < ventes.length; i++) {
        const vente = ventes[i];
        const paiement = paiements[i];
        if (vente.id === paiement.venteId) {
            list.push({
                client: vente.client && vente.client.nom_complet,
                fournisseur: vente.fournisseur && vente.fournisseur.nom,
                agent: vente.agent && vente.agent.nom_complet,
                enregistrePar: vente.enregistrerPar,
                entreprise: vente.entreprise && vente.entreprise,
                venteId: vente.id,
                statut: vente.statut,
                panier: vente.panier.detailPaniers,
                totalHT: paiement.totalHT,
                totalTTC: paiement.totalTTC,
                modePaiement: paiement.modePaiement,
                devise: paiement.devise.symbole
            });
        }
    }

    return new Response (JSON.stringify(list), { status: 201 });
}

