/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Fournisseur` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "statutPanier" AS ENUM ('EN_COURS', 'VALIDE', 'ANNULE');

-- AlterTable
ALTER TABLE "Adresse" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "ville" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Panier" ADD COLUMN     "statut" "statutPanier" NOT NULL DEFAULT 'EN_COURS';

-- AlterTable
ALTER TABLE "Vente" ADD COLUMN     "creerPar" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_nom_key" ON "Fournisseur"("nom");
