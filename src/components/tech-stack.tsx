import type React from "react";
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
} from "@/components/tech-icons";
import { GrReactjs } from "react-icons/gr";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiVercel,
} from "react-icons/si";
import { TbMailCheck } from "react-icons/tb";
import { FaFilePdf, FaRegFilePdf } from "react-icons/fa6";

interface Technology {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "tools" | "deployment";
}

export function TechStack() {
  const technologies: Record<string, Technology[]> = {
    frontend: [
      {
        name: "React",
        description:
          "Bibliothèque JavaScript pour construire des interfaces utilisateur",
        icon: <GrReactjs className="h-8 w-8 text-cyan-400" />,
        category: "frontend",
      },
      {
        name: "Next.js",
        description: "Framework React pour le développement d'applications web",
        icon: <SiNextdotjs className="h-8 w-8 text-black" />,
        category: "frontend",
      },
      {
        name: "TypeScript",
        description: "Superset JavaScript typé pour un code plus robuste",
        icon: <SiTypescript className="h-5 w-5 text-[#3178C6]" />,
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utilitaire pour un développement rapide",
        icon: <SiTailwindcss className="h-8 w-8 text-cyan-500" />,
        category: "frontend",
      },
      {
        name: "shadcn/ui",
        description:
          "Composants UI réutilisables construits avec Radix UI et Tailwind CSS",
        icon: <SiShadcnui className="h-5 w-5 text-black" />,
        category: "frontend",
      },
    ],
    backend: [
      {
        name: "Next.js API",
        description:
          "API Routes de Next.js pour les fonctionnalités côté serveur",
        icon: <SiNextdotjs className="h-8 w-8 text-black" />,
        category: "backend",
      },
      {
        name: "Nodemailer",
        description: "Module Node.js pour envoyer des emails",
        icon: <TbMailCheck className="h-8 w-8 text-emerald-500" />,
        category: "backend",
      },
    ],
    tools: [
      {
        name: "jsPDF",
        description: "Bibliothèque JavaScript pour générer des PDF côté client",
        icon: <FaFilePdf className="h-8 w-8 text-red-500" />,
        category: "tools",
      },
      {
        name: "PDF-lib",
        description: "Bibliothèque JavaScript pour créer et modifier des PDF",
        icon: <FaRegFilePdf className="h-8 w-8 text-red-500" />,
        category: "tools",
      },
    ],
    deployment: [
      {
        name: "Vercel",
        description: "Plateforme de déploiement optimisée pour Next.js",
        icon: <SiVercel className="h-8 w-8 text-black" />,
        category: "deployment",
      },
    ],
  };

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    tools: "Outils",
    deployment: "Déploiement",
  };

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
                <div className="flex-shrink-0 mr-4  p-2 rounded-md w-10 h-8 flex items-start justify-center">
                  {tech.icon}
                </div>
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
  );
}
