import { useProductFilters } from "../hooks/useProductFilters";
import { Filters } from '../components/Filters';
import { StoreProductList } from '../components/StoreProductList';
import { StoreHeader } from '../components/StoreHeader';
import { StoreFooter } from '../components/StoreFooter';

export const Store = () => {
  const productsFilters = useProductFilters()

  const changesearch = (e) => {
    productsFilters.setSearch(e.target.value.toLowerCase());
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <StoreHeader changesearch={changesearch} search={productsFilters.search} />

      {/* Filtros */}
      <Filters productsFilters={productsFilters} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreProductList products={productsFilters.products} />
      </main>

      {/* Footer */}
      <StoreFooter />
    </div>
  );
}