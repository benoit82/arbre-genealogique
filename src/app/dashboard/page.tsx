'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Chargement...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div data-testid="dashboard-page" className="min-h-screen bg-gray-50">
      <header data-testid="dashboard-header" className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 data-testid="dashboard-title" className="text-3xl font-bold text-gray-900">
              Arbre Généalogique
            </h1>
            <div data-testid="user-info" className="flex items-center space-x-4">
              <span data-testid="welcome-message" className="text-gray-700">
                Bienvenue, {session.user?.name || session.user?.email}
              </span>
              <button
                data-testid="logout-button"
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main data-testid="dashboard-main" className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div data-testid="dashboard-content" className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <h2 data-testid="dashboard-welcome" className="text-2xl font-semibold text-gray-900 mb-4">
              Bienvenue dans votre tableau de bord
            </h2>
            <p data-testid="dashboard-description" className="text-gray-600 mb-6">
              Commencez à créer votre arbre généalogique dès maintenant !
            </p>
            <div className="space-x-4">
              <button 
                data-testid="create-tree-button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Créer un nouvel arbre
              </button>
              <button 
                data-testid="view-trees-button"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Voir mes arbres
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}