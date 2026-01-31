import { TrashIcon } from "@heroicons/react/24/outline";

export const ProductCart = ({ product, quantityP, addToCart, lessFromCart }) => {
    const p = product;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                        <p className="text-xs text-gray-500 mt-1">
                            {p.stock ?
                                <span className="text-green-600">
                                    ✓ Stock ({p.stock} disponibles)
                                </span>
                                :
                                <span className="text-red-600">✗ Agotado</span>
                            }
                        </p>
                    </div>
                    {quantityP(p.id) < 1 ? (
                        <button
                            disabled={!p.stock}
                            onClick={() => addToCart(p.id)}
                            className={`px-4 py-2 rounded-lg flex items-center text-white transition-all active:scale-95 ${p.stock ? "bg-blue-600 hover:bg-blue-700 shadow-sm" : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-sm font-semibold">Agregar</span>
                        </button>
                    ) : (
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                            {/* Botón Menos */}
                            {quantityP(p.id) == 1 ?
                                <button
                                    onClick={() => lessFromCart(p.id)}
                                    className="w-7 h-10 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border-r border-gray-100 group"
                                >
                                    <TrashIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                                </button>
                                :
                                <button
                                    onClick={() => lessFromCart(p.id)}
                                    className="w-7 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors "
                                >
                                    <span className="text-lg font-medium">−</span>
                                </button>}

                            {/* Cantidad */}
                            <div className="px-4 min-w-[3rem] text-center">
                                <span className="text-sm font-bold text-gray-800">
                                    {quantityP(p.id)}
                                </span>
                            </div>

                            {/* Botón Más */}
                            <button
                                disabled={!p.stock}
                                onClick={() => addToCart(p.id)}
                                className="w-7 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors  disabled:opacity-30"
                            >
                                <span className="text-lg font-medium">+</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
