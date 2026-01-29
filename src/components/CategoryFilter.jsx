import { useAllCategories } from "../hooks/useCategories"
import { useFilters } from "../zustand/productsStore"

export const CategoryFilter = () => {
    const { data } = useAllCategories()
    const category = useFilters(state => state.category)
    const setCategory = useFilters(state => state.setCategory)
    const filtered = (e) => {
        console.log(e.target.value)
        setCategory(e.target.value);
    }

    return (
        <>
            <select
                onChange={filtered}
                value={category}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">Todas las categorías</option>
                {data &&
                    data.map(c => <option key={c.id} value={`${c.id}`}>{c.name}</option>)
                }
            </select>
        </>
    )
}