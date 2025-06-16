/*
  Warnings:

  - You are about to drop the column `detailVenteId` on the `Vente` table. All the data in the column will be lost.
  - The `statut` column on the `Vente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DetailAchat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetailVente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `detailPanierId` to the `Vente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatutVente" AS ENUM ('EN_ATTENTE', 'CONFIRME', 'REMBOURSE', 'ANNULE');

-- DropForeignKey
ALTER TABLE "DetailAchat" DROP CONSTRAINT "DetailAchat_panierId_fkey";

-- DropForeignKey
ALTER TABLE "DetailAchat" DROP CONSTRAINT "DetailAchat_produitId_fkey";

-- DropForeignKey
ALTER TABLE "DetailVente" DROP CONSTRAINT "DetailVente_produitId_fkey";

-- DropForeignKey
ALTER TABLE "Vente" DROP CONSTRAINT "Vente_detailVenteId_fkey";

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "detailVenteId",
ADD COLUMN     "detailPanierId" INTEGER NOT NULL,
DROP COLUMN "statut",
ADD COLUMN     "statut" "StatutVente" NOT NULL DEFAULT 'EN_ATTENTE';

-- DropTable
DROP TABLE "DetailAchat";

-- DropTable
DROP TABLE "DetailVente";

-- CreateTable
CREATE TABLE "DetailPanier" (
    "id" SERIAL NOT NULL,
    "produitId" INTEGER NOT NULL,
    "qtte" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "prixTotal" DOUBLE PRECISION NOT NULL,
    "panierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailPanier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_detailPanierId_fkey" FOREIGN KEY ("detailPanierId") REFERENCES "DetailPanier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPanier" ADD CONSTRAINT "DetailPanier_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPanier" ADD CONSTRAINT "DetailPanier_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
