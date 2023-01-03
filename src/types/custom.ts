import type { Database } from "./supabase";

export type chats = Database['public']['Tables']['chats']['Row'];
export type chats_users = Database['public']['Tables']['chats_users']['Row'];

export type chat_with_users = (chats & { users: chats_users[] | chats_users});
export type chat_with_users_email = (chats & 
    { users: 
    {
        user: { email: string }[] | { email: string }
    }[]
    |{ 
        user: { email: string }[] | { email: string } 
    }
})

export type message = Database['public']['Tables']['messages']['Row'];