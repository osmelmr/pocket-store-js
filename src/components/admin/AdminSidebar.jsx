import { Link } from "react-router-dom";

export const AdminSidebar = ({ isSidebarOpen }) => {
    return (
        <div className={`fixed top-20 h-full right-0 w-64 bg-gray-800 text-white ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
            <div className="p-4 flex flex-col">
                <div className="flex items-center justify-around mb-8">
                    <h1 className="text-2xl font-bold ">Admin Store</h1>
                </div>
                <nav className="space-y-2 flex-1">
                    <Link
                        to="/admin"
                        className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors w-full text-left">
                        <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Dashboard
                    </Link>

                    <Link
                        to="products"
                        className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors w-full text-left">
                        <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        Productos
                    </Link>

                    <Link
                        to="/"
                        className="w-full flex items-center p-3 rounded hover:bg-gray-700 transition-colors text-left">
                        <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        Ver Tienda
                    </Link>
                </nav>


            </div>
        </div>
    )
}