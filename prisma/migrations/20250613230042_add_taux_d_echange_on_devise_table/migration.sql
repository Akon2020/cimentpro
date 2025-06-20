/*
  Warnings:

  - Added the required column `tauxDEchange` to the `Devise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Devise" ADD COLUMN     "tauxDEchange" INTEGER NOT NULL;
