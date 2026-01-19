const URL = "http://localhost:8000/api/v1/pocket-store/categories/"

const request = async ({ url, options }) => {
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`)
        }
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCategories = async () => {
    const token = localStorage.getItem("access")
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await request({ url: URL, options })
}

const getCategory = async (id) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await request({ url: URL + `${id}/`, options })
}

const createCategory = async (payload) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return await request({ url: URL, options })
}

const updateCategory = async (id, payload) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    return await request({ url: URL + `${id}/`, options })
}

const deleteCategory = async (id) => {
    const token = localStorage.getItem("access")
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await request({ url: URL + `${id}/`, options })
}

export const categoryServices = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}