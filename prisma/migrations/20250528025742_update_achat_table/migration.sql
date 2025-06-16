/*
  Warnings:

  - The values [BANCAIRE] on the enum `MoyenPaiment` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `total` on the `Achat` table. All the data in the column will be lost.
  - The `statut` column on the `Achat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatutAchat" AS ENUM ('EN_COURS', 'TERMINE', 'ANNULE');

-- AlterEnum
BEGIN;
CREATE TYPE "MoyenPaiment_new" AS ENUM ('CACH', 'BANQUE', 'MOBILE', 'CHEQUE', 'AUTRE');
ALTER TABLE "Paiement" ALTER COLUMN "moyen_paiement" DROP DEFAULT;
ALTER TABLE "Paiement" ALTER COLUMN "moyen_paiement" TYPE "MoyenPaiment_new" USING ("moyen_paiement"::text::"MoyenPaiment_new");
ALTER TYPE "MoyenPaiment" RENAME TO "MoyenPaiment_old";
ALTER TYPE "MoyenPaiment_new" RENAME TO "MoyenPaiment";
DROP TYPE "MoyenPaiment_old";
ALTER TABLE "Paiement" ALTER COLUMN "moyen_paiement" SET DEFAULT 'BANQUE';
COMMIT;

-- AlterTable
ALTER TABLE "Achat" DROP COLUMN "total",
DROP COLUMN "statut",
ADD COLUMN     "statut" "StatutAchat" NOT NULL DEFAULT 'EN_COURS';

-- AlterTable
ALTER TABLE "Paiement" ALTER COLUMN "moyen_paiement" SET DEFAULT 'BANQUE';
