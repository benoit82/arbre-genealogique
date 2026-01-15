import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('home page loads correctly', async ({ page }) => {
    await expect(page.getByTestId('home-page')).toBeVisible()
    await expect(page.getByTestId('home-title')).toContainText('Arbre Généalogique')
    await expect(page.getByTestId('home-subtitle')).toContainText('Créez, gérez et explorez votre histoire familiale')
  })

  test('navigate to signup page', async ({ page }) => {
    await page.getByTestId('signup-link').click()
    await expect(page).toHaveURL('/auth/signup')
    await expect(page.getByTestId('signup-page')).toBeVisible()
    await expect(page.getByTestId('signup-title')).toContainText('Créer votre compte')
  })

  test('navigate to signin page', async ({ page }) => {
    await page.getByTestId('signin-link').click()
    await expect(page).toHaveURL('/auth/signin')
    await expect(page.getByTestId('signin-page')).toBeVisible()
    await expect(page.getByTestId('signin-title')).toContainText('Connexion à votre arbre généalogique')
  })

  test('signup with valid credentials', async ({ page }) => {
    await page.getByTestId('signup-link').click()
    
    const timestamp = Date.now()
    const email = `test${timestamp}@example.com`
    
    await page.getByTestId('name-input').fill('Test User')
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signup-submit-button').click()

    // Should redirect to signin page with success message
    await expect(page).toHaveURL(/\/auth\/signin\?message=Inscription réussie/)
  })

  test('signup with existing email shows error', async ({ page }) => {
    await page.getByTestId('signup-link').click()
    
    await page.getByTestId('name-input').fill('Test User')
    await page.getByTestId('email-input').fill('test@example.com')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signup-submit-button').click()

    await expect(page.getByTestId('signup-error')).toBeVisible()
    await expect(page.getByTestId('signup-error')).toContainText('Cet email est déjà utilisé')
  })

  test('signin with valid credentials', async ({ page }) => {
    // First signup a user
    await page.getByTestId('signup-link').click()
    
    const timestamp = Date.now()
    const email = `login${timestamp}@example.com`
    
    await page.getByTestId('name-input').fill('Login User')
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signup-submit-button').click()

    // Now try to signin
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signin-submit-button').click()

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByTestId('dashboard-page')).toBeVisible()
    await expect(page.getByTestId('welcome-message')).toContainText('Login User')
  })

  test('signin with invalid credentials shows error', async ({ page }) => {
    await page.getByTestId('signin-link').click()
    
    await page.getByTestId('email-input').fill('wrong@example.com')
    await page.getByTestId('password-input').fill('wrongpassword')
    await page.getByTestId('signin-submit-button').click()

    await expect(page.getByTestId('signin-error')).toBeVisible()
    await expect(page.getByTestId('signin-error')).toContainText('Identifiants incorrects')
  })

  test('logout functionality', async ({ page }) => {
    // Signup and signin first
    const timestamp = Date.now()
    const email = `logout${timestamp}@example.com`
    
    // Signup
    await page.getByTestId('signup-link').click()
    await page.getByTestId('name-input').fill('Logout User')
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signup-submit-button').click()

    // Signin
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signin-submit-button').click()

    // Wait for dashboard
    await expect(page.getByTestId('dashboard-page')).toBeVisible()

    // Logout
    await page.getByTestId('logout-button').click()
    
    // Should redirect to signin page
    await expect(page).toHaveURL('/auth/signin')
  })

  test('dashboard access without authentication redirects to signin', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/auth/signin')
  })

  test('protected dashboard shows user actions', async ({ page }) => {
    // Create a session by signing up and signing in
    const timestamp = Date.now()
    const email = `dashboard${timestamp}@example.com`
    
    // Signup
    await page.getByTestId('signup-link').click()
    await page.getByTestId('name-input').fill('Dashboard User')
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signup-submit-button').click()

    // Signin
    await page.getByTestId('email-input').fill(email)
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('signin-submit-button').click()

    // Check dashboard elements
    await expect(page.getByTestId('create-tree-button')).toBeVisible()
    await expect(page.getByTestId('view-trees-button')).toBeVisible()
    await expect(page.getByTestId('dashboard-welcome')).toContainText('Bienvenue dans votre tableau de bord')
  })
})