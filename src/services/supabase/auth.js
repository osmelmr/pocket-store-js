import { supabase } from './client'


export async function signUp(email, password, options = {}) {
    console.log(email, password, options)
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options
    })
    if (error) throw error
    console.log(data)
    return data
}

export async function signIn({ email, password }) {
    console.log(email, password)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (data) { console.log(data); console.log(data.user) }
    if (error) { console.log(error); throw error }
    return data
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}
