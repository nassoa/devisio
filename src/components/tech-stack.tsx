import type React from "react"
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  TailwindIcon,
  ShadcnIcon,
  JsPdfIcon,
  NodemailerIcon,
  VercelIcon,
  PdfLibIcon,
} from "@/components/tech-icons"

interface Technology {
  name: string
  description: string
  icon: React.ReactNode
  category: "frontend" | "backend" | "tools" | "deployment"
}

export function TechStack() {
  const technologies: Record<string, Technology[]> = {
    frontend: [
      {
        name: "React",
        description: "Bibliothèque JavaScript pour construire des interfaces utilisateur",
        icon: <ReactIcon className="h-8 w-8" />,
        category: "frontend",
      },
      {
        name: "Next.js",
        description: "Framework React pour le développement d'applications web",
        icon: <NextjsIcon className="h-8 w-8" />,
        category: "frontend",
      },
      {
        name: "TypeScript",
        description: "Superset JavaScript typé pour un code plus robuste",
        icon: <TypeScriptIcon className="h-8 w-8" />,
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utilitaire pour un développement rapide",
        icon: <TailwindIcon className="h-8 w-8" />,
        category: "frontend",
      },
      {
        name: "shadcn/ui",
        description: "Composants UI réutilisables construits avec Radix UI et Tailwind CSS",
        icon: <ShadcnIcon className="h-8 w-8" />,
        category: "frontend",
      },
    ],
    backend: [
      {
        name: "Next.js API",
        description: "API Routes de Next.js pour les fonctionnalités côté serveur",
        icon: <NextjsIcon className="h-8 w-8" />,
        category: "backend",
      },
      {
        name: "Nodemailer",
        description: "Module Node.js pour envoyer des emails",
        icon: <NodemailerIcon className="h-8 w-8" />,
        category: "backend",
      },
    ],
    tools: [
      {
        name: "jsPDF",
        description: "Bibliothèque JavaScript pour générer des PDF côté client",
        icon: <JsPdfIcon className="h-8 w-8" />,
        category: "tools",
      },
      {
        name: "PDF-lib",
        description: "Bibliothèque JavaScript pour créer et modifier des PDF",
        icon: <PdfLibIcon className="h-8 w-8" />,
        category: "tools",
      },
    ],
    deployment: [
      {
        name: "Vercel",
        description: "Plateforme de déploiement optimisée pour Next.js",
        icon: <VercelIcon className="h-8 w-8" />,
        category: "deployment",
      },
    ],
  }

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Outils",
    deployment: "Déploiement",
  }

  return (
    <div className="space-y-8">
      {Object.entries(technologies).map(([category, techs]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">
            {categoryTitles[category as keyof typeof categoryTitles]}
          </h2>
          <ul className="space-y-4">
            {techs.map((tech) => (
              <li key={tech.name} className="flex items-center">
                <div className="flex-shrink-0 mr-4 bg-gray-50 p-2 rounded-md">{tech.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
