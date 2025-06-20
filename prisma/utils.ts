import { prisma } from "@/lib/prisma";
import { AchatRouteParams, ModePaiement, PaiementForm, ProduitsDisponible, tableType, Type, TypeAcheteur, TypeMouvement } from "./definitions";
import { NextRequest } from "next/server";
import { Client, DetailPanier, ModePaiment, Paiement, Produit } from "@/app/generated/prisma";

export async function Table(req: NextRequest, name: tableType, id: string, selection: object | null) {
    const mySelection = selection ? selection : {}

    let table = await prisma[name].findFirst({
        where: { id: parseInt(id) },
        select: mySelection
    });
    
    if (table) {
        if (typeof table == 'object' && Object.keys(table).length == 0) return new Response(`${name} Not Found`, { status: 201 });
    }

    return table;
} 

export async function PrixUnitaireSystem(produitId: number, prixUnitaire: number) {
    const produit = await prisma.produit.findUnique({
        where: {id: produitId},
        select: {prixUnitaire: true}
    });
    return produit ? produit.prixUnitaire : prixUnitaire;
}

export async function GetModePaiement(modePaiement: ModePaiement) {
    return modePaiement;
}

export async function FindVente(venteId: number) {
    return await prisma.vente.findFirst({
        where: { panierId: venteId },
        select: { id: true, paiementId: true }
    });
}

export async function UpdateDetailPanier(detailId: number, form: DetailPanier) {
    return await prisma.detailPanier.update({
        where: { id: detailId },
        data: form,
        select: {qtte: true, produitId: true, panierId: true, prixTotalHT: true, prixTotalTTC: true}
    });
}

export async function UpdateProduit (produitId:number, type: Type, difference: number) {
    await prisma.produit.update({
        where: {id: produitId}, 
        data: {qtteDisponible: type == 'dec' ? { decrement: difference } : { increment: difference }}
    });
}

export async function UpdateVente(venteId: number, type: Type, totalHT: number, totalTTC: number) {
    await prisma.vente.update({
        where: {id: venteId},
        data: {
            totalHT: type == 'dec' ? {decrement: totalHT} : {increment: totalHT},
            totalTTC: type == 'dec' ? {decrement: totalTTC} : {increment: totalTTC}
        }
    });
}

export async function UpdatePaiement(paiementId: number, type: Type, montant: number) {
    return await prisma.paiement.update({
        where: { id: paiementId },
        data: { montant: type == 'dec' ? { decrement: montant} : { decrement: montant} },
        select: { caisseId: true }
    });
}

export async function UpdateCaisses(caisseId: number, type: Type, montant: number) {
    await prisma.caisse.update({
        where: { id: caisseId },
        data: { soldeActuel: type == 'inc' ? { increment: montant } : { decrement: montant }}
    });
}

export async function checkTable(tableName: tableType, tableId: string) {
    const table = await prisma[tableName].findFirst({
        where: { id: parseInt(tableId) },
        // select: {}
    });
    
    // if (!table) return new Response(`${tableName} Not Found`, { status: 201 });

    return table;
} 

export function updateCaisseMouvement (type_mouvement: TypeMouvement, soldeActuel: number | null, montant: number) {
    
    let montantMouvement = 0;
    if (soldeActuel) {
        if (type_mouvement === 'ENTREE') {
            montantMouvement = soldeActuel - montant;
        } else {
            montantMouvement = soldeActuel + montant;
        }

        return montantMouvement;
    }
    
}

export function getNomComplet(form: Client) {
    let nom_complet = ''
    if (form.nom && form.postnom) {
        nom_complet = `${form.nom} ${form.postnom}`
    }

    if (form.nom && !form.postnom) {
        nom_complet = `${form.nom}`
    }
    return nom_complet;
}


export async function UpdateCaisse(request: NextRequest, total_ht: number, data: AchatRouteParams) {
    const caisse = await prisma.caisse.findUnique({
        where: { id: parseInt(data.caisseId) },
        select: { soldeActuel: true }
    });

    if(!caisse) return new Response("Caisse not Found", { status: 404 });
    
    let soldeActuel = caisse.soldeActuel
    if (typeof soldeActuel == 'number') {
        if (soldeActuel < total_ht) return new Response("Solde Disponible Insuffisant!", { status: 201 });

        let montantMouvement = updateCaisseMouvement(data.type_mouvement, soldeActuel, total_ht);
        const updateCaisse = await prisma.caisse.update({
            where: { id: parseInt(data.caisseId) },
            data: { soldeActuel: montantMouvement }
        });
        
        return updateCaisse
    }
}


