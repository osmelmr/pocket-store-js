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
        <div className="relative group w-full ">
            {/* AJUSTES: 
                1. pl-10 (Padding Left): reserva espacio para que el texto empiece después del icono.
                2. transition-all: para que se vea fluido si decides aplicar el efecto de expansión luego.
                3. w-full: se adapta al ancho del contenedor padre.
            */}
            <input
                value={search}
                onChange={filtered}
                type="text"
                placeholder="Buscar por nombre o descripción..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 md:border-gray-300 rounded-xl sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all  hover:border-blue-500 hover:shadow-sm"
            />

            {/* Icono posicionado a la izquierda (left-3). 
                Al usar absolute, no ocupa espacio real, por eso el pl-10 del input es vital.
            */}
            <MagnifyingGlassIcon
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            />
        </div>
    )
}