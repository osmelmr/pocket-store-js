import { create } from "zustand"

export const useCart = create((set, get) => (
    {
        cart: [],
        addToCart: (id) => set(state => {
            const exist = state.cart.find(c => c.id == id)
            console.log(exist)
            let newCart = []
            if (exist) {
                newCart = state.cart.map(p => {
                    if (p.id == id) {
                        return { ...p, quantity: (p.quantity + 1) }
                    }
                    return p
                })
            } else {
                newCart = [...state.cart, { id: id, quantity: 1 }]
            }
            return { cart: newCart }

        }),
        lessFromCart: (id) => set(state => {
            let newCart
            const item = state.cart.find(p => p.id == id)
            if (!item) {
                return { cart: state.cart }
            }
            const quantity = item.quantity
            if (quantity > 1) {
                newCart = state.cart.map(p => {
                    if (p.id == id) {
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