import { useCategories } from "../hooks/useCategories"

export const CategoryFilter = ({ productsFilters }) => {
    const { data } = useCategories()
    const { category, setCategory } = productsFilters
    const filtered = (e) => {
        setCategory(e.target.value);
    }
    return (
        <>
            <select
                onChange={filtered}
                value={category}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">Todas las categorías</option>
                {data &&
                    data.map(c => <option key={c.id} value={`${c.id}`}>{c.name}</option>)
                }
            </select>
        </>
    )
}