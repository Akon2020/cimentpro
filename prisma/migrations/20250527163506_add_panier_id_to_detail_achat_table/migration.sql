/*
  Warnings:

  - Added the required column `panierId` to the `DetailAchat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailAchat" ADD COLUMN     "panierId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DetailAchat" ADD CONSTRAINT "DetailAchat_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