export async function CreateMouvementCaisse(total_ht: number, referenceExterne: number | null, data: AchatRouteParams) {
    
    let defaultDescription = 
        data.categorie == 'ACHAT' ? `Achat des produits`
            : data.categorie == 'VENTE' ? `Vente des produits`
                : data.categorie == 'COMMANDE' ? `Commande des produits`
                    : data.categorie == 'FOURNITUR' ? `Achat des fourniturs` 
                        : data.categorie == 'LOYER' ? `Paiement de Loyer` 
                            : data.categorie == 'TAXE' ? `Paiement de la taxe` 
                                : `Autres...`;
    

    const mouvementCaisse = await prisma.mouvementCaisse.create({
        data: {
            caisseId: parseInt(data.caisseId),
            type_mouvement: data.type_mouvement,
            modePaiement: data.moyen_paiement,
            categorie: data.categorie,
            montant: total_ht,
            enregistrerParId: parseInt(data.enregistrerParId),
            referenceExterne: `${data.categorie.substring(0, 3)}-${referenceExterne}`,
            description: data.description ? data.description : defaultDescription
        }
    });

    if (data.categorie !== 'ACHAT' && data.categorie !== 'VENTE') {
        await prisma.mouvementCaisse.update({
            where: { id: mouvementCaisse.id },
            data: { referenceExterne: `${data.categorie.substring(0, 3)}-${mouvementCaisse.id}`}
        });
    }

}


export async function VerifyClotureCaisse(enregistrerParId: number) {
    const today = new Date();

    const startTodayUTC = new Date(
        Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0, 0, 0, 0 // Heure, minute, seconde, milliseconde
        )
    );

    const endTodayUTC = new Date(
        Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23, 59, 59, 999 // Heure, minute, seconde, milliseconde
        )
    );

    const clotureCaisse = await prisma.clotureCaisse.findFirst({ // The findUnique fx. required the id*
        where: {
            updatedAt: {
                gte: startTodayUTC,
                lte: endTodayUTC 
            }
        }
    });


    if (!clotureCaisse) {
        // Create a cloture
        const clotureCaisse = await prisma.clotureCaisse.create({
            data: {
                dateCloture : today,
                utilisateurClotureId : enregistrerParId,
                notes: `Cloture du ${today.getDay()} ${today.getMonth()} ${today.getFullYear} à ${today.getHours}:${today.getMinutes}`
            }
        });
    }

    return clotureCaisse;
}

type PageRoute = object | null
export async function Pagination (
    request: NextRequest, 
    tableName: tableType, 
    condition: PageRoute, 
    selection: PageRoute, 
    orderBy: PageRoute
) {

    const SearchParams = request.nextUrl.searchParams;
    const pg = SearchParams.get('page') || 1; 
    const lmt = SearchParams.get('limit') || 10; 
    const search = SearchParams.get('search');

    const page = typeof pg == 'string' ? parseInt(pg) : pg;
    const limit = typeof lmt == 'string' ? parseInt(lmt) : lmt;

    const skip = (page - 1) * limit;

    const my_condition = condition ? condition : {}
    const my_selection = selection ? selection : { id: true }
    const order_by = orderBy ? orderBy : { createdAt: 'desc' }

    const table = await prisma[tableName].findMany({
        where: my_condition,
        select: my_selection,
        skip: skip,
        take: limit,
        orderBy: order_by,
    });

    const countTableContent = await prisma[tableName].count();
    const totalPages = Math.ceil(countTableContent / limit);

    return {
        data: table,
        meta: {
            currentPage: page,
            limit: limit,
            totalItems: countTableContent,
            totalPages: totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        }
    }
}

 export async function FetchMany (name: tableType, condition: object, selection: object | null) {
    const myCondition = condition ? condition : {};
    const mySelection = selection ? selection : {};
    return await prisma[name].findMany({
        where: myCondition,
        select: mySelection
    });
}

export async function GetDetailPanier(panierId: number) {
    return await FetchMany('detailPanier', {panierId: panierId}, {id: true, produitId: true, prixTotalHT: true, prixTotalTTC: true, deviseId: true, modePaiement: true}) as Array<DetailPanier>;;
}

export async function GetProduit(DetailPanier: DetailPanier[]) {
    return await FetchMany('produit', { id: { in: DetailPanier.map(item => item.produitId) } },
    { qtteDisponible: true, prixUnitaire: true}) as Array<ProduitsDisponible>;
}

export async function CreatePaiement (montant: number, modePaiement: ModePaiement, deviseId: number, caisseId: number) {
    return await prisma.paiement.create({
        data: {
            montant: montant,
            modePaiement: modePaiement,
            deviseId: deviseId,
            caisseId: caisseId
        }
    });
}

