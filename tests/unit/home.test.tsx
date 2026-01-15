import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import Home from '@/app/page'
import { vi } from 'vitest'

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

describe('Home Page', () => {
  it('renders the main title', () => {
    render(<Home />)
    
    const title = screen.getByTestId('home-title')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('Arbre Généalogique')
  })

  it('renders the subtitle', () => {
    render(<Home />)
    
    const subtitle = screen.getByTestId('home-subtitle')
    expect(subtitle).toBeInTheDocument()
    expect(subtitle.textContent).toBe('Créez, gérez et explorez votre histoire familiale')
  })

  it('renders signup and signin cards', () => {
    render(<Home />)
    
    const signupCard = screen.getByTestId('signup-card')
    const signinCard = screen.getByTestId('signin-card')
    
    expect(signupCard).toBeInTheDocument()
    expect(signinCard).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Home />)
    
    const signupLink = screen.getByTestId('signup-link')
    const signinLink = screen.getByTestId('signin-link')
    
    expect(signupLink).toBeInTheDocument()
    expect(signupLink).toHaveAttribute('href', '/auth/signup')
    
    expect(signinLink).toBeInTheDocument()
    expect(signinLink).toHaveAttribute('href', '/auth/signin')
  })

  it('renders footer text', () => {
    render(<Home />)
    
    const footer = screen.getByTestId('home-footer')
    expect(footer).toBeInTheDocument()
    expect(footer.textContent).toBe('Découvrez vos racines et partagez votre histoire familiale')
  })
})