import { useCart } from "../zustand/useCart"

export const StoreProductList = ({ products }) => {
    const { quantityP, lessFromCart, addToCart } = useCart()
    return (
        <>
            {/* Info */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Nuestros Productos
                </h2>
                <p className="text-gray-600">
                    12 productos disponibles
                </p>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Producto 1 */}
                {products && products.map(p => (p.stock > 0 &&
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" key={p.id}>
                        <div className="relative h-48 bg-gray-100">
                            <img
                                src={p.image ? p.image : "https://placehold.co/300x300"}
                                alt="Producto"
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded">
                                {p.category_name ? p.category_name : "Unknown"}
                            </span>
                            <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded flex items-center">
                                <svg
                                    className="w-3 h-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {p.rating ? p.rating : "NaN"}
                            </span>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 truncate">
                                {p.name ? p.name : "Unknown"}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-10">
                                {p.description ? p.description : "Unknown"}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <span className="text-lg font-bold text-gray-900">
                                        ${p.price ? p.price : "NaN"}
                                    </span>

                                </div>

                                <button
                                    disabled={!p.stock}
                                    onClick={() => addToCart(p.id)}
                                    className={`px-4 py-2 rounded-lg flex items-center text-white ${p.stock ? "hover:bg-blue-700  bg-blue-600" : "hover:bg-grey-600  bg-gray-500 "}`} >
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
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Agregar
                                </button>
                            </div>
                            {quantityP(p.id) > 0 &&
                                <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-blue-700">
                                            {quantityP(p.id) || "0"} unidades en
                                            el carrito
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => lessFromCart(p.id)}
                                                className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded hover:bg-red-200"
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={() => { addToCart(p.id) }}
                                                className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded hover:bg-green-200 disabled:opacity-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}