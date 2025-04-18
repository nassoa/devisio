import { FileText } from "lucide-react"

export function QuoteHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-4">
        <FileText className="h-8 w-8 text-teal-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Générateur de Devis</h1>
      <p className="mt-3 text-lg text-gray-600 max-w-2xl">
        Remplissez le formulaire ci-dessous pour obtenir instantanément un devis personnalisé pour votre projet.
      </p>
    </div>
  )
}
