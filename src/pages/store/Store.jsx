import { useProductFilters } from "../../hooks/useProductFilters";
import { StoreProductList } from '../../components/store/StoreProductList';
import { StoreHeader } from '../../components/store/StoreHeader';
import { StoreFooter } from '../../components/store/StoreFooter';
import { CategoryFilter } from "../../components/CategoryFilter";
import { OrderFilter } from "../../components/OrderFilter";
import { useAllProducts } from "../../hooks/useProducts"

export const Store = () => {

  const { data, error, isLoading } = useAllProducts()
  const productsFilters = useProductFilters(data)

  if (error) {
    return <div>Error</div>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <StoreHeader productsFilters={productsFilters} />

      {/* Filtros */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Filtrar por:</span>
              <CategoryFilter productsFilters={productsFilters} />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Ordenar por:</span>
              <OrderFilter productsFilters={productsFilters} />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreProductList products={productsFilters.products} isLoading={isLoading} />
      </main>

      {/* Footer */}
      <StoreFooter />
    </div>
  );
}