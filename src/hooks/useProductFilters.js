import { useState } from "react"
import { initialProducts } from "../mocks/mocks"

export const useProductFilters = () => {
    const iProducts = initialProducts
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [order, setOrder] = useState("newest")

    let products = iProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || search == "")
    products = products.filter(p => category == "all" || p.category_name.includes(category))
    switch (order) {
        case "name":
            products.sort((a, b) => a.name.localeCompare(b.name))
            break
        case "price":
            products.sort((a, b) => a.price - b.price)
            break
        case "newest":
            products.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            break
        case "rating":
            products.sort((a, b) => (a.rating - b.rating) * (-1))
            break
    }


    return { products, setSearch, setCategory, search, category, setOrder, order }
}