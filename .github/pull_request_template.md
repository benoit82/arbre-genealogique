# GitHub Pull Request Checklist

## Prérequis avant de créer une PR

- [ ] Mon code respecte les standards de codage du projet
- [ ] J'ai lancé `npm run lint` et corrigé toutes les erreurs
- [ ] J'ai lancé `npm run type-check` sans erreurs
- [ ] J'ai lancé `npm run test` et tous les tests passent
- [ ] J'ai lancé `npm run build` sans erreurs
- [ ] J'ai ajouté/mis à jour les tests si nécessaire
- [ ] J'ai testé manuellement ma fonctionnalité
- [ ] J'ai documenté les changements si nécessaire

## Tests requis

### Tests unitaires
- [ ] Tests pour les nouvelles fonctions/components
- [ ] Tests pour les cas limites (edge cases)
- [ ] Tests pour les messages d'erreur
- [ ] Couverture de code minimale

### Tests e2e
- [ ] Tests de navigation principale
- [ ] Tests des formulaires (validation, soumission)
- [ ] Tests des flux métier complets
- [ ] Tests responsives (si applicable)

## Validation automatique

Cette PR déclenchera automatiquement les vérifications suivantes :

### ✅ Validation de code
- **ESLint** : Vérification du style de code
- **TypeScript** : Validation des types
- **Tests unitaires** : Vitest avec覆盖率
- **Build** : Compilation Next.js

### 🎭 Tests end-to-end
- **Tests e2e** : Playwright sur Chrome/Firefox/Safari
- **Navigation** : Vérification des liens et redirections
- **Formulaires** : Tests d'inscription/connexion
- **Flux utilisateur** : Tests complets du parcours utilisateur

## Étapes de validation

1. **Phase 1 : Qualité du code**
   - Lint & formatage
   - Validation TypeScript
   - Tests unitaires avec couverture
   
2. **Phase 2 : Integration**
   - Build réussi
   - Pas de régressions visuelles
   
3. **Phase 3 : Tests E2E**
   - Tests complets du parcours utilisateur
   - Compatibilité multi-navigateurs
   
4. **Phase 4 : Revue**
   - Code review par l'équipe
   - Validation fonctionnelle finale

## 🔒 Critères de fusion

Une PR sera fusionnée uniquement si :

- ✅ **Toutes les validations CI sont passées**
- ✅ **Les tests unitaires passent à 100%**
- ✅ **Les tests e2e passent sur tous les navigateurs**
- ✅ **La couverture de code est acceptable**
- ✅ **Au moins une approbation de code review**
- ✅ **La documentation est à jour**

## 📋 Section de la PR

Utilisez ce template pour votre PR :

```markdown
## 🎯 Objectif
Description brève de l'objectif de cette PR

## 🛠️ Changements
- [ ] Nouvelle fonctionnalité
- [ ] Correction de bug
- [ ] Refactoring
- [ ] Documentation
- [ ] Tests

## 🧪 Tests
- Unitaires : [x] 
- E2E : [x]
- Couverture : XX%

## 📸 Captures d'écran
Ajoutez captures si changements visuels

## 🔗 Liens connexes
- Issue #123
- Documentation mise à jour
```

## 🚨 Bloqueurs

Si une validation échoue, la PR ne pourra pas être fusionnée jusqu'à résolution.