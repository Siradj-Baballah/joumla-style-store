"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<string>("جاري الاختبار...")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setLoading(true)
      setConnectionStatus("جاري اختبار الاتصال...")

      // اختبار الاتصال بجدول المنتجات
      const { data: productsData, error: productsError } = await supabase.from("products").select("*").limit(1)

      if (productsError) {
        setConnectionStatus(`❌ خطأ في الاتصال بجدول المنتجات: ${productsError.message}`)
        return
      }

      // اختبار الاتصال بجدول الألوان
      const { data: colorsData, error: colorsError } = await supabase.from("product_colors").select("*").limit(1)

      if (colorsError) {
        setConnectionStatus(`❌ خطأ في الاتصال بجدول الألوان: ${colorsError.message}`)
        return
      }

      setConnectionStatus("✅ الاتصال بقاعدة البيانات ناجح!")

      // جلب جميع المنتجات عبر API
      const response = await fetch("/api/products")
      if (response.ok) {
        const productsWithColors = await response.json()
        setProducts(productsWithColors)
      } else {
        setConnectionStatus("❌ خطأ في جلب المنتجات عبر API")
      }
    } catch (err) {
      setConnectionStatus(`❌ خطأ عام: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const createSampleProduct = async () => {
    try {
      setLoading(true)

      const sampleProduct = {
        name: "منتج تجريبي من Joumla Style " + Date.now(),
        price: 150,
        colors: [
          {
            name: "أزرق كلاسيكي",
            value: "#335E6D",
            image_url: "/placeholder.svg?height=400&width=300&text=Joumla+Style+أزرق",
          },
          {
            name: "وردي ناعم",
            value: "#F8BBD9",
            image_url: "/placeholder.svg?height=400&width=300&text=Joumla+Style+وردي",
          },
        ],
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleProduct),
      })

      if (response.ok) {
        alert("تم إنشاء منتج تجريبي بنجاح!")
        testConnection()
      } else {
        const error = await response.json()
        alert(`خطأ في إنشاء المنتج: ${error.error}`)
      }
    } catch (error) {
      alert(`خطأ: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#335E6D] mb-6 text-center">
          Joumla Style - اختبار الاتصال بقاعدة البيانات
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">حالة الاتصال:</h2>
          <p className="text-lg mb-4">{connectionStatus}</p>
          <div className="flex gap-4">
            <Button onClick={testConnection} className="bg-[#335E6D] hover:bg-[#2A4F5C]" disabled={loading}>
              {loading ? "جاري الاختبار..." : "إعادة الاختبار"}
            </Button>
            <Button onClick={createSampleProduct} variant="outline" disabled={loading}>
              {loading ? "جاري الإنشاء..." : "إنشاء منتج تجريبي"}
            </Button>
          </div>
        </div>

        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">المنتجات الموجودة ({products.length}):</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-slate-600">{product.price} ريال</p>
                  <p className="text-sm text-slate-500">ID: {product.id}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">الألوان ({product.colors?.length || 0}):</p>
                    <div className="flex gap-2 mt-1">
                      {product.colors?.map((color: any) => (
                        <div
                          key={color.id}
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Button onClick={() => (window.location.href = "/")} variant="outline" className="ml-4">
            العودة للمتجر
          </Button>
          <Button onClick={() => (window.location.href = "/admin")} className="bg-[#335E6D] hover:bg-[#2A4F5C]">
            الذهاب للإدارة
          </Button>
        </div>
      </div>
    </div>
  )
}
