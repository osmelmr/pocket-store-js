import { Link } from "react-router";
import {
    TrashIcon,
    MinusSmallIcon,
    PlusSmallIcon,
    ArrowLeftIcon,
    ShoppingBagIcon
} from "@heroicons/react/24/outline";

export const CartPage = () => {
    // --- MOCKS (Sustituye esto por tu lógica de Zustand después) ---
    const cart = [
        {
            id: 1,
            name: "iPhone 15 Pro - Titanium Blue",
            price: 999.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=250&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Sony WH-1000XM5 Noise Cancelling",
            price: 349.50,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1644734567652-2b074fd05abb?q=80&w=250&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "MacBook Air M2 - Space Gray",
            price: 1199.00,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?q=80&w=250&auto=format&fit=crop"
        }
    ];

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    };

    // Funciones dummy para que el onClick no de error
    const removeFromCart = (id) => console.log("Eliminar producto:", id);
    const updateQuantity = (id, q) => console.log("Nueva cantidad para", id, ":", q);
    // ----------------------------------------------------------------

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <div className="p-6 bg-gray-50 rounded-full mb-4">
                    <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-8 text-center">Parece que aún no has añadido nada a tu selección.</p>
                <Link to="/" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Lista de Productos */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                        {product.name}
                                    </h3>
                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-blue-600 font-bold mt-1 text-lg">
                                    ${product.price.toFixed(2)}
                                </p>

                                <div className="flex items-center justify-between mt-3">
                                    {/* Control de Cantidad */}
                                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                        <button
                                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                            className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors disabled:opacity-30"
                                            disabled={product.quantity <= 1}
                                        >
                                            <MinusSmallIcon className="w-4 h-4" />
                                        </button>
                                        <span className="px-3 text-sm font-bold text-gray-700">
                                            {product.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                            className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
                                        >
                                            <PlusSmallIcon className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Subtotal por producto (Desktop) */}
                                    <span className="hidden sm:block text-sm text-gray-400">
                                        Total: ${(product.price * product.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen de Compra */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50/50 backdrop-blur-sm rounded-3xl p-6 sticky top-24 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">${getTotalPrice()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío estimado</span>
                                <span className="text-green-600 font-medium">Gratis</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Impuestos</span>
                                <span className="font-medium text-gray-900">$0.00</span>
                            </div>
                            <div className="h-px bg-gray-200 my-4" />
                            <div className="flex justify-between text-xl font-black text-gray-900">
                                <span>Total</span>
                                <span>${getTotalPrice()}</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-[0.98]">
                            Finalizar Compra
                        </button>

                        <div className="mt-6 space-y-3">
                            <p className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                Stock disponible para envío inmediato
                            </p>
                            <div className="flex justify-center gap-4 opacity-30 grayscale">
                                {/* Aquí podrías poner mini iconos de tarjetas de crédito */}
                                <div className="w-8 h-5 bg-gray-400 rounded" />
                                <div className="w-8 h-5 bg-gray-400 rounded" />
                                <div className="w-8 h-5 bg-gray-400 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};