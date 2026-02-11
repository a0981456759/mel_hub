-- ============================================================
-- MEL CHAINLAB TERMINAL - Supabase Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. research_reports
CREATE TABLE research_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  impact TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. team_members
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ONLINE', 'OFFLINE', 'BUSY')),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialty TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. news_flash_items
CREATE TABLE news_flash_items (
  id TEXT PRIMARY KEY,
  time TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('MARKET', 'POLICY', 'ON-CHAIN', 'SOCIAL', 'TECH')),
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  source TEXT NOT NULL,
  is_alert BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. event_items
CREATE TABLE event_items (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  title TEXT NOT NULL,
  day TEXT NOT NULL,
  month TEXT NOT NULL,
  year TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('INTERNAL', 'WORKSHOP', 'NETWORKING', 'CONFERENCE', 'UPGRADE', 'GOVERNANCE')),
  speaker TEXT,
  status TEXT NOT NULL CHECK (status IN ('RSVP_OPEN', 'FULL_CAPACITY', 'COMPLETED', 'ACTIVE', 'PENDING')),
  mission_report TEXT,
  visual_logs TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. macro_indicators
CREATE TABLE macro_indicators (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('USA', 'AUS', 'EU', 'CHN', 'GLOBAL')),
  impact INTEGER NOT NULL CHECK (impact IN (1, 2, 3)),
  indicator TEXT NOT NULL,
  estimate TEXT NOT NULL,
  actual TEXT,
  previous TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'released')),
  signal TEXT CHECK (signal IN ('BULLISH', 'BEARISH', 'NEUTRAL')),
  briefing TEXT NOT NULL,
  impact_targets TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. gallery_items
