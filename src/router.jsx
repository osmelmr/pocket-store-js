import { createBrowserRouter } from "react-router"
import { Login } from "./pages/Login.jsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx";
import { ProductList } from "./pages/admin/ProductList.jsx"
import { ProductCreate } from "./pages/admin/ProductCreate.jsx"
import { ProductEdit } from "./pages/admin/ProductEdit.jsx"
import { AdminLayout } from "./layouts/AdminLayout.jsx"
import { Tests } from "./pages/Tests.jsx"
import { StoreLayout } from "./layouts/StoreLayout.jsx"
import { StoreProductList } from "./components/store/StoreProductList.jsx";
import { CartPage } from "./pages/store/CartPage.jsx";
import { Register } from "./pages/Register.jsx";
import { Protector } from "./components/Protector.jsx"

export const router = createBrowserRouter([
    {
        path: "",
        element: <StoreLayout />,
        children: [
            {
                path: "",
                element: <StoreProductList />,
            },
            {
                path: "cart",
                element: <CartPage />,
            }
        ]
    },
    {
        path: "tests",
        element: <Tests />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "",
        element: <Protector />,
        children:
            [{
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "",
                        element: <AdminDashboard />,
                    },
                    {
                        path: "products",
                        element: <ProductList />,
                    },
                    {
                        path: "products/create",
                        element: <ProductCreate />,
                    },
                    {
                        path: "products/:id/edit",
                        element: <ProductEdit />,
                    },
                ],
            },]
    }
]);
