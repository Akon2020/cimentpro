/*
  Warnings:

  - You are about to drop the column `paiementId` on the `Achat` table. All the data in the column will be lost.
  - You are about to drop the column `paiementId` on the `Vente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achat" DROP CONSTRAINT "Achat_paiementId_fkey";

-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_paiementId_fkey";

-- AlterTable
ALTER TABLE "Achat" DROP COLUMN "paiementId";

-- AlterTable
ALTER TABLE "Paiement" ADD COLUMN     "achatId" INTEGER,
ADD COLUMN     "venteId" INTEGER;

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "paiementId";

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_achatId_fkey" FOREIGN KEY ("achatId") REFERENCES "Achat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_venteId_fkey" FOREIGN KEY ("venteId") REFERENCES "Vente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
