
import React from 'react';
import { GalleryItem } from '../types';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useGallery } from '../hooks/useGallery';
import { useTranslation } from '../lib/i18n';

const FeedCard: React.FC<{ feed: GalleryItem }> = ({ feed }) => {
  return (
    <div className="bg-slate-950 border border-slate-800 relative group overflow-hidden flex flex-col shadow-2xl">
      {/* Viewfinder Overlays */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-blink shadow-[0_0_8px_#dc2626]" />
          <span className="text-[10px] font-black text-white/80 uppercase tracking-widest drop-shadow-md">
            REC ● {feed.timestamp}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.2em] drop-shadow-md">
            LOC: {feed.location}
          </span>
        </div>
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/40 pointer-events-none z-20" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/40 pointer-events-none z-20" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/40 pointer-events-none z-20" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/40 pointer-events-none z-20" />
        <img
          src={feed.imageUrl}
          alt={feed.location}
          className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700"
        />
        <div className="absolute inset-0 pointer-events-none z-10 scanline-pattern opacity-30 group-hover:opacity-10 transition-opacity" />
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity mix-blend-overlay" />
      </div>
      <div className="p-3 flex justify-between items-center bg-slate-900 border-t border-slate-800">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          SYSTEM_LABEL: {feed.camId}
        </span>
        <button className="text-[8px] font-black text-cyan-500/50 hover:text-cyan-400 uppercase tracking-widest transition-colors">
          [ DECRYPT_INTEL ]
        </button>
      </div>
      <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
        <h3 className="text-cyan-400 font-black text-sm mb-4 uppercase tracking-[0.2em]">{feed.location}</h3>
        <p className="text-white text-xs font-bold leading-relaxed italic border-x border-white/10 px-6">
          {feed.description}
        </p>
        <div className="mt-8">
          <span className="text-[9px] text-white/30 uppercase tracking-[0.4em]">ENCRYPTED_ASSET_v4</span>
        </div>
      </div>
    </div>
  );
};

const VisualArchivePage: React.FC = () => {
  const { t } = useTranslation();
  const { data: galleryData, loading, error } = useGallery();

  if (loading) return <LoadingState label={t.visuals.loading} />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="w-full space-y-12 font-mono pb-20">
      {/* Header Section */}
      <div className="border-b-4 border-cyan-500 pb-8">
        <div className="text-[11px] text-cyan-500 font-black uppercase tracking-[0.5em] mb-2">{t.visuals.subtitle}</div>
        <div className="flex justify-between items-end">
          <h1 className="text-6xl font-black text-[#0F172A] italic tracking-tighter uppercase">{t.visuals.title}</h1>
          <div className="text-right hidden md:block">
            <div className="text-xs text-slate-500 font-black uppercase">RECON_NODES</div>
            <div className="text-xl text-cyan-500 font-black italic uppercase">{galleryData.length}_ACTIVE_FEEDS</div>
          </div>
        </div>
      </div>

      {/* Feeds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryData.map(feed => (
          <FeedCard key={feed.id} feed={feed} />
        ))}

        <div className="aspect-video bg-slate-950 border border-slate-800 border-dashed flex items-center justify-center relative overflow-hidden group cursor-wait">
          <div className="absolute inset-0 scanline-pattern opacity-10" />
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/10 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">SIGNAL_LOST... SEARCHING_UPLINK</span>
          </div>
        </div>
      </div>

      <style>{`
        .scanline-pattern {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0px,
            rgba(0, 0, 0, 0.4) 1px,
            rgba(0, 0, 0, 0) 2px
          );
          background-size: 100% 3px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.5s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default VisualArchivePage;
