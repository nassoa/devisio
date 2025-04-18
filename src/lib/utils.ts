import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatCurrency(amount: number): string {
  // Utiliser une méthode de formatage qui évite les espaces insécables étroits
  // en spécifiant explicitement le séparateur de milliers
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    // Utiliser des options personnalisées pour éviter les caractères spéciaux
    useGrouping: true,
  })

  // Formater le montant et remplacer manuellement les espaces insécables par des espaces normaux
  return formatter.format(amount).replace(/\u202F/g, " ")
}

export function getProjectTypeName(type: string): string {
  const types: Record<string, string> = {
    static: "Site statique",
    wordpress: "Site WordPress",
    strapi: "Site avec Strapi CMS",
    ecommerce: "E-commerce",
    headless: "Headless CMS",
  }

  return types[type] || type
}

export function getDeadlineName(deadline: string): string {
  const deadlines: Record<string, string> = {
    "1-2-weeks": "1-2 semaines",
    "2-4-weeks": "2-4 semaines",
    "1-2-months": "1-2 mois",
    "3-6-months": "3-6 mois",
    "6-months+": "Plus de 6 mois",
  }

  return deadlines[deadline] || deadline
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
