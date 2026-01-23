import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { Toast } from "../components/Toast";

// Esquema de validación
const productSchema = z.object({
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
    .min(0, "El precio no puede ser negativo")
    .transform(val => parseFloat(val.toFixed(2))),

  stock: z
    .number("El stock debe ser un número")
    .min(0, "El stock no puede ser negativo")
    .int("El stock debe ser un número entero"),

  image: z
    .any()
    .optional(),
});

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);

  // Obtener datos existentes
  const { data: product, isLoading, error } = useProduct(id);
  const { data: categories, isLoading: categoriesLoading, error: categoryError } = useCategories();

  // Hook para actualizar producto
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  // Configurar React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
      image: null
    }
  });

  // Rellenar formulario cuando se cargue el producto
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        category: product.category ? String(product.category) : "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        image: product.image || null
      });
    }
  }, [product, reset]);

  // Observar cambios en la categoría seleccionada
  const selectedCategoryId = watch("category");
  const selectedCategory = categories?.find(c => String(c.id) === selectedCategoryId);
  // const selectedCategory = {}
  // const selectedCategoryId = ""
  const back = () => {
    navigate(-1);
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (formData) => {
    setShowToast(true);

    try {
      // Preparar datos para enviar
      const updateData = {
        ...formData,
        id: product.id
      };

      // Si no hay nueva imagen, eliminar la propiedad
      if (!formData.image || formData.image.length === 0) {
        delete updateData.image;
      }

      console.log("Datos a actualizar:", updateData);

      try {// Llamar a la mutación para actualizar
        await updateProduct({ id, payload: updateData });

        // Opcional: Redirigir después de éxito
        navigate("/admin/products");
      } catch (error) {
        console.error("Error al actualizar producto:", error);
      }

    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  // Función para manejar la eliminación del producto
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        // Aquí deberías llamar a tu hook para eliminar el producto
        // await deleteProduct(product.id);
        console.log("Producto eliminado:", product.id);
        navigate("/admin/products");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  if (isLoading || categoriesLoading) return <div>Cargando producto...</div>;
  if (error || categoryError) return <div>Error al cargar el producto: {error?.message || categoryError?.message}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Toast de confirmación */}
      <Toast
        message="Producto actualizado correctamente"
        show={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />

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
                ID: {product?.id || id}
              </span>
              <span className="bg-blue-100 px-2 py-1 rounded text-xs">
                Categoría: {selectedCategory?.name || "No seleccionada"}
              </span>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center"
            type="button"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </button>
        </div>
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
                id="name"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del producto"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Selecciona una categoría</option>
                {categories && categories.map((category) => (
                  <option
                    key={category.id}
                    value={String(category.id)}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {selectedCategoryId ?
                  `Seleccionada: ${selectedCategory?.name || "Categoría no encontrada"}` :
                  "No hay categoría seleccionada"}
              </p>
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
              {...register("description")}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción del producto"
            />
            <div className="flex justify-between items-center">
              <p className="mt-1 text-sm text-gray-500">
                {watch("description")?.length || 0}/2000 caracteres
              </p>
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
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
                  {...register("price", { valueAsNumber: true })}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
              )}
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
                {...register("stock", { valueAsNumber: true })}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-500">{errors.stock.message}</p>
              )}
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= (product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {product?.rating || 0}
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
                id="image"
                {...register("image")}
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
              )}
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
                  src={product?.image || "https://placehold.co/300x300"}
                  alt={product?.name}
                  className="w-48 h-48 object-cover rounded-lg border"
                />
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
              onClick={back}
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
              disabled={!isDirty || isUpdating}
              className={`px-6 py-2 rounded-lg transition-colors flex items-center ${!isDirty || isUpdating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
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
                </>
              )}
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
                {product && (
                  <>
                    <p>• Categoría actual: {selectedCategory?.name || "Sin categoría"}</p>
                    <p>• Stock actual: {product.stock || 0} unidades</p>
                    <p>• Última actualización: {product.updated_at || "N/A"}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};