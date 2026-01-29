import { useFilters } from "../zustand/productsStore";

export const SearchFilter = () => {
    const search = useFilters(state => state.search)
    const setSearch = useFilters(state => state.setSearch)

    const filtered = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <>
            <div className="relative w-full">
                <input
                    value={search}
                    onChange={filtered}
                    type="text"
                    placeholder="Buscar por nombre o descripción..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </>
    )
}