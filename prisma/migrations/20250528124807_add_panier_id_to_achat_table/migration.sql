/*
  Warnings:

  - Added the required column `panierId` to the `Achat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achat" ADD COLUMN     "panierId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
