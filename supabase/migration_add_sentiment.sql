-- ============================================================
-- MEL CHAINLAB TERMINAL - Market Sentiment Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- market_sentiment table
CREATE TABLE market_sentiment (
  id TEXT PRIMARY KEY,
  indicator_type TEXT NOT NULL CHECK (indicator_type IN ('FEAR_GREED', 'BTC_DOMINANCE', 'BTC_NETFLOW', 'ETH_NETFLOW')),
  value TEXT NOT NULL,
  classification TEXT,
  change_24h TEXT,
  signal TEXT CHECK (signal IN ('BULLISH', 'BEARISH', 'NEUTRAL')),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE market_sentiment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read market_sentiment" ON market_sentiment FOR SELECT USING (true);
CREATE POLICY "Auth insert market_sentiment" ON market_sentiment FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update market_sentiment" ON market_sentiment FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete market_sentiment" ON market_sentiment FOR DELETE USING (auth.role() = 'authenticated');

-- Seed data
INSERT INTO market_sentiment (id, indicator_type, value, classification, change_24h, signal) VALUES
  ('fear-greed', 'FEAR_GREED', '45', 'Fear', '+3', 'NEUTRAL'),
  ('btc-dom', 'BTC_DOMINANCE', '52.3', NULL, '+0.8%', 'BULLISH'),
  ('btc-flow', 'BTC_NETFLOW', '-125M', 'Outflow', '-15M', 'BULLISH'),
  ('eth-flow', 'ETH_NETFLOW', '+42M', 'Inflow', '+8M', 'BEARISH');
