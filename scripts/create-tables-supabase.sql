-- حذف الجداول إذا كانت موجودة (للبدء من جديد)
DROP TABLE IF EXISTS product_colors CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- إنشاء جدول المنتجات
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الألوان
CREATE TABLE product_colors (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  value VARCHAR(7) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX idx_product_colors_product_id ON product_colors(product_id);

-- تفعيل Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات الأمان (السماح للجميع بالقراءة والكتابة)
CREATE POLICY "Enable all operations for products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for product_colors" ON product_colors FOR ALL USING (true) WITH CHECK (true);
