-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'AGENT');

-- CreateEnum
CREATE TYPE "Poste" AS ENUM ('DIRECTEUR', 'SECRETAIRE', 'CAISSER', 'GERANT');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('homme', 'femme');

-- CreateEnum
CREATE TYPE "Ville" AS ENUM ('Bandundu', 'Kindu', 'Butembo', 'Kinshasa', 'Mbujimayi', 'Lubumbashi', 'Kananga', 'Kisangani', 'Goma', 'Bukavu', 'Tshikapa', 'Kolwezi', 'Likasi', 'Kikwit', 'Uvira', 'Bunia', 'Kalemie', 'Mbandaka', 'Matadi');

-- CreateEnum
CREATE TYPE "MoyenPaiment" AS ENUM ('CACH', 'BANCAIRE');

-- CreateTable
CREATE TABLE "Entreprise" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "encronyme" TEXT NOT NULL,
    "code_postale" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "site" TEXT,
    "email" TEXT NOT NULL,
    "decription" TEXT,
    "logo" TEXT,

    CONSTRAINT "Entreprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "postnom" TEXT NOT NULL,
    "nom_complet" TEXT,
    "sexe" "Sexe",
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "poste" "Poste",
    "picture" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id" SERIAL NOT NULL,
    "ville" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "tel" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code_postal" TEXT,
    "adresseId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teneur" (
    "id" SERIAL NOT NULL,
    "valeur" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Teneur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "designation" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "qtte" INTEGER,
    "description" TEXT NOT NULL,
    "teneurId" INTEGER NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailVente" (
    "id" SERIAL NOT NULL,
    "produitId" INTEGER NOT NULL,
    "qtte" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "prixTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailVente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "moyen_paiement" "MoyenPaiment" NOT NULL DEFAULT 'CACH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vente" (
    "id" SERIAL NOT NULL,
    "statut" TEXT NOT NULL,
    "total_ttc" DOUBLE PRECISION NOT NULL,
    "total_ht" DOUBLE PRECISION NOT NULL,
    "remise" DOUBLE PRECISION NOT NULL,
    "detailVenteId" INTEGER NOT NULL,
    "paiementId" INTEGER NOT NULL,
    "entrepriseId" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fournisseurId" INTEGER,

    CONSTRAINT "Vente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailAchat" (
    "id" SERIAL NOT NULL,
    "produitId" INTEGER NOT NULL,
    "qtte" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "prixTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailAchat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achat" (
    "id" SERIAL NOT NULL,
    "statut" TEXT NOT NULL,
    "fournisseurId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "detailAchatId" INTEGER NOT NULL,
    "agentId" TEXT NOT NULL,
    "paiementId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_nom_key" ON "Entreprise"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_encronyme_key" ON "Entreprise"("encronyme");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_code_postale_key" ON "Entreprise"("code_postale");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_tel_key" ON "Entreprise"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Entreprise_email_key" ON "Entreprise"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_tel_key" ON "Contact"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_email_key" ON "Fournisseur"("email");

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fournisseur" ADD CONSTRAINT "Fournisseur_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fournisseur" ADD CONSTRAINT "Fournisseur_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_teneurId_fkey" FOREIGN KEY ("teneurId") REFERENCES "Teneur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailVente" ADD CONSTRAINT "DetailVente_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_detailVenteId_fkey" FOREIGN KEY ("detailVenteId") REFERENCES "DetailVente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_paiementId_fkey" FOREIGN KEY ("paiementId") REFERENCES "Paiement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "Entreprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailAchat" ADD CONSTRAINT "DetailAchat_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_detailAchatId_fkey" FOREIGN KEY ("detailAchatId") REFERENCES "DetailAchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_paiementId_fkey" FOREIGN KEY ("paiementId") REFERENCES "Paiement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
