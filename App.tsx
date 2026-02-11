
import React, { useState, useEffect } from 'react';
import NewsTicker from './components/NewsTicker';
import GridBackground from './components/GridBackground';
import TeamPage from './components/TeamPage';
import SentimentPage from './components/SentimentPage';
import EventPage from './components/EventPage';
import MacroPage from './components/MacroPage';
import ContactPage from './components/ContactPage';
import VisualArchivePage from './components/VisualArchivePage';
import PartnersPage from './components/PartnersPage';
import CommunityEventsPage from './components/CommunityEventsPage';
import FAQPage from './components/FAQPage';
import HeroLogo from './components/HeroLogo';
import SystemFooter from './components/SystemFooter';
import AdminPage from './components/admin/AdminPage';
import { useTranslation } from './lib/i18n';
import { useTheme } from './lib/theme';

type Page = 'home' | 'team' | 'news' | 'events' | 'macro' | 'uplink' | 'visuals' | 'partners' | 'community' | 'faq' | 'admin';

const App: React.FC = () => {
  const { t, lang, setLang } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);

  // Hash-based routing for admin
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Boot animation
  const bootMessages = [
    'INITIALIZING_CORE_SYSTEMS...',
    'LOADING_BLOCKCHAIN_MODULES...',
    'CONNECTING_TO_SUPABASE_DB...',
    'CALIBRATING_SENTIMENT_FEED...',
    'SYNCING_PROTOCOL_DATA...',
    'SYSTEM_READY.',
  ];

  useEffect(() => {
    if (!booting) return;
    const interval = setInterval(() => {
      setBootLine(prev => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setBooting(false), 400);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [booting]);

  // Close sidebar on page change (mobile)
  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.location.hash = '';
  };

  const navItems = [
    { label: t.nav.visuals, key: 'visuals', icon: '📸' },
    { label: t.nav.team, key: 'team', icon: '👤' },
    { label: t.nav.sentiment, key: 'news', icon: '🧠' },
    { label: t.nav.intel, key: 'events', icon: '📋' },
    { label: t.nav.macro, key: 'macro', icon: '🌐' },
    { label: t.nav.community, key: 'community', icon: '🎪' },
    { label: t.nav.partners, key: 'partners', icon: '🤝' },
    { label: t.nav.faq, key: 'faq', icon: '❓' },
    { label: t.nav.uplink, key: 'uplink', icon: '🛰️' }
  ];

  // Boot screen
  if (booting) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center font-mono">
        <div className="max-w-lg w-full px-8">
          <div className="text-[#00F0FF] text-xs font-black tracking-[0.3em] mb-6 animate-pulse">MEL_OS.v2 // BOOT_SEQUENCE</div>
          <div className="space-y-2">
            {bootMessages.slice(0, bootLine + 1).map((msg, i) => (
              <div key={i} className="flex items-center gap-3 animate-in">
                <span className={`text-[10px] font-black ${i === bootLine && i < bootMessages.length - 1 ? 'text-[#FACC15]' : i === bootMessages.length - 1 ? 'text-[#22C55E]' : 'text-[#00F0FF]'}`}>
                  {i === bootLine && i < bootMessages.length - 1 ? '▶' : '✓'}
                </span>
                <span className={`text-sm font-bold tracking-wide ${i === bootLine ? 'text-white' : 'text-white/50'}`}>{msg}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 h-1 bg-white/10 overflow-hidden">
            <div className="h-full bg-[#00F0FF] transition-all duration-300" style={{ width: `${((bootLine + 1) / bootMessages.length) * 100}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen h-screen font-mono selection:bg-[#00F0FF] selection:text-black relative flex flex-col overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0B0F1A] text-[#E2E8F0]' : 'bg-[#D1D5DB] text-[#0F172A]'}`}>
      <GridBackground />

      {/* Persistent Technical Header */}
      <header className="relative z-30 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center bg-[#0F172A] text-white border-b-2 border-[#00F0FF]">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-[#00F0FF] text-2xl font-black p-1"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>

          <button
            onClick={() => handleNav('home')}
            className="flex flex-col gap-0 group"
          >
            <div className="text-[8px] font-black tracking-[0.3em] text-[#00F0FF] uppercase group-hover:animate-pulse hidden md:block">{t.nav.systemHome}</div>
            <div className="text-xl md:text-3xl font-black italic group-hover:text-[#00F0FF] transition-colors tracking-tighter">MEL_OS.v2</div>
          </button>
          <div className="hidden md:flex h-10 w-[1px] bg-white/20" />
          <div className="hidden md:block text-[10px] font-black text-[#FACC15]">
            [ {t.nav.nodeLabel} <span className="text-[#00F0FF]">MEL_CORE_BRAVO_01</span> ]
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Language Toggle */}
          <div className="flex items-center border border-[#00F0FF]/40 bg-[#00F0FF]/10">
            {([['en', 'EN'], ['zh-CN', '简'], ['zh-TW', '繁']] as const).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setLang(code as any)}
                className={`px-2 md:px-2.5 py-1 md:py-1.5 text-[10px] md:text-[11px] font-black uppercase tracking-wider transition-all ${lang === code
                  ? 'bg-[#00F0FF]/30 text-[#00F0FF]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-lg px-2 py-1 hover:bg-white/10 transition-all"
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <div className="text-right hidden md:block">
            <div className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">{t.nav.localTimestamp}</div>
            <div className="text-xl font-black text-[#00F0FF] leading-none tracking-tight">{time}</div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative z-10 overflow-hidden min-h-0">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Persistent Tactical Sidebar */}
        <nav className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-72 bg-[#0F172A] border-r-2 border-[#00F0FF] flex flex-col z-40 md:z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] min-h-0 h-full md:h-auto transition-transform duration-300`}>
          <div className="p-5 border-b border-white/10">
            <div className="text-[11px] font-black text-[#00F0FF] uppercase mb-2 tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_5px_#00F0FF]"></span>
              {t.nav.controlPanel}
            </div>
          </div>

          <div className="flex-1 py-4 flex flex-col overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key as Page)}
                className={`relative group flex items-center px-5 py-4 transition-all duration-200 border-l-4 ${currentPage === item.key
                  ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]'
                  : 'text-white/80 hover:text-white hover:bg-white/10 border-transparent'
                  }`}
              >
                <span className={`text-lg mr-4 transition-transform ${currentPage === item.key ? 'scale-110 translate-x-1' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-[13px] font-bold tracking-wide uppercase">
                  {item.label}
                </span>

                {currentPage === item.key && (
                  <span className="ml-auto text-sm animate-pulse">≫</span>
                )}
              </button>
            ))}
          </div>

          {/* Sidebar Footer Decals */}
          <div className="p-5 border-t border-white/20">
            <div className="text-[11px] font-bold text-white/50 space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2"><span>{t.nav.auth}</span> <span className="text-[#FACC15]">CMD_ALPHA</span></div>
              <div className="flex justify-between"><span>{t.nav.sig}</span> <span className="font-mono text-white/70">{Math.random().toString(36).substring(7).toUpperCase()}</span></div>
            </div>
          </div>
        </nav>

        {/* Dynamic Viewport Content Area */}
        <main className={`flex-1 overflow-y-auto relative custom-scrollbar min-h-0 ${isDark ? 'bg-[#0F172A]/50' : 'bg-black/5'}`}>
          {currentPage === 'home' ? (
            <div className="min-h-full flex flex-col justify-center px-12 md:px-24 py-32 relative">
              {/* Blueprints Decorative Elements */}
              <div className="absolute top-20 left-10 w-48 h-[1px] bg-[#00F0FF]/30" />
              <div className="absolute top-10 left-20 w-[1px] h-48 bg-[#00F0FF]/30" />

              <div className="relative group max-w-5xl">
                <div className={`text-[12px] font-black uppercase tracking-[1em] mb-6 flex items-center gap-4 ${isDark ? 'text-[#E2E8F0]' : 'text-[#0F172A]'}`}>
                  <span className={`w-12 h-[2px] ${isDark ? 'bg-[#E2E8F0]' : 'bg-[#0F172A]'}`}></span>
                  {t.home.established}
                </div>

                <HeroLogo />

                <div className={`max-w-2xl text-sm md:text-xl font-bold leading-tight mb-20 border-l-4 border-[#2563EB] pl-10 py-6 backdrop-blur-md relative ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  {t.home.subtitle}

                  {/* Corner Brackets */}
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#2563EB] -translate-x-1 translate-y-1" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#2563EB] translate-x-1 translate-y-1" />

                  <span className="text-xs font-mono text-[#2563EB] mt-4 block tracking-widest font-black uppercase">
                    {t.home.tagline}
                  </span>
                </div>

                {/* Refined Hero CTA Button */}
                <button
                  onClick={() => setCurrentPage('events')}
                  className="group relative inline-flex items-center gap-8 px-12 py-6 bg-[#0F172A] text-[#00F0FF] border-2 border-[#00F0FF] transition-all hover:bg-[#00F0FF] hover:text-[#0F172A] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] active:scale-95 chamfer-button"
                >
                  <span className="text-2xl font-black italic tracking-tighter uppercase relative z-10">{t.home.cta}</span>
                  <span className="text-3xl group-hover:translate-x-3 transition-transform relative z-10">≫</span>
                </button>
              </div>
            </div>
          ) : currentPage === 'admin' ? (
            <div className="p-10 md:p-20 animate-in">
              <AdminPage />
            </div>
          ) : (
            <div key={currentPage} className="p-6 md:p-10 lg:p-20 animate-in">
              {currentPage === 'team' && <TeamPage />}
              {currentPage === 'news' && <SentimentPage />}
              {currentPage === 'events' && <EventPage />}
              {currentPage === 'macro' && <MacroPage />}
              {currentPage === 'uplink' && <ContactPage />}
              {currentPage === 'visuals' && <VisualArchivePage />}
              {currentPage === 'partners' && <PartnersPage />}
              {currentPage === 'community' && <CommunityEventsPage />}
              {currentPage === 'faq' && <FAQPage />}
            </div>
          )}
        </main>
      </div>

      {/* Ticker Container */}
      <div className="relative z-30 bg-[#0F172A]/95 backdrop-blur-lg border-t border-[#00F0FF]/30">
        <NewsTicker />
      </div>

      {/* Final Global System Footer */}
      <SystemFooter onNavigate={(p) => setCurrentPage(p as Page)} />

      <style>{`
        .outline-text {
          -webkit-text-stroke: 2px #2563EB;
          color: transparent;
        }
        .chamfer-button {
          clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%);
        }
        .animate-progress {
          animation: progress 6s ease-in-out infinite;
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 20s linear infinite;
        }
        .animate-in {
          animation: pageIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #D1D5DB;
          border-left: 1px solid #00F0FF22;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0F172A;
          border: 3px solid #D1D5DB;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563EB;
        }
      `}</style>
    </div>
  );
};

export default App;
