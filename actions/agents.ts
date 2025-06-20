const API = process.env.NEXT_PUBLIC_API;

export const getAllAgents = async () => {
  try {
    const res = await fetch(`${API}/api/agents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch agents. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getAllAgents error:", error);
    return [];
  }
};

export const getSingleAgent = async (id: number) => {
  try {
    const res = await fetch(`${API}/api/agents/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch agent with ID ${id}. Status: ${res.status}`);
    }

    const agent = await res.json();
    console.log("Single Agent:", agent);
    return agent;
  } catch (error) {
    console.error("getSingleAgent error:", error);
    return null;
  }
};

export const createAgent = async (agentData: {
    email: string;
    nom: string;
    postnom?: string;
    sexe?: "HOMME" | "FEMME";
    poste?: "DIRECTEUR" | "SECRETAIRE" | "CAISSIER" | "GERANT";
    role?: "ADMIN" | "AGENT";
    picture?: string;
}) => {
    try {
        const res = await fetch(`${API}/api/agents/create`, {
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

export const updateAgent = async (
  id: number,
  agentData: {
    email: string;
    nom: string;
    postnom?: string;
    sexe?: "HOMME" | "FEMME";
    poste?: "DIRECTEUR" | "SECRETAIRE" | "CAISSIER" | "GERANT";
    role?: "ADMIN" | "AGENT";
    picture?: string;
  }
) => {
  try {
    const nom_complet = agentData.nom + (agentData.postnom ? ` ${agentData.postnom}` : "");

    const res = await fetch(`${API}/api/agents/${id}/update`, {
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


export const deleteAgent = async (id: number) => {
  try {
    const res = await fetch(`${API}/api/agents/${id}/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || `Échec de suppression de l'agent avec l'ID ${id}`);
    }

    return { success: true, message: `Agent avec l'ID ${id} supprimé avec succès.` };
  } catch (error) {
    console.error("Erreur suppression agent:", error);
    throw new Error(`Erreur lors de la suppression de l’agent avec l'ID ${id}`);
  }
};
