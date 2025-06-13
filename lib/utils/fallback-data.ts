// هذا الملف يحتوي على البيانات الاحتياطية في حالة فشل الاتصال بقاعدة البيانات
import type { Product } from "@/lib/mock-data"

export const FALLBACK_PRODUCTS: Product[] = [
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
  // يمكنك إضافة المزيد من المنتجات هنا...
]
