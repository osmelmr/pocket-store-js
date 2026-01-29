import { create } from "zustand"
import { useUiProducts } from "./productsStore"

export const useCart = create((set, get) => ({
    cart: [],

    addToCart: (id) => set(state => {
        const currentStock = useUiProducts.getState().howMany(id)
        if (currentStock === 0) return { cart: state.cart }

        const exist = state.cart.find(c => c.id === id)
        let newCart

        if (exist) {
            newCart = state.cart.map(p =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            )
        } else {
            const product = useUiProducts.getState().products.find(p => p.id === id)
            newCart = [...state.cart, { ...product, quantity: 1 }]
        }

        useUiProducts.getState().lessStockByOne(id)
        return { cart: newCart }
    }),

    lessFromCart: (id) => set(state => {
        const item = state.cart.find(p => p.id === id)
        if (!item) return { cart: state.cart }

        let newCart
        if (item.quantity > 1) {
            // Si hay más de 1, restamos uno
            newCart = state.cart.map(p =>
                p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
        } else {
            // Si la cantidad es 1 y restamos, lo eliminamos del carrito
            newCart = state.cart.filter(p => p.id !== id)
        }

        useUiProducts.getState().addStockByOne(id)
        return { cart: newCart }
    }),

    // Útil para el botón de la "X" o el basurero en la CartPage
    removeFromCart: (id) => set(state => {
        const item = state.cart.find(p => p.id === id)
        if (!item) return { cart: state.cart }

        // Devolvemos todo el stock al almacén antes de borrar
        const quantityToReturn = item.quantity
        for (let i = 0; i < quantityToReturn; i++) {
            useUiProducts.getState().addStockByOne(id)
        }

        return { cart: state.cart.filter(p => p.id !== id) }
    }),

    quantityP: (id) => {
        return get().cart.find(p => p.id === id)?.quantity ?? 0
    },

    allStock: () => {
        return get().cart.reduce((total, p) => total + p.quantity, 0)
    },

    // Esta función la necesita la CartPage para mostrar el resumen
    getTotalPrice: () => {
        return get().cart.reduce((total, p) => total + (p.price * p.quantity), 0).toFixed(2)
    }
}))