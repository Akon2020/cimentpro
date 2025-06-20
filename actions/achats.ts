export const getAllAchats = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/achats", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const achats = await res.json();
        console.log("Achats récupérés:", achats);
        return achats;
    } catch (error) {
        console.error("Erreur lors de la récupération des achats:", error);
        return [];
    }
};

export const getAchatById = async (achatId: number | string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/achats/${achatId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Erreur lors de la récupération de l'achat");

        const achat = await res.json();
        console.log("Achat récupéré:", achat);
        return achat;
    } catch (error) {
        console.error("Erreur:", error);
        return null;
    }
};

export const createAchat = async (achatData: {
    panierId: number;
    fournisseurId: number;
    deviseId: number;
    moyen_paiement: string;
    utilisateurId: number;
}) => {
    try {
        const res = await fetch("http://localhost:3000/api/achats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(achatData),
        });

        const response = await res.text();
        console.log("Création d'achat:", response);
        return response;
    } catch (error) {
        console.error("Erreur lors de la création de l'achat:", error);
        throw new Error("Échec de la création de l'achat");
    }
};
export const updateAchat = async (achatId: number, achatData: {
    panierId?: number;
    statut?: string;
    fournisseurId?: number;
    paiementId?: number;
    utilisateurId?: number;
}) => {
    try {
        const res = await fetch(`http://localhost:3000/api/achats/${achatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(achatData),
        });

        if (!res.ok) throw new Error("Échec de la mise à jour de l'achat");

        const response = await res.text();
        console.log("Mise à jour de l'achat:", response);
        return response;
    } catch (error) {
        throw new Error("Échec de la mise à jour de l'achat");
    }
};

export const deleteAchat = async (achatId: number) => {
    try{
        const res = await fetch(`http://localhost:3000/api/achats/${achatId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
)
        if(res.status === 204){
            return {success: true, message: `L'achat with ID  ${achatId} deleted`}
        }
    }
}