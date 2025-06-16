-- CreateTable
CREATE TABLE "Panier" (
    "id" SERIAL NOT NULL,
    "detailAchatId" INTEGER NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Panier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Panier" ADD CONSTRAINT "Panier_detailAchatId_fkey" FOREIGN KEY ("detailAchatId") REFERENCES "DetailAchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panier" ADD CONSTRAINT "Panier_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
