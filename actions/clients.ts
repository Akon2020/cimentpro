const API = process.env.NEXT_PUBLIC_API;

export const getAllClients = async () => {
  try {
    const res = await fetch(`${API}/api/agents/1/clients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cleint. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getAllClients error:", error);
    return [];
  }
};

export const getSingleClient = async (id: number) => {
  try {
    const res = await fetch(`${API}/api/agents/1/clients/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch agent with ID ${id}. Status: ${res.status}`);
    }

    const agent = await res.json();
    console.log("Single Client:", agent);
    return agent;
  } catch (error) {
    console.error("getSingleClient error:", error);
    return null;
  }
};

export const createClient = async (agentData: {
    email: string;
    nom: string;
    postnom?: string;
    sexe?: "HOMME" | "FEMME";
    picture?: string;
}) => {
    try {
        const res = await fetch(`${API}/api/agents/1/clients/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agentData)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error?.error || "Failed to create agent");
        }

        const response = await res.json();
        return response;
    } catch (error) {
        console.error("Erreur création agent:", error);
        throw new Error('Erreur lors de la création de l’agent');
    }
};

export const updateClient = async (
  id: number,
  agentData: {
    email: string;
    nom: string;
    postnom?: string;
    picture?: string;
  }
) => {
  try {
    const nom_complet = agentData.nom + (agentData.postnom ? ` ${agentData.postnom}` : "");

    const res = await fetch(`${API}/api/agents/1/clients/${id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...agentData,
        nom_complet
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || `Échec de mise à jour de l'agent avec l'ID ${id}`);
    }

    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Erreur mise à jour agent:", error);
    throw new Error(`Erreur lors de la mise à jour de l’agent avec l'ID ${id}`);
  }
};


export const deleteClient = async (id: number) => {
  try {
    const res = await fetch(`${API}/api/agents/1/clients/${id}/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || `Échec de suppression de l'agent avec l'ID ${id}`);
    }

    return { success: true, message: `Client avec l'ID ${id} supprimé avec succès.` };
  } catch (error) {
    console.error("Erreur suppression agent:", error);
    throw new Error(`Erreur lors de la suppression de l’agent avec l'ID ${id}`);
  }
};
