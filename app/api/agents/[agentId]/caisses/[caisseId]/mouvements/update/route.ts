
import { prisma } from "@/lib/prisma";
import { MouvementRouteParams } from "@/prisma/definitions";
import { checkTable, updateCaisseMouvement } from "@/prisma/utils";


export async function PUT (request: Request, { params }: MouvementRouteParams ) {
    const { mouvementId, caisseId } = await params;
    const data = await request.json();

    // Check caisse table
    const caisse = await prisma.caisse.findUnique({
        where: { id: parseInt(caisseId) }
    });
    if (!caisse) return new Response("Caisse not Found", { status: 404 });

    // check mouvement caisse
    const mouvementCaisse = await checkTable(request, 'mouvementCaisse', mouvementId);
    if (!mouvementCaisse) return new Response("mouvementCaisse not Found", { status: 404 });

    let soldeActuel = caisse.soldeActuel;

    try {
        
        await prisma.mouvementCaisse.update({
            where: { id: mouvementCaisse.id },
            data: {
                caisseId: parseInt(caisseId),
                type_mouvement: data.type_mouvement,
                montant: data.montant,
                categorie: data.categorie ? data.categorie : null,
                enregistrerParId: parseInt(data.enregistrerParId),
                description: data.description ? data.description : "",
                referenceExterne: data.referenceExterne ? data.referenceExterne : null,
            }
        });

        let montantMouvement = updateCaisseMouvement(data.type_mouvement, caisse.soldeActuel, data.montant);
        // put it inside the updateCaisseMouvement* function...
        const updateCaisse = await prisma.caisse.update({
            where: { id: parseInt(caisseId) },
            data: { soldeActuel: montantMouvement }
        });

        return new Response(JSON.stringify(typeof soldeActuel), { status: 201 });
    } catch (error) {
        return new Response("Mouvement Caisse Not Found", { status: 201 });   
    }
}
