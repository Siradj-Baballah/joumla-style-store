import { createClient } from "@supabase/supabase-js"

// استخدام المتغيرات البيئية للاتصال الآمن
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ndlypkyqmsfywtfusrcg.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbHlwa3lxbXNmeXd0ZnVzcmNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTczNzc0NCwiZXhwIjoyMDY1MzEzNzQ0fQ.BYRVY4l2D3ojNX_KBCWcefh8cVtMEHTZeb0y7mxdxiM"

// إنشاء عميل Supabase للخادم (يستخدم في API Routes فقط)
// نستخدم export function للتأكد من أن الاتصال يحصل في وقت الطلب وليس وقت بناء التطبيق
// هذا يساعد في تجنب مشاكل "Project not specified"
export function getSupabaseAdmin() {
  const client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  return client
}
