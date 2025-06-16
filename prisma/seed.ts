// prisma/seed.ts

import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log(`Démarrage du seeding... 🌱`);

  // await prisma.entreprise.create({
  //   data: {
  //       nom: 'Abba Père Conctruction Company',
  //       encronyme: 'accp',
  //       code_postale: "sd90K12",
  //       adresse: "Siege : uvira - Bukavu",
  //       tel: "0979411354",
  //       site: "http://accp.vercel.com",
  //       email: "accp@gmail.com",
  //       description: "My site description",
  //       logo: "/logo.png"
  //   }
  // })
  
  // await prisma.utilisateur.create({
  //   data: {
  //       nom: 'Admin',
  //       postnom: 'Admin',
  //       role: 'admin',
  //       email: 'admin@example.com',
  //   }
  // });

  //   // Create Default Teneur
  // await prisma.teneur.create({
  //   data: {
  //       valeur: 32.5,
  //       utilisateurId: 1
  //   },
  // });

  // await prisma.teneur.create({
  //   data: {
  //       valeur: 42.5,
  //       utilisateurId: 1
  //   },
  // });

  //   //   Create Default Devise
  //   await prisma.devise.create({
  //     data: {
  //         nom: 'Dollard Américain',
  //         symbole: '$',
  //         code: 'USD',
  //         utilisateurId: 1
  //       }
  //   });

  //   await prisma.devise.create({
  //       data: {
  //           nom: 'Franc Congolais',
  //           symbole: 'FC',
  //           code: 'CDF',
  //           utilisateurId: 1
  //       }
  //   });

    // Create Product
    await prisma.produit.create({
        data: {
            designation: 'ciment-1',
            prix: 100.0,
            qtte: 0,
            description: 'My product',
            deviseId: 1,
            teneurId: 2,
            utilisateurId: 1
        }
    });

    // Create Fournisseur
    await prisma.fournisseur.create({
        data: {
            nom: 'bralima',
            email: 'bralima@gmail.com',
            code_postal: 'sd90K12',
        }
    });

    // Create Default Roles
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