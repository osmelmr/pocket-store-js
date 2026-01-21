export const CategoryFilter = ({ productsFilters }) => {
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
                <option value="Electrónica">Electrónicos</option>
                <option value="Audio">Audio</option>
                <option value="Libros">Libros</option>
                <option value="Fotografía">Fotografía</option>
                <option value="Drones">Drones</option>
                <option value="Deport">Deportes</option>
            </select>
        </>
    )
}