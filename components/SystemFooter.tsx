
import React from 'react';
import { useTranslation } from '../lib/i18n';

const SocialLink: React.FC<{ label: string; glow?: boolean }> = ({ label, glow }) => (
  <div className="group cursor-pointer">
    <div className={`text-[11px] font-mono font-bold tracking-wide transition-colors ${glow ? 'text-cyan-400' : 'text-slate-300'} group-hover:text-white`}>
      <span className={glow ? 'text-cyan-500' : 'text-slate-400'}>[</span>
      {label}
      <span className={glow ? 'text-cyan-500' : 'text-slate-400'}>]</span>
    </div>
  </div>
);

const SystemFooter: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-40 bg-black text-white px-6 py-4 font-mono">
      {/* Top Tactical Border Line (Progress Bar Style) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-800" />
      <div className="absolute top-0 left-0 w-1/4 h-[2px] bg-cyan-500 shadow-[0_0_10px_#00F0FF] z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">

        {/* Left: Unit Identity */}
        <div className="lg:col-span-3 space-y-1">
          <div className="text-lg font-black italic tracking-tighter uppercase leading-none">
            MEL <span className="text-cyan-500">CHAIN</span> LAB.
          </div>
          <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
            MELBOURNE // ONLINE
          </div>
        </div>

        {/* Center: Comm_Matrix */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <SocialLink label="COMMS" glow />
            <SocialLink label="BROADCAST" />
            <SocialLink label="WIRE" />
            <SocialLink label="RECON" />
            <SocialLink label="SIGNAL" />
          </div>
        </div>

        {/* Right: Navigation & Copyright */}
        <div className="lg:col-span-3 flex items-center justify-end gap-6">
          <nav className="flex gap-4">
            {[
              { l: t.footer.home, p: 'home' },
              { l: t.footer.team, p: 'team' },
              { l: t.footer.intel, p: 'events' }
            ].map(nav => (
              <button
                key={nav.p}
                onClick={() => onNavigate(nav.p)}
                className="text-[11px] font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-wide"
              >
                {nav.l}
              </button>
            ))}
          </nav>
          <div className="text-[10px] text-slate-400 font-bold">
            © 2026 MEL
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SystemFooter;
