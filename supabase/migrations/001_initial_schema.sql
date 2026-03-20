-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Category translations
CREATE TABLE category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  UNIQUE(category_id, locale)
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  opened_duration_days INT,
  unopened_duration_days INT,
  fridge_duration_days INT,
  freezer_duration_days INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Product translations
CREATE TABLE product_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  storage_tips TEXT,
  signs_of_spoilage TEXT,
  UNIQUE(product_id, locale)
);

-- User pantry (for app)
CREATE TABLE user_pantry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  opened_at DATE,
  notify_before_days INT DEFAULT 2,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_product_translations_locale ON product_translations(locale);
CREATE INDEX idx_product_translations_name ON product_translations(name);
CREATE INDEX idx_product_translations_product_locale ON product_translations(product_id, locale);
CREATE INDEX idx_category_translations_locale ON category_translations(category_id, locale);
CREATE INDEX idx_user_pantry_user ON user_pantry(user_id);

-- Full-text search index on product names
CREATE INDEX idx_product_translations_name_trgm ON product_translations USING gin (name gin_trgm_ops);

-- Enable trigram extension for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- RLS policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_pantry ENABLE ROW LEVEL SECURITY;

-- Public read access for products and categories
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read category_translations" ON category_translations FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read product_translations" ON product_translations FOR SELECT USING (true);

-- User pantry: users can only access their own data
CREATE POLICY "Users read own pantry" ON user_pantry FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own pantry" ON user_pantry FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own pantry" ON user_pantry FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own pantry" ON user_pantry FOR DELETE USING (auth.uid() = user_id);
