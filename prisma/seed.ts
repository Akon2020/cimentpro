// prisma/seed.ts

import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log(`Démarrage du seeding... 🌱`);

  await prisma.entreprise.deleteMany({});
  await prisma.produit.deleteMany({});
  await prisma.teneur.deleteMany({});
  await prisma.vente.deleteMany({});
  await prisma.paiement.deleteMany({});
  await prisma.caisse.deleteMany({});
  await prisma.devise.deleteMany({});
  await prisma.panier.deleteMany({});
  await prisma.fournisseur.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.agent.deleteMany({});

  await prisma.entreprise.upsert({
    where: {nom: 'Abba Père Conctruction Company'},
    update: {},
    create: {
        nom: 'Abba Père Conctruction Company',
        encronyme: 'ACCP',
        codePostale: "sd90K12",
        site: "http://accp.vercel.com",
        email: "accp@gmail.com",
        description: "My site description",
        logo: "/logo.png"
    }
  })
  
  const agent = await prisma.agent.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
        nom: 'Admin',
        postnom: 'Admin',
        role: 'ADMIN',
        email: 'admin@example.com',
    }
  });

    // Create Default Teneur
  const teneur1 = await prisma.teneur.upsert({
    where: {valeur: 32.5},
    update: {},
    create: {
      valeur: 32.5,
      agentId: agent.id
    }
  });

  const teneur2 = await prisma.teneur.upsert({
    where: {valeur: 42.5},
    update: {},
    create: {
      valeur: 42.5,
      agentId: agent.id
    }
  });

    //   Create Default Devise
  const devise1 = await prisma.devise.upsert({
    where: {nom: 'dollard américain'},
    update: {},
    create: {
      nom: 'dollard américain',
      symbole: '$',
      code: 'USD',
      tauxDEchange: 2845,
      agentId: agent.id
    }
  });

  const devise2 = await prisma.devise.upsert({
    where: {nom: 'franc congolais'},
    update: {},
    create: {
      nom: 'franc congolais',
      symbole: 'FC',
      code: 'CDF',
      tauxDEchange: 2885,
      agentId: agent.id
    }
  }); 

  // Product
  const produit1 = await prisma.produit.create({
    data: {
      designation: 'ciment-1',
      prixUnitaire: 100.0,
      deviseId: devise1.id,
      teneurId: teneur1.id,
      agentId: agent.id
    }
  });

  const produit2 = await prisma.produit.create({
    data: {
      designation: 'ciment-2',
      prixUnitaire: 100.0,
      deviseId: devise2.id,
      teneurId: teneur2.id,
      agentId: agent.id
    }
  });

  // Fournisseur
  const fournisseur = await prisma.fournisseur.upsert({
    where: { email: 'bralima@gmail.com' },
    update: {},
    create: {
      nom: 'bralima',
      email: 'bralima@gmail.com',
      codePostale: 'sd90K12',
      agentId: agent.id
    }
  });    

  // Caisse
  await prisma.caisse.create({
    data: {
      nom: "Franc Congolais",
      deviseId: devise1.id,
      agentId: agent.id
    }
  });

  await prisma.client.upsert({
    where: { email: 'client@gmail.com' },
    update: {},
    create: {
      email: 'client@gmail.com',
      nom: 'client'
    }
  });

  const panier = await prisma.panier.create({
    data: {
      agentId: agent.id,
    }
  })

  const details_panier = await prisma.detailPanier.createMany({
    data: [
      {
        produitId: produit1.id,
        qtte: 3,
        prixUnitaire: produit1.prixUnitaire,
        prixTotalHT: produit1.prixUnitaire * 3,
        prixTotalTTC: (produit1.prixUnitaire * 3) * 0.16,
        modePaiement: 'CACHE',
        deviseId: devise1.id,
        panierId: panier.id
      },
      {
        produitId: produit2.id,
        qtte: 3,
        prixUnitaire: produit2.prixUnitaire,
        prixTotalHT: produit2.prixUnitaire * 3,
        prixTotalTTC: (produit2.prixUnitaire * 3) * 0.16,
        modePaiement: 'BANQUE',
        deviseId: devise1.id,
        panierId: panier.id
      },
    ]
  })

  console.log(`Seeding terminé. 🎉`);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });