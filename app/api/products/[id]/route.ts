import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, price, colors } = body
    const productId = Number.parseInt(params.id)

    if (!name || !price || !colors || colors.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // تحديث المنتج
    const { error: productError } = await supabaseServer
      .from("products")
      .update({
        name: name.trim(),
        price: Number.parseFloat(price),
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId)

    if (productError) {
      console.error("Error updating product:", productError)
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    // حذف الألوان القديمة
    const { error: deleteError } = await supabaseServer.from("product_colors").delete().eq("product_id", productId)

    if (deleteError) {
      console.error("Error deleting old colors:", deleteError)
    }

    // إدراج الألوان الجديدة
    if (colors && colors.length > 0) {
      const colorsData = colors.map((color: any) => ({
        product_id: productId,
        name: color.name.trim(),
        value: color.value,
        image_url: color.image_url || color.image || null,
      }))

      const { error: colorsError } = await supabaseServer.from("product_colors").insert(colorsData)

      if (colorsError) {
        console.error("Error updating colors:", colorsError)
        return NextResponse.json({ error: "Failed to update product colors" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)

    // حذف المنتج (سيتم حذف الألوان تلقائياً بسبب CASCADE)
    const { error } = await supabaseServer.from("products").delete().eq("id", productId)

    if (error) {
      console.error("Error deleting product:", error)
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
