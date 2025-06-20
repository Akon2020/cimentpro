/*
  Warnings:

  - Added the required column `deviseId` to the `DetailPanier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetailPanier" ADD COLUMN     "deviseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DetailPanier" ADD CONSTRAINT "DetailPanier_deviseId_fkey" FOREIGN KEY ("deviseId") REFERENCES "Devise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
