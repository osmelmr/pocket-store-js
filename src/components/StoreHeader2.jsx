import { useCart } from "../zustand/useCart"
import { Link } from "react-router"
import { useAuthContext } from "../hooks/useAuth"
import { SearchFilter } from "./SearchFilter"
import { useNavigate } from "react-router"
import { useState } from "react"

export const StoreHeader = () => {
    const navigate = useNavigate()
    const { allStock } = useCart()
    const { user, logOut } = useAuthContext()
    const [showDropdown, setShowDropdown] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const handleLogout = () => {
        logOut()
        setShowDropdown(false)
        navigate("/login")
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo y menú móvil */}
                    <div className="flex items-center">
                        {/* Botón menú móvil - solo en móviles */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden mr-3 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showMobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>

                        {/* Logo */}
                        {

                        }
                        <Link to="/" className="hidden sm:inline items-center">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Mi Tienda</h1>
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hidden sm:inline">
                                Demo
                            </span>
                        </Link>
                    </div>

                    {/* Barra de búsqueda - Siempre visible en desktop, oculta en móvil cuando menú abierto */}
                    <div className={`${showMobileMenu ? 'md:flex' : 'flex'} flex-1 max-w-2xl mx-4 md:mx-8`}>
                        <SearchFilter />
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {/* Panel Admin - Solo visible en desktop */}
                        <Link
                            to="/admin"
                            className="hidden md:block px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Panel Admin
                        </Link>

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

                        {/* Autenticación - Desktop */}
                        {user ? (
                            <div className="hidden md:block relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-3 focus:outline-none"
                                >
                                    <span className="text-gray-600">
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
                                className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Iniciar Sesión
                            </Link>
                        )}

                        {/* Icono de usuario en móvil */}
                        {user && (
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="md:hidden w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
                            >
                                <img
                                    src={user.avatar || "https://ui-avatars.com/api/?name=user&background=3B82F6&color=fff&bold=true"}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        )}
                    </div>
                </div>

                {/* Menú móvil desplegable */}
                {showMobileMenu && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        {/* Opciones del menú */}
                        <div className="space-y-3">
                            {/* Panel Admin en móvil */}
                            <Link
                                to="/admin"
                                className="block px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Panel Admin
                                </div>
                            </Link>

                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3 p-2">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                                            <img
                                                src={user.avatar || "https://ui-avatars.com/api/?name=user&background=3B82F6&color=fff&bold=true"}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/profile"
                                        className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Mi Perfil
                                        </div>
                                    </Link>

                                    <Link
                                        to="/orders"
                                        className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            Mis Pedidos
                                        </div>
                                    </Link>

                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setShowMobileMenu(false)
                                        }}
                                        className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-t border-gray-100"
                                    >
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar Sesión
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}