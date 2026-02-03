import { Link } from "react-router";
// import { initialProducts } from "../mocks/mocks";
import { useProductFilters } from "../../hooks/useProductFilters";
import { SearchFilter } from "../../components/SearchFilter";
import { CategoryFilter } from "../../components/CategoryFilter";
import { OrderFilter } from "../../components/OrderFilter";
import { ConfirmModal } from "../../components/admin/ConfirmModal";
import { useEffect, useState } from "react"
import { useProducts, useDeleteProduct } from "../../hooks/useProducts"
import { useToast } from "../../zustand/useToast";
import { useUiProducts } from "../../zustand/productsStore";
import { ProductOptions } from "./ProductOptions";
import { ProductOptionsTable } from "./ProductOptionsTable";

import {
  PlusIcon,
  CubeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  StarIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export const ProductList = () => {
  // const products = initialProducts
  const { data, error, isLoading } = useProducts()

  const { setProducts } = useUiProducts()

  useEffect(() => {
    if (data) {
      console.log(data)
      setProducts(data)
    }
  }, [data])


  const productFilters = useProductFilters()

  const [showModal, setShowModal] = useState(false)
  const { mutateAsync: deleteP } = useDeleteProduct()
  const [id, setId] = useState()
  const { showToast } = useToast()

  const onCancel = () => {
    setShowModal(false)
  }
  const onConfirm = async () => {
    setShowModal(false)
    // productFilters.setIProducts(productFilters.products.filter(p => p.id !== id))
    try {
      await deleteP(id)
      showToast('Producto eliminado con éxito', 'success')
    } catch (error) {
      showToast(`Error al eliminar el producto: ${error.message}`, 'error')
      console.log(error)
    }
  }

  const totalP = productFilters.newProducts.length
  let totalS = 0
  productFilters.newProducts.map(p => totalS = totalS += p.stock)
  const agotados = productFilters.newProducts.filter(p => p.stock < 1)
  const totalA = agotados.length

  const calcPromRate = () => {
    let tot = 0
    productFilters.newProducts.map(p => tot += p.rating)
    return (tot / productFilters.newProducts.length).toFixed(1)
  }

  const ratingP = calcPromRate()

  if (isLoading) {
    return <div>Cargando...</div>
  }
  return (
    <div className="p-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ConfirmModal
        show={showModal}
        message={"¿Desea eliminar este producto?"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white italic uppercase tracking-tight">
            Gestión de Productos
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">
            Administra el inventario de tu tienda
          </p>
        </div>
        <Link
          to="create"
          className="bg-blue-600 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-500 transition-all active:scale-95 flex items-center shadow-lg shadow-blue-200 dark:shadow-none"
        >
          <PlusIcon className="w-5 h-5 mr-2 stroke-[3]" />
          Nuevo Producto
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Productos", val: totalP, icon: CubeIcon, color: "blue" },
          { label: "Stock Total", val: totalS, icon: CheckBadgeIcon, color: "green" },
          { label: "Agotados", val: totalA, icon: ExclamationTriangleIcon, color: "red" },
          { label: "Rating Promedio", val: `${ratingP}/5`, icon: StarIcon, color: "purple" }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center">
              <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/30 p-3 rounded-xl mr-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 dark:text-white leading-none mt-1">
                  {error ? 0 : stat.val}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 mb-8 transition-colors">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-xs font-black text-gray-400 dark:text-slate-500 mb-2 uppercase tracking-widest ml-1">
              Buscar Productos
            </label>
            <SearchFilter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full md:w-56">
              <label className="block text-xs font-black text-gray-400 dark:text-slate-500 mb-2 uppercase tracking-widest ml-1">
                Categoría
              </label>
              <CategoryFilter />
            </div>
            <div className="w-full md:w-56">
              <label className="block text-xs font-black text-gray-400 dark:text-slate-500 mb-2 uppercase tracking-widest ml-1">
                Ordenar por
              </label>
              <OrderFilter />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-2xl text-center text-red-600 dark:text-red-400 font-bold">
          Error al cargar los productos. Por favor, intenta de nuevo.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors shadow-sm">
          {/* Vista Móvil */}
          <div className="sm:hidden grid grid-cols-1 gap-4 p-4">
            {productFilters.newProducts.slice(0, 5).map((p) => (
              <ProductOptions key={p.id} product={p} setShowModal={setShowModal} setId={setId} />
            ))}
          </div>

          {/* Vista Escritorio */}
          <div className="hidden sm:block overflow-x-auto">
            <ProductOptionsTable products={productFilters} setShowModal={setShowModal} setId={setId} />
          </div>

          {/* Pagination Footer */}
          <div className="px-8 py-5 bg-gray-50/50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm font-bold text-gray-500 dark:text-slate-400 italic">
              Mostrando <span className="text-gray-900 dark:text-white">5</span> de{" "}
              <span className="text-gray-900 dark:text-white">5</span> productos
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors text-gray-400">
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-sm font-black border border-blue-200 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
                1
              </button>
              <button className="p-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors text-gray-400">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info adicional */}
      <div className="mt-8 p-5 bg-blue-50 dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-slate-800 transition-colors">
        <div className="flex">
          <InformationCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 shrink-0" />
          <div>
            <p className="text-sm text-blue-900 dark:text-slate-300 leading-relaxed font-medium">
              <strong className="font-black italic uppercase tracking-tighter mr-1 text-blue-600 dark:text-blue-400">Consejo:</strong>
              Los productos con stock bajo se resaltarán automáticamente.
              Mantén un nivel saludable de inventario para no perder ventas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};