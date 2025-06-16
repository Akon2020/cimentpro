/*
  Warnings:

  - You are about to drop the column `notesClient` on the `Reservation` table. All the data in the column will be lost.
  - Changed the type of `type_acheteur` on the `Vente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeClient" AS ENUM ('ordinaire', 'nouveau', 'client', 'fournisseur', 'agent');

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "notesClient",
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "type_client" "TypeClient" NOT NULL DEFAULT 'ordinaire';

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "type_acheteur",
ADD COLUMN     "type_acheteur" "TypeClient" NOT NULL;

-- DropEnum
DROP TYPE "TypeAcheteur";
