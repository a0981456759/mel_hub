
import React from 'react';
import { useCryptoNews } from '../hooks/useCryptoNews';
import { useTranslation } from '../lib/i18n';

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'bullish': return { bg: 'bg-green-500/20', text: 'text-green-400', label: '▲' };
    case 'bearish': return { bg: 'bg-red-500/20', text: 'text-red-400', label: '▼' };
    default: return { bg: 'bg-slate-500/20', text: 'text-slate-400', label: '—' };
  }
};

const formatTimeAgo = (dateStr: string): string => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return '<1H';
  if (hours < 24) return `${hours}H`;
  const days = Math.floor(hours / 24);
  return `${days}D`;
};

const NewsTicker: React.FC = () => {
  const { t } = useTranslation();
  const { data: newsItems, loading, error } = useCryptoNews();

  if (loading || error || newsItems.length === 0) {
    return (
      <div className="w-full bg-transparent py-3 select-none overflow-hidden cursor-default">
        <div className="text-center text-[10px] text-white/30 font-black uppercase tracking-widest animate-pulse">
          {error ? `FEED_ERROR: ${error}` : t.ticker.syncing}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent py-3 select-none group overflow-hidden cursor-default">
      <div className="flex whitespace-nowrap animate-scroll items-center">
        {[...newsItems, ...newsItems, ...newsItems].map((item, idx) => {
          const s = getSentimentColor(item.sentiment);
          return (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center space-x-8 px-8 border-r border-white/10"
            >
              <div className="flex items-center gap-4">
                {/* Time ago */}
                <span className="text-[#94A3B8] font-black uppercase text-[10px] tracking-widest">
                  {formatTimeAgo(item.published_at)}
                </span>

                {/* Title */}
                <span className="text-white font-black uppercase text-sm tracking-tight leading-none group-hover:text-[#00F0FF] transition-colors max-w-[400px] truncate">
                  {item.title}
                </span>

                <div className="flex items-center gap-2">
                  {/* Currency tags */}
                  {item.currencies.slice(0, 2).map((c, i) => (
                    <span key={i} className="text-black bg-[#00F0FF] px-2 py-0.5 text-[10px] font-black uppercase tracking-tight">
                      {c}
                    </span>
                  ))}

                  {/* Sentiment */}
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-sm ${s.bg} ${s.text}`}>
                    {s.label} {item.votes.positive > 0 || item.votes.negative > 0
                      ? `+${item.votes.positive}/-${item.votes.negative}`
                      : item.sentiment.toUpperCase()
                    }
                  </span>

                  {/* Source */}
                  <span className="text-[9px] text-white/20 font-bold uppercase tracking-wider">
                    via {item.source}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 80s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
