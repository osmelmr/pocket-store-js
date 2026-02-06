import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router";
import { useToast } from "../../zustand/useToast";
import {
  ArrowLeftIcon,
  PlusIcon,
  PhotoIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

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
    .number({ invalid_type_error: "El precio debe ser un número" })
    .min(0, "El precio no puede ser negativo"),
  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .min(0, "El stock no puede ser negativo"),
  image: z.any().optional(),
});

export const ProductCreate = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const { mutateAsync } = useCreateProduct();

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      price: 0,
      stock: 0,
      description: "",
      name: "",
    }
  });

  const descriptionValue = watch("description") || "";

  const onSubmit = async (data) => {
    // Lógica de imagen temporalmente deshabilitada como en tu código original
    const payload = { ...data };
    if (payload.image) delete payload.image;

    try {
      await mutateAsync(payload);
      showToast('Producto creado con éxito', 'success');
      reset();
      navigate('/admin/products');
    } catch (error) {
      showToast(`Error al crear el producto`, error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-blue-600 mb-2 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Volver a productos
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Nuevo Producto
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Ingresa los detalles técnicos y comerciales del nuevo artículo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna Principal: Datos */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-6 flex items-center">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full mr-3"></span>
              Información General
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  placeholder="Ej: Auriculares Sony XM5"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    Categoría *
                  </label>
                  <select
                    {...register("category")}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.category ? 'border-red-400' : 'border-gray-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none`}
                  >
                    <option value="">Seleccionar...</option>
                    {categories?.map(c => (
                      <option key={c.id} value={`${c.id}`}>{c.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-xs text-red-500 font-medium">{errors.category.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      Precio ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      {...register("stock", { valueAsNumber: true })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Descripción
                </label>
                <textarea
                  {...register("description")}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Escribe una descripción convincente..."
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-400">{descriptionValue.length} / 2000 caracteres</p>
                  {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Columna Lateral: Imagen y Acción */}
        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-4 flex items-center">
              Multimedia
            </h2>
            <div className="group relative border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <PhotoIcon className="mx-auto h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <p className="mt-2 text-sm font-medium text-gray-600 dark:text-slate-400">Subir imagen</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">JPG, PNG hasta 5MB</p>
            </div>
          </section>

          <section className="bg-blue-600 p-1 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[calc(1rem-1px)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? 'Guardando...' : (
                <>
                  <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                  Publicar Producto
                </>
              )}
            </button>
          </section>

          <div className="p-4 bg-amber-50 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-xl">
            <div className="flex gap-3">
              <InformationCircleIcon className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 dark:text-slate-400 leading-relaxed font-medium">
                Los campos marcados con (*) son obligatorios para poder dar de alta el producto en el inventario.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};