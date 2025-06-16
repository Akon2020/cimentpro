/*
  Warnings:

  - You are about to drop the column `enregistreParId` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `notesClient` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `numeroCommande` on the `Commande` table. All the data in the column will be lost.
  - Added the required column `paiementId` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `panierId` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_clientId_fkey";

-- DropIndex
DROP INDEX "Commande_numeroCommande_key";

-- AlterTable
ALTER TABLE "Commande" DROP COLUMN "enregistreParId",
DROP COLUMN "notesClient",
DROP COLUMN "numeroCommande",
ADD COLUMN     "enregistrerParId" INTEGER,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paiementId" INTEGER NOT NULL,
ADD COLUMN     "panierId" INTEGER NOT NULL,
ADD COLUMN     "type_client" "TypeClient" NOT NULL DEFAULT 'ordinaire',
ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_paiementId_fkey" FOREIGN KEY ("paiementId") REFERENCES "Paiement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
