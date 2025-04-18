import { QuoteForm } from "@/components/quote-form";
import { QuoteHeader } from "@/components/quote-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <QuoteHeader />
        <div className="mt-8">
          <QuoteForm />
        </div>
      </div>
    </main>
  );
}
