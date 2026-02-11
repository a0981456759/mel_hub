import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLogin from './AdminLogin';
import AdminTable, { TableConfig } from './AdminTable';

type AdminTab = 'team' | 'news' | 'events' | 'macro' | 'gallery' | 'reports' | 'archive' | 'stats' | 'submissions' | 'sentiment' | 'community' | 'newsletter';

const tableConfigs: Record<AdminTab, TableConfig> = {
  team: {
    tableName: 'team_members',
    label: 'TEAM_MEMBERS',
    orderBy: 'id',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'NAME' },
      { key: 'role', label: 'ROLE' },
      { key: 'status', label: 'STATUS' },
      { key: 'code', label: 'CODE' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'code', label: 'CODE', type: 'text', required: true },
      { key: 'name', label: 'NAME', type: 'text', required: true },
      { key: 'role', label: 'ROLE', type: 'text', required: true },
      { key: 'status', label: 'STATUS', type: 'select', options: ['ONLINE', 'OFFLINE', 'BUSY'], required: true },
      { key: 'specialty', label: 'SPECIALTY', type: 'array' },
      { key: 'bio', label: 'BIO', type: 'textarea', required: true },
      { key: 'image', label: 'IMAGE_URL', type: 'text' },
    ],
  },
  news: {
    tableName: 'news_flash_items',
    label: 'NEWS_FLASH',
    orderBy: 'time',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'time', label: 'TIME' },
      { key: 'category', label: 'CATEGORY' },
      { key: 'headline', label: 'HEADLINE' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'time', label: 'TIME', type: 'text', required: true },
      { key: 'category', label: 'CATEGORY', type: 'select', options: ['MARKET', 'POLICY', 'ON-CHAIN', 'SOCIAL', 'TECH'], required: true },
      { key: 'headline', label: 'HEADLINE', type: 'text', required: true },
      { key: 'summary', label: 'SUMMARY', type: 'textarea', required: true },
      { key: 'source', label: 'SOURCE', type: 'text', required: true },
      { key: 'is_alert', label: 'IS_ALERT', type: 'select', options: ['false', 'true'] },
    ],
    mapFromDb: (row) => ({ ...row, is_alert: String(row.is_alert) }),
    mapToDb: (data) => ({ ...data, is_alert: data.is_alert === 'true' }),
  },
  events: {
    tableName: 'event_items',
    label: 'EVENTS',
    orderBy: 'created_at',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'TITLE' },
      { key: 'day', label: 'DAY' },
      { key: 'month', label: 'MONTH' },
      { key: 'status', label: 'STATUS' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'event_id', label: 'EVENT_ID', type: 'text', required: true },
      { key: 'title', label: 'TITLE', type: 'text', required: true },
      { key: 'day', label: 'DAY', type: 'text', required: true },
      { key: 'month', label: 'MONTH', type: 'text', required: true },
      { key: 'year', label: 'YEAR', type: 'text', required: true },
      { key: 'location', label: 'LOCATION', type: 'text', required: true },
      { key: 'type', label: 'TYPE', type: 'select', options: ['INTERNAL', 'WORKSHOP', 'NETWORKING', 'CONFERENCE', 'UPGRADE', 'GOVERNANCE'], required: true },
      { key: 'speaker', label: 'SPEAKER', type: 'text' },
      { key: 'status', label: 'STATUS', type: 'select', options: ['RSVP_OPEN', 'FULL_CAPACITY', 'COMPLETED', 'ACTIVE', 'PENDING'], required: true },
      { key: 'mission_report', label: 'MISSION_REPORT', type: 'textarea' },
      { key: 'visual_logs', label: 'VISUAL_LOGS', type: 'array' },
    ],
  },
  macro: {
    tableName: 'macro_indicators',
    label: 'MACRO_INDICATORS',
    orderBy: 'date',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'indicator', label: 'INDICATOR' },
      { key: 'date', label: 'DATE' },
      { key: 'region', label: 'REGION' },
      { key: 'status', label: 'STATUS' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'date', label: 'DATE', type: 'text', required: true },
      { key: 'time', label: 'TIME', type: 'text', required: true },
      { key: 'region', label: 'REGION', type: 'select', options: ['USA', 'AUS', 'EU', 'CHN', 'GLOBAL'], required: true },
      { key: 'impact', label: 'IMPACT (1-3)', type: 'number', required: true },
      { key: 'indicator', label: 'INDICATOR', type: 'text', required: true },
      { key: 'estimate', label: 'ESTIMATE', type: 'text', required: true },
      { key: 'actual', label: 'ACTUAL', type: 'text' },
      { key: 'previous', label: 'PREVIOUS', type: 'text', required: true },
      { key: 'status', label: 'STATUS', type: 'select', options: ['upcoming', 'released'], required: true },
      { key: 'signal', label: 'SIGNAL', type: 'select', options: ['BULLISH', 'BEARISH', 'NEUTRAL'] },
      { key: 'briefing', label: 'BRIEFING', type: 'textarea', required: true },
      { key: 'impact_targets', label: 'IMPACT_TARGETS', type: 'array' },
    ],
  },
  gallery: {
    tableName: 'gallery_items',
    label: 'GALLERY',
    orderBy: 'id',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'cam_id', label: 'CAM_ID' },
      { key: 'location', label: 'LOCATION' },
      { key: 'timestamp', label: 'TIMESTAMP' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'cam_id', label: 'CAM_ID', type: 'text', required: true },
      { key: 'location', label: 'LOCATION', type: 'text', required: true },
      { key: 'timestamp', label: 'TIMESTAMP', type: 'text', required: true },
      { key: 'image_url', label: 'IMAGE_URL', type: 'text', required: true },
      { key: 'description', label: 'DESCRIPTION', type: 'textarea', required: true },
    ],
  },
  reports: {
    tableName: 'research_reports',
    label: 'RESEARCH_REPORTS',
    orderBy: 'date',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'TITLE' },
      { key: 'category', label: 'CATEGORY' },
      { key: 'impact', label: 'IMPACT' },
      { key: 'date', label: 'DATE' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'title', label: 'TITLE', type: 'text', required: true },
      { key: 'category', label: 'CATEGORY', type: 'text', required: true },
      { key: 'impact', label: 'IMPACT', type: 'text', required: true },
      { key: 'date', label: 'DATE', type: 'text', required: true },
    ],
  },
  archive: {
    tableName: 'research_archive_items',
    label: 'RESEARCH_ARCHIVE',
    orderBy: 'date',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'file_id', label: 'FILE_ID' },
      { key: 'title', label: 'TITLE' },
      { key: 'sector', label: 'SECTOR' },
      { key: 'status', label: 'STATUS' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'file_id', label: 'FILE_ID', type: 'text', required: true },
      { key: 'title', label: 'TITLE', type: 'text', required: true },
      { key: 'excerpt', label: 'EXCERPT', type: 'textarea', required: true },
      { key: 'date', label: 'DATE', type: 'text', required: true },
      { key: 'sector', label: 'SECTOR', type: 'select', options: ['DeFi', 'L1/L2', 'Infrastructure', 'NFT', 'Macro'], required: true },
      { key: 'risk_level', label: 'RISK_LEVEL', type: 'select', options: ['Low', 'Med', 'High'], required: true },
      { key: 'status', label: 'STATUS', type: 'select', options: ['Completed', 'Under_Review'], required: true },
      { key: 'security', label: 'SECURITY', type: 'select', options: ['PUBLIC', 'INTERNAL'], required: true },
      { key: 'tokens', label: 'TOKENS', type: 'array' },
      { key: 'read_time', label: 'READ_TIME', type: 'text', required: true },
    ],
  },
  stats: {
    tableName: 'site_stats',
    label: 'SITE_STATS',
    orderBy: 'sort_order',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'label', label: 'LABEL' },
      { key: 'value', label: 'VALUE' },
      { key: 'sub_detail', label: 'SUB_DETAIL' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'label', label: 'LABEL', type: 'text', required: true },
      { key: 'value', label: 'VALUE', type: 'number', required: true },
      { key: 'suffix', label: 'SUFFIX', type: 'text' },
      { key: 'sub_detail', label: 'SUB_DETAIL', type: 'text', required: true },
      { key: 'color', label: 'COLOR (hex)', type: 'text', required: true },
      { key: 'sort_order', label: 'SORT_ORDER', type: 'number' },
    ],
  },
  submissions: {
    tableName: 'contact_submissions',
    label: 'CONTACT_SUBMISSIONS',
    orderBy: 'created_at',
    readOnly: true,
    displayColumns: [
      { key: 'id', label: 'ID', render: (v: string) => v?.substring(0, 8) + '...' },
      { key: 'org_name', label: 'ORG' },
      { key: 'contact_name', label: 'CONTACT' },
      { key: 'intent', label: 'INTENT' },
      { key: 'message', label: 'MESSAGE' },
      { key: 'created_at', label: 'DATE', render: (v: string) => v ? new Date(v).toLocaleDateString() : '' },
    ],
    fields: [],
  },
  sentiment: {
    tableName: 'market_sentiment',
    label: 'MARKET_SENTIMENT',
    orderBy: 'id',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'indicator_type', label: 'TYPE' },
      { key: 'value', label: 'VALUE' },
      { key: 'classification', label: 'CLASS' },
      { key: 'signal', label: 'SIGNAL' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'indicator_type', label: 'INDICATOR_TYPE', type: 'select', options: ['FEAR_GREED', 'BTC_DOMINANCE', 'BTC_NETFLOW', 'ETH_NETFLOW'], required: true },
      { key: 'value', label: 'VALUE', type: 'text', required: true },
      { key: 'classification', label: 'CLASSIFICATION', type: 'text' },
      { key: 'change_24h', label: 'CHANGE_24H', type: 'text' },
      { key: 'signal', label: 'SIGNAL', type: 'select', options: ['BULLISH', 'BEARISH', 'NEUTRAL'] },
    ],
  },
  community: {
    tableName: 'community_events',
    label: 'COMMUNITY_EVENTS',
    orderBy: 'event_date',
    displayColumns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'TITLE' },
      { key: 'event_type', label: 'TYPE' },
      { key: 'event_date', label: 'DATE', render: (v: string) => v ? new Date(v).toLocaleDateString() : '' },
      { key: 'location', label: 'LOCATION' },
      { key: 'is_active', label: 'ACTIVE' },
    ],
    fields: [
      { key: 'id', label: 'ID', type: 'text', required: true },
      { key: 'title', label: 'TITLE', type: 'text', required: true },
      { key: 'description', label: 'DESCRIPTION', type: 'textarea', required: true },
      { key: 'event_type', label: 'TYPE', type: 'select', options: ['meetup', 'workshop', 'hackathon'], required: true },
      { key: 'event_date', label: 'DATE (ISO)', type: 'text', required: true },
      { key: 'location', label: 'LOCATION', type: 'text', required: true },
      { key: 'max_attendees', label: 'MAX_ATTENDEES', type: 'number' },
      { key: 'image_url', label: 'IMAGE_URL', type: 'text' },
      { key: 'is_active', label: 'IS_ACTIVE', type: 'select', options: ['true', 'false'] },
      { key: 'sort_order', label: 'SORT_ORDER', type: 'number' },
    ],
    mapFromDb: (row) => ({ ...row, is_active: String(row.is_active) }),
    mapToDb: (data) => ({ ...data, is_active: data.is_active === 'true', max_attendees: Number(data.max_attendees) || 50 }),
  },
  newsletter: {
    tableName: 'newsletter_subscribers',
    label: 'NEWSLETTER_SUBS',
    orderBy: 'subscribed_at',
    readOnly: true,
    displayColumns: [
      { key: 'id', label: 'ID', render: (v: string) => v?.substring(0, 8) + '...' },
      { key: 'email', label: 'EMAIL' },
      { key: 'subscribed_at', label: 'DATE', render: (v: string) => v ? new Date(v).toLocaleDateString() : '' },
    ],
    fields: [],
  },
};

