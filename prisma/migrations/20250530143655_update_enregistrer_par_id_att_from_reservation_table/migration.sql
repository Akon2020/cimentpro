/*
  Warnings:

  - You are about to drop the column `enregistreParId` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "enregistreParId",
ADD COLUMN     "enregistrerParId" INTEGER;
