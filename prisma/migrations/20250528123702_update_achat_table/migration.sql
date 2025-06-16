/*
  Warnings:

  - You are about to drop the column `agentId` on the `Achat` table. All the data in the column will be lost.
  - You are about to drop the column `detailAchatId` on the `Achat` table. All the data in the column will be lost.
  - Added the required column `enregisterParId` to the `Achat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Achat" DROP CONSTRAINT "Achat_agentId_fkey";

-- DropForeignKey
ALTER TABLE "Achat" DROP CONSTRAINT "Achat_detailAchatId_fkey";

-- AlterTable
ALTER TABLE "Achat" DROP COLUMN "agentId",
DROP COLUMN "detailAchatId",
ADD COLUMN     "enregisterParId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_enregisterParId_fkey" FOREIGN KEY ("enregisterParId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
