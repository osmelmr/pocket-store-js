import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";

export const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        // Mantenemos el bg-gray-100 original pero añadimos el soporte dark
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors">
            <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Mantenemos tu lógica de sm:mr-64 exacta */}
            <div className={`${isSidebarOpen && "sm:mr-64"} h-full transition-all duration-300`}>

                {/* Page Content */}
                <main className="">
                    <Outlet />
                </main>

                {/* Sidebar Desktop */}
                <div className="hidden sm:block">
                    <AdminSidebar isSidebarOpen={isSidebarOpen} />
                </div>

                {/* Sidebar Mobile */}
                <div className="sm:hidden">
                    <AdminSidebar isSidebarOpen={!isSidebarOpen} />
                </div>
            </div>
        </div>
    );
};