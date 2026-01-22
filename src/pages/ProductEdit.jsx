import { useParams } from "react-router";
import { useProduct } from "../hooks/useProducts"
import { useNavigate } from "react-router";

export const ProductEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id)
  const { data, isLoading, error } = useProduct(id)

  const back = () => {
    navigate(-1)
  }

  if (isLoading) return <div>Cargando producto...</div>;
  if (error) return <div>Error al cargar el producto: {error.message}</div>;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header con ID del producto */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Editar Producto
            </h1>
            <p className="text-gray-600 mt-1">
              Actualiza la información del producto
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded mr-2">
                ID: {data ? data.id : id}
              </span>
              {/* <span>Creado: {data.created_at || "10 ene 2024"}</span> */}
            </div>
          </div>
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </button>
        </div>
      </div>

      <form className="bg-white rounded-lg shadow-md p-6">
        {/* Información Básica */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
            Información Básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={data && `${data.name}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={data && `${data.name}`}
              />
            </div>

            {/* Categoría */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                defaultValue={data && `${data.category}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una categoría</option>
                <option value="cat-electro-001">Electrónica</option>
                <option value="cat-audio-001">Audio</option>
                <option value="cat-wear-001">Wearables</option>
                <option value="cat-home-001">Hogar</option>
                <option value="cat-sports-001">Deportes</option>
                <option value="cat-fashion-001">Moda</option>
                <option value="cat-books-001">Libros</option>
                <option value="cat-food-001">Alimentos</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={data && `${data.description}`}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={data && `${data.description}`}
            />
            <p className="mt-1 text-sm text-gray-500">45/2000 caracteres</p>
          </div>
        </div>

        {/* Precio y Stock */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
            Precio y Stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Precio */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio ($) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={data && `${data.price}`}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Actual *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                defaultValue={data && `${data.stock}`}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="mt-1 text-sm text-gray-500">
                Número de unidades disponibles
              </p>
            </div>
          </div>

          {/* Info de rating (solo lectura) */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Valoración Actual
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {data ? data.rating : 0}
                  </span>
                  <span className="ml-1 text-gray-500">/5</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Este valor es calculado automáticamente
                </p>
                <p className="text-xs text-gray-400">
                  Basado en las reseñas de los clientes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen del Producto */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
            Imagen del Producto
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cambiar Imagen (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Si no seleccionas una nueva imagen, se mantendrá la actual.
              </p>
            </div>

            {/* Vista previa de la imagen */}
            <div className="flex items-start space-x-6">
              <div className="relative">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Vista previa:
                </p>
                <img
                  src={data ? data.image : "https://placehold.co/300x300"}
                  alt={data && data.name}
                  className="w-48 h-48 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Nota:</span> Actualmente
                  usando la imagen original del producto.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between pt-6 border-t">
          <div className="flex space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver a la lista
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={back}
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>

      {/* Información de ayuda */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
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
              <p className="text-sm text-blue-800 font-medium mb-1">
                Consejos de actualización:
              </p>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Actualiza el stock después de cada venta</li>
                <li>Revisa los precios regularmente</li>
                <li>Actualiza imágenes para mantener fresco el catálogo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex">
            <svg
              className="w-5 h-5 text-green-600 mr-2 mt-0.5"
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
            <div>
              <p className="text-sm text-green-800 font-medium mb-1">
                Estado del producto:
              </p>
              <div className="text-sm text-green-700">
                {/* <p>• Creado: {data ? data.created_at : "10 ene 2024"}</p> */}
                <p>• Categoría actual: {data ? data.category_name : "Cargando..."}</p>
                <p>• Stock actual: {data ? data.stock : 0} unidades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};