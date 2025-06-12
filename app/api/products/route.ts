import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET() {
  try {
    // جلب المنتجات أولاً
    const { data: products, error: productsError } = await supabaseServer
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (productsError) {
      console.error("Error fetching products:", productsError)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    if (!products || products.length === 0) {
      return NextResponse.json([])
    }

    // جلب الألوان لكل منتج
    const productsWithColors = await Promise.all(
      products.map(async (product) => {
        const { data: colors, error: colorsError } = await supabaseServer
          .from("product_colors")
          .select("*")
          .eq("product_id", product.id)
          .order("id", { ascending: true })

        if (colorsError) {
          console.error("Error fetching colors for product", product.id, colorsError)
          return { ...product, colors: [] }
        }

        return { ...product, colors: colors || [] }
      }),
    )

    return NextResponse.json(productsWithColors)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, colors } = body

    if (!name || !price || !colors || colors.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // إدراج المنتج
    const { data: product, error: productError } = await supabaseServer
      .from("products")
      .insert([
        {
          name: name.trim(),
          price: Number.parseFloat(price),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (productError) {
      console.error("Error creating product:", productError)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    // إدراج الألوان
    if (colors && colors.length > 0) {
      const colorsData = colors.map((color: any) => ({
        product_id: product.id,
        name: color.name.trim(),
        value: color.value,
        image_url: color.image_url || color.image || null,
      }))

      const { error: colorsError } = await supabaseServer.from("product_colors").insert(colorsData)

      if (colorsError) {
        console.error("Error creating colors:", colorsError)
        // حذف المنتج إذا فشل إدراج الألوان
        await supabaseServer.from("products").delete().eq("id", product.id)
        return NextResponse.json({ error: "Failed to create product colors" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
