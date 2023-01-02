export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: number
          created_at: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
        }
      }
      chats_users: {
        Row: {
          chat_id: number
          user_id: string
          created_at: string | null
        }
        Insert: {
          chat_id: number
          user_id: string
          created_at?: string | null
        }
        Update: {
          chat_id?: number
          user_id?: string
          created_at?: string | null
        }
      }
      messages: {
        Row: {
          id: number
          created_at: string | null
          chat_id: number
          author_id: string
          content: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          chat_id: number
          author_id: string
          content: string
        }
        Update: {
          id?: number
          created_at?: string | null
          chat_id?: number
          author_id?: string
          content?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string | null
          email: string
        }
        Insert: {
          id: string
          created_at?: string | null
          email: string
        }
        Update: {
          id?: string
          created_at?: string | null
          email?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
