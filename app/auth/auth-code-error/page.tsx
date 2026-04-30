export default function AuthCodeErrorPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    Erreur d'authentification
                </h1>

                <p className="mt-4 text-gray-600">
                    Le lien est invalide ou a expiré.
                </p>

                <a
                    href="/login"
                    className="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Retour au login
                </a>
            </div>
        </div>
    )
}