"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuotePreview } from "@/components/quote-preview";
import { calculateQuote } from "@/lib/quote-calculator";
import { sendQuoteByEmail } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  // Informations du demandeur
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  companyName: z.string().optional(),
  companySector: z.string().optional(),

  // Type de projet
  projectType: z.string({
    required_error: "Veuillez sélectionner un type de projet.",
  }),
  existingWebsiteUrl: z.string().url().optional().or(z.literal("")),
  projectDescription: z
    .string()
    .min(10, {
      message: "La description doit contenir au moins 10 caractères.",
    })
    .max(500, {
      message: "La description ne doit pas dépasser 500 caractères.",
    }),

  // Budget et délai
  estimatedBudget: z.string({
    required_error: "Veuillez sélectionner une fourchette de budget.",
  }),
  deadline: z.string({
    required_error: "Veuillez sélectionner un délai.",
  }),
  isUrgent: z.boolean().default(false),

  // Options supplémentaires
  needsHosting: z.boolean().default(false),
  needsMaintenance: z.boolean().default(false),
  needsSEO: z.boolean().default(false),
  isResponsive: z.boolean().default(true),
  pagesCount: z.string().min(1, {
    message: "Veuillez indiquer le nombre de pages.",
  }),
});

export function QuoteForm() {
  const [quoteData, setQuoteData] = useState(null);
  const [activeTab, setActiveTab] = useState("form");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      companySector: "",
      projectType: "",
      existingWebsiteUrl: "",
      projectDescription: "",
      estimatedBudget: "",
      deadline: "",
      isUrgent: false,
      needsHosting: false,
      needsMaintenance: false,
      needsSEO: false,
      isResponsive: true,
      pagesCount: "5",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const calculatedQuote = calculateQuote(values);
    setQuoteData(calculatedQuote);
    setActiveTab("preview");
  }

  const handleSendEmail = async () => {
    if (!quoteData) return;

    try {
      await sendQuoteByEmail({
        ...form.getValues(),
        quote: quoteData,
        recipientEmail: form.getValues().email,
      });

      toast({
        title: "Devis envoyé",
        description: "Le devis a été envoyé avec succès à votre adresse email.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du devis.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="form">Formulaire</TabsTrigger>
          <TabsTrigger value="preview" disabled={!quoteData}>
            Aperçu du Devis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informations du demandeur
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="jean.dupont@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="Entreprise SAS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companySector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secteur d'activité (optionnel)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E-commerce, Santé, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Détails du projet
                  </h2>

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de projet</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type de projet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="static">
                              Site statique
                            </SelectItem>
                            <SelectItem value="wordpress">
                              Site WordPress
                            </SelectItem>
                            <SelectItem value="strapi">
                              Site avec Strapi CMS
                            </SelectItem>
                            <SelectItem value="ecommerce">
                              E-commerce
                            </SelectItem>
                            <SelectItem value="headless">
                              Headless CMS
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="existingWebsiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL du site existant (optionnel)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description du projet</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre projet et les fonctionnalités souhaitées..."
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pagesCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de pages</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Budget et délai
                  </h2>

                  <FormField
                    control={form.control}
                    name="estimatedBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget estimé</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une fourchette de budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1000-3000">
                              1 000€ - 3 000€
                            </SelectItem>
                            <SelectItem value="3000-5000">
                              3 000€ - 5 000€
                            </SelectItem>
                            <SelectItem value="5000-10000">
                              5 000€ - 10 000€
                            </SelectItem>
                            <SelectItem value="10000-20000">
                              10 000€ - 20 000€
                            </SelectItem>
                            <SelectItem value="20000+">
                              Plus de 20 000€
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délai souhaité</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un délai" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2-weeks">
                              1-2 semaines
                            </SelectItem>
                            <SelectItem value="2-4-weeks">
                              2-4 semaines
                            </SelectItem>
                            <SelectItem value="1-2-months">1-2 mois</SelectItem>
                            <SelectItem value="3-6-months">3-6 mois</SelectItem>
                            <SelectItem value="6-months+">
                              Plus de 6 mois
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isUrgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Projet urgent</FormLabel>
                          <FormDescription>
                            Cochez cette case si votre projet nécessite une
                            livraison prioritaire (+25% sur le tarif)
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Options supplémentaires
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="needsHosting"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Hébergement</FormLabel>
                            <FormDescription>
                              Inclure l'hébergement du site
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="needsMaintenance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Maintenance</FormLabel>
                            <FormDescription>
                              Inclure un forfait de maintenance
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="needsSEO"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>SEO</FormLabel>
                            <FormDescription>
                              Inclure l'optimisation pour les moteurs de
                              recherche
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isResponsive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Responsive</FormLabel>
                            <FormDescription>
                              Site adapté à tous les appareils
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Générer le devis
                </Button>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          {quoteData && (
            <QuotePreview
              quoteData={quoteData}
              formData={form.getValues()}
              onSendEmail={handleSendEmail}
              onBack={() => setActiveTab("form")}
            />
          )}
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
}
