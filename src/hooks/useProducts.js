// import { productServices } from "../services/productServices";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProducts, getProduct, updateProduct, deleteProduct, createProduct, getAllProducts } from "../services/supabase/products"
import { useAuthContext } from "./useAuth";
import { useToast } from "../zustand/useToast";

// 🔹 Listar productos
export const useProducts = () => {
    const { user } = useAuthContext()
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts(user.id),
    });
};

// productos del admin tambien
export const useAllProducts = () => {

    return useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
};

// 🔹 Obtener un producto por id
export const useProduct = (id) => {
    console.log(id)
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id),
        enabled: !!id, // evita ejecutar si id es null/undefined
    });
};

// 🔹 Crear producto
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => createProduct(payload),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });
};

// 🔹 Actualizar producto
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateProduct(id, payload),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
        },
    });
};

// 🔹 Eliminar producto
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};
