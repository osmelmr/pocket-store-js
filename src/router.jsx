import { createBrowserRouter } from "react-router"
import { Store } from "./pages/Store.jsx"
import { Login } from "./pages/Login.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { ProductList } from "./pages/ProductList.jsx"
import { ProductCreate } from "./pages/ProductCreate.jsx"
import { ProductEdit } from "./pages/ProductEdit.jsx"
import { AdminLayout } from "./layouts/AdminLayout.jsx"
import { Tests } from "./pages/Tests.jsx"
import { StoreLayout } from "./layouts/StoreLayout.jsx"
import { StoreProductList } from "./components/StoreProductList.jsx";
import { CartPage } from "./pages/CartPage.jsx";
import { Register } from "./pages/Register.jsx";

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
        path: "store2",
        element: <Store />,
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
    },
]);
