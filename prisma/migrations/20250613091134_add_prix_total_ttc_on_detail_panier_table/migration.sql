/*
  Warnings:

  - You are about to drop the column `prixTotal` on the `DetailPanier` table. All the data in the column will be lost.
  - Added the required column `prixTotalHT` to the `DetailPanier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixTotalTTC` to the `DetailPanier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailPanier" DROP COLUMN "prixTotal",
ADD COLUMN     "prixTotalHT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "prixTotalTTC" DOUBLE PRECISION NOT NULL;
