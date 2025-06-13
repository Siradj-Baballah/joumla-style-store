import { NextResponse } from "next/server"
import { productStore } from "@/lib/mock-data"

// تحديث منتج محدد
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, price, colors } = body
    const productId = Number.parseInt(params.id)

    if (!name || !price || !colors || colors.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log(`📝 Updating product ${productId}:`, { name, price, colorsCount: colors.length })

    // محاكاة التأخير في الاستجابة مثل قاعدة البيانات
    await new Promise((resolve) => setTimeout(resolve, 300))

    // تحديث المنتج في المستودع المحلي
    const updatedProduct = productStore.update(productId, { name, price, colors })

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    console.log("✅ Product updated successfully")
    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error("❌ Error updating product:", error)
    return NextResponse.json({ error: "Error updating product" }, { status: 500 })
  }
}

// حذف منتج محدد
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    console.log(`🗑️ Deleting product ${productId}`)

    // محاكاة التأخير في الاستجابة مثل قاعدة البيانات
    await new Promise((resolve) => setTimeout(resolve, 300))

    // حذف المنتج من المستودع المحلي
    const wasDeleted = productStore.delete(productId)

    if (!wasDeleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    console.log("✅ Product deleted successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Error deleting product:", error)
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 })
  }
}
