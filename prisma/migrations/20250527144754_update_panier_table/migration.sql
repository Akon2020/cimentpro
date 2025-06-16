/*
  Warnings:

  - You are about to drop the column `detailAchatId` on the `Panier` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Panier" DROP CONSTRAINT "Panier_detailAchatId_fkey";

-- AlterTable
ALTER TABLE "Panier" DROP COLUMN "detailAchatId";
