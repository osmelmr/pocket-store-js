import { Link } from "react-router";
// import { initialProducts } from "../mocks/mocks";
import { useProductFilters } from "../hooks/useProductFilters";
import { SearchFilter } from "../components/SearchFilter";
import { CategoryFilter } from "../components/CategoryFilter";
import { OrderFilter } from "../components/OrderFilter";
import { ConfirmModal } from "../components/ConfirmModal";
import { useState } from "react"

export const ProductList = () => {
  // const products = initialProducts
  const productFilters = useProductFilters()
  const [showModal, setShowModal] = useState(false)

  const [id, setId] = useState()

  const onCancel = () => {
    setShowModal(false)
  }
  const onConfirm = () => {
    setShowModal(false)
    productFilters.setIProducts(productFilters.products.filter(p => p.id !== id))
  }

  const totalP = productFilters.products.length
  let totalS = 0
  productFilters.products.map(p => totalS = totalS += p.stock)
  const agotados = productFilters.products.filter(p => p.stock < 1)
  const totalA = agotados.length

  const calcPromRate = () => {
    let tot = 0
    productFilters.products.map(p => tot += p.rating)
    return (tot / productFilters.products.length).toFixed(1)
  }

  const ratingP = calcPromRate()

  return (
    <div className="p-6">
      <ConfirmModal show={showModal} message={"Desea eliminar este producto?"} onCancel={onCancel} onConfirm={onConfirm} />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Productos
          </h1>
          <p className="text-gray-600 mt-1">
            Administra los productos de tu tienda
          </p>
        </div>
        <Link to="create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo Producto
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold">{totalP}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Stock Total</p>
              <p className="text-2xl font-bold">{totalS}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Agotados</p>
              <p className="text-2xl font-bold">{totalA}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating Promedio</p>
              <p className="text-2xl font-bold">{ratingP}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Productos
            </label>
            <SearchFilter productsFilters={productFilters} />
          </div>

          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <CategoryFilter productsFilters={productFilters} />
          </div>

          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <OrderFilter productsFilters={productFilters} />
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-fixed min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock / Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Producto 1 */}
              {
                productFilters.products.slice(0, 5).map(p =>
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                          src={p.image ? p.image : "https://placehold.co/300x300"}
                          alt={p.name}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {p.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {p.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-gray-900">
                        ${p.price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          {
                            !p.stock || p.stock < 1 ?
                              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                                Agotado (0)
                              </span>
                              :
                              p.stock < 10 ?
                                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                                  Bajo ({p.stock})
                                </span>
                                :
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Stock {p.stock}
                                </span>
                          }
                        </div>
                        <div className="flex items-center text-sm">
                          <svg
                            className="w-4 h-4 text-yellow-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-medium">{p.rating}</span>
                          <span className="text-gray-500 ml-1">/5</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(p.created_at).toLocaleString("es-ES", { dateStyle: "short" })}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`${p.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded text-xs">
                          Editar
                        </Link>
                        <button
                          onClick={() => { setShowModal(true); setId(p.id) }}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">5</span> de{" "}
            <span className="font-medium">5</span> productos
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Anterior
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded bg-blue-50 text-blue-600 border-blue-200">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex">
          <svg
            className="w-5 h-5 text-blue-600 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm text-blue-800">
              <strong>Consejo:</strong> Los productos con stock bajo se muestran
              en amarillo. Considera reponer stock cuando queden menos de 5
              unidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};