"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product, CreateProductData } from "@/lib/supabase"
import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#335E6D] text-center mb-2">Joumla Style</h1>
          <p className="text-slate-600 text-center">أحدث الأزياء والملابس العصرية</p>
        </div>

        <div className="mb-8">
          <div className="relative overflow-hidden rounded-xl">
            <div className="bg-[#335E6D]/10 p-8 md:p-12">
              <div className="text-center md:w-2/3 mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-[#335E6D] mb-4">تشكيلة جديدة</h2>
                <p className="text-slate-700 mb-6">اكتشف أحدث تشكيلاتنا من الملابس العصرية بأسعار مناسبة وجودة عالية</p>
              </div>
            </div>
          </div>
        </div>

        <ProductGrid />
      </main>

      <footer className="bg-[#335E6D] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-[#2A4F5C] rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-stone-100" style={{ fontFamily: "serif" }}>
                    J
                  </span>
                </div>
                <div className="text-lg font-bold text-stone-100">Joumla Style</div>
              </div>
              <p className="text-stone-300 mt-2 text-center md:text-right">أزياء عصرية بلمسة فريدة</p>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-bold mb-2">تواصل معنا</h3>
              <p className="text-stone-300">واتساب: 966559939985+</p>
            </div>
          </div>

          <div className="border-t border-[#2A4F5C] mt-6 pt-6 text-center">
            <p className="text-stone-300 text-sm">&copy; {new Date().getFullYear()} Joumla Style. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-right">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-xl font-bold text-[#335E6D] text-right">{product.price} ريال</div>
          <div>
            <p className="text-sm text-slate-600 mb-2 text-right">الألوان ({product.colors?.length || 0}):</p>
            <div className="flex gap-2 justify-end">
              {product.colors?.map((color, index) => (
                <div
                  key={color.id}
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={() => onEdit(product)} variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 ml-1" />
              تعديل
            </Button>
            <Button
              onClick={() => onDelete(product.id)}
              variant="outline"
              size="sm"
              className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 ml-1" />
              حذف
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product
  onSave: (product: CreateProductData) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(product?.name || "")
  const [price, setPrice] = useState(product?.price || 0)
  const [colors, setColors] = useState(
    product?.colors?.map((c) => ({ name: c.name, value: c.value, image_url: c.image_url || "" })) || [
      { name: "", value: "#000000", image_url: "" },
    ],
  )

  const addColor = () => {
    setColors([...colors, { name: "", value: "#000000", image_url: "" }])
  }

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const updateColor = (index: number, field: string, value: string) => {
    const newColors = [...colors]
    newColors[index] = { ...newColors[index], [field]: value }
    setColors(newColors)
  }

  const handleSave = () => {
    if (!name.trim() || price <= 0 || colors.some((c) => !c.name.trim())) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    onSave({ name, price, colors })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-right block mb-2">
            اسم المنتج *
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: فستان صيفي أنيق"
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="price" className="text-right block mb-2">
            السعر (ريال) *
          </Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="150"
            className="text-right"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Button onClick={addColor} variant="outline" size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            إضافة لون
          </Button>
          <Label className="text-right font-medium">الألوان المتاحة *</Label>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
              <Button
                onClick={() => removeColor(index)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
                disabled={colors.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="flex-1 grid grid-cols-3 gap-3">
                <Input
                  value={color.name}
                  onChange={(e) => updateColor(index, "name", e.target.value)}
                  placeholder="اسم اللون"
                  className="text-right"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color.value}
                    onChange={(e) => updateColor(index, "value", e.target.value)}
                    className="w-10 h-10 rounded border"
                  />
                  <span className="text-sm text-gray-600">اللون</span>
                </div>
                <Input
                  value={color.image_url}
                  onChange={(e) => updateColor(index, "image_url", e.target.value)}
                  placeholder="رابط الصورة"
                  className="text-right"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          إلغاء
        </Button>
        <Button onClick={handleSave} className="flex-1 bg-[#335E6D] hover:bg-[#2A4F5C]">
          <Save className="h-4 w-4 ml-2" />
          حفظ المنتج
        </Button>
      </div>
    </div>
  )
}
