import type React from "react"
import { NavBar } from "@/components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "@/app/globals.css"

export const metadata = {
  title: "Générateur de Devis",
  description: "Générez facilement des devis pour vos projets web",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NavBar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
