# Tests Documentation

## 📋 Structure des tests

```
tests/
├── unit/              # Tests unitaires avec Vitest
│   ├── home.test.tsx
│   ├── signin.test.tsx
│   ├── signup.test.tsx
│   └── dashboard.test.tsx
└── e2e/               # Tests end-to-end avec Playwright
    └── auth.spec.ts
```

## 🧪 Tests unitaires (Vitest)

### Commandes
```bash
npm run test              # Lancer tous les tests unitaires
npm run test:ui          # Lancer avec interface graphique
npm run test:coverage    # Lancer avec rapport de couverture
npm run test:watch        # Lancer en mode surveillance
```

### Structure d'un test

```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Configuration avant chaque test
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    // Arrange
    render(<Component />)
    
    // Act & Assert
    expect(screen.getByTestId('component-element')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    // Arrange
    render(<Component />)
    
    // Act
    await userEvent.click(screen.getByTestId('button'))
    
    // Assert
    expect(mockFunction).toHaveBeenCalled()
  })
})
```

### Mocking

#### NextAuth
```typescript
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))
```

#### Next.js Router
```typescript
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
}))
```

### Bonnes pratiques

- Utiliser des `data-testid` descriptifs
- Tester les cas limites et erreurs
- Mock proprement les dépendances externes
- Utiliser `userEvent` pour les interactions utilisateur
- Nettoyer les mocks entre chaque test

## 🎭 Tests E2E (Playwright)

### Commandes
```bash
npm run test:e2e              # Lancer tous les tests e2e
npm run test:e2e:ui          # Lancer avec interface graphique
npm run test:e2e:headed      # Lancer avec navigateur visible
npm run test:e2e:debug      # Mode debug pas à pas
```

### Structure d'un test

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Configuration avant chaque test
    await page.goto('/')
  })

  test('should perform user action', async ({ page }) => {
    // Act
    await page.getByTestId('button').click()
    
    // Assert
    await expect(page.getByTestId('result')).toBeVisible()
  })
})
```

### Locators Playwright

#### Préférer les data-testid
```typescript
// ✅ Bon
await page.getByTestId('submit-button').click()

// ❌ Éviter si possible
await page.locator('button[type="submit"]').click()
```

#### Sélécteurs utiles
```typescript
page.getByTestId('element-id')        // Par data-testid
page.getByRole('button')              // Par rôle
page.getByText('Submit')               // Par texte
page.getByLabel('Email address')        // Par label
page.getByPlaceholder('Enter email')   // Par placeholder
```

### Bonnes pratiques

- Utiliser des `data-testid` uniques et sémantiques
- Attendre les éléments avec `waitFor` si nécessaire
- Tester sur tous les navigateurs (configuré automatiquement)
- Capturer les erreurs réseau et console
- Utiliser `page.waitForURL()` pour les redirections

## 🔍 Débogage

### Tests unitaires
```bash
# Mode debug avec breakpoints
npm run test: -- --reporter=verbose

# Interface graphique pour debug
npm run test:ui
```

### Tests E2E
```bash
# Mode debug
npm run test:e2e:debug

# Avec navigateur visible pour observer
npm run test:e2e:headed

# Interface graphique Playwright
npm run test:e2e:ui
```

## 📊 Rapports

### Couverture de code
- Générée dans `coverage/`
- Rapport HTML disponible dans `coverage/index.html`
- Objectif : >80% de couverture

### Tests E2E
- Rapports générés dans `playwright-report/`
- Captures d'écran en cas d'échec
- Vidéos des tests en cas d'échec

## 🎯 Bonnes pratiques générales

### Nomenclature
- Tests unitaires : `[nom].test.tsx`
- Tests E2E : `[feature].spec.ts`
- Descriptions claires en français ou anglais

### Organisation
- Un test par comportement
- Regrouper les tests logiquement
- Utiliser `describe` pour les suites

### Assertions
- Être précis dans les assertions
- Tester les cas positifs et négatifs
- Vérifier les états intermédiaires

## 🚨 Erreurs communes à éviter

### Tests fragiles
- Ne pas dépendre des temps d'attente fixes
- Utiliser des sélecteurs stables
- Éviter les sélecteurs CSS complexes

### Tests isolés
- Un test ne doit pas dépendre d'un autre
- Nettoyer les états entre les tests
- Pas de dépendance à l'ordre d'exécution

## 📝 Documentation des tests

Chaque test complexe devrait être documenté :

```typescript
test.describe('User Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    /**
     * Test: User can login with valid email/password
     * Steps:
     * 1. Navigate to login page
     * 2. Fill email and password fields
     * 3. Click submit button
     * Expected: Redirect to dashboard with user session
     */
    
    // Implementation...
  })
})
```