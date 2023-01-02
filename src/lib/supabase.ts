import { createClient } from '@supabase/supabase-js'
import { writable } from 'svelte/store'
import type { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const currentUser = writable((await supabase.auth.getUser()).data.user)

supabase.auth.onAuthStateChange(async () => {
        currentUser.set((await supabase.auth.getUser()).data.user)
    }
)