/*
  Warnings:

  - The values [DIRECTEUR,SECRETAIRE,CAISSER,GERANT] on the enum `Poste` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,CLIENT,AGENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Poste_new" AS ENUM ('directeur', 'secretaire', 'caissier', 'gerant');
ALTER TABLE "Utilisateur" ALTER COLUMN "poste" TYPE "Poste_new" USING ("poste"::text::"Poste_new");
ALTER TYPE "Poste" RENAME TO "Poste_old";
ALTER TYPE "Poste_new" RENAME TO "Poste";
DROP TYPE "Poste_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'client', 'agent');
ALTER TABLE "Utilisateur" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Utilisateur" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Utilisateur" ALTER COLUMN "role" SET DEFAULT 'client';
COMMIT;

-- AlterTable
ALTER TABLE "Utilisateur" ALTER COLUMN "role" SET DEFAULT 'client';
