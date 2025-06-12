import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ndlypkyqmsfywtfusrcg.supabase.co"
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbHlwa3lxbXNmeXd0ZnVzcmNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTczNzc0NCwiZXhwIjoyMDY1MzEzNzQ0fQ.BYRVY4l2D3ojNX_KBCWcefh8cVtMEHTZeb0y7mxdxiM"

// Server-side Supabase client (للاستخدام في API routes)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
