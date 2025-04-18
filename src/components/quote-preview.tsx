"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  Mail,
  ArrowLeft,
  Loader2,
  FileText,
  Calendar,
  Building,
  User,
  FileTerminal,
} from "lucide-react";
import { generatePDF } from "@/lib/pdf-generator";
import {
  formatCurrency,
  getProjectTypeName,
  getDeadlineName,
} from "@/lib/utils";

interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuoteData {
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  urgentFee?: number;
}

interface QuotePreviewProps {
  quoteData: QuoteData;
  formData: any;
  onSendEmail: () => Promise<void>;
  onBack: () => void;
}

export function QuotePreview({
  quoteData,
  formData,
  onSendEmail,
  onBack,
}: QuotePreviewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showCGV, setShowCGV] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF(quoteData, formData);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      await onSendEmail();
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Générer un numéro de référence aléatoire
  const refNumber = `WEB-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  return (
    <Card className="w-full overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-500 border-b py-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <FileText className="mr-2 h-6 w-6" />
            Devis - Projet Web
          </CardTitle>
          <div className="flex items-center text-sm text-teal-100 bg-teal-700 px-3 py-1 rounded-full">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date().toLocaleDateString("fr-FR")}
          </div>
        </div>
        <div className="text-teal-100 mt-2 text-sm">Référence: {refNumber}</div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold text-teal-700 mb-3 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Client
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-800">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-gray-600">{formData.email}</p>
                {formData.companyName && (
                  <div className="flex items-center text-gray-700 mt-2">
                    <Building className="mr-2 h-4 w-4 text-teal-600" />
                    <span>{formData.companyName}</span>
                  </div>
                )}
                {formData.companySector && (
                  <p className="text-gray-600">
                    Secteur: {formData.companySector}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold text-teal-700 mb-3">
                Détails du projet
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-800">
                    {getProjectTypeName(formData.projectType)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Délai:</span>
                  <span className="font-medium text-gray-800">
                    {getDeadlineName(formData.deadline)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium text-gray-800">
                    {formData.pagesCount}
                  </span>
                </div>
                {formData.isUrgent && (
                  <div className="mt-2 bg-orange-100 text-orange-600 font-medium p-2 rounded text-center">
                    PROJET URGENT
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-teal-700 mb-4 border-b pb-2">
            Détail du devis
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantité
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Prix unitaire
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quoteData.items.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-50 p-6">
          <div className="ml-auto w-full md:w-1/2 lg:w-1/3 space-y-2">
            <div className="flex justify-between items-center py-2 text-gray-600">
              <span>Sous-total</span>
              <span>{formatCurrency(quoteData.subtotal)}</span>
            </div>

            {quoteData.urgentFee && (
              <div className="flex justify-between items-center py-2 text-orange-600">
                <span>Supplément urgence (25%)</span>
                <span>{formatCurrency(quoteData.urgentFee)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 text-gray-600">
              <span>TVA (20%)</span>
              <span>{formatCurrency(quoteData.tax)}</span>
            </div>

            <div className="flex justify-between items-center py-3 font-bold text-lg border-t border-gray-300 mt-2 pt-2">
              <span>Total</span>
              <span className="text-teal-700">
                {formatCurrency(quoteData.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-teal-700 mb-2">
              Description du projet
            </h3>
            <p className="text-sm text-gray-600">
              {formData.projectDescription}
            </p>
          </div>

          <div className="mt-4 flex items-center">
            <Button
              variant="ghost"
              className="text-teal-600 hover:text-teal-700 flex items-center text-sm"
              onClick={() => setShowCGV(!showCGV)}
            >
              <FileTerminal className="mr-2 h-4 w-4" />
              {showCGV ? "Masquer les CGV" : "Afficher les CGV"}
            </Button>
          </div>

          {showCGV && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
              <h3 className="font-semibold text-teal-700 mb-2">
                Conditions Générales de Vente
              </h3>
              <p className="text-xs text-gray-600 italic mb-2">
                Les CGV complètes sont incluses dans le PDF téléchargeable.
              </p>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  <strong>Article 1 - DISPOSITIONS GÉNÉRALES</strong>
                  <br />
                  Les présentes Conditions Générales de Vente (CGV) s'appliquent
                  à toutes les prestations de services conclues par le
                  Prestataire auprès de ses clients...
                </p>
                <p>
                  <strong>Article 2 - DEVIS ET COMMANDES</strong>
                  <br />
                  Les devis établis par le Prestataire sont valables pendant une
                  durée de 30 jours à compter de leur date d'émission...
                </p>
                <p>
                  <strong>Article 3 - TARIFS</strong>
                  <br />
                  Les prix des services sont ceux détaillés dans le devis,
                  exprimés en euros et soumis à la TVA...
                </p>
                <p className="text-center italic">
                  [Version complète dans le PDF]
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between bg-gray-50 border-t p-6">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au formulaire
        </Button>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700"
          >
            {isGeneratingPDF ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Télécharger en PDF
          </Button>

          {/* <Button
            onClick={handleSendEmail}
            disabled={isSendingEmail}
            className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800"
            variant="default"
          >
            {isSendingEmail ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Envoyer par email
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
}