CREATE TABLE gallery_items (
  id TEXT PRIMARY KEY,
  cam_id TEXT NOT NULL,
  location TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. research_archive_items
CREATE TABLE research_archive_items (
  id TEXT PRIMARY KEY,
  file_id TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date TEXT NOT NULL,
  sector TEXT NOT NULL CHECK (sector IN ('DeFi', 'L1/L2', 'Infrastructure', 'NFT', 'Macro')),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('Low', 'Med', 'High')),
  status TEXT NOT NULL CHECK (status IN ('Completed', 'Under_Review')),
  security TEXT NOT NULL CHECK (security IN ('PUBLIC', 'INTERNAL')),
  tokens TEXT[] NOT NULL DEFAULT '{}',
  read_time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. site_stats
CREATE TABLE site_stats (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  suffix TEXT DEFAULT '',
  sub_detail TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. contact_submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  intent TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_flash_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE macro_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_archive_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read for all content tables
CREATE POLICY "Public read research_reports" ON research_reports FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read news_flash_items" ON news_flash_items FOR SELECT USING (true);
CREATE POLICY "Public read event_items" ON event_items FOR SELECT USING (true);
CREATE POLICY "Public read macro_indicators" ON macro_indicators FOR SELECT USING (true);
CREATE POLICY "Public read gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read research_archive_items" ON research_archive_items FOR SELECT USING (true);
CREATE POLICY "Public read site_stats" ON site_stats FOR SELECT USING (true);

-- contact_submissions: anon can INSERT, authenticated can SELECT
CREATE POLICY "Anon insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read contact_submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated write for all content tables
CREATE POLICY "Auth insert research_reports" ON research_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update research_reports" ON research_reports FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete research_reports" ON research_reports FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert team_members" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update team_members" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete team_members" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert news_flash_items" ON news_flash_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update news_flash_items" ON news_flash_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete news_flash_items" ON news_flash_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert event_items" ON event_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update event_items" ON event_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete event_items" ON event_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert macro_indicators" ON macro_indicators FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update macro_indicators" ON macro_indicators FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete macro_indicators" ON macro_indicators FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert gallery_items" ON gallery_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update gallery_items" ON gallery_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete gallery_items" ON gallery_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert research_archive_items" ON research_archive_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update research_archive_items" ON research_archive_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete research_archive_items" ON research_archive_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert site_stats" ON site_stats FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update site_stats" ON site_stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete site_stats" ON site_stats FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth update contact_submissions" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete contact_submissions" ON contact_submissions FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

-- research_reports
INSERT INTO research_reports (id, title, category, impact, date) VALUES
  ('1', 'ETH Pectra Upgrade Impact', 'L1', 'T-Minus 45D', '2025.02.24'),
  ('2', 'Uniswap Fee Switch Analysis', 'GOV', 'ACTIVE', '2025.02.23'),
  ('3', 'US 10Y Yield Trajectory', 'MACRO', '4.2%', '2025.02.22'),
  ('4', 'Gas Optimization Log', 'TECH', '12 Gwei', '2025.02.21'),
  ('5', 'BTC Perp Funding Rates', 'DATA', '0.01%', '2025.02.20'),
  ('6', 'Global Liquidity Index', 'MACRO', '+2.5% WoW', '2025.02.19');

-- team_members
INSERT INTO team_members (id, code, status, name, role, specialty, bio, image) VALUES
  ('01', 'PILOT_LEAD', 'ONLINE', 'CHEN_WEI_TING', 'PRESIDENT / RESEARCH LEAD', ARRAY['MEV', 'DEFI_ARCH', 'SOL_VM'], 'SYSLOG: Lead architect for society research initiatives. Specialized in cross-chain MEV extraction and liquidity provision strategies.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400'),
  ('02', 'TACTICAL_OPS', 'ONLINE', 'LIN_YU_XUAN', 'VP_OPERATIONS', ARRAY['ZK_PROOFS', 'OPS', 'ETH_STAKING'], 'SYSLOG: Directs society operational flow and node maintenance. Expert in zero-knowledge scaling solutions and governance security.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400'),
  ('03', 'CORE_DEV_01', 'BUSY', 'WANG_JIA_HAO', 'TECH_DIRECTOR', ARRAY['RUST', 'SOLIDITY', 'INDEXING'], 'SYSLOG: Core developer for society internal tooling. Focused on high-performance indexing and smart contract optimization.', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400&h=400');

-- news_flash_items
INSERT INTO news_flash_items (id, time, category, headline, summary, source, is_alert) VALUES
  ('f1', '14:22:15', 'ON-CHAIN', 'BTC PERP FUNDING RATES REMAIN NEUTRAL', 'Current funding rate at 0.01% suggests balanced leverage between longs and shorts despite local volatility.', 'LIVE_TELEMETRY', false),
  ('f2', '14:15:02', 'MARKET', '24H REKT: $25M IN SHORT LIQUIDATIONS', 'Sudden upside wick cleared $25.4M in short positions across major exchanges in the last hour.', 'LIQUIDATION_FEED', true),
  ('f3', '14:10:00', 'TECH', 'NETWORK GAS COST: 12 GWEI', 'Standard gas fees are low, optimal for protocol deployments and high-volume migrations.', 'GAS_STATION', false);

-- event_items
INSERT INTO event_items (id, event_id, title, day, month, year, location, type, speaker, status, mission_report) VALUES
  ('e1', 'DOC-2025-001', 'OPTIMIZING_ZK_ROLLUP_LATENCY: A_STUDY_ON_PROVER_MARKETS', '15', 'MAR', '2025', 'MEL_RESEARCH_NODE_01', 'UPGRADE', 'CHEN_WEI_TING', 'RSVP_OPEN', 'Comprehensive analysis of prover decentralization and its impact on finality latency across ZK-Sync and Starknet architectures.'),
  ('e2', 'DOC-2025-002', 'CROSS_CHAIN_LIQUIDITY_FRAGMENTATION_MODELS', '01', 'MAR', '2025', 'VIRTUAL_CHAMBER', 'GOVERNANCE', 'LIN_YU_XUAN', 'ACTIVE', 'Mathematical modeling of liquidity slippage in fragmented L2 ecosystems and the feasibility of atomic cross-chain swaps.'),
  ('e3', 'DOC-2025-003', 'MEV_IN_THE_POST_PECTRA_ETHEREUM_LANDSCAPE', '20', 'FEB', '2025', 'OFF_CHAIN_SYNC', 'INTERNAL', 'WANG_JIA_HAO', 'COMPLETED', 'Predictive modeling of block building incentives after the Pectra hard fork, focusing on EIP-7251 effects on validator yield.');

-- macro_indicators
INSERT INTO macro_indicators (id, date, time, region, impact, indicator, estimate, actual, previous, status, signal, briefing, impact_targets) VALUES
  ('m1', '2025-03-05', '23:30', 'USA', 3, 'US CORE CPI (YOY)', '3.1%', '3.3%', '3.2%', 'released', 'BEARISH', 'Inflation came in higher than expected. This likely pushes back the FED pivot, strengthening the USD and putting pressure on risk assets like BTC and Equities.', ARRAY['BTC', 'NASDAQ', 'USD']),
  ('m2', '2025-03-03', '00:00', 'GLOBAL', 3, 'BTC GLOBAL LIQUIDITY FLOW', '+1.2B', '+1.8B', '+0.5B', 'released', 'BULLISH', 'Significant net inflows into spot ETFs and exchange withdrawals. Structural supply shock forming as long-term holder conviction remains high.', ARRAY['BTC', 'ETH']),
  ('m3', '2025-03-12', '22:00', 'GLOBAL', 3, 'FOMC RATE DECISION', '5.25%', NULL, '5.25%', 'upcoming', NULL, 'Crucial meeting to determine interest rate trajectory. Market is currently pricing in a 65% chance of a pause. Hawkish rhetoric could induce volatility.', ARRAY['ALL_RISK_ASSETS']),
  ('m4', '2025-03-20', '10:00', 'EU', 2, 'EUROZONE GDP Q4', '0.1%', NULL, '0.0%', 'upcoming', NULL, 'Growth metrics for the Eurozone. Stagnation continues to be a risk, potentially forcing the ECB to cut earlier than the FED.', ARRAY['EUR', 'STX_600']),
  ('m5', '2025-03-28', '19:30', 'AUS', 2, 'RETAIL SALES (MOM)', '0.3%', NULL, '0.1%', 'upcoming', NULL, 'Australian domestic demand tracker. Critical for RBA terminal rate positioning.', ARRAY['AUD']);

-- gallery_items
INSERT INTO gallery_items (id, cam_id, location, timestamp, image_url, description) VALUES
  ('g1', 'CAM_01', 'UNIMELB_ENGINEERING', '2025.01.20 // 10:15:33', 'https://images.unsplash.com/photo-1524178232363-1fb28f74b573', 'Quarterly protocol research symposium. Technical deep-dive on ZK-proof efficiency.'),
  ('g2', 'CAM_02', 'COLLINGWOOD_HQ', '2025.02.10 // 14:00:22', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4', 'Internal hackathon session. Node optimization and indexing tool development.'),
  ('g3', 'CAM_03', 'SOUTHBANK_LOUNGE', '2025.02.15 // 19:30:11', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', 'Ecosystem networking event. Building bridges with industry partners.'),
  ('g4', 'CAM_04', 'RMIT_BUILDING_80', '2025.02.18 // 11:45:00', 'https://images.unsplash.com/photo-1531482615713-2afd69097998', 'Collaborative research session with RMIT Blockchain Innovation Hub.'),
  ('g5', 'CAM_05', 'MEL_CBD_HUB', '2025.02.20 // 16:20:45', 'https://images.unsplash.com/photo-1475721027785-f74dea327912', 'Core developer sprint. Finalizing the MEL_OS v2 protocol architecture.'),
  ('g6', 'CAM_06', 'MONASH_CLAYTON', '2025.02.22 // 09:10:15', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', 'Inter-varsity knowledge transfer session. Decentralized identity workshop.');

-- research_archive_items
INSERT INTO research_archive_items (id, file_id, title, excerpt, date, sector, risk_level, status, security, tokens, read_time) VALUES
  ('1', 'REP-2025-001', 'THE_MEV_TRILEMMA: PRIVACY_VS_EFFICIENCY', 'Deep dive into block builder competition and the impact of TEE-based auction mechanisms on validator returns.', '2025.01.12', 'DeFi', 'High', 'Completed', 'INTERNAL', ARRAY['$ETH', '$LDO'], '12_MIN'),
  ('2', 'REP-2025-002', 'L2_FRAGMENTATION_ANALYSIS_v4', 'Assessing liquidity bridge security models and cross-rollup messaging latency in the Optimism Superchain.', '2025.01.10', 'L1/L2', 'Med', 'Under_Review', 'PUBLIC', ARRAY['$OP', '$ARB', '$BASE'], '08_MIN');

-- site_stats
INSERT INTO site_stats (id, label, value, suffix, sub_detail, color, sort_order) VALUES
  ('s1', '// UNIVERSITY_PARTNERS', 3, '', 'UNIMELB // MONASH // RMIT', '#00F0FF', 1),
  ('s2', '// INDUSTRY_NETWORK', 5, '', 'LISTA_DAO // CHAINLINK // GOOGLE', '#FACC15', 2),
  ('s3', '// EVENTS_HOSTED', 12, '', 'WORKSHOPS & HACKATHONS', '#2563EB', 3),
  ('s4', '// COMMUNITY_SIZE', 450, '+', 'ACTIVE_MEMBERS', '#DC2626', 4);
