"use server"

import nodemailer from "nodemailer"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import { formatCurrency, getProjectTypeName, getDeadlineName } from "./utils"
import { CGV_TEXT } from "./cgv"

interface SendQuoteEmailParams {
  recipientEmail: string
  quote: any
  [key: string]: any
}

// Fonction pour nettoyer les chaînes de caractères des espaces insécables
function cleanString(str: string): string {
  // Remplacer les espaces insécables étroits (U+202F) par des espaces normaux
  return str.replace(/\u202F/g, " ")
}

export async function sendQuoteByEmail(params: SendQuoteEmailParams) {
  const { recipientEmail, quote, ...formData } = params

  try {
    // Générer un PDF simple avec pdf-lib (compatible avec le serveur)
    const pdfDoc = await PDFDocument.create()

    // Utiliser une police standard qui supporte plus de caractères
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    const page = pdfDoc.addPage([595.28, 841.89]) // A4
    const { width, height } = page.getSize()

    // Définir les couleurs - version simplifiée
    const primaryColor = rgb(13 / 255, 148 / 255, 136 / 255) // teal-600
    const textColor = rgb(15 / 255, 23 / 255, 42 / 255) // slate-900
    const whiteColor = rgb(1, 1, 1)

    // Ajouter un en-tête simple
    page.drawRectangle({
      x: 0,
      y: height - 50,
      width: width,
      height: 50,
      color: primaryColor,
    })

    // Ajouter le titre
    page.drawText("DEVIS", {
      x: 50,
      y: height - 30,
      size: 18,
      font: boldFont,
      color: whiteColor,
    })

    // Ajouter la date
    const dateStr = cleanString(`Date: ${new Date().toLocaleDateString("fr-FR")}`)
    page.drawText(dateStr, {
      x: width - 150,
      y: height - 30,
      size: 10,
      font,
      color: whiteColor,
    })

    // Informations client
    page.drawText("CLIENT", {
      x: 50,
      y: height - 80,
      size: 12,
      font: boldFont,
      color: primaryColor,
    })

    page.drawText(cleanString(`${formData.firstName} ${formData.lastName}`), {
      x: 50,
      y: height - 100,
      size: 10,
      font,
      color: textColor,
    })

    page.drawText(formData.email, {
      x: 50,
      y: height - 120,
      size: 10,
      font,
      color: textColor,
    })

    // Détails du projet
    page.drawText("PROJET", {
      x: 300,
      y: height - 80,
      size: 12,
      font: boldFont,
      color: primaryColor,
    })

    page.drawText(cleanString(`Type: ${getProjectTypeName(formData.projectType)}`), {
      x: 300,
      y: height - 100,
      size: 10,
      font,
      color: textColor,
    })

    page.drawText(cleanString(`Délai: ${getDeadlineName(formData.deadline)}`), {
      x: 300,
      y: height - 120,
      size: 10,
      font,
      color: textColor,
    })

    // Montant total
    page.drawText("TOTAL:", {
      x: 300,
      y: height - 200,
      size: 12,
      font: boldFont,
      color: primaryColor,
    })

    // Nettoyer le montant total pour éviter les problèmes d'encodage
    const totalStr = cleanString(formatCurrency(quote.total))
    page.drawText(totalStr, {
      x: 350,
      y: height - 200,
      size: 12,
      font: boldFont,
      color: primaryColor,
    })

    // Ajouter un message de validité
    page.drawText("Ce devis est valable 30 jours à compter de sa date d'émission.", {
      x: width / 2 - 150,
      y: 30,
      size: 10,
      font,
      color: textColor,
    })

    // Ajouter une nouvelle page pour les CGV
    const cgvPage = pdfDoc.addPage([595.28, 841.89]) // A4

    // Titre des CGV
    cgvPage.drawText("CONDITIONS GÉNÉRALES DE VENTE", {
      x: 50,
      y: height - 50,
      size: 14,
      font: boldFont,
      color: primaryColor,
    })

    // Diviser le texte des CGV en paragraphes
    const cgvParagraphs = CGV_TEXT.split("\n\n")
    let currentY = height - 80

    for (const paragraph of cgvParagraphs) {
      if (paragraph.trim() === "") continue

      // Vérifier si on a besoin d'une nouvelle page
      if (currentY < 50) {
        const newPage = pdfDoc.addPage([595.28, 841.89])
        currentY = height - 50
      }

      // Formater le texte pour qu'il rentre dans la page
      const words = paragraph.trim().split(" ")
      let line = ""
      let lineWidth = 0

      for (const word of words) {
        const wordWidth = font.widthOfTextAtSize(word + " ", 8)

        if (lineWidth + wordWidth > 500) {
          cgvPage.drawText(line, {
            x: 50,
            y: currentY,
            size: 8,
            font,
            color: textColor,
          })
          currentY -= 12
          line = word + " "
          lineWidth = wordWidth
        } else {
          line += word + " "
          lineWidth += wordWidth
        }
      }

      if (line) {
        cgvPage.drawText(line, {
          x: 50,
          y: currentY,
          size: 8,
          font,
          color: textColor,
        })
        currentY -= 20 // Espace entre les paragraphes
      }
    }

    // Sauvegarder le PDF
    const pdfBytes = await pdfDoc.save()
    const pdfBuffer = Buffer.from(pdfBytes)

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP server
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "votre-email@gmail.com", // Replace with your email
        pass: process.env.EMAIL_PASSWORD || "votre-mot-de-passe", // Replace with your password or app password
      },
    })

    // Nettoyer les montants pour l'email
    const cleanTotal = cleanString(formatCurrency(quote.total))

    // Prepare email content with improved styling
    const mailOptions = {
      from: process.env.EMAIL_USER || "votre-email@gmail.com",
      to: [recipientEmail, "nasoavina.m@gmail.com"], // Send to both the client and your email
      subject: `Votre devis pour le projet ${getProjectTypeName(formData.projectType)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0d9488; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Votre Devis</h1>
            <p style="margin: 5px 0 0 0;">Projet Web Professionnel</p>
          </div>
          
          <div style="padding: 20px;">
            <p style="color: #334155;">Bonjour ${formData.firstName} ${formData.lastName},</p>
            
            <p style="color: #334155;">Merci pour votre demande de devis. Vous trouverez ci-joint le devis détaillé pour votre projet de type ${getProjectTypeName(formData.projectType)}.</p>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0d9488;">
              <h3 style="margin-top: 0; color: #0d9488; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px;">Récapitulatif</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #334155;"><strong>Type de projet :</strong></td>
                  <td style="padding: 8px 0; color: #334155;">${getProjectTypeName(formData.projectType)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #334155;"><strong>Délai souhaité :</strong></td>
                  <td style="padding: 8px 0; color: #334155;">${getDeadlineName(formData.deadline)}</td>
                </tr>
                ${
                  formData.isUrgent
                    ? `
                <tr>
                  <td style="padding: 8px 0; color: #f97316;"><strong>Statut :</strong></td>
                  <td style="padding: 8px 0; color: #f97316;"><strong>PROJET URGENT</strong></td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 8px 0; color: #334155;"><strong>Montant total :</strong></td>
                  <td style="padding: 8px 0; font-size: 18px; font-weight: bold; color: #0d9488;">${cleanTotal}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #334155;">Ce devis est valable 30 jours à compter de sa date d'émission.</p>
            
            <p style="color: #334155;">Pour toute question ou pour valider ce devis, n'hésitez pas à nous contacter.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #334155;">Cordialement,</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #0d9488;">L'équipe de développement web</p>
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Votre Entreprise. Tous droits réservés.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Devis_${formData.firstName}_${formData.lastName}_${new Date().toISOString().split("T")[0]}.pdf`,
          content: pdfBuffer,
        },
      ],
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}
