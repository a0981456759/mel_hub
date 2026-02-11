
import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { supabase } from '../lib/supabase';

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
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus('loading');
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim() });
    if (error) {
      setSubStatus('error');
    } else {
      setSubStatus('success');
      setEmail('');
    }
    setTimeout(() => setSubStatus('idle'), 3000);
  };

  return (
    <footer className="relative z-40 bg-black text-white px-4 md:px-6 py-4 font-mono">
      {/* Top Tactical Border Line (Progress Bar Style) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-800" />
      <div className="absolute top-0 left-0 w-1/4 h-[2px] bg-cyan-500 shadow-[0_0_10px_#00F0FF] z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

        {/* Left: Unit Identity */}
        <div className="lg:col-span-3 space-y-1">
          <div className="text-lg font-black italic tracking-tighter uppercase leading-none">
            MEL <span className="text-cyan-500">CHAIN</span> LAB.
          </div>
          <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
            MELBOURNE // ONLINE
          </div>
        </div>

        {/* Center: Newsletter */}
        <div className="lg:col-span-5 flex justify-center">
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-sm">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.footer.newsletterPlaceholder}
              className="flex-1 bg-white/5 border border-cyan-500/30 text-white text-[11px] font-bold px-3 py-2 tracking-wider placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={subStatus === 'loading'}
              className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-[10px] font-black px-4 py-2 uppercase tracking-wider hover:bg-cyan-500/30 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {subStatus === 'loading' ? '...' : subStatus === 'success' ? '✓' : t.footer.subscribe}
            </button>
          </form>
          {subStatus === 'success' && (
            <div className="text-[10px] text-cyan-400 font-bold ml-2 self-center">{t.footer.subscribeSuccess}</div>
          )}
        </div>

        {/* Right: Navigation & Copyright */}
        <div className="lg:col-span-4 flex items-center justify-end gap-4 md:gap-6">
          <nav className="flex gap-3 md:gap-4">
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