export async function Update () {
    // Get the qtty selled
    // const UpdateProduits = await prisma.produit.updateMany({
    //     where: { id: { in: detail_panier.map(item => item.produitId) }},
    //     form: { qtteDisponible: { decrement: detail_panier.find(item => item.produitId === item.produitId)?.qtte || 0 } },
    // });
}

export async function VerifyDevisePanier (DetailPanier: DetailPanier[], data: PaiementForm) {
    const isUniqueDevise = DetailPanier.every(
        (item) => item.deviseId === DetailPanier[0].deviseId
    );

    if (isUniqueDevise) return await CreatePaiement(data.montant, data.modePaiement, DetailPanier[0].deviseId, DetailPanier[0].deviseId);
    // devise des produits et du formulaire
    let arrayPaiement = []
    for (let i = 0; i < DetailPanier.length; i++) {
        const detail = DetailPanier[i];
        arrayPaiement.push({
            montant: detail.prixTotalHT, 
            modePaiement: detail.modePaiement, 
            deviseId: DetailPanier[i].deviseId,
            caisseId: 0
        });
    }

    let DeviseProduit = await FetchMany('devise', { id : { in: DetailPanier.map(item => item.deviseId)}}, { id: true, tauxDEchange: true }) as Array<{id: number, tauxDEchange: number}>;

    let findCaisse = await FetchMany('caisse', { deviseId: { in: DetailPanier.map(item => item.deviseId) }}, { id: true, deviseId: true }) as Array<{id: number, deviseId: number}>

    for (let i = 0; i < findCaisse.length; i++) {
        const caisse = findCaisse[i];
        if (caisse.deviseId == arrayPaiement[i].deviseId) {
            arrayPaiement[i].caisseId = caisse.id;
        }
    }

    for (let i = 0; i < DetailPanier.length; i++) {
        const caisse = DetailPanier[i];
        if (caisse.deviseId == DeviseProduit[i].id) {
            arrayPaiement[i].caisseId = caisse.id;
        } else {
            arrayPaiement[i].montant = arrayPaiement[i].montant * DeviseProduit[i].tauxDEchange;
        }
    }

    // const createManyPaiement = await prisma.paiement.createMany({
    //     data: arrayPaiement
    // });

    // UpdateCaisses();

    return arrayPaiement;
}


export async function CheckDevise(DetailPanier: DetailPanier[], deviseId: number) {
    const conversions = await ConversionDevise(DetailPanier, deviseId);
    // for (let i = 0; i < conversions.length; i++) {
    //     const conversion = conversions[i];
    //     if (conversion.prixTotalHTConverti) return true;
    // } 
    return conversions;
}


export async function CaisseIncrement (DetailPanier: DetailPanier[], deviseId: number) {
    const caisses = await CheckDevise(DetailPanier, deviseId);
    // return devise;

    // if (caisses) {
        // const formDevise = await ConversionDevise (DetailPanier, deviseId);

        // const caissesReconues = await prisma.caisse.findMany({
        //     where: {deviseId: {in: formDevise.map(item => item.deviseId)}},
        // });

        // for (let i = 0; i < caissesReconues.length; i++) {
        //     const element = caissesReconues[i];
        //     if (formDevise[i].prixTotalHT) {
        //         const caisse = await prisma.caisse.updateMany({
        //             where: {deviseId: element.deviseId},
        //             data: {soldeActuel: {increment: formDevise[i].prixTotalHT}}
        //         });
        //     }
        //     if (formDevise[i].prixTotalHTConverti) {
        //         const caisse = await prisma.caisse.updateMany({
        //             where: {deviseId: element.deviseId},
        //             data: {soldeActuel: {increment: formDevise[i].prixTotalHTConverti}}
        //         });
        //     }
        // }
        return caisses;
    // }

        // if (element.deviseConvertie) {
        //     const createCaisse = await prisma.caisse.create({
        //         data: {
        //             nom: "Nouvelle caissse",
        //             deviseId: GetDevise[i].id,
        //             agentId: parseInt(agentId),
        //             description: `Gère les ${GetDevise[i].nom} de l'entreprise.`
        //         }, select: { deviseId: true }
        //     });

        //     const AddMoney = await prisma.caisse.updateMany({
        //         where: {deviseId: createCaisse.deviseId},
        //         data: {soldeActuel: {increment: element.deviseConvertie}},
        //     });
        // }

    // if a caisse has a deviseId*
    
    // add the money
    // else, create one and add the money inside
}









