import { create } from "zustand";

export const useUiProducts = create((set, get) => ({
    products: [],
    setProducts: (newProducts) => set({ products: newProducts }),
    howMany: (id) => {
        const item = get().products.find(p => p.id == id)
        if (!item) return 0
        return item.stock
    },

    addCategories: (categories) => {
        set(state => {
            const enriched = state.products.map(p => {
                const cat = categories.find(c => c.id === p.category)
                return { ...p, category_name: cat ? cat.name : "Sin categoría" }
            })
            return { products: enriched }
        })
    },

    lessStockByOne: (id) => {
        const item = get().products.find(p => p.id == id)
        if (!item.stock || item.stock === 0) {
            console.log("item stock", item.stock)
            return 0
        }
        set(state => {
            const newProducts = state.products.map(p => {
                if (p.id === id) {
                    console.log(p.stock - 1)
                    return { ...p, stock: (p.stock - 1) }
                }
                return p
            })
            return { products: newProducts }
        })

    },
    addStockByOne: (id) => {
        const item = get().products.find(p => p.id == id)
        if (!item) {
            return 0
        }
        set(state => {
            const newProducts = state.products.map(p => {
                if (p.id === id) {
                    return { ...p, stock: (p.stock + 1) }
                }
                return p
            })
            return { products: newProducts }
        })

    }
}))

export const useFilters = create((set) => ({
    search: "",
    category: "",
    order: "",
    setSearch: (newSearch) => set({ search: newSearch }),
    setCategory: (newCategory) => set({ category: newCategory }),
    setOrder: (newOrder) => set({ order: newOrder })
}))