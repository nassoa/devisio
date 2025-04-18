export interface TechItem {
  name: string
  description: string
  category: "frontend" | "backend" | "database" | "cms" | "deployment" | "tools"
}

export interface TechStack {
  id: string
  title: string
  description: string
  technologies: TechItem[]
}

export const techStacks: TechStack[] = [
  {
    id: "static",
    title: "Site Statique",
    description: "Technologies utilisées pour les sites statiques, rapides et performants.",
    technologies: [
      {
        name: "Next.js",
        description: "Framework React pour le rendu statique et côté serveur",
        category: "frontend",
      },
      {
        name: "React",
        description: "Bibliothèque JavaScript pour construire des interfaces utilisateur",
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utilitaire pour un développement rapide",
        category: "frontend",
      },
      {
        name: "TypeScript",
        description: "Superset JavaScript typé pour un code plus robuste",
        category: "frontend",
      },
      {
        name: "Vercel",
        description: "Plateforme de déploiement optimisée pour Next.js",
        category: "deployment",
      },
      {
        name: "Netlify",
        description: "Plateforme de déploiement pour sites statiques",
        category: "deployment",
      },
      {
        name: "GitHub",
        description: "Plateforme de gestion de code source",
        category: "tools",
      },
    ],
  },
  {
    id: "wordpress",
    title: "Site WordPress",
    description: "Technologies utilisées pour les sites WordPress personnalisés et performants.",
    technologies: [
      {
        name: "WordPress",
        description: "CMS le plus populaire au monde",
        category: "cms",
      },
      {
        name: "PHP",
        description: "Langage de programmation côté serveur",
        category: "backend",
      },
      {
        name: "MySQL",
        description: "Système de gestion de base de données relationnelle",
        category: "database",
      },
      {
        name: "JavaScript",
        description: "Langage de programmation pour l'interactivité côté client",
        category: "frontend",
      },
      {
        name: "SASS",
        description: "Préprocesseur CSS pour des styles plus maintenables",
        category: "frontend",
      },
      {
        name: "Gutenberg",
        description: "Éditeur de blocs WordPress",
        category: "tools",
      },
      {
        name: "ACF",
        description: "Plugin pour créer des champs personnalisés",
        category: "tools",
      },
      {
        name: "WP Engine",
        description: "Hébergement WordPress géré",
        category: "deployment",
      },
    ],
  },
  {
    id: "strapi",
    title: "Site avec Strapi CMS",
    description: "Technologies utilisées pour les sites avec Strapi CMS headless.",
    technologies: [
      {
        name: "Strapi",
        description: "CMS headless open-source basé sur Node.js",
        category: "cms",
      },
      {
        name: "Next.js",
        description: "Framework React pour le rendu statique et côté serveur",
        category: "frontend",
      },
      {
        name: "React",
        description: "Bibliothèque JavaScript pour construire des interfaces utilisateur",
        category: "frontend",
      },
      {
        name: "Node.js",
        description: "Environnement d'exécution JavaScript côté serveur",
        category: "backend",
      },
      {
        name: "PostgreSQL",
        description: "Système de gestion de base de données relationnelle",
        category: "database",
      },
      {
        name: "GraphQL",
        description: "Langage de requête pour les API",
        category: "backend",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utilitaire pour un développement rapide",
        category: "frontend",
      },
      {
        name: "Docker",
        description: "Plateforme de conteneurisation",
        category: "deployment",
      },
      {
        name: "Heroku",
        description: "Plateforme cloud pour déployer des applications",
        category: "deployment",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Technologies utilisées pour les sites e-commerce performants et sécurisés.",
    technologies: [
      {
        name: "Next.js Commerce",
        description: "Solution e-commerce basée sur Next.js",
        category: "frontend",
      },
      {
        name: "WooCommerce",
        description: "Plugin e-commerce pour WordPress",
        category: "cms",
      },
      {
        name: "Shopify",
        description: "Plateforme e-commerce tout-en-un",
        category: "cms",
      },
      {
        name: "Stripe",
        description: "Solution de paiement en ligne",
        category: "tools",
      },
      {
        name: "PayPal",
        description: "Solution de paiement en ligne",
        category: "tools",
      },
      {
        name: "MongoDB",
        description: "Base de données NoSQL",
        category: "database",
      },
      {
        name: "Redis",
        description: "Stockage de données en mémoire pour le cache",
        category: "database",
      },
      {
        name: "Algolia",
        description: "Moteur de recherche pour les applications web",
        category: "tools",
      },
      {
        name: "Vercel",
        description: "Plateforme de déploiement optimisée pour Next.js",
        category: "deployment",
      },
      {
        name: "AWS",
        description: "Services cloud d'Amazon",
        category: "deployment",
      },
    ],
  },
  {
    id: "headless",
    title: "Headless CMS",
    description: "Technologies utilisées pour les sites avec architecture headless.",
    technologies: [
      {
        name: "Contentful",
        description: "CMS headless cloud",
        category: "cms",
      },
      {
        name: "Sanity",
        description: "CMS headless avec éditeur personnalisable",
        category: "cms",
      },
      {
        name: "Next.js",
        description: "Framework React pour le rendu statique et côté serveur",
        category: "frontend",
      },
      {
        name: "React",
        description: "Bibliothèque JavaScript pour construire des interfaces utilisateur",
        category: "frontend",
      },
      {
        name: "GraphQL",
        description: "Langage de requête pour les API",
        category: "backend",
      },
      {
        name: "TypeScript",
        description: "Superset JavaScript typé pour un code plus robuste",
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utilitaire pour un développement rapide",
        category: "frontend",
      },
      {
        name: "Vercel",
        description: "Plateforme de déploiement optimisée pour Next.js",
        category: "deployment",
      },
      {
        name: "Netlify",
        description: "Plateforme de déploiement pour sites statiques",
        category: "deployment",
      },
    ],
  },
]
