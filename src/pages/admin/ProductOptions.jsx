import { Link } from "react-router";
import { StarIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export const ProductOptions = ({ product: p, setShowModal, setId }) => {
    return (
        <div key={p.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-all active:scale-[0.98]">

            {/* Top Section: Image & Basic Info */}
            <div className="flex items-start space-x-4">
                <div className="relative shrink-0">
                    <img
                        className="h-16 w-16 rounded-xl object-cover border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                        src={p.image || "https://placehold.co/300x300"}
                        alt={p.name}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                        {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {p.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-transparent dark:border-slate-700">
                            {p.category_name}
                        </span>
                        <div className="flex items-center text-[11px] font-medium text-amber-500 dark:text-amber-400">
                            <StarIcon className="w-3.5 h-3.5 mr-0.5" />
                            {p.rating}
                        </div>
                    </div>
                </div>
            </div>

            {/* Price & Stock Status */}
            <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                <div className="space-y-0.5">
                    <p className="text-[10px] font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider">Precio</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400 leading-none">
                        ${p.price}
                    </p>
                </div>

                <div className="text-right">
                    {!p.stock || p.stock < 1 ? (
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">Agotado</span>
                    ) : p.stock < 10 ? (
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Stock bajo ({p.stock})</span>
                    ) : (
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Stock: {p.stock}</span>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-5">
                <Link
                    to={`${p.id}/edit`}
                    className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 dark:bg-blue-600 text-white rounded-xl transition-all hover:bg-blue-700 dark:hover:bg-blue-500 shadow-sm"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">Editar</span>
                </Link>
                <button
                    onClick={() => { setShowModal(true); setId(p.id) }}
                    className="flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50 transition-all hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <TrashIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">Eliminar</span>
                </button>
            </div>
        </div>
    );
};