import { useEffect, useState } from "react"
// import { authServices } from "../services/authServices"
import { signIn, signOut, signUp } from "../services/supabase/auth"
// import { getProfile } from "../services/supabase/profile"
import { AuthContext } from "./context"


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
    const register = async ({ password, email }) => {
        try {

            const data = signUp({ password, email })
            setUser(data.user)
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = () => {
        localStorage.removeItem("user")
        signOut()
    }

    return (
        <AuthContext.Provider value={{ user, login, logOut, register }}>
            {children}
        </AuthContext.Provider>
    )
}

