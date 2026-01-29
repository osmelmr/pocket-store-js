import { useFilters } from "../zustand/productsStore"

export const OrderFilter = () => {
    const order = useFilters(state => state.order)
    const setOrder = useFilters(state => state.setOrder)
    const filtered = (e) => {
        setOrder(e.target.value);
    }
    return (
        <>
            <select
                value={order}
                onChange={filtered}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="newest">Más recientes</option>
                <option value="name">Nombre (A-Z)</option>
                <option value="price">Precio (menor a mayor)</option>
                <option value="rating">Mejor valorados</option>
            </select>
        </>
    )
}