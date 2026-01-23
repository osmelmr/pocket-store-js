import { supabase } from './client'

// Obtener todos los productos
export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
    if (data) console.log(data)
    if (error) throw error
    return data
}

// Obtener todos los productos del usuario autenticado
export async function getProducts(userId) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('owner', userId);
    if (data) console.log(data)
    if (error) throw error
    return data
}

// Pedir un producto
export async function getProduct(productId) {
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq("id", productId)
        .single()

    if (error) { console.log(error); throw error }
    return data
}


// Crear un producto
export async function createProduct(product) {
    const { data, error } = await supabase
        .from('products')
        .insert([product]) // el owner lo valida RLS con auth.uid()
        .select()
        .single()

    if (error) throw error
    return data
}

// Actualizar un producto
export async function updateProduct(productId, updates) {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .select()
        .single()

    if (error) throw error
    return data
}

// Eliminar un producto
export async function deleteProduct(productId) {
    console.log(productId)
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
    if (error) { console.log(error); throw error }
    console.log("algo")
}
