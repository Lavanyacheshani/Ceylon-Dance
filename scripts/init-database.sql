-- Create tables for Kandyan Dance Website

-- Registrations Table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  age INTEGER NOT NULL,
  course_id VARCHAR(50) NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  preferred_time_slot VARCHAR(100) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'confirmed'
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  stripe_payment_id VARCHAR(255) UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',
  status VARCHAR(50) DEFAULT 'completed',
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_email VARCHAR(255),
  course_name VARCHAR(255)
);

-- Shop Products Table
CREATE TABLE shop_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  stripe_order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES shop_products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_course ON registrations(course_id);
CREATE INDEX idx_payments_registration ON payments(registration_id);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_id);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_shop_products_category ON shop_products(category);
CREATE INDEX idx_order_items_order ON order_items(order_id);
