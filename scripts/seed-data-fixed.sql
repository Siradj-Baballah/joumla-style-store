-- إدراج بيانات تجريبية
INSERT INTO products (name, price) VALUES 
('فستان صيفي أنيق', 150.00),
('بلوزة كاجوال', 85.00),
('تنورة طويلة', 120.00),
('جاكيت شتوي', 200.00),
('فستان سهرة', 300.00),
('قميص قطني', 95.00);

-- إدراج الألوان للمنتجات
INSERT INTO product_colors (product_id, name, value, image_url) VALUES 
-- فستان صيفي أنيق (product_id = 1)
(1, 'أزرق', '#3B82F6', '/placeholder.svg?height=400&width=300&text=فستان+أزرق'),
(1, 'وردي', '#EC4899', '/placeholder.svg?height=400&width=300&text=فستان+وردي'),
(1, 'أبيض', '#FFFFFF', '/placeholder.svg?height=400&width=300&text=فستان+أبيض'),

-- بلوزة كاجوال (product_id = 2)
(2, 'أسود', '#000000', '/placeholder.svg?height=400&width=300&text=بلوزة+سوداء'),
(2, 'بيج', '#D4B896', '/placeholder.svg?height=400&width=300&text=بلوزة+بيج'),
(2, 'أحمر', '#DC2626', '/placeholder.svg?height=400&width=300&text=بلوزة+حمراء'),

-- تنورة طويلة (product_id = 3)
(3, 'كحلي', '#1E3A8A', '/placeholder.svg?height=400&width=300&text=تنورة+كحلي'),
(3, 'بني', '#92400E', '/placeholder.svg?height=400&width=300&text=تنورة+بني'),
(3, 'رمادي', '#6B7280', '/placeholder.svg?height=400&width=300&text=تنورة+رمادي'),

-- جاكيت شتوي (product_id = 4)
(4, 'أسود', '#000000', '/placeholder.svg?height=400&width=300&text=جاكيت+أسود'),
(4, 'كريمي', '#FEF3C7', '/placeholder.svg?height=400&width=300&text=جاكيت+كريمي'),
(4, 'بنفسجي', '#7C3AED', '/placeholder.svg?height=400&width=300&text=جاكيت+بنفسجي'),

-- فستان سهرة (product_id = 5)
(5, 'ذهبي', '#F59E0B', '/placeholder.svg?height=400&width=300&text=فستان+ذهبي'),
(5, 'فضي', '#9CA3AF', '/placeholder.svg?height=400&width=300&text=فستان+فضي'),
(5, 'أسود', '#000000', '/placeholder.svg?height=400&width=300&text=فستان+أسود'),

-- قميص قطني (product_id = 6)
(6, 'أبيض', '#FFFFFF', '/placeholder.svg?height=400&width=300&text=قميص+أبيض'),
(6, 'أزرق فاتح', '#60A5FA', '/placeholder.svg?height=400&width=300&text=قميص+أزرق'),
(6, 'وردي فاتح', '#F9A8D4', '/placeholder.svg?height=400&width=300&text=قميص+وردي');
