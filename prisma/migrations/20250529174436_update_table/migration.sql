/*
  Warnings:

  - The `clientId` column on the `Vente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `nom` on table `Utilisateur` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postnom` on table `Utilisateur` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE utilisateur_id_seq;
ALTER TABLE "Utilisateur" ALTER COLUMN "nom" SET NOT NULL,
ALTER COLUMN "postnom" SET NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('utilisateur_id_seq');
ALTER SEQUENCE utilisateur_id_seq OWNED BY "Utilisateur"."id";

-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "clientId",
ADD COLUMN     "clientId" INTEGER;
