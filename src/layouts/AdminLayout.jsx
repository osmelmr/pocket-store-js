import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";

export const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`min-h-screen bg-gray-100 `}>
            <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className={`${isSidebarOpen && "mr-64"} h-full transition-all duration-300`}>
                {/* Page Content */}
                <main className="">
                    <Outlet />
                </main>
                {/* Sidebar */}
                <AdminSidebar isSidebarOpen={isSidebarOpen} />
            </div>
        </div>
    );
};