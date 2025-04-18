# Devisio

Générateur de devis simple pour des prestations d'intégration web (sites statiques, CMS, etc.).

## Fonctionnalités

- Formulaire de saisie des informations client et projet
- Option pour indiquer si le projet est urgent
- Aperçu du devis généré
- Exportation du devis en format PDF

## Technos utilisées

- **Next.js 14**

  - Framework React orienté vers le rendu hybride (SSG/SSR).
  - Utilisation de l’App Router pour organiser les pages (fichiers `src/app/...`) et permettre le pré‑rendu statique des templates.
  - Gestion intégrée du CSS (PostCSS/Tailwind), des images et des routes API, sans config serveur supplémentaire.

- **React 18**

  - Bibliothèque front‑end pour construire l’UI en composants déclaratifs.
  - Exploitation des hooks (ex. `useState`, `useEffect`) pour la gestion du formulaire et de l’aperçu en temps réel.

- **Tailwind CSS**

  - Framework utilitaire permettant de créer rapidement des interfaces propres.
  - Configuration personnalisée (`tailwind.config.js`).

- **React Hook Form**

  - Gestion légère et performante des formulaires React.
  - Intégration de la validation Zod via `@hookform/resolvers` pour un typage et des retours d’erreurs clairs.

- **Zod**

  - Bibliothèque de schémas de validation TypeScript-first.
  - Validation des données de formulaire avant génération du PDF (schéma précis du devis).

- **jsPDF**

  - Génération de documents PDF côté client.
  - Création d’un document PDF à partir du contenu HTML/JS et styles appliqués.

- **jsPDF-AutoTable**

  - Extension de jsPDF pour générer automatiquement des tableaux.
  - Utilisée pour structurer le devis en lignes « description », « quantité », « prix unitaire », « total ».

- **Radix UI**
  - Collection de composants accessibles et non-stylés (checkbox, select, toast).
  - Permet de bâtir l’interface du formulaire et des notifications sans repartir de zéro.

## Informations requises dans le formulaire

### Informations du demandeur

- Prénom
- Nom
- Email
- Nom de l'entreprise (optionnel)
- Secteur d'activité (optionnel)

### Détails du projet

- Type de projet : Sélectionnez un type de projet
- URL du site existant (optionnel)
- Description du projet : Décrivez votre projet et les fonctionnalités souhaitées...
- Nombre de pages

### Budget et délai

- Budget estimé: Sélectionnez une fourchette de budget
- Délai souhaité : Sélectionnez un délai
- Projet urgent : Cochez cette case si votre projet nécessite une livraison prioritaire (+25% sur le tarif)

### Options supplémentaires ( à cocher )

- Responsive : par défaut, le site sera responsive
- Hébergement : Inclure un forfait d'hébergement
- Maintenance : Inclure un forfait de maintenance
- SEO : Inclure l'optimisation pour les moteurs de recherche
