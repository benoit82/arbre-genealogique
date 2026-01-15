import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Arbre Généalogique
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Créez, gérez et explorez votre histoire familiale
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Créer un compte</h3>
            <p className="text-gray-600 mb-6">
              Commencez à construire votre arbre généalogique dès maintenant
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              S'inscrire
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Se connecter</h3>
            <p className="text-gray-600 mb-6">
              Accédez à votre arbre généalogique existant
            </p>
            <Link
              href="/auth/signin"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
        
        <div className="text-gray-500">
          <p>Découvrez vos racines et partagez votre histoire familiale</p>
        </div>
      </div>
    </div>
  )
}
