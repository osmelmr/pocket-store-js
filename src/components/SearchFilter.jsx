import { useFilters } from "../zustand/productsStore";
// Importamos el icono correcto de Heroicons
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SearchFilter = () => {
    const search = useFilters(state => state.search)
    const setSearch = useFilters(state => state.setSearch)

    const filtered = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <div className="relative group w-full">
            {/* Input de Búsqueda */}
            <input
                value={search}
                onChange={filtered}
                type="text"
                placeholder="Buscar por nombre o descripción..."
                className="w-full pl-10 pr-4 py-2 transition-all outline-none
            /* Modo Claro */
            bg-white border border-gray-200 md:border-gray-300 text-gray-700
            hover:border-blue-500 hover:shadow-sm
            focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            /* Modo Oscuro (Sin Blur/Sólido) */
            dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200
            dark:hover:border-blue-400
            dark:focus:ring-blue-400/20 dark:focus:border-blue-400
            /* Radio de bordes */
            rounded-xl"
            />

            {/* Icono de Lupa */}
            <MagnifyingGlassIcon
                className="absolute left-3 top-2.5 w-5 h-5 transition-colors
            /* Modo Claro */
            text-gray-400 group-focus-within:text-blue-500
            /* Modo Oscuro */
            dark:text-gray-500 dark:group-focus-within:text-blue-400"
            />
        </div>
    )
}