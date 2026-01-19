import { useState } from "react"
import { useProducts } from "./useProducts"

export const useProductFilters = () => {
    const { data } = useProducts()
    const iProducts = data || []

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [order, setOrder] = useState("newest")

    let products = iProducts.filter(p =>
        search === "" || p.name.toLowerCase().includes(search.toLowerCase())
    )

    products = products.filter(p =>
        category === "" || category === "all" || p.category_name.includes(category)
    )

    switch (order) {
        case "name":
            products = [...products].sort((a, b) => a.name.localeCompare(b.name))
            break
        case "price":
            products = [...products].sort((a, b) => a.price - b.price)
            break
        case "newest":
            products = [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            break
        case "rating":
            products = [...products].sort((a, b) => b.rating - a.rating)
            break
    }

    return { products, setSearch, setCategory, search, category, setOrder, order }
}
