import { useEffect, useState } from "react"
import { authServices } from "../services/authServices"
import { AuthContext } from "./context"


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const initUser = async () => {
            const access = localStorage.getItem("access")
            if (access) {
                try {
                    const user = await authServices.me()
                    console.log(user)
                    setUser(user)
                } catch (error) {
                    setUser(null)
                    console.log(error)
                }
            } else {
                setUser(null)
            }
        }
        initUser()
    }, [])
    const login = async ({ password, email }) => {
        try {
            const tokens = await authServices.login({ email, password })
            if (tokens?.access) {
                localStorage.setItem("access", tokens.access)
                localStorage.setItem("refresh", tokens.refresh)
                try {
                    const user = await authServices.me()
                    setUser(user)
                } catch (error) {
                    console.log(error)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    const logOut = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

