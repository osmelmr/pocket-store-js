import { Link } from 'react-router'

export const StoreFooter = () => {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">Mi Tienda</h3>
                        <p className="text-gray-400 mt-2">
                            Tu tienda online de confianza
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link
                            to="/admin"
                            className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100"
                        >
                            Acceder al Panel Admin
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Mi Tienda. Todos los derechos
                        reservados.
                    </p>
                    <p className="mt-1 text-sm">
                        Esta es una aplicación demo para propósitos educativos.
                    </p>
                </div>
            </div>
        </footer>
    )
}