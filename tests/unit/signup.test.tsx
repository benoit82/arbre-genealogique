import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SessionProvider } from 'next-auth/react'
import SignUp from '@/app/auth/signup/page'
import { vi } from 'vitest'

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useSession: vi.fn(() => ({ data: null, status: 'loading' })),
}))

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
}))

// Mock fetch for the API
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('SignUp Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the signup form', () => {
    render(
      <SessionProvider session={null}>
        <SignUp />
      </SessionProvider>
    )

    const title = screen.getByTestId('signup-title')
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('signup-submit-button')

    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('Créer votre compte')
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('shows error message on signup failure', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Email already exists' }),
    })

    render(
      <SessionProvider session={null}>
        <SignUp />
      </SessionProvider>
    )

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('signup-submit-button')

    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'existing@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)

    await waitFor(() => {
      const error = screen.getByTestId('signup-error')
      expect(error).toBeInTheDocument()
      expect(error.textContent).toBe('Email already exists')
    })
  })

  it('redirects to signin page on successful signup', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
    })

    render(
      <SessionProvider session={null}>
        <SignUp />
      </SessionProvider>
    )

    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('signup-submit-button')

    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'new@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/signin?message=Inscription réussie')
    })
  })

  it('has link to signin page', () => {
    render(
      <SessionProvider session={null}>
        <SignUp />
      </SessionProvider>
    )

    const signinLink = screen.getByTestId('signin-link')
    expect(signinLink).toBeInTheDocument()
    expect(signinLink).toHaveAttribute('href', '/auth/signin')
  })
})