import { StoreHeader } from "../components/StoreHeader"
import { StoreFooter } from "../components/StoreFooter"
import { Outlet } from "react-router"

export const StoreLayout = () => {

    return (
        <>
            <StoreHeader />
            <Outlet />
            <StoreFooter />
        </>
    )
}

export default StoreLayout