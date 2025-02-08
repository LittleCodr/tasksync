export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          due_date: string | null
          priority: 'High' | 'Medium' | 'Low'
          status: 'To Do' | 'In Progress' | 'Completed'
          category: string | null
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          due_date?: string | null
          priority?: 'High' | 'Medium' | 'Low'
          status?: 'To Do' | 'In Progress' | 'Completed'
          category?: string | null
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          priority?: 'High' | 'Medium' | 'Low'
          status?: 'To Do' | 'In Progress' | 'Completed'
          category?: string | null
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      task_analytics: {
        Row: {
          id: string
          user_id: string
          task_id: string
          completion_time: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          task_id: string
          completion_time?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          task_id?: string
          completion_time?: string | null
          created_at?: string
        }
      }
    }
  }
}