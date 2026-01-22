// import { productServices } from "../services/productServices";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProducts, getProduct, updateProduct, deleteProduct, createProduct } from "../services/supabase/products"

// 🔹 Listar productos
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
};

// 🔹 Obtener un producto por id
export const useProduct = (id) => {
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
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
