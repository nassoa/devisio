"use client"

import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { formatCurrency, getProjectTypeName, getDeadlineName } from "@/lib/utils"
import { CGV_TEXT } from "@/lib/cgv"

interface QuoteItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface QuoteData {
  items: QuoteItem[]
  subtotal: number
  tax: number
  total: number
  urgentFee?: number
}

// Fonction pour nettoyer les chaînes de caractères des espaces insécables
function cleanString(str: string): string {
  // Remplacer les espaces insécables étroits (U+202F) par des espaces normaux
  return str.replace(/\u202F/g, " ")
}

export async function generatePDF(quoteData: QuoteData, formData: any) {
  // Définir les couleurs principales - version simplifiée
  const primaryColor = [13, 148, 136] // teal-600 en RGB
  const textColor = [15, 23, 42] // slate-900 en RGB
  const lightTextColor = [100, 116, 139] // slate-500 en RGB

  // Create a new PDF document
  const doc = new jsPDF()

  // Ajouter un en-tête simple
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, 210, 15, "F") // Bande de couleur en haut

  // Add title
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text("DEVIS", 15, 10)

  // Add date
  const dateStr = cleanString(`Date: ${new Date().toLocaleDateString("fr-FR")}`)
  doc.setFontSize(10)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.text(dateStr, 195, 10, { align: "right" })

  // Add client information
  doc.setFontSize(12)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFont(undefined, "bold")
  doc.text("CLIENT", 15, 30)

  doc.setFontSize(10)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont(undefined, "normal")
  doc.text(`${formData.firstName} ${formData.lastName}`, 15, 40)
  doc.text(formData.email, 15, 47)
  if (formData.companyName) {
    doc.text(formData.companyName, 15, 54)
  }
  if (formData.companySector) {
    doc.text(`Secteur: ${formData.companySector}`, 15, formData.companyName ? 61 : 54)
  }

  // Add project details
  doc.setFontSize(12)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFont(undefined, "bold")
  doc.text("PROJET", 120, 30)

  doc.setFontSize(10)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont(undefined, "normal")
  doc.text(`Type: ${getProjectTypeName(formData.projectType)}`, 120, 40)
  doc.text(`Délai: ${getDeadlineName(formData.deadline)}`, 120, 47)
  if (formData.isUrgent) {
    doc.setTextColor(255, 0, 0)
    doc.text("PROJET URGENT", 120, 54)
    doc.setTextColor(textColor[0], textColor[1], textColor[2])
  }
  doc.text(`Pages: ${formData.pagesCount}`, 120, formData.isUrgent ? 61 : 54)

  // Add quote items table with simplified styling
  const tableY = 70

  // Nettoyer les montants pour le tableau
  const cleanedItems = quoteData.items.map((item) => [
    item.description,
    item.quantity.toString(),
    cleanString(formatCurrency(item.unitPrice)),
    cleanString(formatCurrency(item.total)),
  ])

  autoTable(doc, {
    startY: tableY,
    head: [["Description", "Quantité", "Prix unitaire", "Total"]],
    body: cleanedItems,
    theme: "grid",
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
    },
  })

  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY + 10

  // Add totals with simplified styling
  let currentY = finalY

  doc.setFontSize(10)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.text("Sous-total:", 130, currentY)
  doc.text(cleanString(formatCurrency(quoteData.subtotal)), 195, currentY, { align: "right" })

  if (quoteData.urgentFee) {
    currentY += 8
    doc.text("Supplément urgence (25%):", 130, currentY)
    doc.text(cleanString(formatCurrency(quoteData.urgentFee)), 195, currentY, { align: "right" })
  }

  currentY += 8
  doc.text("TVA (20%):", 130, currentY)
  doc.text(cleanString(formatCurrency(quoteData.tax)), 195, currentY, { align: "right" })

  // Add total
  currentY += 10
  doc.setFontSize(12)
  doc.setFont(undefined, "bold")
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text("TOTAL:", 130, currentY)
  doc.text(cleanString(formatCurrency(quoteData.total)), 195, currentY, { align: "right" })

  // Add project description
  currentY += 20
  doc.setFontSize(12)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFont(undefined, "bold")
  doc.text("DESCRIPTION DU PROJET", 15, currentY)

  currentY += 10
  doc.setFontSize(10)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont(undefined, "normal")

  // Split long description into multiple lines
  const splitDescription = doc.splitTextToSize(formData.projectDescription, 180)
  doc.text(splitDescription, 15, currentY)

  // Calculer la position après la description du projet
  currentY += splitDescription.length * 5 + 15

  // Ajouter une nouvelle page pour les CGV si on est trop bas dans la page
  if (currentY > 230) {
    doc.addPage()
    currentY = 20
  }

  // Ajouter les CGV
  doc.setFontSize(12)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFont(undefined, "bold")
  doc.text("CONDITIONS GÉNÉRALES DE VENTE", 15, currentY)

  currentY += 10
  doc.setFontSize(8)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont(undefined, "normal")

  // Diviser le texte des CGV en paragraphes
  const cgvParagraphs = CGV_TEXT.split("\n\n")

  for (const paragraph of cgvParagraphs) {
    if (paragraph.trim() === "") continue

    // Vérifier si on a besoin d'une nouvelle page
    if (currentY > 270) {
      doc.addPage()
      currentY = 20
    }

    // Formater le texte pour qu'il rentre dans la page
    const splitParagraph = doc.splitTextToSize(paragraph.trim(), 180)
    doc.text(splitParagraph, 15, currentY)

    // Mettre à jour la position Y pour le prochain paragraphe
    currentY += splitParagraph.length * 3.5 + 5
  }

  // Add footer on the last page
  doc.setFontSize(9)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.text("Ce devis est valable 30 jours à compter de sa date d'émission.", 105, 280, { align: "center" })

  // Save the PDF
  doc.save(`Devis_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split("T")[0]}.pdf`)
}
