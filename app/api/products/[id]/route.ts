import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-server"
import { productStore } from "@/lib/mock-data"

// تحديث منتج محدد
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const body = await request.json()
    const { name, price, colors } = body

    if (!name || !price || !colors || colors.length === 0) {
      return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 })
    }

    console.log(`📝 تحديث المنتج ${productId}:`, name)

    // محاولة التحديث في Supabase
    try {
      const supabase = getSupabaseAdmin()

      // تحديث المنتج
      const { error: productError } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          price: Number(price),
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId)

      if (productError) {
        throw new Error(`فشل في تحديث المنتج: ${productError.message}`)
      }

      // حذف الألوان السابقة
      const { error: deleteError } = await supabase.from("product_colors").delete().eq("product_id", productId)

      if (deleteError) {
        throw new Error(`فشل في حذف الألوان السابقة: ${deleteError.message}`)
      }

      // إضافة الألوان الجديدة
      if (colors && colors.length > 0) {
        const colorsData = colors.map((color: any) => ({
          product_id: productId,
          name: color.name.trim(),
          value: color.value,
          image_url: color.image_url || null,
        }))

        const { error: colorsError } = await supabase.from("product_colors").insert(colorsData)

        if (colorsError) {
          throw new Error(`فشل في إضافة ألوان المنتج: ${colorsError.message}`)
        }
      }

      console.log("✅ تم تحديث المنتج بنجاح في قاعدة البيانات")
      return NextResponse.json({ success: true })
    } catch (databaseError) {
      console.error("❌ فشل التحديث في قاعدة البيانات، استخدام التخزين المحلي:", databaseError)

      // تحديث المنتج في التخزين المحلي كبديل
      const updatedProduct = productStore.update(productId, { name, price, colors })

      if (!updatedProduct) {
        return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}

// حذف منتج محدد
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    console.log(`🗑️ حذف المنتج ${productId}`)

    // محاولة الحذف من Supabase
    try {
      const supabase = getSupabaseAdmin()

      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) {
        throw new Error(`فشل في حذف المنتج: ${error.message}`)
      }

      console.log("✅ تم حذف المنتج بنجاح من قاعدة البيانات")
      return NextResponse.json({ success: true })
    } catch (databaseError) {
      console.error("❌ فشل الحذف من قاعدة البيانات، استخدام التخزين المحلي:", databaseError)

      // حذف المنتج من التخزين المحلي كبديل
      const wasDeleted = productStore.delete(productId)

      if (!wasDeleted) {
        return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
      }

      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
