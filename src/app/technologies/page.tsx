import { QuoteHeader } from "@/components/quote-header"
import { TechStackCard } from "@/components/tech-stack-card"
import { techStacks } from "@/lib/tech-stacks"

export default function TechnologiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <QuoteHeader />

        <div className="mt-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Nos Technologies</h1>
          <p className="text-gray-600 max-w-3xl">
            Nous utilisons les technologies les plus modernes et performantes pour développer vos projets web. Chaque
            type de projet nécessite des technologies spécifiques pour répondre au mieux à vos besoins. Découvrez
            ci-dessous les stacks technologiques que nous utilisons pour chaque type de projet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {techStacks.map((stack) => (
            <TechStackCard
              key={stack.id}
              title={stack.title}
              description={stack.description}
              technologies={stack.technologies}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
