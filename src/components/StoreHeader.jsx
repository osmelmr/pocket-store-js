import { useCart } from "../zustand/useCart"
import { Link } from "react-router"
import { useAuthContext } from "../hooks/useAuth" // 👈 tu custom hook para consumir AuthContext

export const StoreHeader = ({ changesearch, search }) => {
    const { allStock } = useCart()
    const { user, login, logOut } = useAuthContext() // 👈 obtenemos usuario y funciones

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Mi Tienda</h1>
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            Demo
                        </span>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <input
                                onChange={changesearch}
                                value={search}
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/admin"
                            className="px-4 py-2 text-blue-600 hover:text-blue-800"
                        >
                            Panel Admin
                        </Link>

                        {/* Carrito */}
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {allStock()}
                            </span>
                        </button>

                        {/* Autenticación */}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.avatar || "https://via.placeholder.com/40"}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-gray-700 font-medium">{user.name}</span>
                                <button
                                    onClick={logOut}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => login({ email: "demo@demo.com", password: "1234" })}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
