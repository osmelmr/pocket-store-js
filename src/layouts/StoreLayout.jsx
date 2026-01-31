import { StoreHeader } from "../components/StoreHeader"
import { StoreFooter } from "../components/StoreFooter"
import { Outlet } from "react-router"
import { StoreSidebar } from "../components/StoreSidebar"
import { useSidebar } from "../zustand/useSidebar"

export const StoreLayout = () => {

    const isMenuOpen = useSidebar(state => state.isSidebarOpen)
    const closeSidebar = useSidebar(state => state.closeSidebar)
    return (
        <>
            <StoreHeader />
            <StoreSidebar isOpen={isMenuOpen} onClose={closeSidebar} />
            <Outlet />
            <StoreFooter />
        </>
    )
}

export default StoreLayout