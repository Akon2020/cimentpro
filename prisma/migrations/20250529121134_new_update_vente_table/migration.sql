/*
  Warnings:

  - You are about to drop the column `agentId` on the `Vente` table. All the data in the column will be lost.
  - You are about to drop the column `entrepriseId` on the `Vente` table. All the data in the column will be lost.
  - You are about to drop the column `remise` on the `Vente` table. All the data in the column will be lost.
  - Added the required column `enregisterParId` to the `Vente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_acheteur` to the `Vente` table without a default value. This is not possible if the table is not empty.
  - Made the column `paiementId` on table `Vente` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TypeAcheteur" AS ENUM ('ordinaire', 'nouveau', 'client', 'fournisseur', 'agent');

-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_entrepriseId_fkey";

-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_paiementId_fkey";

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "agentId",
DROP COLUMN "entrepriseId",
DROP COLUMN "remise",
ADD COLUMN     "enregisterParId" TEXT NOT NULL,
ADD COLUMN     "type_acheteur" "TypeAcheteur" NOT NULL,
ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "paiementId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_enregisterParId_fkey" FOREIGN KEY ("enregisterParId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_paiementId_fkey" FOREIGN KEY ("paiementId") REFERENCES "Paiement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
