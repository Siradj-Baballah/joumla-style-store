import { createClient } from "@supabase/supabase-js"
import type { Product, ProductColor } from "@/lib/mock-data"

// التحقق من وجود المتغيرات البيئية
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// إذا لم تكن متغيرات البيئة موجودة، استخدم المتغيرات المباشرة (غير مستحسن في الإنتاج)
const fallbackUrl = "https://ndlypkyqmsfywtfusrcg.supabase.co"
const fallbackKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbHlwa3lxbXNmeXd0ZnVzcmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Mzc3NDQsImV4cCI6MjA2NTMxMzc0NH0.EGH4ivznP0MurVF_7fIMczOGL2dyfehNl-x59f8JPMM"

// التحقق من المتغيرات قبل إنشاء العميل
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ متغيرات بيئة Supabase غير محددة، يتم استخدام القيم الاحتياطية")
}

// إنشاء عميل Supabase (مع سينغلتون للواجهة)
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl || fallbackUrl, supabaseAnonKey || fallbackKey, {
      auth: {
        persistSession: true,
      },
    })
  }
  return supabaseInstance
}

// وظائف الاتصال بقاعدة البيانات
export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseClient()

    // جلب المنتجات أولاً
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (productsError) {
      console.error("❌ Error fetching products:", productsError)
      throw new Error(`فشل في جلب المنتجات: ${productsError.message}`)
    }

    if (!products || products.length === 0) {
      return []
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

    return productsWithColors
  } catch (error) {
    console.error("❌ Error in fetchProducts:", error)
    throw error
  }
}

// إضافة منتج جديد
export async function createProduct(
  productData: Omit<Product, "id" | "created_at" | "updated_at" | "colors"> & {
    colors: Omit<ProductColor, "id" | "product_id" | "created_at">[]
  },
): Promise<Product> {
  try {
    const supabase = getSupabaseClient()

    // إنشاء المنتج
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: productData.name,
        price: productData.price,
      })
      .select()
      .single()

    if (productError) {
      console.error("❌ Error creating product:", productError)
      throw new Error(`فشل في إنشاء المنتج: ${productError.message}`)
    }

    // إضافة الألوان للمنتج
    if (productData.colors && productData.colors.length > 0) {
      const colorsData = productData.colors.map((color) => ({
        product_id: product.id,
        name: color.name,
        value: color.value,
        image_url: color.image_url,
      }))

      const { error: colorsError } = await supabase.from("product_colors").insert(colorsData)

      if (colorsError) {
        // حذف المنتج إذا فشلت إضافة الألوان
        await supabase.from("products").delete().eq("id", product.id)
        throw new Error(`فشل في إضافة ألوان المنتج: ${colorsError.message}`)
      }
    }

    // جلب المنتج مع الألوان
    return await getProductById(product.id)
  } catch (error) {
    console.error("❌ Error in createProduct:", error)
    throw error
  }
}

// الحصول على منتج محدد مع ألوانه
export async function getProductById(id: number): Promise<Product> {
  try {
    const supabase = getSupabaseClient()

    // جلب المنتج
    const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", id).single()

    if (productError) {
      throw new Error(`فشل في جلب المنتج: ${productError.message}`)
    }

    // جلب ألوان المنتج
    const { data: colors, error: colorsError } = await supabase.from("product_colors").select("*").eq("product_id", id)

    if (colorsError) {
      console.error(`❌ Error fetching colors for product ${id}:`, colorsError)
      return { ...product, colors: [] }
    }

    return { ...product, colors: colors || [] }
  } catch (error) {
    console.error("❌ Error in getProductById:", error)
    throw error
  }
}

// تحديث منتج
export async function updateProduct(
  id: number,
  productData: Omit<Product, "id" | "created_at" | "updated_at" | "colors"> & {
    colors: Omit<ProductColor, "id" | "product_id" | "created_at">[]
  },
): Promise<Product> {
  try {
    const supabase = getSupabaseClient()

    // تحديث المنتج
    const { error: productError } = await supabase
      .from("products")
      .update({
        name: productData.name,
        price: productData.price,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (productError) {
      throw new Error(`فشل في تحديث المنتج: ${productError.message}`)
    }

    // حذف الألوان السابقة
    const { error: deleteError } = await supabase.from("product_colors").delete().eq("product_id", id)

    if (deleteError) {
      throw new Error(`فشل في حذف الألوان السابقة: ${deleteError.message}`)
    }

    // إضافة الألوان الجديدة
    if (productData.colors && productData.colors.length > 0) {
      const colorsData = productData.colors.map((color) => ({
        product_id: id,
        name: color.name,
        value: color.value,
        image_url: color.image_url,
      }))

      const { error: colorsError } = await supabase.from("product_colors").insert(colorsData)

      if (colorsError) {
        throw new Error(`فشل في إضافة ألوان المنتج: ${colorsError.message}`)
      }
    }

    // جلب المنتج المحدث مع الألوان
    return await getProductById(id)
  } catch (error) {
    console.error("❌ Error in updateProduct:", error)
    throw error
  }
}

// حذف منتج
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const supabase = getSupabaseClient()

    // حذف المنتج (سيتم حذف الألوان تلقائياً بفضل CASCADE)
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      throw new Error(`فشل في حذف المنتج: ${error.message}`)
    }

    return true
  } catch (error) {
    console.error("❌ Error in deleteProduct:", error)
    throw error
  }
}
