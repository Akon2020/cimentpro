/*
  Warnings:

  - Added the required column `modePaiement` to the `DetailPanier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailPanier" ADD COLUMN     "modePaiement" "ModePaiment" NOT NULL;
