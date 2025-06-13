import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-server"
import { FALLBACK_PRODUCTS } from "@/lib/utils/fallback-data"
import { productStore } from "@/lib/mock-data"

// جلب جميع المنتجات
export async function GET() {
  try {
    console.log("🔄 Fetching products from database...")

    // محاولة الاتصال بـ Supabase
    try {
      const supabase = getSupabaseAdmin()

      // اختبار الاتصال
      await supabase.from("products").select("count").limit(1)

      // جلب المنتجات
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (productsError) {
        throw new Error(`فشل في جلب المنتجات: ${productsError.message}`)
      }

      if (!products || products.length === 0) {
        console.log("ℹ️ لا توجد منتجات في قاعدة البيانات، استخدام البيانات الاحتياطية")
        return NextResponse.json(FALLBACK_PRODUCTS)
      }

      // جلب الألوان لكل منتج
      const productsWithColors = await Promise.all(
        products.map(async (product) => {
          const { data: colors, error: colorsError } = await supabase
            .from("product_colors")
            .select("*")
            .eq("product_id", product.id)

          if (colorsError) {
            console.error(`❌ Error fetching colors for product ${product.id}:`, colorsError)
            return { ...product, colors: [] }
          }

          return { ...product, colors: colors || [] }
        }),
      )

      console.log(`✅ تم جلب ${productsWithColors.length} منتج من قاعدة البيانات`)
      return NextResponse.json(productsWithColors)
    } catch (databaseError) {
      // إذا فشل الاتصال بقاعدة البيانات، استخدم البيانات المحلية
      console.error("❌ فشل الاتصال بقاعدة البيانات، استخدام البيانات المحلية:", databaseError)
      const localProducts = productStore.getAll()
      return NextResponse.json(localProducts)
    }
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}

// إنشاء منتج جديد
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, colors } = body

    // التحقق من البيانات
    if (!name || !price || !colors || colors.length === 0) {
      return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 })
    }

    console.log("📝 Creating new product:", name)

    // محاولة الإضافة إلى Supabase
    try {
      const supabase = getSupabaseAdmin()

      // إنشاء المنتج
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: name.trim(),
          price: Number(price),
        })
        .select()
        .single()

      if (productError) {
        throw new Error(`فشل في إنشاء المنتج: ${productError.message}`)
      }

      // إضافة الألوان
      if (colors && colors.length > 0) {
        const colorsData = colors.map((color: any) => ({
          product_id: product.id,
          name: color.name.trim(),
          value: color.value,
          image_url: color.image_url || null,
        }))

        const { error: colorsError } = await supabase.from("product_colors").insert(colorsData)

        if (colorsError) {
          // حذف المنتج إذا فشلت إضافة الألوان
          await supabase.from("products").delete().eq("id", product.id)
          throw new Error(`فشل في إضافة ألوان المنتج: ${colorsError.message}`)
        }
      }

      // جلب المنتج الكامل مع الألوان
      const { data: productWithColors, error: fetchError } = await supabase
        .from("products")
        .select("*, colors:product_colors(*)")
        .eq("id", product.id)
        .single()

      if (fetchError) {
        console.warn("⚠️ تم إنشاء المنتج لكن فشل جلبه مع الألوان")
        return NextResponse.json({ success: true, product })
      }

      console.log("✅ تم إنشاء المنتج بنجاح في قاعدة البيانات")
      return NextResponse.json({ success: true, product: productWithColors })
    } catch (databaseError) {
      console.error("❌ فشل الإضافة إلى قاعدة البيانات، استخدام التخزين المحلي:", databaseError)

      // إضافة المنتج إلى التخزين المحلي كبديل
      const newProduct = productStore.add({ name, price, colors })
      return NextResponse.json({ success: true, product: newProduct })
    }
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
