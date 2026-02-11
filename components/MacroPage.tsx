
import React, { useState } from 'react';
import { MacroIndicator } from '../types';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useMacroIndicators } from '../hooks/useMacroIndicators';
import { useTranslation } from '../lib/i18n';

const MacroPage: React.FC = () => {
  const { t } = useTranslation();
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const { data: macroData, loading, error } = useMacroIndicators();
  const [selectedEvent, setSelectedEvent] = useState<MacroIndicator | null>(null);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
  const currentDay = isCurrentMonth ? now.getDate() : -1;

  const goPrevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const goNextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };
  const goToday = () => { setViewYear(now.getFullYear()); setViewMonth(now.getMonth()); };

  if (loading) return <LoadingState label={t.macro.loading} />;
  if (error) return <ErrorState message={error} />;

  const getEventsForDay = (day: number) => {
    return macroData.filter(ev => {
      const evDate = new Date(ev.date);
      return evDate.getFullYear() === viewYear && evDate.getMonth() === viewMonth && evDate.getDate() === day;
    });
  };

  const monthEventCount = macroData.filter(ev => {
    const d = new Date(ev.date);
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
  }).length;

  return (
    <div className="w-full space-y-8 font-mono">
      <div className="border-b-4 border-cyan-500 pb-8">
        <div className="text-[11px] text-cyan-500 font-black uppercase tracking-[0.5em] mb-2">{t.macro.subtitle}</div>
        <div className="flex justify-between items-end flex-wrap gap-4">
          <h1 className="text-6xl font-black text-[#0F172A] italic tracking-tighter uppercase">{t.macro.title}</h1>
          <div className="flex items-center gap-3">
            <button onClick={goPrevMonth} className="text-[11px] font-black text-slate-600 hover:text-cyan-500 border border-slate-400 hover:border-cyan-500 px-3 py-2 transition-all uppercase">{t.macro.prev}</button>
            <button onClick={goToday} className="text-[11px] font-black text-[#0F172A] hover:text-cyan-600 border border-[#0F172A] hover:border-cyan-500 px-3 py-2 transition-all uppercase">{t.macro.today}</button>
            <button onClick={goNextMonth} className="text-[11px] font-black text-slate-600 hover:text-cyan-500 border border-slate-400 hover:border-cyan-500 px-3 py-2 transition-all uppercase">{t.macro.next}</button>
            <div className="text-right ml-4">
              <div className="text-xs text-slate-500 font-black uppercase">{t.macro.currentEpoch}</div>
              <div className="text-xl text-[#0F172A] font-black italic uppercase">{t.months[viewMonth]}_{viewYear}</div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22C55E]" />
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">
            {t.macro.source} // {monthEventCount} {t.macro.eventsThisMonth} // {t.macro.adminManaged}
          </span>
        </div>
      </div>

      <div className="bg-slate-950/40 p-0.5 border border-slate-800 rounded-sm shadow-2xl">
        <div className="grid grid-cols-7 gap-0 bg-slate-900/60 border-b border-slate-800">
          {t.weekDays.map(day => (
            <div key={day} className="border-r border-slate-800 p-4 text-center last:border-r-0">
              <span className="text-[11px] font-black text-cyan-500 tracking-[0.3em]">{day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0 border-l border-slate-800">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="border-r border-b border-slate-800 bg-slate-900/20" />
          ))}
          {calendarDays.map(day => {
            const events = getEventsForDay(day);
            const isToday = day === currentDay;
            return (
              <div key={day} className={`min-h-[120px] md:min-h-[160px] border p-2 relative group transition-all duration-300 backdrop-blur-md ${isToday
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[inset_0_0_20px_rgba(6,182,212,0.15),0_0_15px_rgba(6,182,212,0.3)] z-10'
                  : 'bg-slate-950/90 border-slate-800 hover:border-slate-600 hover:bg-slate-900'
                }`}>
                <span className={`text-sm font-black font-mono transition-colors ${isToday ? 'text-cyan-400' : 'text-slate-100 group-hover:text-cyan-400'}`}>
                  {day.toString().padStart(2, '0')}
                </span>
                {isToday && (<div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_#00F0FF] animate-calendar-glow" />)}
                <div className="mt-3 space-y-1.5">
                  {events.map(ev => {
                    const colorClass = ev.status === 'upcoming'
                      ? 'border-cyan-500/50 bg-cyan-600/20 text-cyan-300'
                      : ev.signal === 'BULLISH'
                        ? 'border-emerald-500/50 bg-emerald-600/80 text-white'
                        : 'border-red-500/50 bg-red-600/80 text-white';
                    return (
                      <button key={ev.id} onClick={() => setSelectedEvent(ev)}
                        className={`w-full text-left p-1.5 border rounded-sm text-[10px] font-black uppercase tracking-tighter truncate hover:brightness-125 transition-all shadow-sm ${colorClass}`}>
                        {ev.region} // {ev.indicator.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
                <div className={`absolute bottom-1 right-1 text-[8px] font-black uppercase pointer-events-none transition-opacity ${isToday ? 'text-cyan-500/40' : 'text-white/5'}`}>SEC_{day}</div>
              </div>
            );
          })}
          {Array.from({ length: (7 - ((daysInMonth + startOffset) % 7)) % 7 }).map((_, i) => (
            <div key={`fill-${i}`} className="border-r border-b border-slate-800 bg-slate-900/20" />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0F172A]/90 backdrop-blur-xl">
          <div className="w-full max-w-2xl border-2 border-cyan-500 bg-slate-950 p-6 md:p-10 relative shadow-[0_0_50px_rgba(0,240,255,0.4)]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-cyan-500 hover:text-white font-black text-[10px] border border-cyan-500/30 px-3 py-1 bg-cyan-500/10 transition-all uppercase">
              {t.macro.terminateLink}
            </button>
            <div className="space-y-8 font-mono">
              <div>
                <div className="text-[10px] text-cyan-500/70 uppercase tracking-[0.4em] mb-2 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-cyan-500/30" /> {t.macro.secureIntel} // {selectedEvent.id}
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{selectedEvent.indicator}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs bg-cyan-500 text-black px-2 py-0.5 font-bold">{selectedEvent.region}</span>
                  <span className="text-xs text-white/50">{selectedEvent.time} AEDT</span>
                </div>
              </div>
              <div className="grid grid-cols-3 border border-white/10 bg-white/5 divide-x divide-white/10">
                <div className="p-4 text-center"><div className="text-[9px] text-white/30 uppercase mb-1">{t.macro.previous}</div><div className="text-xl font-bold text-white italic">{selectedEvent.previous}</div></div>
                <div className="p-4 text-center"><div className="text-[9px] text-white/30 uppercase mb-1">{t.macro.forecast}</div><div className="text-xl font-bold text-white italic">{selectedEvent.estimate}</div></div>
                <div className="p-4 text-center bg-white/5"><div className="text-[9px] text-cyan-500/50 uppercase mb-1">{t.macro.actual}</div><div className={`text-xl font-black italic ${selectedEvent.status === 'released' ? 'text-cyan-400' : 'text-slate-600 animate-pulse'}`}>{selectedEvent.actual || 'TBD'}</div></div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <div className="text-[9px] text-white/40 uppercase tracking-widest">{t.macro.signalBias}</div>
                    <div className={`px-4 py-1 text-xs font-black rounded-sm shadow-[0_0_15px_currentColor] ${selectedEvent.signal === 'BULLISH' ? 'bg-emerald-500 text-black' : selectedEvent.signal === 'BEARISH' ? 'bg-red-500 text-black' : 'bg-slate-700 text-white'}`}>
                      {selectedEvent.signal || t.macro.calibrating}
                    </div>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-[9px] text-white/40 uppercase tracking-widest">{t.macro.impactTargets}</div>
                    <div className="flex gap-2">
                      {selectedEvent.impactTargets.map(tgt => (
                        <span key={tgt} className="text-[10px] font-bold text-cyan-400/80 border border-cyan-500/20 px-2 py-0.5">[{tgt}]</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-white/20" /> {t.macro.intelBriefing}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300 italic border-l border-white/10 pl-4 py-1">{selectedEvent.briefing}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 text-[9px] text-white/20 uppercase italic tracking-widest">ENCRYPTION_LAYER: AES-256 // END_OF_LOG</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes calendar-glow {
          0%, 100% { opacity: 1; transform: scaleX(1); }
          50% { opacity: 0.5; transform: scaleX(0.98); }
        }
        .animate-calendar-glow { animation: calendar-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default MacroPage;
