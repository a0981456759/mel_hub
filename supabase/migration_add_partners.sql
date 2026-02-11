-- ============================================================
-- Partners Table Migration
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website TEXT,
  social_x TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Auth insert partners" ON partners FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update partners" ON partners FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete partners" ON partners FOR DELETE USING (auth.role() = 'authenticated');

-- Seed Data (example partners)
INSERT INTO partners (id, name, description, logo_url, website, social_x, social_linkedin, sort_order) VALUES
  ('p1', 'Lista DAO', 'Decentralized stablecoin lending protocol on BNB Chain', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=200&h=200', 'https://lista.org', 'https://x.com/lista_dao', 'https://linkedin.com/company/listadao', 1),
  ('p2', 'Chainlink', 'Industry-standard decentralized oracle network', 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=200&h=200', 'https://chain.link', 'https://x.com/chainlink', 'https://linkedin.com/company/chainlink', 2),
  ('p3', 'Google Cloud Web3', 'Cloud infrastructure for blockchain applications', 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=200&h=200', 'https://cloud.google.com/web3', 'https://x.com/googlecloud', 'https://linkedin.com/company/google-cloud', 3);
