import { notFound } from "next/navigation"

/**
 * Utilitaire pour déclencher une page 404 avec vérification
 */
export function triggerNotFound(condition: boolean) {
  if (condition) {
    notFound()
  }
}

/**
 * Vérifier si un ID existe et déclencher 404 si nécessaire
 */
export function validateIdOrNotFound(id: string | undefined, validIds: string[]) {
  if (!id || !validIds.includes(id)) {
    notFound()
  }
}

/**
 * Vérifier les permissions et déclencher 404 si nécessaire
 */
export function checkPermissionOrNotFound(hasPermission: boolean) {
  if (!hasPermission) {
    notFound()
  }
}
