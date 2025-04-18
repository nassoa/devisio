import { AboutHeader } from "@/components/about-header";
import { TechStack } from "@/components/tech-stack";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
      <div className="container mx-auto px-4 py-8">
        <AboutHeader />

        <div className="lg:px-32">
          <div className="mt-10 mb-12  mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              À propos de cette application
            </h1>
            <p className="text-gray-600 mb-8">
              Ce générateur de devis a été développé en utilisant les
              technologies web les plus modernes pour offrir une expérience
              utilisateur fluide et performante. Voici les principales
              technologies utilisées :
            </p>

            <TechStack />
          </div>
        </div>
      </div>
    </main>
  );
}
