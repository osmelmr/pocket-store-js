import { useEffect } from "react"
import { useAllProducts } from "../hooks/useProducts"
import { useUiProducts } from "../zustand/productsStore"
import { useCart } from "../zustand/useCart"
import { useProductFilters } from "../hooks/useProductFilters"
import { ProductCart } from "./ProductCart"

export const StoreProductList = () => {
    const { quantityP, lessFromCart, addToCart } = useCart()
    const setProducts = useUiProducts(state => state.setProducts)
    const { data, isLoading } = useAllProducts()

    useEffect(() => {
        if (data) setProducts(data)

    }, [data, setProducts])

    const { newProducts: products } = useProductFilters()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
        )
    }

    return (
        <div className="px-4 md:px-8 lg:px-16 transition-colors duration-300">
            {/* Info */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Nuestros Productos
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    12 productos disponibles
                </p>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products && products.map(p => (
                    <ProductCart
                        key={p.id}
                        product={p}
                        quantityP={quantityP}
                        addToCart={addToCart}
                        lessFromCart={lessFromCart}
                    />
                ))}
            </div>
        </div>
    )
}