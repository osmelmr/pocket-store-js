export const Filters = ({ productsFilters }) => {
    const { setCategory, setOrder, order, category } = productsFilters
    const changecategroy = (e) => {
        setCategory(e.target.value);
    }
    const changeorder = (e) => {
        setOrder(e.target.value);
    }
    return (
        <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Filtrar por:</span>
                        <select
                            onChange={changecategroy}
                            value={category}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="all">Todas las categorías</option>
                            <option value="Electrónica">Electrónicos</option>
                            <option value="Audio">Audio</option>
                            <option value="books">Libros</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Ordenar por:</span>
                        <select
                            onChange={changeorder}
                            value={order}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="newest">Más recientes</option>
                            <option value="name">Nombre (A-Z)</option>
                            <option value="price">Precio (menor a mayor)</option>
                            <option value="rating">Mejor valorados</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )

}