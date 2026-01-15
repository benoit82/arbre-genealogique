import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SessionProvider } from 'next-auth/react'
import Dashboard from '@/app/dashboard/page'
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
  useSession: vi.fn(),
  signOut: vi.fn(),
}))

const { useSession, signOut } = await import('next-auth/react')

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to signin if user is not authenticated', () => {
    vi.mocked(useSession).mockReturnValue({ data: null, status: 'authenticated' })

    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    )

    expect(mockPush).toHaveBeenCalledWith('/auth/signin')
  })

  it('renders dashboard for authenticated user', () => {
    const mockSession = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    }
    vi.mocked(useSession).mockReturnValue({ data: mockSession, status: 'authenticated' })

    render(
      <SessionProvider session={mockSession}>
        <Dashboard />
      </SessionProvider>
    )

    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-title')).toBeInTheDocument()
    expect(screen.getByTestId('welcome-message')).toHaveTextContent('John Doe')
    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
  })

  it('calls signOut when logout button is clicked', async () => {
    const mockSession = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    }
    vi.mocked(useSession).mockReturnValue({ data: mockSession, status: 'authenticated' })

    render(
      <SessionProvider session={mockSession}>
        <Dashboard />
      </SessionProvider>
    )

    await userEvent.click(screen.getByTestId('logout-button'))
    expect(vi.mocked(signOut)).toHaveBeenCalled()
  })

  it('renders action buttons', () => {
    const mockSession = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    }
    vi.mocked(useSession).mockReturnValue({ data: mockSession, status: 'authenticated' })

    render(
      <SessionProvider session={mockSession}>
        <Dashboard />
      </SessionProvider>
    )

    const createTreeButton = screen.getByTestId('create-tree-button')
    const viewTreesButton = screen.getByTestId('view-trees-button')

    expect(createTreeButton).toBeInTheDocument()
    expect(createTreeButton.textContent).toBe('Créer un nouvel arbre')
    expect(viewTreesButton).toBeInTheDocument()
    expect(viewTreesButton.textContent).toBe('Voir mes arbres')
  })
})