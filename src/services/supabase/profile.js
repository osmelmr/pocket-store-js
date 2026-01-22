import { supabase } from '../../supabase/client'

// Obtener el perfil del usuario autenticado
export async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single() // gracias a RLS, solo devuelve el perfil del usuario

    if (error) throw error
    return data
}

// Actualizar el perfil del usuario autenticado
export async function updateProfile(updates) {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .select()
        .single()

    if (error) throw error
    return data
}
