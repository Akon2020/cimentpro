/*
  Warnings:

  - Added the required column `agentId` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fournisseur" ADD COLUMN     "agentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Fournisseur" ADD CONSTRAINT "Fournisseur_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
