
export interface ResearchReport {
  id: string;
  title: string;
  category: string;
  impact: string;
  date: string;
}

export interface SystemState {
  time: string;
  status: 'CONNECTED' | 'RECONNECTING' | 'ERROR';
  node: string;
}

export interface TeamMember {
  id: string;
  code: string;
  status: 'ONLINE' | 'OFFLINE' | 'BUSY';
  name: string;
  role: string;
  specialty: string[];
  bio: string;
  image?: string;
}

export interface ResearchArchiveItem {
  id: string;
  fileId: string;
  title: string;
  excerpt: string;
  date: string;
  sector: 'DeFi' | 'L1/L2' | 'Infrastructure' | 'NFT' | 'Macro';
  riskLevel: 'Low' | 'Med' | 'High';
  status: 'Completed' | 'Under_Review';
  security: 'PUBLIC' | 'INTERNAL';
  tokens: string[];
  readTime: string;
}

export interface NewsFlashItem {
  id: string;
  time: string;
  category: 'MARKET' | 'POLICY' | 'ON-CHAIN' | 'SOCIAL' | 'TECH';
  headline: string;
  summary: string;
  source: string;
  isAlert?: boolean;
}

export interface EventItem {
  id: string;
  eventId: string;
  title: string;
  day: string;
  month: string;
  year: string;
  location: string;
  type: 'INTERNAL' | 'WORKSHOP' | 'NETWORKING' | 'CONFERENCE' | 'UPGRADE' | 'GOVERNANCE';
  speaker?: string;
  status: 'RSVP_OPEN' | 'FULL_CAPACITY' | 'COMPLETED' | 'ACTIVE' | 'PENDING';
  missionReport?: string;
  visualLogs?: string[];
}

export interface MacroIndicator {
  id: string;
  date: string; // ISO format or DD
  time: string;
  region: 'USA' | 'AUS' | 'EU' | 'CHN' | 'GLOBAL';
  impact: 1 | 2 | 3;
  indicator: string;
  estimate: string;
  actual?: string;
  previous: string;
  status: 'upcoming' | 'released';
  signal?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  briefing: string;
  impactTargets: string[];
}

export interface GalleryItem {
  id: string;
  camId: string;
  location: string;
  timestamp: string;
  imageUrl: string;
  description: string;
}

export interface SiteStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subDetail: string;
  color: string;
  sortOrder: number;
}

export interface SentimentIndicator {
  id: string;
  indicatorType: 'FEAR_GREED' | 'BTC_DOMINANCE' | 'BTC_NETFLOW' | 'ETH_NETFLOW';
  value: string;
  classification?: string;
  change24h?: string;
  signal?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  website?: string;
  socialX?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  sortOrder: number;
}
