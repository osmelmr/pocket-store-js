import { Outlet } from "react-router"
import { useAuthContext } from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { Navigate } from "react-router"

export const Protector = () => {
    const { isAuth } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const verific = async () => {
            const authent = await isAuth()
            setIsAuthenticated(authent)
            setLoading(false)
            console.log("Usuario autenticado: ", authent)
        }
        verific()
    }, [])

    if (loading) {
        return <div>Cargando...</div>
    }
    if (!isAuthenticated) { return <Navigate to="/login" replace /> }

    return (
        <>
            <Outlet />
        </>
    )
}