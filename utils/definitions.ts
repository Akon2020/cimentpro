export interface User {
    id: string,
    email: string,
    nom: string,
    postnom: string | null | undefined,
    nom_complet: string | null | undefined,
    sexe: string | null | undefined,
    role: string | null | undefined,
    poste: string | null | undefined,
    picture: string | null | undefined,
    createdAt: string,
    updateedAt: string
  } 