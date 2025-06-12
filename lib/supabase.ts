import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ndlypkyqmsfywtfusrcg.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbHlwa3lxbXNmeXd0ZnVzcmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Mzc3NDQsImV4cCI6MjA2NTMxMzc0NH0.EGH4ivznP0MurVF_7fIMczOGL2dyfehNl-x59f8JPMM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: number
  name: string
  price: number
  created_at: string
  updated_at: string
  colors: ProductColor[]
}

export interface ProductColor {
  id: number
  product_id: number
  name: string
  value: string
  image_url: string | null
  created_at: string
}

export interface CreateProductData {
  name: string
  price: number
  colors: {
    name: string
    value: string
    image_url: string
  }[]
}
