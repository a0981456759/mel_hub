
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from '../lib/i18n';

const ProtocolSpecCard: React.FC<{
  title: string;
  sector: string;
  accentColor: string;
  items: { label: string; desc: string }[];
  icon: React.ReactNode;
}> = ({ title, sector, accentColor, items, icon }) => {
  return (
    <div className="bg-slate-950/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      <div className="h-2 w-full" style={{ backgroundColor: accentColor }} />
      <div className="p-8 space-y-10">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: accentColor }}>
                [ SECTOR: {sector} ]
              </span>
              <div className="h-[1px] w-8 bg-white/10" />
            </div>
            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              {title.split('_').join(' ')}
            </h3>
          </div>
          <div className="text-white/10 group-hover:text-white/30 transition-all duration-500 scale-125">{icon}</div>
        </div>
        <div className="space-y-6 relative z-10">
          {items.map((item, idx) => (
            <div key={idx} className="group/item">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-lg font-black font-mono leading-none" style={{ color: accentColor }}>{'>'}</span>
                <span className="text-[13px] font-black text-white uppercase tracking-tighter group-hover/item:translate-x-1 transition-transform">{item.label}:</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-widest pl-7 leading-relaxed opacity-80 group-hover/item:opacity-100 transition-opacity">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="pt-6 flex items-center justify-between border-t border-white/5 font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-white/20 font-black tracking-widest uppercase">ENCRYPTION: AES_256_ACTIVE</span>
            <span className="text-[8px] text-white/20 font-black tracking-widest uppercase">SPEC_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (<div key={i} className="w-1.5 h-1.5 bg-white/5 group-hover:bg-white/20 transition-colors" />))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-2 text-white/[0.02] font-black text-9xl italic select-none pointer-events-none uppercase tracking-tighter">
        {sector.substring(0, 4)}
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [intent, setIntent] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const academiaItems = [
    { label: t.contact.workshopModules, desc: t.contact.workshopDesc },
    { label: t.contact.mentorship, desc: t.contact.mentorshipDesc },
    { label: t.contact.hackathon, desc: t.contact.hackathonDesc }
  ];

  const enterpriseItems = [
    { label: t.contact.devAccess, desc: t.contact.devAccessDesc },
    { label: t.contact.brandExposure, desc: t.contact.brandDesc },
    { label: t.contact.talentPipeline, desc: t.contact.talentDesc }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactName.trim() || !intent.trim() || !message.trim()) return;
    setSubmitState('submitting');
    setSubmitError('');
    const { error } = await supabase.from('contact_submissions').insert({
      org_name: orgName.trim(), contact_name: contactName.trim(),
      intent: intent.trim(), message: message.trim(),
    });
    if (error) { setSubmitState('error'); setSubmitError(error.message); }
    else { setSubmitState('success'); setOrgName(''); setContactName(''); setIntent(''); setMessage(''); }
  };

  return (
    <div className="w-full space-y-12 font-mono pb-32">
      <div className="border-b-4 border-cyan-500 pb-8">
        <div className="text-[11px] text-cyan-500 font-black uppercase tracking-[0.5em] mb-2">{t.contact.subtitle}</div>
        <div className="flex justify-between items-end">
          <h1 className="text-6xl font-black text-[#0F172A] italic tracking-tighter uppercase">{t.contact.title}</h1>
          <div className="text-right hidden md:block">
            <div className="text-xs text-slate-500 font-black uppercase">{t.contact.signalStrength}</div>
            <div className="text-xl text-cyan-500 font-black italic uppercase">{t.contact.signalValue}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 border border-slate-800 bg-slate-950/40 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 shadow-2xl rounded-sm overflow-hidden">
        {/* Left Side: Channel A - Recruitment */}
        <div className="p-10 flex flex-col space-y-8 bg-slate-950/20 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="58" stroke="white" strokeWidth="4" strokeDasharray="10 10" />
              <path d="M60 10V30M60 90V110M110 60H90M30 60H10" stroke="white" strokeWidth="4" />
            </svg>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[11px] text-emerald-500 font-black uppercase tracking-widest italic">{t.contact.channelA}</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{t.contact.recruitTitle}</h2>
          </div>
          <div className="space-y-6">
            <p className="text-slate-400 text-sm leading-relaxed max-w-md italic border-l-2 border-emerald-500/30 pl-6 py-2">
              {t.contact.recruitDesc}<br /><br />{t.contact.recruitTarget}
            </p>
            <div className="pt-8">
              <a href="#" className="inline-flex items-center gap-6 px-10 py-5 bg-emerald-600 text-white font-black uppercase italic tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1">
                {t.contact.joinDiscord} <span className="text-2xl">≫</span>
              </a>
            </div>
          </div>
          <div className="mt-auto pt-10 border-t border-white/5 flex gap-10">
            <div className="space-y-1">
              <div className="text-[9px] text-white/30 uppercase">{t.contact.currentStatus}</div>
              <div className="text-[10px] text-emerald-400 font-black uppercase">{t.contact.accepting}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] text-white/30 uppercase">{t.contact.nextSortie}</div>
              <div className="text-[10px] text-white/60 font-black uppercase">AUTUMN_2025</div>
            </div>
          </div>
        </div>

        {/* Right Side: Channel B - Alliance */}
        <div className="p-10 flex flex-col space-y-8 bg-slate-900/40 relative">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_#eab308]" />
              <span className="text-[11px] text-yellow-500 font-black uppercase tracking-widest italic">{t.contact.channelB}</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{t.contact.allianceTitle}</h2>
          </div>
          <div className="space-y-6">
            <p className="text-slate-400 text-[11px] uppercase tracking-widest opacity-60">{t.contact.allianceDesc}</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[10px] text-white/40 font-black uppercase group-focus-within:text-yellow-500 transition-colors">{t.contact.orgId}</label>
                  <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder={t.contact.orgPlaceholder}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white outline-none focus:border-yellow-500 transition-colors uppercase placeholder:text-white/10" disabled={submitState === 'submitting'} />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] text-white/40 font-black uppercase group-focus-within:text-yellow-500 transition-colors">{t.contact.officerName}</label>
                  <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder={t.contact.officerPlaceholder}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white outline-none focus:border-yellow-500 transition-colors uppercase placeholder:text-white/10" disabled={submitState === 'submitting'} />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] text-white/40 font-black uppercase group-focus-within:text-yellow-500 transition-colors">{t.contact.signalIntent}</label>
                <input type="text" value={intent} onChange={(e) => setIntent(e.target.value)} placeholder={t.contact.intentPlaceholder}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white outline-none focus:border-yellow-500 transition-colors uppercase placeholder:text-white/10" disabled={submitState === 'submitting'} />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] text-white/40 font-black uppercase group-focus-within:text-yellow-500 transition-colors">{t.contact.dataPacket}</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.contact.messagePlaceholder}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white outline-none focus:border-yellow-500 transition-colors uppercase placeholder:text-white/10 resize-none" disabled={submitState === 'submitting'} />
              </div>
              <div className="pt-4 space-y-3">
                <button type="submit" disabled={submitState === 'submitting'}
                  className={`w-full py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 font-black uppercase italic tracking-[0.3em] hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-4 group ${submitState === 'submitting' ? 'opacity-50 cursor-wait' : ''}`}>
                  {submitState === 'submitting' ? (<>{t.contact.transmitting} <span className="animate-spin">⟳</span></>) : (<>{t.contact.transmit} <span className="text-xl group-hover:translate-x-2 transition-transform">≫</span></>)}
                </button>
                {submitState === 'success' && (
                  <div className="text-[10px] text-emerald-400 font-black uppercase tracking-widest text-center py-2 border border-emerald-500/30 bg-emerald-500/10">{t.contact.success}</div>
                )}
                {submitState === 'error' && (
                  <div className="text-[10px] text-red-400 font-black uppercase tracking-widest text-center py-2 border border-red-500/30 bg-red-500/10">{t.contact.failed} {submitError || 'UNKNOWN_ERROR'}</div>
                )}
              </div>
            </form>
          </div>
          <div className="mt-auto pt-6 text-[9px] text-white/20 uppercase italic flex justify-between">
            <span>SIG_ENCRYPTION: RSA-4096_ACTIVE</span>
            <span>UPLINK_STATION: MEL_NORTH_HUB</span>
          </div>
        </div>
      </div>

      {/* Alliance Protocol Specs Section */}
      <div className="pt-24 space-y-12">
        <div className="flex items-center gap-6">
          <div className="h-[4px] w-16 bg-[#0F172A]" />
          <h2 className="text-3xl font-black text-[#0F172A] italic uppercase tracking-[0.2em]">{t.contact.allianceSpecs}</h2>
          <div className="h-[1px] flex-1 bg-[#0F172A] opacity-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProtocolSpecCard title={t.contact.academiaTitle} sector="ACADEMIA" accentColor="#00F0FF" items={academiaItems}
            icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12m0 0l-3.75 3.75M12 12l3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v9" /></svg>} />
          <ProtocolSpecCard title={t.contact.enterpriseTitle} sector="ENTERPRISE" accentColor="#FACC15" items={enterpriseItems}
            icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>} />
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 py-8 opacity-40">
        <div className="h-[1px] flex-1 bg-slate-800" />
        <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.5em]">{t.contact.endTransmission}</div>
        <div className="h-[1px] flex-1 bg-slate-800" />
      </div>
    </div>
  );
};

export default ContactPage;
