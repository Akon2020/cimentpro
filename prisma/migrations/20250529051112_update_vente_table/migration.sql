/*
  Warnings:

  - You are about to drop the column `detailPanierId` on the `Vente` table. All the data in the column will be lost.
  - Added the required column `panierId` to the `Vente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_detailPanierId_fkey";

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "detailPanierId",
ADD COLUMN     "panierId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
