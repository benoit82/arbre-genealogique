# Arbre Généalogique

Une application web pour créer et gérer des arbres généalogiques avec Next.js, TypeScript et Prisma.

## Fonctionnalités

- 🔐 Système d'authentification complet (inscription/connexion)
- 👤 Gestion des comptes utilisateurs
- 🌳 Création d'arbres généalogiques
- 💾 Base de données SQLite avec Prisma
- 🎨 Interface responsive avec Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: SQLite avec Prisma ORM
- **UI**: Components React modernes

## Démarrage

1. Clonez le repository :
```bash
git clone https://github.com/benoit82/arbre-genealogique.git
cd arbre-genealogique
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
# Modifiez les valeurs dans .env
```

4. Générez le client Prisma et appliquez les migrations :
```bash
npx prisma generate
npx prisma migrate dev
```

5. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
src/
├── app/                 # Pages et API routes
│   ├── auth/            # Pages d'authentification
│   ├── dashboard/       # Tableau de bord utilisateur
│   └── api/             # Routes API
├── components/          # Components React
├── lib/                 # Utilitaires et configuration
└── ...

prisma/
├── schema.prisma        # Schéma de la base de données
└── migrations/          # Migrations de la BDD
```

## Pages

- `/` - Page d'accueil
- `/auth/signin` - Connexion
- `/auth/signup` - Inscription  
- `/dashboard` - Tableau de bord (protégé)

## Base de données

Le projet utilise Prisma avec SQLite. Les modèles principaux sont :

- **User**: Utilisateurs
- **FamilyTree**: Arbres généalogiques  
- **Person**: Personnes dans les arbres

## Déploiement

Le projet est configuré pour être déployé sur Vercel, mais fonctionne aussi sur d'autres plateformes compatibles Next.js.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.
