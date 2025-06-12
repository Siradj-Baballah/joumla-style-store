"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Product, CreateProductData } from "@/lib/supabase"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

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
    } catch (error) {
      console.error("Error fetching products:", error)
      alert("فشل في تحميل المنتجات")
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (productData: CreateProductData) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to create product")
      }

      await fetchProducts()
      setIsAddingProduct(false)
      alert("تم إضافة المنتج بنجاح!")
    } catch (error) {
      console.error("Error creating product:", error)
      alert("فشل في إضافة المنتج")
    }
  }

  const handleUpdateProduct = async (productData: CreateProductData) => {
    if (!editingProduct) return

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to update product")
      }

      await fetchProducts()
      setEditingProduct(null)
      alert("تم تحديث المنتج بنجاح!")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("فشل في تحديث المنتج")
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      await fetchProducts()
      alert("تم حذف المنتج بنجاح!")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("فشل في حذف المنتج")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#335E6D] mx-auto"></div>
          <p className="text-slate-600 mt-4">جاري تحميل المنتجات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-[#335E6D] shadow-lg border-b border-[#2A4F5C]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2A4F5C] rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-stone-100" style={{ fontFamily: "serif" }}>
                  J
                </span>
              </div>
              <div className="text-xl font-bold text-stone-100">Joumla Style - لوحة الإدارة</div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => window.open("https://joumla-style.vercel.app", "_blank")}
                variant="outline"
                className="text-stone-100 border-stone-300 hover:bg-stone-100 hover:text-[#335E6D]"
              >
                زيارة المتجر
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#335E6D]">إدارة المنتجات ({products.length})</h1>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="bg-[#335E6D] hover:bg-[#2A4F5C] text-stone-100 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                إضافة منتج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة منتج جديد</DialogTitle>
              </DialogHeader>
              <ProductForm onSave={handleAddProduct} onCancel={() => setIsAddingProduct(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(product) => setEditingProduct(product)}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>

        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>تعديل المنتج</DialogTitle>
              </DialogHeader>
              <ProductForm
                product={editingProduct}
                onSave={handleUpdateProduct}
                onCancel={() => setEditingProduct(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
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
