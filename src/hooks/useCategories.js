import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryServices } from "../services/categoryServices";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryServices.getCategories
    })
}

export const useCategory = (id) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => categoryServices.getCategory(id)
    })
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload) => categoryServices.createCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }) => categoryServices.updateCategory(id, payload),
        onSuccess: (_, params) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.invalidateQueries({ queryKey: ["categories", params.id] })
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => categoryServices.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}


