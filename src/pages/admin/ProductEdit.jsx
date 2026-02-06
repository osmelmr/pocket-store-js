import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useProduct, useUpdateProduct } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useToast } from "../../zustand/useToast";

const productSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(100),
  category: z.string().min(1, "Requerido"),
  description: z.string().max(2000).optional(),
  price: z.number().min(0),
  stock: z.number().min(0).int(),
  image: z.any().optional(),
});

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();

  const { data: product, isLoading, error } = useProduct(id);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const { register, handleSubmit, reset, watch, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

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

  const selectedCategory = categories?.find(c => String(c.id) === watch("category"));
  const back = () => navigate(-1);

  if (isLoading || categoriesLoading) return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
    </div>
  );

  // --- Utility Classes ---
  const cardClass = "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 md:p-8 transition-colors duration-200";
  const labelClass = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1";
  const inputClass = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header: Adaptable Mobile/Desktop */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">Editar Producto</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-mono tracking-tighter">ID: {id}</span>
              <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">{selectedCategory?.name || "Sin Categoría"}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.confirm("¿Eliminar?") && console.log("Delete")}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all font-semibold text-sm active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Eliminar
          </button>
        </header>

        <form onSubmit={handleSubmit(async (d) => { await updateProduct({ id, payload: d }); navigate("/admin/products"); showToast("Actualizado", "success"); })} className="space-y-6">

          {/* Section 1: Basic Info */}
          <section className={cardClass}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Información General</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className={labelClass}>Nombre del Producto</label>
                <input {...register("name")} className={inputClass} placeholder="Ej: Smartphone X" />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Categoría</label>
                <div className="relative">
                  <select {...register("category")} className={`${inputClass} appearance-none`}>
                    <option value="">Seleccionar...</option>
                    {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className={labelClass}>Descripción</label>
                <textarea {...register("description")} rows={3} className={inputClass} placeholder="Breve descripción..." />
              </div>
            </div>
          </section>

          {/* Section 2: Pricing & Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className={`${cardClass} md:col-span-2`}>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span> Ventas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Precio ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className={`${inputClass} pl-8`} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Stock Actual</label>
                  <input type="number" {...register("stock", { valueAsNumber: true })} className={inputClass} />
                </div>
              </div>
            </section>

            {/* Rating Display (Visual Only) */}
            <div className="bg-gray-900 dark:bg-blue-600 rounded-2xl p-6 text-white flex flex-col justify-between overflow-hidden relative">
              <div className="z-10">
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Feedback</p>
                <h3 className="text-4xl font-black mt-2">{product?.rating || 0.0}</h3>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
              </div>
              <svg className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
          </div>

          {/* Section 3: Media Adaptive */}
          <section className={cardClass}>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Imagen del Producto</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-48 aspect-square bg-gray-100 dark:bg-gray-700 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden shrink-0">
                <img src={product?.image || "https://placehold.co/400x400/png"} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="w-full space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Sube una imagen de alta resolución para mejorar las ventas.</p>
                <input type="file" {...register("image")} className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
              </div>
            </div>
          </section>

          {/* Footer Actions: Sticky on Mobile? */}
          <div className="sticky bottom-4 md:static flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={back}
              className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all order-2 sm:order-1 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isDirty || isUpdating}
              className={`w-full sm:flex-1 px-8 py-3 font-bold rounded-xl transition-all order-1 sm:order-2 active:scale-95 flex items-center justify-center gap-2
                ${(!isDirty || isUpdating)
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700'}`}
            >
              {isUpdating ? <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span> : null}
              {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};