import { Link } from "react-router";
import { StarIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export const ProductOptionsTable = ({ products, setShowModal, setId }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800 transition-colors">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
                <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">
                        Producto
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">
                        Categoría
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">
                        Precio
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">
                        Estado / Rating
                    </th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-100 dark:divide-slate-800">
                {products.newProducts.slice(0, 5).map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors group">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <img
                                    className="h-11 w-11 rounded-xl object-cover mr-4 border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                                    src={p.image ? p.image : "https://placehold.co/300x300"}
                                    alt={p.name}
                                />
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {p.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[220px]">
                                        {p.description}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-transparent dark:border-slate-700">
                                {p.category_name}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-base font-bold text-blue-600 dark:text-blue-400">
                                ${p.price}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="space-y-1.5">
                                <div>
                                    {!p.stock || p.stock < 1 ? (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 uppercase tracking-tighter">Agotado</span>
                                    ) : p.stock < 10 ? (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 uppercase tracking-tighter">Bajo ({p.stock})</span>
                                    ) : (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-tighter">Stock: {p.stock}</span>
                                    )}
                                </div>
                                <div className="flex items-center text-xs font-medium text-gray-600 dark:text-slate-400">
                                    <StarIcon className="w-3.5 h-3.5 text-amber-400 mr-1" />
                                    {p.rating}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-2">
                                <Link
                                    to={`${p.id}/edit`}
                                    className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 rounded-lg transition-all"
                                    title="Editar producto"
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => { setShowModal(true); setId(p.id) }}
                                    className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 rounded-lg transition-all"
                                    title="Eliminar producto"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};