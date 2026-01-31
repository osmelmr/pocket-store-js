import { StoreHeader } from "../components/StoreHeader"
import { StoreFooter } from "../components/StoreFooter"
import { Outlet } from "react-router"
import { StoreSidebar } from "../components/StoreSidebar"
import { useSidebar } from "../zustand/useSidebar"
import { HeaderFilters } from "../components/HeaderFilters"
import { useVisibleFilters } from "../zustand/useVisibleFilers"

export const StoreLayout = () => {

    const isMenuOpen = useSidebar(state => state.isSidebarOpen)
    const closeSidebar = useSidebar(state => state.closeSidebar)
    const isFiltersVisible = useVisibleFilters(state => state.isFiltersVisible)
    return (
        <>
            <StoreHeader />

            <div className="relative">
                <HeaderFilters isFiltersVisible={isFiltersVisible} />
            </div>

            <StoreSidebar isOpen={isMenuOpen} onClose={closeSidebar} />
            <Outlet />
            <StoreFooter />
        </>
    )
}

export default StoreLayout