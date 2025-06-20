export const getAllCommandes = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/commandes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await res.json();
        console.log("Get All Commandes", response);
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export const createCommande = async (commandeData: any, panierId: number) => {
    try {
        const res = await fetch(`http://localhost:3000/api/commandes?panierId=${panierId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commandeData)
        });
        const response = await res.text();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create Commande');
    }
}
