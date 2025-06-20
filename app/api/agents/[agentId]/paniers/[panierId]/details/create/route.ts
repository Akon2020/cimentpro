import { prisma } from "@/lib/prisma";
import { DetailPanierForm, PanierRouteParams } from "@/prisma/definitions";
import { PrixUnitaireSystem } from "@/prisma/utils";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest, { params }: PanierRouteParams) {
    const { panierId } = await params;
    const data: DetailPanierForm = await request.json();

    const form = data.produits;

    const panier = await prisma.panier.findUnique({
        where: {id: parseInt(panierId)}
    });
    
    if(!panier) return new Response("Panier Not Found", { status: 404 });

    // verify...
    const produits = await prisma.produit.findMany({
        where: {id: { in: form.map(item => item.produitId)}},
        select: {id: true, deviseId: true}
    });

    const devises = await prisma.devise.findMany({
        where: {id: { in: produits.map(item => item.deviseId)}},
        select: {id: true, tauxDEchange: true}
    });
    
    for (let i=0; i < form.length; i++) {
        let field = form[i];
        field.prixUnitaire = await PrixUnitaireSystem(field.produitId, field.prixUnitaire);
        // field.modePaiement = GetModePaiement()
        if (field.deviseId == devises[i].id) {
            field.prixTotalHT = field.prixUnitaire * field.qtte
        } else {
            field.prixTotalHT = (field.prixUnitaire * field.qtte) * devises[i].tauxDEchange
        }
        field.prixTotalTTC = field.prixTotalHT * 0.16
    }           

    try {
        // await prisma.detailPanier.createMany({
        //     data: form
        // });

        // "Detail Panier Added!"
        return new Response(JSON.stringify(form), { status: 201 });
    } catch (error) {
        return new Response("Invalid Form", { status: 201 });
    }
}





 