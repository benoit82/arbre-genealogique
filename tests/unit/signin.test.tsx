import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SessionProvider } from 'next-auth/react'
import SignIn from '@/app/auth/signin/page'
import { vi } from 'vitest'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
}))

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  signIn: vi.fn(),
  useSession: vi.fn(() => ({ data: null, status: 'loading' })),
}))

const { signIn } = await import('next-auth/react')

describe('SignIn Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the signin form', () => {
    render(
      <SessionProvider session={null}>
        <SignIn />
      </SessionProvider>
    )

    expect(screen.getByTestId('signin-page')).toBeInTheDocument()
    expect(screen.getByTestId('signin-title')).toBeInTheDocument()
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByTestId('signin-submit-button')).toBeInTheDocument()
  })

  it('shows error message on invalid credentials', async () => {
    vi.mocked(signIn).mockResolvedValue({ error: 'Invalid credentials' })

    render(
      <SessionProvider session={null}>
        <SignIn />
      </SessionProvider>
    )

    await userEvent.type(screen.getByTestId('email-input'), 'test@example.com')
    await userEvent.type(screen.getByTestId('password-input'), 'wrongpassword')
    await userEvent.click(screen.getByTestId('signin-submit-button'))

    await waitFor(() => {
      const error = screen.getByTestId('signin-error')
      expect(error).toBeInTheDocument()
      expect(error.textContent).toBe('Identifiants incorrects')
    })
  })

  it('redirects to dashboard on successful login', async () => {
    vi.mocked(signIn).mockResolvedValue({})

    render(
      <SessionProvider session={null}>
        <SignIn />
      </SessionProvider>
    )

    await userEvent.type(screen.getByTestId('email-input'), 'test@example.com')
    await userEvent.type(screen.getByTestId('password-input'), 'password123')
    await userEvent.click(screen.getByTestId('signin-submit-button'))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('has link to signup page', () => {
    render(
      <SessionProvider session={null}>
        <SignIn />
      </SessionProvider>
    )

    const signupLink = screen.getByTestId('signup-link')
    expect(signupLink).toBeInTheDocument()
    expect(signupLink).toHaveAttribute('href', '/auth/signup')
  })
})