import { useCart } from "../zustand/useCart"
import { Link } from "react-router"
import { useAuthContext } from "../hooks/useAuth"
import { SearchFilter } from "./SearchFilter"
import { useNavigate } from "react-router"
import { useState } from "react"

export const StoreHeader = ({ productsFilters }) => {
    const navigate = useNavigate()
    const { allStock } = useCart()
    const { user, logOut } = useAuthContext()
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogout = () => {
        logOut()
        setShowDropdown(false)
        navigate("/login")
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Mi Tienda</h1>
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                Demo
                            </span>
                        </Link>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <SearchFilter productsFilters={productsFilters} />
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center space-x-6">
                        {/* Panel Admin (solo si es admin) */}
                        {/* {user?.role === 'admin' && ( */}
                        <Link
                            to="/admin"
                            className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Panel Admin
                        </Link>
                        {/* )} */}

                        {/* Carrito */}
                        <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                        </Link>

                        {/* Autenticación */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-3 focus:outline-none"
                                >
                                    <span className="text-gray-600 hidden md:block">
                                        Hola, {user.name}
                                    </span>
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors">
                                        <img
                                            src={user.avatar || "https://ui-avatars.com/api/?name=user&background=3B82F6&color=fff&bold=true"}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </button>

                                {/* Dropdown de usuario */}
                                {showDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowDropdown(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Mi Perfil
                                            </Link>
                                            <Link
                                                to="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Mis Pedidos
                                            </Link>
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    Panel Admin
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                                            >
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    Cerrar Sesión
                                                </div>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}