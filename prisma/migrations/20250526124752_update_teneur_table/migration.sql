/*
  Warnings:

  - A unique constraint covering the columns `[valeur]` on the table `Teneur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `utilisateurId` to the `Teneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teneur" ADD COLUMN     "utilisateurId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teneur_valeur_key" ON "Teneur"("valeur");

-- AddForeignKey
ALTER TABLE "Teneur" ADD CONSTRAINT "Teneur_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
