-- ============================================================
-- Newsletter Subscribers Table
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read newsletter" ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
