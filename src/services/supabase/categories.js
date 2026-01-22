import { supabase } from '../../supabase/client'

// Obtener todas las categorías del usuario autenticado
export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')

    if (error) throw error
    return data
}

// Crear una categoría
export async function createCategory(category) {
    const { data, error } = await supabase
        .from('categories')
        .insert([category]) // el owner lo valida RLS con auth.uid()
        .select()
        .single()

    if (error) throw error
    return data
}

// Actualizar una categoría
export async function updateCategory(categoryId, updates) {
    const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', categoryId)
        .select()
        .single()

    if (error) throw error
    return data
}

// Pedir una categoría
export async function getCategory(categoryId) {
    const { data, error } = await supabase
        .from('categories')
        .eq("id", categoryId)
        .select()
        .single()

    if (error) throw error
    return data
}

// Eliminar una categoría
export async function deleteCategory(categoryId) {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

    if (error) throw error
}
