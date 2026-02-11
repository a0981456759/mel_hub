-- ============================================================
-- Community Events + RSVP Tables
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE community_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('meetup', 'workshop', 'hackathon')),
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  max_attendees INTEGER DEFAULT 50,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL REFERENCES community_events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, email)
);

-- RLS
ALTER TABLE community_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read community_events" ON community_events FOR SELECT USING (true);
CREATE POLICY "Auth manage community_events" ON community_events FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert rsvps" ON event_rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read rsvps" ON event_rsvps FOR SELECT USING (auth.role() = 'authenticated');

-- Seed Data
INSERT INTO community_events (id, title, description, event_type, event_date, location, max_attendees) VALUES
  ('ce1', 'MEL DeFi Deep Dive', 'Monthly meetup exploring DeFi protocols on Ethereum and Solana. Featuring live demos and Q&A.', 'meetup', '2026-03-15T18:00:00+11:00', 'Melbourne Central Hub, Level 3', 40),
  ('ce2', 'Smart Contract Security Workshop', 'Hands-on workshop on Solidity security patterns, common vulnerabilities, and audit techniques.', 'workshop', '2026-03-22T10:00:00+11:00', 'RMIT Blockchain Lab, Building 12', 30),
  ('ce3', 'MEL Chain Hackathon 2026', '48-hour hackathon building next-gen DeFi and NFT applications. Prizes worth $5000 AUD.', 'hackathon', '2026-04-12T09:00:00+11:00', 'Melbourne Convention Centre', 100);
