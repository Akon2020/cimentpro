const API = process.env.NEXT_PUBLIC_API;

export const getAllDevises = async () => {
  try {
    const res = await fetch(`${API}/api/agents/1/devises`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch devises. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getAllDevises error:", error);
    return [];
  }
};

export const getSingleDevise = async (id: number) => {
  try {
    const res = await fetch(`${API}/api/agents/1/devises${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch agent with ID ${id}. Status: ${res.status}`);
    }

    const agent = await res.json();
    console.log("Single Devise:", agent);
    return agent;
  } catch (error) {
    console.error("getSingleDevise error:", error);
    return null;
  }
};

export const createDevise = async (agentData: {
    nom: string;
    code: string;
    symbole: string;
    tauxDEchange: number;
}) => {
    try {
        const res = await fetch(`${API}/api/agents/1/devises/create`, {
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

export const updateDevise = async (
  id: number,
  agentData: {
    nom: string;
    code: string;
    symbole: string;
    tauxDEchange: number;
  }
) => {
  try {
    const nom_complet = agentData.nom + (agentData.postnom ? ` ${agentData.postnom}` : "");

    const res = await fetch(`${API}/api/agents/1/devices/${id}`, {
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


export const deleteDevise = async (id: number) => {
  try {
    const res = await fetch(`${API}/api/agents/1/devices/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.message || `Échec de suppression de l'agent avec l'ID ${id}`);
    }

    return { success: true, message: `Devise avec l'ID ${id} supprimé avec succès.` };
  } catch (error) {
    console.error("Erreur suppression agent:", error);
    throw new Error(`Erreur lors de la suppression de l’agent avec l'ID ${id}`);
  }
};
