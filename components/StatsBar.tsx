
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useSiteStats } from '../hooks/useSiteStats';

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  subDetail: string;
  color: string;
}

const StatCard: React.FC<StatItemProps> = ({ label, value, suffix = "", subDetail, color }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-950/80 backdrop-blur-md border border-white/5 p-6 relative group flex flex-col items-start overflow-hidden transition-all hover:bg-slate-900/90"
    >
      {/* Accent Line - Left */}
      <div className="absolute top-0 left-0 w-[4px] h-full" style={{ backgroundColor: color }} />

      {/* Decorative Corner (Top Right) */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none">
        <div className="absolute top-2 right-2 w-full h-[1px] bg-white" />
        <div className="absolute top-2 right-2 h-full w-[1px] bg-white" />
      </div>

      <div className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.2em] mb-4">
        {label}
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <motion.span
          className="text-5xl md:text-6xl font-mono font-black italic tracking-tighter"
          style={{ color: color }}
        >
          {displayValue < 10 ? `0${displayValue}` : displayValue}
        </motion.span>
        {suffix && (
          <span className="text-2xl font-mono font-black italic" style={{ color: color }}>
            {suffix}
          </span>
        )}
      </div>

      <div className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest mt-auto border-t border-white/5 pt-4 w-full">
        <span className="text-white/20 mr-2">{'>>'}</span>
        {subDetail}
      </div>

      {/* Background Decorative Grid/Scanline */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      </div>
    </motion.div>
  );
};

const StatsBar: React.FC = () => {
  const { data: siteStats, loading } = useSiteStats();

  // Fallback to hardcoded stats while loading or if no data
  const fallbackStats = [
    { label: '// UNIVERSITY_PARTNERS', value: 3, suffix: '', subDetail: 'UNIMELB // MONASH // RMIT', color: '#00F0FF' },
    { label: '// INDUSTRY_NETWORK', value: 5, suffix: '', subDetail: 'LISTA_DAO // CHAINLINK // GOOGLE', color: '#FACC15' },
    { label: '// EVENTS_HOSTED', value: 12, suffix: '', subDetail: 'WORKSHOPS & HACKATHONS', color: '#2563EB' },
    { label: '// COMMUNITY_SIZE', value: 450, suffix: '+', subDetail: 'ACTIVE_MEMBERS', color: '#DC2626' },
  ];

  const stats = (!loading && siteStats.length > 0)
    ? siteStats.map(s => ({
        label: s.label,
        value: s.value,
        suffix: s.suffix,
        subDetail: s.subDetail,
        color: s.color,
      }))
    : fallbackStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, idx) => (
        <StatCard
          key={idx}
          label={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          subDetail={stat.subDetail}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsBar;
