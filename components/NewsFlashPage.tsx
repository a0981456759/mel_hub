
import React from 'react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useNewsFlash } from '../hooks/useNewsFlash';

const NewsFlashPage: React.FC = () => {
  const { data: newsFlashData, loading, error } = useNewsFlash();

  // Categorize colors for the pill badges
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'MARKET': return 'bg-red-600';
      case 'TECH': return 'bg-blue-600';
      case 'ON-CHAIN': return 'bg-emerald-600';
      case 'POLICY': return 'bg-purple-600';
      case 'SOCIAL': return 'bg-orange-600';
      default: return 'bg-slate-600';
    }
  };

  if (loading) return <LoadingState label="DECRYPTING_TELEMETRY" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="w-full space-y-6 font-mono">
      {/* Header Section */}
      <div className="border-b-2 border-cyan-500/30 pb-4 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
          <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em]">
            /// [TERMINAL_MODE_ACTIVE] ///
          </div>
        </div>
        <h1 className="text-4xl font-black text-[#0F172A] italic tracking-tighter uppercase">
          LIVE_TELEMETRY.sys
        </h1>
      </div>

      {/* Terminal Container */}
      <div className="bg-[#0F172A] rounded-sm border border-slate-800 shadow-2xl overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[9px] text-slate-400 font-bold tracking-widest">
            STDOUT -- NODE_01 -- LOG_LEVEL: VERBOSE
          </div>
        </div>

        {/* Log Entries */}
        <div className="divide-y divide-slate-800">
          {newsFlashData.map((news, index) => (
            <div
              key={news.id}
              className="group flex flex-col md:flex-row items-start md:items-center px-4 py-3 gap-4 hover:bg-cyan-900/20 transition-colors relative"
            >
              {/* Timestamp */}
              <div className="text-cyan-500 font-bold text-sm whitespace-nowrap min-w-[100px]">
                [{news.time}]
              </div>

              {/* Category Badge */}
              <div className={`${getCategoryStyle(news.category)} text-white text-[9px] font-black px-2 py-0.5 rounded-sm tracking-tighter min-w-[70px] text-center`}>
                {news.category}
              </div>

              {/* Main Message */}
              <div className="flex-1 text-slate-100 text-sm leading-relaxed tracking-tight font-medium">
                <span className={news.isAlert ? 'text-red-400' : ''}>
                  {news.headline}
                </span>
                <span className="mx-2 text-slate-600">|</span>
                <span className="text-slate-400 text-xs italic">
                  {news.summary}
                </span>
                {index === 0 && (
                  <span className="inline-block w-1.5 h-4 bg-cyan-500 ml-2 animate-terminal-cursor align-middle" />
                )}
              </div>

              {/* Tech Details / Log ID */}
              <div className="hidden lg:flex items-center gap-4 text-[10px] text-slate-600 font-bold">
                <div className="flex items-center gap-1">
                  <span className="opacity-50">SRCE:</span>
                  <span className="text-slate-500">{news.source}</span>
                </div>
                <div className="bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700">
                  LOG_ID: #{news.id.toUpperCase().padStart(4, '0')}
                </div>
              </div>

              {/* Active Row Indicator */}
              {index === 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500" />
              )}
            </div>
          ))}
        </div>

        {/* Terminal Footer */}
        <div className="bg-slate-900/50 px-4 py-2 border-t border-slate-800 flex justify-between items-center">
          <div className="text-[10px] text-slate-500 flex gap-4">
            <span>PACKETS_RECEIVED: {newsFlashData.length * 124}</span>
            <span>UPLINK_STRENGTH: 98%</span>
          </div>
          <div className="text-[10px] text-cyan-500 animate-pulse">
            REC: STREAMING_ACTIVE...
          </div>
        </div>
      </div>

      {/* Manual Input Line Decal */}
      <div className="flex items-center gap-2 px-4 text-slate-500 text-sm opacity-50">
        <span>$</span>
        <span className="animate-pulse">_</span>
        <span className="text-[10px] tracking-widest ml-2 uppercase">Awaiting operator instruction...</span>
      </div>

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

export default NewsFlashPage;
