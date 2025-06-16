-- CreateEnum
CREATE TYPE "StatutReservation" AS ENUM ('EN_ATTENTE', 'CONFIRMEE', 'ANNULEE', 'REJETEE', 'CONVERTIE');

-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_ATTENTE_PAIEMENT', 'PAIDEE', 'EN_PREPARATION', 'EN_LIVRAISON', 'LIVREE', 'ANNULEE', 'REMBOURSEE', 'ECHEC_PAIEMENT');

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "numeroReservation" VARCHAR(50) NOT NULL,
    "dateReservation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLivraisonSouhaitee" TIMESTAMP(3) NOT NULL,
    "adresseLivraison" VARCHAR(255) NOT NULL,
    "statut" "StatutReservation" NOT NULL DEFAULT 'EN_ATTENTE',
    "notesClient" TEXT,
    "clientId" INTEGER,
    "panierId" INTEGER NOT NULL,
    "nom" TEXT,
    "tel" TEXT,
    "adresseId" INTEGER,
    "contactId" INTEGER,
    "enregistreParId" INTEGER,
    "fournisseurId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "numeroCommande" VARCHAR(50) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "nom" TEXT,
    "tel" TEXT,
    "adresseId" INTEGER,
    "contactId" INTEGER,
    "fournisseurId" INTEGER,
    "notesClient" TEXT,
    "dateLivraisonEffective" TIMESTAMP(3),
    "adresseLivraison" VARCHAR(255),
    "enregistreParId" INTEGER,
    "statut" "StatutCommande" NOT NULL DEFAULT 'EN_ATTENTE_PAIEMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_numeroReservation_key" ON "Reservation"("numeroReservation");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_numeroCommande_key" ON "Commande"("numeroCommande");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
