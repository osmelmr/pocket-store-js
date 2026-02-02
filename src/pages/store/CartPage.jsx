import { Link } from "react-router";
import {
    TrashIcon,
    MinusSmallIcon,
    PlusSmallIcon,
    ArrowLeftIcon,
    ShoppingBagIcon
} from "@heroicons/react/24/outline";
import { useCart } from "../../zustand/useCart";

export const CartPage = () => {
    const { cart, addToCart, lessFromCart, removeFromCart: remove } = useCart();

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    };

    const removeThisFromCart = (id) => { remove(id) };
    const removeFromCart = (id) => { lessFromCart(id) };
    const updateQuantity = (id) => { addToCart(id) };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 transition-colors">
                <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-full mb-4 border border-transparent dark:border-slate-700">
                    <ShoppingBagIcon className="w-12 h-12 text-gray-400 dark:text-slate-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tu carrito está vacío</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">Parece que aún no has añadido nada a tu selección.</p>
                <Link to="/" className="flex items-center gap-2 bg-blue-600 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition-all active:scale-95">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-transparent transition-colors">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8 italic uppercase tracking-tight">Tu Carrito</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Lista de Productos */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:border-slate-700 transition-all">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50 dark:bg-slate-800"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-gray-900 dark:text-slate-100 text-sm sm:text-base truncate">
                                        {product.name}
                                    </h3>
                                    <button
                                        onClick={() => removeThisFromCart(product.id)}
                                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-blue-600 dark:text-blue-400 font-black mt-1 text-lg">
                                    ${product.price.toFixed(2)}
                                </p>

                                <div className="flex items-center justify-between mt-3">
                                    {/* Control de Cantidad */}
                                    <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 transition-colors disabled:opacity-30"
                                            disabled={product.quantity < 1}
                                        >
                                            <MinusSmallIcon className="w-4 h-4" />
                                        </button>
                                        <span className="px-3 text-sm font-black text-gray-700 dark:text-white border-x dark:border-slate-700">
                                            {product.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(product.id)}
                                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 transition-colors"
                                        >
                                            <PlusSmallIcon className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <span className="hidden sm:block text-sm font-medium text-gray-400 dark:text-slate-500">
                                        Total: <span className="text-gray-900 dark:text-slate-300">${(product.price * product.quantity).toFixed(2)}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen de Compra */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50/50 dark:bg-slate-900 backdrop-blur-sm rounded-[2rem] p-8 sticky top-24 border border-gray-100 dark:border-slate-800 transition-colors">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 italic">Resumen</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-slate-400">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-bold text-gray-900 dark:text-white">${getTotalPrice()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-slate-400">
                                <span className="font-medium">Envío estimado</span>
                                <span className="text-green-600 dark:text-green-400 font-bold uppercase text-xs tracking-widest flex items-center">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                                    Gratis
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-slate-400">
                                <span className="font-medium">Impuestos</span>
                                <span className="font-bold text-gray-900 dark:text-white">$0.00</span>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-slate-800 my-4" />
                            <div className="flex justify-between items-end">
                                <span className="text-gray-900 dark:text-white font-bold">Total</span>
                                <div className="text-right">
                                    <span className="block text-3xl font-black text-blue-600 dark:text-blue-400 leading-none">
                                        ${getTotalPrice()}
                                    </span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">IVA Incluido</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 dark:bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 dark:hover:bg-blue-500 transition-all active:scale-[0.98] uppercase tracking-wider text-sm">
                            Finalizar Compra
                        </button>

                        <div className="mt-8 space-y-4">
                            <div className="flex flex-wrap justify-center gap-4 opacity-40 dark:opacity-20 grayscale">
                                <div className="w-10 h-6 bg-gray-400 dark:bg-slate-600 rounded" />
                                <div className="w-10 h-6 bg-gray-400 dark:bg-slate-600 rounded" />
                                <div className="w-10 h-6 bg-gray-400 dark:bg-slate-600 rounded" />
                            </div>
                            <p className="text-center text-[10px] text-gray-400 dark:text-slate-600 font-bold uppercase tracking-widest">
                                Pago Seguro SSL • 256-bit Encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};