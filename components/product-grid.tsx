"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/supabase"

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
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError("فشل في تحميل المنتجات")
      console.error("Error fetching products:", err)
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
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="bg-[#335E6D] text-stone-100 px-6 py-2 rounded-lg hover:bg-[#2A4F5C] transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">لا توجد منتجات حالياً</p>
        <p className="text-sm text-slate-500">سيتم إضافة منتجات جديدة قريباً</p>
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
