"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/mock-data"

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔄 Fetching products from API...")

      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // تجنب التخزين المؤقت
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("📦 Products received:", data.length)

      setProducts(data)
    } catch (err) {
      console.error("❌ Error fetching products:", err)
      setError(err instanceof Error ? err.message : "فشل في تحميل المنتجات")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#335E6D] mx-auto"></div>
        <p className="text-slate-600 mt-4">جاري تحميل المنتجات...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">❌ {error}</p>
          <button
            onClick={fetchProducts}
            className="bg-[#335E6D] text-stone-100 px-6 py-2 rounded-lg hover:bg-[#2A4F5C] transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-slate-600 mb-4">📦 لا توجد منتجات حالياً</p>
          <p className="text-sm text-slate-500">سيتم إضافة منتجات جديدة قريباً</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
