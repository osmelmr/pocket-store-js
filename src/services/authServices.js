const URL = "http://localhost:8000/api/v1/auth/"

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

const me = () => {
    const token = localStorage.getItem("access")
    return request({
        url: URL + "me", options: {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    })
}

const login = ({ email, password }) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    }
    return request({ url: URL, options: options })
}

export const authServices = {
    me,
    login
}