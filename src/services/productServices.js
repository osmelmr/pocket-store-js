const URL = "http://localhost:8000/api/v1/pocket-store/products/"

const request = async ({ url, options }) => {
    try {
        const res = await fetch(url, options)

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`)
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error("Request failed:", error)
        return null
    }
}

const getProducts = () => {
    return request({ url: URL })
}

const getProduct = (id) => {
    return request({ url: `${URL}/${id}` })
}

const createProduct = (payload) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return request({ url: URL, options: options })
}

const updateProduct = (id, payload) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return request({ url: `${URL}/${id}`, options })
}

const deleteProduct = (id) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return request({ url: `${URL}/${id}`, options })
}

export const productServices = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}