const tabs: { key: AdminTab; label: string }[] = [
  { key: 'team', label: 'TEAM' },
  { key: 'news', label: 'NEWS' },
  { key: 'events', label: 'EVENTS' },
  { key: 'community', label: 'COMMUNITY' },
  { key: 'macro', label: 'MACRO' },
  { key: 'gallery', label: 'GALLERY' },
  { key: 'reports', label: 'REPORTS' },
  { key: 'archive', label: 'ARCHIVE' },
  { key: 'stats', label: 'STATS' },
  { key: 'submissions', label: 'INBOX' },
  { key: 'sentiment', label: 'SENTIMENT' },
  { key: 'newsletter', label: 'NEWSLETTER' },
];

const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('team');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[10px] text-cyan-500 font-black uppercase tracking-widest animate-pulse">
          CHECKING_AUTH_STATUS...
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLoginSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="w-full space-y-8 font-mono pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-cyan-500 pb-6">
        <div>
          <div className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.4em] mb-2">/// ADMIN_CONTROL_PANEL ///</div>
          <h1 className="text-5xl font-black text-[#0F172A] italic tracking-tighter uppercase">COMMAND_CENTER.</h1>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 text-[10px] border border-red-500/50 text-red-400 px-4 py-2 font-black uppercase hover:bg-red-500 hover:text-black transition-all"
        >
          LOGOUT_SESSION ≫
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-slate-950 p-2 border border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === tab.key
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Table */}
      <AdminTable key={activeTab} config={tableConfigs[activeTab]} />
    </div>
  );
};

export default AdminPage;
