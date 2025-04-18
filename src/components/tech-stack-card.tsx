import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TechItem {
  name: string
  description: string
  category: "frontend" | "backend" | "database" | "cms" | "deployment" | "tools"
}

interface TechStackCardProps {
  title: string
  description: string
  technologies: TechItem[]
  className?: string
}

export function TechStackCard({ title, description, technologies, className }: TechStackCardProps) {
  // Organiser les technologies par catégorie
  const categorizedTech = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = []
      }
      acc[tech.category].push(tech)
      return acc
    },
    {} as Record<string, TechItem[]>,
  )

  // Noms des catégories en français
  const categoryNames = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Base de données",
    cms: "CMS",
    deployment: "Déploiement",
    tools: "Outils",
  }

  // Couleurs des badges par catégorie
  const categoryColors = {
    frontend: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    backend: "bg-green-100 text-green-800 hover:bg-green-200",
    database: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    cms: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    deployment: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    tools: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(categorizedTech).map(([category, techs]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {categoryNames[category as keyof typeof categoryNames]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className={cn(
                      "cursor-pointer transition-colors",
                      categoryColors[tech.category as keyof typeof categoryColors],
                    )}
                    title={tech.description}
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
