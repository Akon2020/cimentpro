/*
  Warnings:

  - You are about to drop the column `adresseId` on the `Fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `Fournisseur` table. All the data in the column will be lost.
  - Added the required column `deviseId` to the `Paiement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Fournisseur" DROP CONSTRAINT "Fournisseur_adresseId_fkey";

-- DropForeignKey
ALTER TABLE "Fournisseur" DROP CONSTRAINT "Fournisseur_contactId_fkey";

-- AlterTable
ALTER TABLE "Adresse" ADD COLUMN     "fournisseurId" INTEGER,
ALTER COLUMN "utilisateurId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "fournisseurId" INTEGER,
ALTER COLUMN "utilisateurId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Fournisseur" DROP COLUMN "adresseId",
DROP COLUMN "contactId";

-- AlterTable
ALTER TABLE "Paiement" ADD COLUMN     "deviseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_deviseId_fkey" FOREIGN KEY ("deviseId") REFERENCES "Devise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
