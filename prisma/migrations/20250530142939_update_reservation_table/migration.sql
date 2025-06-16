/*
  Warnings:

  - You are about to drop the column `dateReservation` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `numeroReservation` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Reservation_numeroReservation_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "dateReservation",
DROP COLUMN "numeroReservation",
ALTER COLUMN "adresseLivraison" DROP NOT NULL;
