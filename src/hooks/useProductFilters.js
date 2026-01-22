import { useState } from "react"

export const useProductFilters = (data) => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [order, setOrder] = useState("newest")

    let products = data || []

    if (search) {
        products = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    if (category && category !== "all") {
        products = products.filter(p =>
            p.category.includes(category)
        )
    }

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
