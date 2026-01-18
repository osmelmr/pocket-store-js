import { productServices } from "../services/productServices";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productServices.getProducts
    }
    )
}

export const useProduct = (id) => {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => productServices.getProduct(id)
    }
    )
}

export const useCreateProduct = (payload) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => () => productServices.createProduct(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

export const useUpdateProduct = (id, payload) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => () => productServices.updateProduct(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["product", id] })
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => productServices.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};