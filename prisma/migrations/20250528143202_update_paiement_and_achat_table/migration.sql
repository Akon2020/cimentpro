/*
  Warnings:

  - The values [CACH,BANQUE,MOBILE,CHEQUE,AUTRE] on the enum `MoyenPaiment` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `achatId` on the `Paiement` table. All the data in the column will be lost.
  - You are about to drop the column `venteId` on the `Paiement` table. All the data in the column will be lost.
  - Added the required column `paiementId` to the `Achat` table without a default value. This is not possible if the table is not empty.
  - Made the column `qtte` on table `Produit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MoyenPaiment_new" AS ENUM ('cache', 'banque', 'mobile', 'cheque', 'autres');
ALTER TABLE "Paiement" ALTER COLUMN "moyen_paiement" DROP DEFAULT;
ALTER TABLE "Paiement" ALTER COLUMN "moyen_paiement" TYPE "MoyenPaiment_new" USING ("moyen_paiement"::text::"MoyenPaiment_new");
ALTER TYPE "MoyenPaiment" RENAME TO "MoyenPaiment_old";
ALTER TYPE "MoyenPaiment_new" RENAME TO "MoyenPaiment";
DROP TYPE "MoyenPaiment_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Paiement" DROP CONSTRAINT "Paiement_achatId_fkey";

-- DropForeignKey
ALTER TABLE "Paiement" DROP CONSTRAINT "Paiement_venteId_fkey";

-- AlterTable
ALTER TABLE "Achat" ADD COLUMN     "paiementId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Paiement" DROP COLUMN "achatId",
DROP COLUMN "venteId",
ALTER COLUMN "moyen_paiement" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Produit" ALTER COLUMN "qtte" SET NOT NULL,
ALTER COLUMN "qtte" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Vente" ADD COLUMN     "paiementId" INTEGER;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_paiementId_fkey" FOREIGN KEY ("paiementId") REFERENCES "Paiement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_paiementId_fkey" FOREIGN KEY ("paiementId") REFERENCES "Paiement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
