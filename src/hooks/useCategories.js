import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { categoryServices } from "../services/categoryServices";
import { getCategories, getAllCategories, getCategory, updateCategory, deleteCategory, createCategory } from "../services/supabase/categories"
import { useAuthContext } from "./useAuth";

export const useCategories = () => {
    const { user } = useAuthContext()
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(user.id)
    })
}

export const useAllCategories = () => {
    return useQuery({
        queryKey: ["allCategories"],
        queryFn: getAllCategories
    })
}

export const useCategory = (id) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => getCategory(id)
    })
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload) => createCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }) => updateCategory(id, payload),
        onSuccess: (_, params) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.invalidateQueries({ queryKey: ["categories", params.id] })
        }
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
}


