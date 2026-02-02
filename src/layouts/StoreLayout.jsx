import { StoreHeader } from "../components/store/StoreHeader"
import { StoreFooter } from "../components/store/StoreFooter"
import { Outlet } from "react-router"
import { StoreSidebar } from "../components/store/StoreSidebar"
import { useSidebar } from "../zustand/useSidebar"
import { HeaderFilters } from "../components/store/HeaderFilters"
import { useVisibleFilters } from "../zustand/useVisibleFilers"

export const StoreLayout = () => {

    const isMenuOpen = useSidebar(state => state.isSidebarOpen)
    const closeSidebar = useSidebar(state => state.closeSidebar)
    const isFiltersVisible = useVisibleFilters(state => state.isFiltersVisible)
    return (
        <>
            <StoreHeader />

            <div className="relative sm:mb-25 mb-50">
                <HeaderFilters isFiltersVisible={isFiltersVisible} />
            </div>

            <StoreSidebar isOpen={isMenuOpen} onClose={closeSidebar} />
            <Outlet />
            <StoreFooter />
        </>
    )
}

export default StoreLayout