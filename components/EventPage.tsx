
import React, { useState } from 'react';
import { EventItem } from '../types';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useEvents } from '../hooks/useEvents';
import { useTranslation } from '../lib/i18n';

const EventPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: eventData, loading, error } = useEvents();
  const [viewMode, setViewMode] = useState<'latest' | 'archived'>('latest');
  const [selectedReport, setSelectedReport] = useState<EventItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'DEFI', 'INFRA', 'MEV', 'SECURITY'];

  if (loading) return <LoadingState label={t.events.loading} />;
  if (error) return <ErrorState message={error} />;

  const activeReports = eventData.filter(e => e.status !== 'COMPLETED');
  const archivedReports = eventData.filter(e => e.status === 'COMPLETED');

  const filteredReports = (viewMode === 'latest' ? activeReports : archivedReports).filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.eventId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' ||
      report.title.toUpperCase().includes(activeCategory) ||
      (report.missionReport && report.missionReport.toUpperCase().includes(activeCategory)) ||
      (activeCategory === 'SECURITY' && (report.title.toUpperCase().includes('PROOFS') || report.title.toUpperCase().includes('SECURITY')));
    return matchesSearch && matchesCategory;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'RSVP_OPEN': return t.events.accessPublic;
      case 'ACTIVE': return t.events.accessRestricted;
      case 'COMPLETED': return t.events.accessArchived;
      default: return t.events.accessClassified;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RSVP_OPEN': return 'text-cyan-400';
      case 'ACTIVE': return 'text-yellow-400';
      case 'COMPLETED': return 'text-slate-500';
      default: return 'text-red-400';
    }
  };

  return (
    <div className="w-full space-y-12 font-mono">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-700 pb-8">
        <div>
          <div className="text-[11px] text-cyan-500 font-black uppercase tracking-[0.4em] mb-2">{t.events.subtitle}</div>
          <h1 className="text-6xl font-black text-[#0F172A] italic tracking-tighter uppercase">{t.events.title}</h1>
        </div>

        <div className="mt-8 md:mt-0 flex bg-slate-900 p-1 border border-slate-700 shadow-xl">
          <button
            onClick={() => setViewMode('latest')}
            className={`px-6 py-2 text-[10px] font-black uppercase transition-all italic ${viewMode === 'latest' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            {t.events.activeIntel}
          </button>
          <button
            onClick={() => setViewMode('archived')}
            className={`px-6 py-2 text-[10px] font-black uppercase transition-all italic ${viewMode === 'archived' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            {t.events.historyLogs}
          </button>
        </div>
      </div>

      {/* Tactical Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-950 p-6 border-2 border-slate-800 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 opacity-50" />

        <div className="flex flex-wrap gap-2 w-full md:w-auto z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[12px] font-bold uppercase tracking-tighter transition-all border-2 ${activeCategory === cat
                  ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-cyan-500/50'
                }`}
            >
              [ {cat} ]
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96 group z-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-black text-lg pointer-events-none group-focus-within:animate-pulse">
            {'>'}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.events.searchPlaceholder}
            className="w-full bg-black border-2 border-slate-700 pl-10 pr-4 py-3.5 text-sm font-mono font-bold text-white uppercase placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-cyan-500 animate-terminal-cursor pointer-events-none shadow-[0_0_10px_#00F0FF]" />
        </div>
      </div>

      {/* List Container */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => {
            const isArchived = report.status === 'COMPLETED';
            return (
              <div key={report.id} className={`border-l-4 p-6 flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-md relative overflow-hidden group transition-all duration-300 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900/95 shadow-lg ${isArchived ? 'opacity-60' : ''}`}>
                <div className="flex-none w-28 text-center border-r border-white/5 mr-8 flex flex-col justify-center">
                  <div className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-1">{t.events.published}</div>
                  <div className="text-3xl font-black text-white tracking-tighter italic leading-none">{report.day}</div>
                  <div className="text-[11px] text-cyan-500 font-black uppercase tracking-widest">{report.month}</div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] text-slate-500 font-black tracking-widest">ID: {report.eventId}</span>
                    <div className="flex gap-2">
                      <span className="text-[8px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-black uppercase tracking-tighter">SOLIDITY</span>
                      <span className="text-[8px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-black uppercase tracking-tighter">MEV</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-cyan-400 transition-colors">
                    {report.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-[9px] text-white/50 font-black uppercase tracking-tight">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-500/70">{t.events.node}</span>
                      <span className="text-white/70">{report.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-500/70">{t.events.author}</span>
                      <span className="text-white/70">{report.speaker || t.events.unknownResearcher}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-right min-w-[180px] md:pl-8 mt-6 md:mt-0 border-t md:border-t-0 md:border-l border-white/5">
                  <div className="mb-4">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${getStatusColor(report.status)} ${report.status === 'RSVP_OPEN' ? 'animate-pulse' : ''}`}>
                      {getStatusLabel(report.status)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="w-full text-[10px] border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all uppercase font-black italic tracking-widest"
                  >
                    {t.events.accessReport}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-16 border-2 border-dashed border-slate-800 text-center bg-slate-900/40">
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest italic animate-pulse">{t.events.noIntel}</span>
          </div>
        )}
      </div>

      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl">
          <div className="w-full max-w-5xl border-t-4 border-cyan-500 bg-slate-950 p-6 md:p-12 relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-6 right-6 text-white hover:text-cyan-400 font-black text-xs border border-white/20 px-3 py-1 bg-white/5 transition-all"
            >
              {t.events.closeLink}
            </button>
            <div className="space-y-10">
              <div className="border-b border-white/10 pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs text-cyan-500 font-black uppercase tracking-[0.3em]">{t.events.secureDoc} // {selectedReport.eventId}</span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="text-[10px] text-white/40 font-black uppercase">{selectedReport.year}.{selectedReport.month}.{selectedReport.day}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-tight">{selectedReport.title}</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-cyan-500" /> {t.events.abstractSummary}
                    </h4>
                    <p className="text-lg font-medium text-slate-300 leading-relaxed border-l-2 border-cyan-500/30 pl-8 italic">
                      {selectedReport.missionReport || t.events.abstractNA}
                    </p>
                  </div>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
                    <h4 className="text-[11px] font-black text-white/50 uppercase tracking-widest mb-4">{t.events.systemLogs}</h4>
                    <div className="space-y-2 text-[10px] font-mono text-cyan-400/70">
                      <div>{'>'} INITIALIZING SECURE READ... DONE</div>
                      <div>{'>'} DECRYPTING METADATA... DONE</div>
                      <div>{'>'} VERIFYING SIGNATURE: {selectedReport.speaker?.toUpperCase() || 'ROOT_CA'}... VALID</div>
                      <div className="animate-pulse">{'>'} AWAITING OPERATOR INPUT_</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-cyan-500" /> {t.events.attachedAssets}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {(selectedReport.visualLogs && selectedReport.visualLogs.length > 0 ? selectedReport.visualLogs : ['DATAPOINT_ALPHA', 'DATAPOINT_BETA', 'SCHEMATIC_V1']).map((log, i) => (
                        <div key={i} className="px-4 py-4 bg-slate-900 border border-white/10 flex items-center justify-between group cursor-pointer hover:border-cyan-500 transition-colors">
                          <span className="text-[10px] text-white/60 font-black group-hover:text-cyan-400 transition-colors uppercase italic">{log}</span>
                          <span className="text-cyan-500 text-xs opacity-0 group-hover:opacity-100">↓</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <button className="w-full py-4 bg-cyan-500 text-black text-xs font-black uppercase italic tracking-[0.2em] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] transition-transform">
                      {t.events.downloadPdf}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes terminal-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-terminal-cursor {
          animation: terminal-cursor 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default EventPage;
