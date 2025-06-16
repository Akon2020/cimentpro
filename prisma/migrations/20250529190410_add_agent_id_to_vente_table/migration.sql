/*
  Warnings:

  - Made the column `email` on table `Utilisateur` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Utilisateur" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vente" ADD COLUMN     "agentId" INTEGER;
