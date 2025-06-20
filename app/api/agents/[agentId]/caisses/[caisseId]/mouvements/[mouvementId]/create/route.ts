import { prisma } from "@/lib/prisma";
import { CaisseParams } from "@/prisma/definitions";
import { checkTable, CreateMouvementCaisse, UpdateCaisse, updateCaisseMouvement } from "@/prisma/utils";


export async function POST (req: Request, { params }: CaisseParams) {
    const { caisseId } = await params;
    const data = await req.json();
    
    const caisse = await prisma.caisse.findFirst({
        where: { id: parseInt(caisseId) }
    });

    if(!caisse) return new Response("Caisse not Found", { status: 201 });
    if(caisse.soldeActuel < data.montant) return new Response("Solde Insuffisant!", { status: 201 });
    
    try {        
        
        // let montantMouvement = updateCaisseMouvement(data.type_mouvement, caisse.soldeActuel, data.montant);
        // // put it inside the updateCaisseMouvement* function...
        // const updateCaisse = await prisma.caisse.update({
        //     where: { id: parseInt(caisseId) },
        //     data: { soldeActuel: montantMouvement }
        // });

        UpdateCaisse(data.montant, data);
        CreateMouvementCaisse(data.montant, null, data);

        return new Response("Mouvement Created!", { status: 201 });
    } catch (error) {
        return new Response("Invalid Form!", { status: 404 });
    }
} 





