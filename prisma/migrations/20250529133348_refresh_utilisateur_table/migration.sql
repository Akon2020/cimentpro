/*
  Warnings:

  - The `utilisateurId` column on the `Adresse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `utilisateurId` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Utilisateur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `enregisterParId` on the `Achat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `utilisateurId` on the `Devise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `utilisateurId` on the `Panier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `utilisateurId` on the `Produit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `utilisateurId` on the `Teneur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Utilisateur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `enregisterParId` on the `Vente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Achat" DROP CONSTRAINT "Achat_enregisterParId_fkey";

-- DropForeignKey
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Devise" DROP CONSTRAINT "Devise_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Panier" DROP CONSTRAINT "Panier_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Teneur" DROP CONSTRAINT "Teneur_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_enregisterParId_fkey";

-- AlterTable
ALTER TABLE "Achat" DROP COLUMN "enregisterParId",
ADD COLUMN     "enregisterParId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Adresse" DROP COLUMN "utilisateurId",
ADD COLUMN     "utilisateurId" INTEGER;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "utilisateurId",
ADD COLUMN     "utilisateurId" INTEGER;

-- AlterTable
ALTER TABLE "Devise" DROP COLUMN "utilisateurId",
ADD COLUMN     "utilisateurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Panier" DROP COLUMN "utilisateurId",
ADD COLUMN     "utilisateurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "utilisateurId",
ADD COLUMN     "utilisateurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teneur" DROP COLUMN "utilisateurId",
ADD COLUMN     "utilisateurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" DROP CONSTRAINT "Utilisateur_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "nom" DROP NOT NULL,
ALTER COLUMN "postnom" DROP NOT NULL,
ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "enregisterParId",
ADD COLUMN     "enregisterParId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teneur" ADD CONSTRAINT "Teneur_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devise" ADD CONSTRAINT "Devise_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_enregisterParId_fkey" FOREIGN KEY ("enregisterParId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panier" ADD CONSTRAINT "Panier_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_enregisterParId_fkey" FOREIGN KEY ("enregisterParId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
