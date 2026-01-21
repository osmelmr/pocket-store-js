import { useState, useMemo } from "react"
import { initialProducts } from "../mocks/mocks"
import { useProducts } from "./useProducts"

export const useProductFilters = () => {
    const { data } = useProducts()
    const [iProducts, setIProducts] = useState(data || initialProducts)
    const mocks = !data

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [order, setOrder] = useState("newest")

    const products = useMemo(() => {
        let filtered = iProducts

        if (search) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (category && category !== "all") {
            filtered = filtered.filter(p =>
                p.category_name.includes(category)
            )
        }

        switch (order) {
            case "name":
                filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
                break
            case "price":
                filtered = [...filtered].sort((a, b) => a.price - b.price)
                break
            case "newest":
                filtered = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                break
            case "rating":
                filtered = [...filtered].sort((a, b) => b.rating - a.rating)
                break
        }

        return filtered
    }, [search, category, order, iProducts])

    return { products, setSearch, setCategory, search, category, setOrder, order, mocks, setIProducts }
}
