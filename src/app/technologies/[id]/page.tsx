import { QuoteHeader } from "@/components/quote-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { techStacks } from "@/lib/tech-stacks"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return techStacks.map((stack) => ({
    id: stack.id,
  }))
}

export default function TechStackPage({ params }: { params: { id: string } }) {
  const stack = techStacks.find((s) => s.id === params.id)

  if (!stack) {
    notFound()
  }

  // Organiser les technologies par catégorie
  const categorizedTech = stack.technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = []
      }
      acc[tech.category].push(tech)
      return acc
    },
    {} as Record<string, typeof stack.technologies>,
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <QuoteHeader />

        <div className="mt-8 mb-6">
          <Link href="/technologies">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux technologies
            </Button>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{stack.title}</h1>
          <p className="text-gray-600 max-w-3xl mb-6">{stack.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(categorizedTech).map(([category, techs]) => (
              <Card key={category} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{categoryNames[category as keyof typeof categoryNames]}</CardTitle>
                  <CardDescription>
                    Technologies utilisées pour {categoryNames[category as keyof typeof categoryNames].toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {techs.map((tech) => (
                      <div key={tech.name} className="border-b pb-3 last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{tech.name}</h3>
                          <Badge
                            variant="outline"
                            className={cn(categoryColors[tech.category as keyof typeof categoryColors])}
                          >
                            {categoryNames[tech.category as keyof typeof categoryNames]}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
