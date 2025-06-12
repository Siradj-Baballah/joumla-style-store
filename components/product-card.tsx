"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/supabase"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(0)

  const handleWhatsAppOrder = () => {
    const selectedColorData = product.colors[selectedColor]
    const message = `مرحباً، أريد طلب ${product.name} باللون ${selectedColorData.name} بسعر ${product.price} ريال من Joumla Style`
    const whatsappUrl = `https://wa.me/966559939985?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!product.colors || product.colors.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-200">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.colors[selectedColor]?.image_url || "/placeholder.svg"}
          alt={`${product.name} - ${product.colors[selectedColor]?.name}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-[#335E6D] text-stone-100 px-2 py-1 rounded-full text-xs font-medium">
          جديد
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#335E6D] mb-3 text-right">{product.name}</h3>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-[#335E6D]">{product.price} ريال</div>
        </div>

        <div className="mb-5">
          <p className="text-sm text-slate-600 mb-3 text-right font-medium">الألوان المتاحة:</p>
          <div className="flex gap-2 justify-end">
            {product.colors.map((color, index) => (
              <button
                key={color.id}
                className={`w-9 h-9 rounded-full border-3 transition-all duration-200 ${
                  selectedColor === index
                    ? "border-[#335E6D] scale-110 shadow-lg"
                    : "border-stone-300 hover:border-[#335E6D]"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(index)}
                title={color.name}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2 text-right">اللون المختار: {product.colors[selectedColor]?.name}</p>
        </div>

        <Button
          onClick={handleWhatsAppOrder}
          className="w-full bg-[#335E6D] hover:bg-[#2A4F5C] text-stone-100 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          <MessageCircle className="h-4 w-4" />
          اطلب عبر واتساب
        </Button>
      </div>
    </div>
  )
}
