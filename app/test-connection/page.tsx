"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Database, Server, Check, XCircle } from "lucide-react"

export default function TestConnection() {
  const [dbStatus, setDbStatus] = useState<"loading" | "connected" | "error">("loading")
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    checkConnection()
  }, [])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const checkConnection = async () => {
    try {
      setLoading(true)
      setLogs([])
      setDbStatus("loading")
      addLog("بدء فحص الاتصال...")

      // اختبار صحة الاتصال
      addLog("اختبار الاتصال بقاعدة البيانات...")
      const healthResponse = await fetch("/api/healthcheck")
      const healthData = await healthResponse.json()

      if (healthResponse.ok) {
        setDbStatus("connected")
        setResponseTime(healthData.responseTime)
        addLog(`✅ الاتصال بقاعدة البيانات ناجح (${healthData.responseTime}ms)`)
      } else {
        setDbStatus("error")
        setErrorMessage(healthData.message)
        addLog(`❌ خطأ في الاتصال: ${healthData.message}`)
      }

      // جلب المنتجات
      addLog("جلب المنتجات...")
      const productsResponse = await fetch("/api/products")
      const productsData = await productsResponse.json()

      if (productsResponse.ok) {
        setProducts(productsData)
        addLog(`✅ تم جلب ${productsData.length} منتج`)
      } else {
        addLog(`❌ خطأ في جلب المنتجات: ${productsData.error || "خطأ غير معروف"}`)
      }
    } catch (error) {
      setDbStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "خطأ غير معروف")
      addLog(`❌ خطأ غير متوقع: ${error}`)
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

      addLog("إرسال بيانات المنتج إلى الخادم...")
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleProduct),
      })

      const result = await response.json()

      if (response.ok) {
        addLog(`✅ تم إنشاء المنتج برقم: ${result.product?.id || "غير معروف"}`)
        // تحديث قائمة المنتجات
        checkConnection()
      } else {
        addLog(`❌ خطأ في إنشاء المنتج: ${result.error || "خطأ غير معروف"}`)
      }
    } catch (error) {
      addLog(`❌ خطأ غير متوقع: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#335E6D] mb-6 text-center">Joumla Style - اختبار الاتصال</h1>

        <div className="grid gap-6 mb-6">
          {/* بطاقة حالة الاتصال */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">حالة الاتصال</CardTitle>
                <Button
                  onClick={checkConnection}
                  variant="ghost"
                  size="icon"
                  disabled={loading}
                  className={loading ? "animate-spin" : ""}
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    <span>قاعدة البيانات</span>
                  </div>
                  <Badge
                    variant={dbStatus === "connected" ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {dbStatus === "loading" ? (
                      <div className="animate-spin h-3 w-3 border-2 border-current rounded-full border-t-transparent" />
                    ) : dbStatus === "connected" ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {dbStatus === "loading" ? "جاري الفحص..." : dbStatus === "connected" ? "متصل" : "غير متصل"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    <span>API</span>
                  </div>
                  <Badge className="flex items-center gap-1">
                    <Check className="h-3 w-3" /> يعمل
                  </Badge>
                </div>

                {responseTime && <div className="text-sm text-gray-500">زمن الاستجابة: {responseTime}ms</div>}

                {errorMessage && (
                  <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">خطأ: {errorMessage}</div>
                )}

                <div className="flex gap-3">
                  <Button onClick={checkConnection} className="bg-[#335E6D] hover:bg-[#2A4F5C]" disabled={loading}>
                    {loading ? "جاري الاختبار..." : "اختبار الاتصال"}
                  </Button>
                  <Button onClick={createSampleProduct} variant="outline" disabled={loading}>
                    إنشاء منتج تجريبي
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* سجل الأحداث */}
          <Card>
            <CardHeader>
              <CardTitle>سجل الأحداث</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="text-sm mb-1 font-mono">
                    {log}
                  </div>
                ))}
                {logs.length === 0 && <p className="text-gray-500 text-center">لا توجد سجلات بعد</p>}
              </div>
            </CardContent>
          </Card>

          {/* المنتجات */}
          {products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>المنتجات ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product) => (
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
                  {products.length > 4 && (
                    <div className="border rounded-lg p-4 flex items-center justify-center text-sm text-gray-500">
                      +{products.length - 4} منتج آخر
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
