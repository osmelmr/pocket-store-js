import { Link } from "react-router"
import { initialProducts } from "../../mocks/mocks";

export const AdminDashboard = () => {

  const sortedP = initialProducts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  console.log(sortedP)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card para Productos */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg
                className="w-8 h-8 text-blue-600"
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
            <h2 className="text-xl font-semibold ml-4">Productos</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Administra todos los productos de tu tienda
          </p>
          <div className="space-y-2">
            <Link to="products" className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Ver Productos
            </Link>
            <Link to="products/create" className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Crear Producto
            </Link>
          </div>
        </div>

        {/* Card para Estadísticas */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold ml-4">Estadísticas</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Visualiza las métricas de tu tienda
          </p>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Productos:</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stock Total:</span>
              <span className="font-semibold">53</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ventas Totales:</span>
              <span className="font-semibold">$2,849.95</span>
            </div>
          </div>
        </div>

        {/* Card para Acciones Rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold ml-4">Acciones Rápidas</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              Ver Tienda Pública
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              Revisar Stock Bajo
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Últimos Productos */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Productos Recientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                sortedP
                  ?
                  sortedP.slice(0, 3).map(
                    (p) =>
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-lg object-cover mr-4"
                              src={p.image ? p.image : "https://placehold.co/300x300"}
                              alt="Laptop Gamer Pro"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {p.name}
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
                          <div className="text-sm font-semibold text-gray-900">
                            ${p.price}
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
                                  {p.stock} unidades
                                </span>


                          }

                        </td>
                      </tr>
                  )
                  :
                  (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-lg object-cover mr-4"
                              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
                              alt="Smartphone Ultra"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Smartphone Ultra
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Electrónica
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            $899.99
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            8 unidades
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-lg object-cover mr-4"
                              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                              alt="Reloj Inteligente"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Reloj Inteligente
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            Wearables
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            $249.99
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            25 unidades
                          </span>
                        </td>
                      </tr>
                    </>
                  )
              }



            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link to="products" className="text-blue-600 hover:text-blue-800 font-medium">
            Ver todos los productos →
          </Link>
        </div>
      </div>

      {/* Información de sistema */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-gray-500 mr-2"
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
          <p className="text-sm text-gray-600">
            <strong>Sistema:</strong> Panel de administración demo. Para uso educativo.
          </p>
        </div>
      </div>
    </div>
  );
};