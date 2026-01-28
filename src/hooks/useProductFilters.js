import { useMemo } from "react"
import { useFilters, useUiProducts } from "../zustand/productsStore"

const filterCategory = (products, category) => {
    let newProducts = products
    if (category && category !== "all") {
        newProducts = products.filter(p =>
            p.category.includes(category)
        )
    }
    return newProducts
}

const filterSearch = (products, search) => {
    let newProducts = products
    if (search) {
        newProducts = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        )
    }
    return newProducts
}

const filterOrder = (products, order) => {
    let newProducts = products
    switch (order) {
        case "name":
            newProducts = [...products].sort((a, b) => a.name.localeCompare(b.name))
            break
        case "price":
            newProducts = [...products].sort((a, b) => a.price - b.price)
            break
        case "newest":
            newProducts = [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            break
        case "rating":
            newProducts = [...products].sort((a, b) => b.rating - a.rating)
            break
    }
    return newProducts
}


export const useProductFilters = () => {

    const order = useFilters(state => state.order)
    const category = useFilters(state => state.category)
    const search = useFilters(state => state.search)

    const products = useUiProducts(state => state.products)


    const newProducts = useMemo(() => {
        let filtered = []
        filtered = filterCategory(products, category)
        filtered = filterSearch(filtered, search)
        filtered = filterOrder(filtered, order)
        return filtered
    }, [products, order, category, search])

    return { newProducts }
}
