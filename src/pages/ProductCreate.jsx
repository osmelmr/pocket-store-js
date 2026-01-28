import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router";
import { useToast } from "../zustand/useToast";

const schema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  category: z
    .string()
    .min(1, "Debes seleccionar una categoría"),

  description: z
    .string()
    .max(2000, "La descripción no puede superar los 2000 caracteres")
    .optional(),

  price: z
    .number("El precio debe ser un número")
    .min(0, "El precio no puede ser negativo"),

  stock: z
    .number("El stock debe ser un número")
    .min(0, "El stock no puede ser negativo"),

  image: z
    .any()
    .optional(), // la imagen es opcional
});

export const ProductCreate = () => {
  const { showToast } = useToast()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      price: "",
      stock: "",
      description: "",
      name: "",
      image: []
    }
  })
  const { data } = useCategories()

  const { mutateAsync } = useCreateProduct()

  const onSubmit = async (data) => {
    if (data.image.length >= 0) {
      console.log("alojamiento de imagen no soportado aun")
      delete data.image
    }
    // console.log("Datos validos del producto antes del fetch:", data)

    try {
      const res = await mutateAsync(data)
      console.log(res)
      showToast('Producto creado con éxito', 'success')
      reset()
      navigate('/admin/products')
    } catch (error) {
      showToast(`Error al crear el producto`)
      console.log(error)
    }

  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Crear Nuevo Producto
        </h1>
        <p className="text-gray-600 mt-1">
          Completa el formulario para agregar un nuevo producto a tu tienda
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
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
                {...register("name")}
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Ej: Laptop Gamer Pro"
              />
              {errors.name && <p className="text-red-400">{errors.name.message}</p>}
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
                {...register("category")}
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Selecciona una categoría</option>

                {data && data.map(c => <option key={c.id} value={`${c.id}`}>{c.name}</option>)}

              </select>
              {errors.category && <p className="text-red-400">{errors.category.message}</p>}
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
              {...register("description")}
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Describe tu producto en detalle..."
            />
            <p className="mt-1 text-sm text-gray-500">0/2000 caracteres</p>
            {errors.description && <p className="text-red-400">{errors.description.message}</p>}
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
                  {...register("price", { valueAsNumber: true })}
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-400">{errors.price.message}</p>}
              </div>
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Inicial *
              </label>
              <input
                type="number"
                {...register("stock", { valueAsNumber: true })}
                id="stock"
                name="stock"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="0"
              />
              {errors.stock && <p className="text-red-400">{errors.stock.message}</p>}
              <p className="mt-1 text-sm text-gray-500">
                Número de unidades disponibles
              </p>
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
                Subir Imagen
              </label>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.image && <p className="text-red-400">{errors.image.message}</p>}
              <p className="mt-1 text-sm text-gray-500">
                Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB
              </p>
            </div>

            {/* Placeholder sin imagen */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Sube una imagen para tu producto
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF hasta 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            onClick={() => navigate(-1)}
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Crear Producto
          </button>
        </div>
      </form>

      {/* Información de ayuda */}
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
            <p className="text-sm text-blue-800 font-medium mb-1">
              Consejos para crear productos exitosos:
            </p>
            <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
              <li>Usa nombres descriptivos y claros</li>
              <li>Sube imágenes de alta calidad y bien iluminadas</li>
              <li>
                Describe bien las características y beneficios del producto
              </li>
              <li>Verifica que el precio sea competitivo</li>
              <li>Actualiza el stock regularmente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};