// بيانات تجريبية لاستخدامها بدلاً من الاتصال بقاعدة البيانات
export interface Product {
  id: number
  name: string
  price: number
  created_at: string
  updated_at: string
  colors: ProductColor[]
}

export interface ProductColor {
  id: number
  product_id: number
  name: string
  value: string
  image_url: string | null
  created_at: string
}

export interface CreateProductData {
  name: string
  price: number
  colors: {
    name: string
    value: string
    image_url: string
  }[]
}

// بيانات المنتجات التجريبية
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "فستان صيفي أنيق",
    price: 150,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    colors: [
      {
        id: 1,
        product_id: 1,
        name: "أزرق كلاسيكي",
        value: "#335E6D",
        image_url: "/placeholder.svg?height=400&width=300&text=فستان+أزرق",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        product_id: 1,
        name: "وردي ناعم",
        value: "#F8BBD9",
        image_url: "/placeholder.svg?height=400&width=300&text=فستان+وردي",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "بلوزة كاجوال",
    price: 85,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    colors: [
      {
        id: 3,
        product_id: 2,
        name: "أسود كلاسيكي",
        value: "#000000",
        image_url: "/placeholder.svg?height=400&width=300&text=بلوزة+سوداء",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 4,
        product_id: 2,
        name: "بيج فاتح",
        value: "#D4B896",
        image_url: "/placeholder.svg?height=400&width=300&text=بلوزة+بيج",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: 3,
    name: "تنورة طويلة",
    price: 120,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    colors: [
      {
        id: 5,
        product_id: 3,
        name: "كحلي داكن",
        value: "#1E3A8A",
        image_url: "/placeholder.svg?height=400&width=300&text=تنورة+كحلي",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 6,
        product_id: 3,
        name: "بني فاتح",
        value: "#92400E",
        image_url: "/placeholder.svg?height=400&width=300&text=تنورة+بني",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: 4,
    name: "جاكيت شتوي",
    price: 200,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    colors: [
      {
        id: 7,
        product_id: 4,
        name: "أسود أنيق",
        value: "#000000",
        image_url: "/placeholder.svg?height=400&width=300&text=جاكيت+أسود",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 8,
        product_id: 4,
        name: "كريمي دافئ",
        value: "#FEF3C7",
        image_url: "/placeholder.svg?height=400&width=300&text=جاكيت+كريمي",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: 5,
    name: "فستان سهرة",
    price: 300,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    colors: [
      {
        id: 9,
        product_id: 5,
        name: "ذهبي لامع",
        value: "#F59E0B",
        image_url: "/placeholder.svg?height=400&width=300&text=فستان+ذهبي",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 10,
        product_id: 5,
        name: "فضي رائع",
        value: "#9CA3AF",
        image_url: "/placeholder.svg?height=400&width=300&text=فستان+فضي",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: 6,
    name: "قميص قطني",
    price: 95,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    colors: [
      {
        id: 11,
        product_id: 6,
        name: "أبيض ناصع",
        value: "#FFFFFF",
        image_url: "/placeholder.svg?height=400&width=300&text=قميص+أبيض",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 12,
        product_id: 6,
        name: "أزرق سماوي",
        value: "#60A5FA",
        image_url: "/placeholder.svg?height=400&width=300&text=قميص+أزرق",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
]

// مستودع محلي للمنتجات
// يُستخدم لمحاكاة عمليات CRUD بدلاً من قاعدة البيانات
class LocalProductStore {
  private products: Product[] = [...MOCK_PRODUCTS]

  // الحصول على جميع المنتجات
  getAll(): Product[] {
    return this.products
  }

  // الحصول على منتج محدد
  getById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id)
  }

  // إضافة منتج جديد
  add(productData: CreateProductData): Product {
    const newId = Math.max(0, ...this.products.map((p) => p.id)) + 1
    const now = new Date().toISOString()

    const newProduct: Product = {
      id: newId,
      name: productData.name,
      price: productData.price,
      created_at: now,
      updated_at: now,
      colors: productData.colors.map((color, index) => ({
        id: newId * 100 + index,
        product_id: newId,
        name: color.name,
        value: color.value,
        image_url: color.image_url || null,
        created_at: now,
      })),
    }

    this.products.unshift(newProduct)
    return newProduct
  }

  // تحديث منتج موجود
  update(id: number, productData: CreateProductData): Product | null {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return null

    const now = new Date().toISOString()
    const updatedProduct: Product = {
      ...this.products[index],
      name: productData.name,
      price: productData.price,
      updated_at: now,
      colors: productData.colors.map((color, colorIndex) => ({
        id: id * 100 + colorIndex,
        product_id: id,
        name: color.name,
        value: color.value,
        image_url: color.image_url || null,
        created_at: now,
      })),
    }

    this.products[index] = updatedProduct
    return updatedProduct
  }

  // حذف منتج
  delete(id: number): boolean {
    const initialLength = this.products.length
    this.products = this.products.filter((p) => p.id !== id)
    return this.products.length !== initialLength
  }
}

// تصدير مستودع المنتجات المحلي
export const productStore = new LocalProductStore()
