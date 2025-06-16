/*
  Warnings:

  - You are about to drop the column `decription` on the `Entreprise` table. All the data in the column will be lost.
  - Added the required column `deviseId` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Teneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entreprise" DROP COLUMN "decription",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "deviseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teneur" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Devise" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "symbole" VARCHAR(5) NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Devise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Devise_nom_key" ON "Devise"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Devise_code_key" ON "Devise"("code");

-- AddForeignKey
ALTER TABLE "Devise" ADD CONSTRAINT "Devise_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_deviseId_fkey" FOREIGN KEY ("deviseId") REFERENCES "Devise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
