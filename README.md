# Arbre Généalogique

Une application web pour créer et gérer des arbres généalogiques avec Next.js, TypeScript et Prisma.

## Fonctionnalités

- 🔐 Système d'authentification complet (inscription/connexion)
- 👤 Gestion des comptes utilisateurs
- 🌳 Création d'arbres généalogiques
- 💾 Base de données SQLite avec Prisma
- 🎨 Interface responsive avec Tailwind CSS
- 🧪 Tests unitaires avec Vitest
- 🎭 Tests e2e avec Playwright
- 📍 Attributs data-testid pour le test automation

## Tech Stack

- **Framework**: Next.js 15 avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: SQLite avec Prisma ORM
- **Testing**: Vitest + Testing Library + Playwright
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

5. Installez les navigateurs pour les tests e2e :
```bash
npx playwright install
```

6. Lancez le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Tests

### Tests unitaires
```bash
npm run test          # Lancer les tests unitaires
npm run test:ui      # Lancer les tests avec l'interface graphique
```

### Tests e2e
```bash
npm run test:e2e           # Lancer les tests e2e en headless
npm run test:e2e:ui        # Lancer les tests e2e avec l'interface graphique
npm run test:e2e:headed    # Lancer les tests e2e avec le navigateur visible
```

## Structure du projet

```
src/
├── app/                 # Pages et API routes
│   ├── auth/            # Pages d'authentification
│   ├── dashboard/       # Tableau de bord utilisateur
│   └── api/             # Routes API
├── components/          # Components React
├── lib/                 # Utilitaires et configuration
├── test/                # Configuration des tests
└── ...

tests/
├── unit/                # Tests unitaires (Vitest)
└── e2e/                 # Tests e2e (Playwright)

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

## Test Automation

Les attributs `data-testid` sont ajoutés sur tous les éléments interactifs pour faciliter les tests automatisés :

- Boutons : `data-testid="submit-button"`
- Formulaires : `data-testid="login-form"`
- Liens : `data-testid="navigation-link"`
- Messages d'erreur : `data-testid="error-message"`

## 🌿 Branches et Workflow

### Branches principales
- `main` : Branche de production protégée (requiert validation)
- `develop` : Branche de développement (future)
- `feature/*` : Nouvelles fonctionnalités
- `fix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes

### Processus de contribution
1. **Forker** le repository
2. **Créer** une branche de fonctionnalité (`feature/ma-fonction`)
3. **Développer** en suivant les standards
4. **Valider** avec les tests locaux
5. **Créer** une Pull Request vers `develop` ou `main`
6. **Attendre** la validation CI/CD automatique

### 🔒 Protection de la branche main
- Validation CI obligatoire (ESLint, TypeScript, Tests, Build)
- Au moins 1 review requise
- Review du code owner obligatoire
- Merge uniquement via squash
- Pas de push direct sur main

## 🚀 Déploiement

Le projet est configuré pour être déployé sur Vercel, mais fonctionne aussi sur d'autres plateformes compatibles Next.js.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre le [CONTRIBUTING.md](./CONTRIBUTING.md) pour le processus détaillé.

N'hésitez pas à :
- 📝 Ouvrir une issue pour les bugs ou suggestions
- 🔧 Soumettre une pull request pour les améliorations
- 📚 Améliorer la documentation
- 🧪 Ajouter des tests