-- إنشاء جدول المنتجات
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء جدول الألوان
CREATE TABLE IF NOT EXISTS product_colors (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  value VARCHAR(7) NOT NULL, -- hex color code
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_product_colors_product_id ON product_colors(product_id);

-- تفعيل Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات الأمان (السماح للجميع بالقراءة والكتابة للبساطة)
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON products FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON products FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON product_colors FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON product_colors FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON product_colors FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON product_colors FOR DELETE USING (true);
