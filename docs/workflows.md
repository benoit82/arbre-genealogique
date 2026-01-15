# Workflows de développement

Ce document explique le flux de travail pour le développement du projet Arbre Généalogique.

## 🔄 Flux principal

```
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   Fork Main   │───▶│   Feature Branche│───▶│     Pull Request │───▶│    Merge Dev  │
└─────────────────┘    └─────────────────┘    └──────────────────┘    └──────────────────┘
        │                       │                       │                   │
        ▼                       ▼                       ▼                   ▼
   GitHub Actions           Tests & CI              Review & Validation   Deploy Main
```

## 🌿 Types de branches

### `main` (Production)
- **Protected** : Branche principale protégée
- **Contenu** : Code stable et testé
- **Accès** : Validation CI/CD obligatoire
- **Merge** : Uniquement depuis PR validées

### `develop` (Développement) - Future
- **Purpose** : Intégration continue des features
- **Stabilité** : Code fonctionnel mais en développement
- **Merge** : Automatique depuis PR validées

### `feature/*` (Fonctionnalités)
- **Format** : `feature/nom-de-la-fonctionnalite`
- **Durée** : Temporaire, fusionnée dans develop
- **Example** : `feature/authentication-system`

### `fix/*` (Corrections)
- **Format** : `fix/description-du-bug`
- **Purpose** : Corrections de bugs non urgents
- **Example** : `fix/login-validation-error`

### `hotfix/*` (Urgent)
- **Format** : `hotfix/critique-urgent`
- **Purpose** : Corrections urgentes en production
- **Flow** : `main` → `hotfix/*` → `main` (direct)

## 🚀 Processus de Pull Request

### 1. Création
```bash
# Créer une nouvelle branche
git checkout -b feature/user-profile

# Développer la fonctionnalité
# ... code et tests ...

# Commiter les changements
git add .
git commit -m "feat: add user profile functionality

- Implement profile page
- Add form validation
- Add unit tests
- Add e2e tests"
```

### 2. Validation locale
```bash
# Vérifier la qualité avant PR
npm run ci

# Résultat attendu
✅ ESLint: No errors
✅ TypeScript: Compilation successful  
✅ Tests: All passing
✅ Build: Successful
```

### 3. Création de la PR
- **Target** : `develop` (ou `main` pour features importantes)
- **Template** : Utiliser le template de PR
- **CI** : Validation automatique déclenchée
- **Review** : Code review obligatoire

### 4. Validation CI/CD
La PR déclenche automatiquement :
- ✅ **Lint & Format** : Style de code
- ✅ **Type Check** : Validation TypeScript
- ✅ **Unit Tests** : Tests unitaires avec couverture
- ✅ **Build** : Compilation Next.js
- ✅ **E2E Tests** : Tests end-to-end
- ✅ **Quality Gate** : Validations additionnelles

## 🔧 Workflow local

### 1. Préparation
```bash
# Démarrer en local
npm run dev

# Mode watch pour les tests
npm run test:watch

# Mode développement avec rechargement automatique
```

### 2. Gestion des dépendances
```bash
# Ajouter une dépendance
npm install package-name

# Pour devDependencies
npm install --save-dev package-name

# Mettre à jour les dépendances
npm update
```

### 3. Tests locaux
```bash
# Tests unitaires rapides
npm run test

# Tests avec couverture
npm run test:coverage

# Tests E2E en mode debug
npm run test:e2e:debug

# Tests avec navigateur visible
npm run test:e2e:headed
```

## 🔄 Intégration continue

### Sur chaque Push
```yaml
# GitHub Actions déclenché
- Analyse du code modifié
- Tests des modules impactés
- Validation de la branche
- Feedback automatique
```

### Gestion des conflits
```bash
# Mettre à jour avant de commencer
git checkout main
git pull origin main

# Revenir sur la branche
git checkout feature/ma-branche
git rebase main

# Résoudre les conflits puis
git add .
git rebase --continue
```

## 📋 Checklist PR

### Avant de créer une PR
- [ ] Code suit les standards du projet
- [ ] Tests écrits et passants
- [ ] Documentation mise à jour si nécessaire
- [ ] Pas de console.log/debugger
- [ ] Performance acceptable
- [ ] Sécurité validée

### Après création de PR
- [ ] CI vert sur toutes les validations
- [ ] Reviews demandées aux bonnes personnes
- [ ] Feedbacks traités rapidement
- [ ] Tests manuels réalisés

## 🎯 Bonnes pratiques

### Commits clairs
```bash
# Format : type(scope): description
feat(auth): add two-factor authentication
fix(ui): resolve login button overlap
refactor(api): simplify user service
docs(readme): update installation guide
test(auth): add login unit tests
```

### Branches courtes
- Une branche = une fonctionnalité ou correction
- Fusionner dès que validée
- Nettoyer les branches fusionnées

### Reviews constructives
- Focus sur le code, pas sur la personne
- Suggestions spécifiques et actionnables
- Positives même pour les corrections

## 🚨 Gestion des urgences

### Hotfix workflow
```bash
# Pour correction urgente en production
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Correction rapide
git commit -m "hotfix: fix critical login issue"
git push origin hotfix/critical-bug

# PR urgente (bypass normale)
# Review rapide + merge immédiat
```

## 📊 Monitoring et métriques

### Qualité du code
- **Couverture** : Objectif >80%
- **Complexité** : Maintenir une complexité modérée
- **Duplication** : <10% de code dupliqué
- **Performance** : Tests de charge réguliers

### Workflow metrics
- **Time to merge** : Suivi du temps moyen
- **PR size** : Taille des PRs préférée
- **Bug rate** : Taux de régression monitoré

Ce workflow garantit une qualité constante du code tout en facilitant la collaboration ! 🎉