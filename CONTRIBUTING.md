# Arbre Généalogique - Guide de Contributon

## 🚀 Processus de développement

### 1. Création d'une branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-bug-123
```

### 2. Développement
- Suivez les standards de codage établis
- Ajoutez des tests unitaires pour les nouvelles fonctionnalités
- Ajoutez des tests e2e pour les flux utilisateurs
- Utilisez les data-testid pour les éléments testables

### 3. Validation locale
```bash
# Validation complète avant de commiter
npm run ci
```

### 4. Commit avec messages clairs
```bash
git add .
git commit -m "feat: add user authentication

- Implement login/logout functionality
- Add form validation
- Add unit tests
- Add e2e tests for authentication flow"
```

## 🧪 Tests obligatoires

### Tests unitaires
- [ ] Tests pour les nouvelles fonctions
- [ ] Tests pour les cas limites
- [ ] Tests pour les messages d'erreur
- [ ] Couverture minimale de 80%

### Tests e2e
- [ ] Tests des parcours utilisateurs principaux
- [ ] Tests des formulaires et validations
- [ ] Tests des redirections et navigation

## 🔄 Processus de Pull Request

### 1. Créer la PR
- Utilisez le template de PR
- Liez les issues associées
- Ajoutez des captures d'écran si modifications visuelles

### 2. Validation automatique
La PR déclenche automatiquement :
- ✅ ESLint (validation du code)
- ✅ TypeScript (validation des types)
- ✅ Tests unitaires (Vitest)
- ✅ Build (compilation Next.js)
- ✅ Tests e2e (Playwright)

### 3. Review de code
- Minimum 1 review obligatoire
- Vérifier la qualité du code
- Vérifier les tests
- Vérifier la sécurité

### 4. Fusion
Une fois toutes les validations passées :
- La PR peut être fusionnée automatiquement
- Protection de la branche main activée

## 📝 Standards de codage

### TypeScript
- Utiliser les types stricts
- Éviter `any` autant que possible
- Préférer les interfaces aux types

### React/Next.js
- Utiliser les composants fonctionnels
- Éviter les effets de bord non nécessaires
- Optimiser les performances

### Tests
- Noms de tests descriptifs
- Structure AAA (Arrange, Act, Assert)
- Mocking approprié pour les dépendances externes

### Accessibility
- data-testid sur les éléments interactifs
- Attributs ARIA appropriés
- Tests de navigation clavier

## 🏗️ Structure des branches

### Branches principales
- `main` : Branche de production stable
- `develop` : Branche de développement (future)

### Branches de fonctionnalités
- `feature/` : Nouvelles fonctionnalités
- `fix/` : Corrections de bugs
- `hotfix/` : Corrections urgentes en production
- `refactor/` : Refactoring sans changement fonctionnel
- `docs/` : Mises à jour de documentation

## 📋 Checklist avant PR

### Code
- [ ] Code suit les standards du projet
- [ ] ESLint passe sans erreurs
- [ ] TypeScript compile sans erreurs
- [ ] Pas de console.log/debugger en production

### Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests e2e ajoutés si nécessaire
- [ ] Couverture de code acceptable
- [ ] Tous les tests passent localement

### Documentation
- [ ] README mis à jour si nécessaire
- [ ] Commentaires dans le code si complexe
- [ ] PR utilise le template approprié

### Fonctionnalité
- [ ] Feature testée manuellement
- [ ] Pas de régression introduite
- [ ] Performance acceptable

## 🚨 Processus d'urgence

Pour les corrections urgentes :
1. Créer une branche `hotfix/` depuis `main`
2. Développer la correction minimale
3. Tests rapides de la correction
4. PR directe vers `main`
5. Release immédiate si validée

## 🔗 Ressources utiles

- [Documentation du projet](./README.md)
- [Guide des tests](./tests/README.md)
- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤔 Questions ?

Pour toute question sur le processus de contribution :
- Créer une issue avec le tag `question`
- Contacter un mainteneur du projet

Merci pour votre contribution ! 🙏