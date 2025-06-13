import { getSupabaseAdmin } from "@/lib/supabase-server"
import { NextResponse } from "next/server"

// فحص صحة الاتصال بقاعدة البيانات
export async function GET() {
  try {
    const startTime = Date.now()
    const supabase = getSupabaseAdmin()

    // محاولة تنفيذ استعلام بسيط
    const { error } = await supabase.from("products").select("count").limit(1)

    const endTime = Date.now()
    const responseTime = endTime - startTime

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          time: new Date().toISOString(),
          responseTime,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "healthy",
      time: new Date().toISOString(),
      responseTime,
      message: "الاتصال بقاعدة البيانات يعمل بشكل صحيح",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "خطأ غير معروف",
        time: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
