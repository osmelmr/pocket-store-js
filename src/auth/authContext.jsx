import { useEffect, useState } from "react"
// import { authServices } from "../services/authServices"
import { signIn, signOut, signUp } from "../services/supabase/auth"
// import { getProfile } from "../services/supabase/profile"
import { AuthContext } from "./context"
import { isAuth as isAuthService } from "../services/supabase/auth"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const initUser = async () => {
            try {
                const us = localStorage.getItem("user")
                if (us) {
                    setUser(JSON.parse(us));
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.log(error)
                setUser(null)
            }
        }
        initUser()
    }, [])

    const login = async ({ password, email }) => {
        try {
            const data = await signIn({ password, email })
            console.log(data.user)
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
        } catch (error) {
            console.log(error)
            throw new Error(error)

        }
    }
    const register = async ({ password, email, options }) => {
        try {
            const data = await signUp(email, password, options)
            if (data?.user) {
                const loginData = await signIn({ email, password })

                setUser(loginData.user)
                localStorage.setItem("user", JSON.stringify(loginData.user))
            }

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const logOut = async () => {
        try {
            await signOut()
            localStorage.removeItem("user")
            setUser(null)
        } catch {
            localStorage.removeItem("user")
            setUser(null)
        }

    }

    const isAuth = async () => {
        const auth = await isAuthService()
        if (!auth) {
            setUser(null)
            localStorage.removeItem("user")
            return false
        }
        console.log(auth)
        setUser(auth.user)
        localStorage.setItem("user", JSON.stringify(auth.user))
        return true
    }

    return (
        <AuthContext.Provider value={{ user, login, logOut, register, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

