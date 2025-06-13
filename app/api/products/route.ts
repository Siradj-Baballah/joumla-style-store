import { NextResponse } from "next/server"
import { productStore } from "@/lib/mock-data"

// جلب جميع المنتجات
export async function GET() {
  try {
    console.log("🔄 Fetching products (local mode)...")

    // محاكاة التأخير في الاستجابة مثل قاعدة البيانات
    await new Promise((resolve) => setTimeout(resolve, 300))

    // جلب المنتجات من المستودع المحلي
    const products = productStore.getAll()

    console.log(`✅ Successfully fetched ${products.length} products`)
    return NextResponse.json(products)
  } catch (error) {
    console.error("❌ Error fetching products:", error)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}

// إنشاء منتج جديد
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, colors } = body

    // التحقق من البيانات
    if (!name || !price || !colors || colors.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("📝 Creating new product:", { name, price, colorsCount: colors.length })

    // محاكاة التأخير في الاستجابة مثل قاعدة البيانات
    await new Promise((resolve) => setTimeout(resolve, 300))

    // إنشاء منتج جديد في المستودع المحلي
    const newProduct = productStore.add({ name, price, colors })

    console.log("✅ Product created successfully:", newProduct.id)
    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    console.error("❌ Error creating product:", error)
    return NextResponse.json({ error: "Error creating product" }, { status: 500 })
  }
}
