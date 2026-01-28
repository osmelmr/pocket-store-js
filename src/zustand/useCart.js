import { create } from "zustand"
import { useUiProducts } from "./productsStore"

export const useCart = create((set, get) => (
    {
        cart: [],
        addToCart: (id) => set(state => {
            console.log(id)
            const currentQuant = useUiProducts.getState().howMany(id)
            if (currentQuant === 0) return { cart: state.cart }

            const exist = state.cart.find(c => c.id === id)

            let newCart = []
            if (exist) {
                newCart = state.cart.map(p => {
                    if (p.id === id) {
                        console.log(currentQuant)
                        if (currentQuant === 0) {
                            return p
                        }
                        return { ...p, quantity: (p.quantity + 1) }
                    }
                    return p
                })
            } else {
                newCart = [...state.cart, { id: id, quantity: 1 }]
            }
            useUiProducts.getState().lessStockByOne(id)
            return { cart: newCart }

        }),
        lessFromCart: (id) => set(state => {
            let newCart
            const item = state.cart.find(p => p.id == id)
            if (!item) {
                return { cart: state.cart }
            }
            const quantity = item.quantity
            if (quantity > 0) {
                newCart = state.cart.map(p => {
                    if (p.id == id) {
                        useUiProducts.getState().addStockByOne(id)
                        return { ...p, quantity: quantity - 1 }
                    }
                    return p
                })
            } else {
                newCart = state.cart.filter(p => p.id != id)
            }
            return { cart: newCart }
        }),
        quantityP: (id) => {
            return get().cart.find(p => p.id == id)?.quantity ?? 0
        },
        allStock: () => {
            let total = 0
            get().cart.forEach(p =>
                total += p.quantity
            )
            return total
        }

    }
))