"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function TestConnection() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    testConnection()
  }, [])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testConnection = async () => {
    try {
      setLoading(true)
      setLogs([])
      addLog("بدء اختبار الاتصال...")

      // اختبار API
      addLog("اختبار API...")

      const response = await fetch("/api/products", {
        cache: "no-store",
      })

      addLog(`حالة الاستجابة: ${response.status}`)

      if (!response.ok) {
        const errorData = await response.json()
        addLog(`خطأ في API: ${JSON.stringify(errorData)}`)
        return
      }

      const data = await response.json()
      addLog(`✅ تم استلام ${data.length} منتج بنجاح!`)

      setProducts(data)
    } catch (err) {
      addLog(`❌ خطأ عام: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const createSampleProduct = async () => {
    try {
      setLoading(true)
      addLog("جاري إنشاء منتج تجريبي...")

      const sampleProduct = {
        name: "منتج تجريبي " + new Date().toLocaleTimeString(),
        price: 150,
        colors: [
          {
            name: "أزرق كلاسيكي",
            value: "#335E6D",
            image_url: "/placeholder.svg?height=400&width=300&text=منتج+أزرق",
          },
          {
            name: "وردي ناعم",
            value: "#F8BBD9",
            image_url: "/placeholder.svg?height=400&width=300&text=منتج+وردي",
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
        const result = await response.json()
        addLog(`✅ تم إنشاء منتج برقم: ${result.product.id}`)
        testConnection()
      } else {
        const error = await response.json()
        addLog(`❌ خطأ في إنشاء المنتج: ${error.error}`)
      }
    } catch (error) {
      addLog(`❌ خطأ: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#335E6D] mb-6 text-center">Joumla Style - اختبار API</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">نتيجة الاختبار:</h2>
            <div>
              <Button onClick={testConnection} className="bg-[#335E6D] hover:bg-[#2A4F5C] ml-2" disabled={loading}>
                {loading ? "جاري الاختبار..." : "اختبار الاتصال"}
              </Button>
              <Button onClick={createSampleProduct} variant="outline" disabled={loading}>
                إنشاء منتج
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto mb-4">
            {logs.map((log, index) => (
              <div key={index} className="text-sm mb-1 font-mono">
                {log}
              </div>
            ))}
            {logs.length === 0 && <p className="text-gray-500 text-center">لا توجد سجلات بعد</p>}
          </div>

          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              وضع البيانات المحلية ✓
            </span>
          </div>
        </div>

        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">المنتجات ({products.length}):</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-slate-600">{product.price} ريال</p>
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
