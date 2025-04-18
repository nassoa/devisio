# Devisio

Générateur de devis simple pour des prestations d'intégration web (sites statiques, CMS, etc.). Application sans backend, avec exportation en PDF.

## Fonctionnalités

- Formulaire de saisie des informations client et projet
- Option pour indiquer si le projet est urgent
- Aperçu du devis généré
- Exportation du devis en format PDF

## Technologies utilisées

- **Next.js 14**

  - Framework React orienté vers le rendu hybride (SSG/SSR).
  - Utilisation de l’App Router pour organiser les pages (fichiers `src/app/...`) et permettre le pré‑rendu statique des templates.
  - Gestion intégrée du CSS (PostCSS/Tailwind), des images et des routes API, sans config serveur supplémentaire.

- **React 18**

  - Bibliothèque front‑end pour construire l’UI en composants déclaratifs.
  - Exploitation des hooks (ex. `useState`, `useEffect`) pour la gestion du formulaire et de l’aperçu en temps réel.

- **Tailwind CSS**

  - Framework utilitaire permettant de créer rapidement des interfaces propres avec des classes de style atomiques.
  - Configuration personnalisée (`tailwind.config.js`) pour définir la palette neutre (noirs, blancs, gris) et les tokens de typographie/espacement.

- **React Hook Form**

  - Gestion légère et performante des formulaires React.
  - Intégration de la validation Zod via `@hookform/resolvers` pour un typage et des retours d’erreurs clairs.

- **Zod**

  - Bibliothèque de schémas de validation TypeScript-first.
  - Validation des données de formulaire avant génération du PDF (schéma précis du devis).

- **jsPDF**

  - Génération de documents PDF côté client, sans serveur.
  - Création d’un document PDF à partir du contenu HTML/JS et styles appliqués.

- **jsPDF-AutoTable**

  - Extension de jsPDF pour générer automatiquement des tableaux.
  - Utilisée pour structurer le devis en lignes « description », « quantité », « prix unitaire », « total ».

- **Radix UI**
  - Collection de composants accessibles et non-stylés (checkbox, select, toast).
  - Permet de bâtir l’interface du formulaire et des notifications sans repartir de zéro.

## Informations requises dans le formulaire

### Informations client

Nom complet

- Adresse e-mail
- Numéro de téléphone (optionnel)

### Détails du projet

- Type de prestation : site statique, CMS, e‑commerce, etc.
- Description du projet
- Délai souhaité
- Projet urgent : oui/non

### Fichiers fournis

- Maquettes (Figma, Adobe XD, etc.)
- Contenus (textes, images)

### Exportation en PDF

Le devis est généré en format PDF côté client à l’aide de jsPDF et jsPDF-AutoTable. Le fichier peut être téléchargé directement depuis l’interface.

Licence
Ce projet est sous licence MIT.
