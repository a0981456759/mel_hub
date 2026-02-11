
import React from 'react';
import { TeamMember } from '../types';

const SkillRadar: React.FC<{ memberId: string; className?: string }> = ({ memberId, className = "" }) => {
  // Deterministic mock stats for the visualization based on member ID
  const seed = parseInt(memberId) || 1;
  const stats = [
    (seed * 20 + 30) % 100, // CODE
    (seed * 15 + 45) % 100, // STRATEGY
    (seed * 10 + 60) % 100, // DEFI
    (seed * 25 + 20) % 100, // OPS
    (seed * 5 + 75) % 100,  // MEV
    (seed * 30 + 10) % 100, // DESIGN
  ];

  const labels = ["CODE", "STRAT", "DEFI", "OPS", "MEV", "DSGN"];
  const points = stats.map((stat, i) => {
    const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
    const r = (stat / 100) * 40;
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  }).join(' ');

  const gridPoints = [20, 40].map(r => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
    }).join(' ');
  });

  return (
    <div className={`w-full aspect-square relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 opacity-80">
        {/* Grids */}
        {gridPoints.map((p, i) => (
          <polygon key={i} points={p} fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.5" />
        ))}
        {/* Axis */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          return <line key={i} x1="50" y1="50" x2={50 + 40 * Math.cos(angle)} y2={50 + 40 * Math.sin(angle)} stroke="rgba(0, 240, 255, 0.1)" strokeWidth="0.5" />;
        })}
        {/* Data Shape */}
        <polygon points={points} fill="rgba(0, 240, 255, 0.2)" stroke="#00F0FF" strokeWidth="1" />
        {/* Labels */}
        {labels.map((label, i) => {
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          const x = 50 + 48 * Math.cos(angle);
          const y = 50 + 48 * Math.sin(angle);
          return (
            <text key={i} x={x} y={y} fontSize="4" fill="#94A3B8" fontWeight="900" textAnchor="middle" alignmentBaseline="middle">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="bg-black/60 backdrop-blur-md border border-cyan-500/50 p-6 relative group transition-all hover:translate-y-[-4px] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] flex flex-col gap-4">
      {/* Visual Header: Radar / Photo decryption effect */}
      <div className="relative border-b border-white/5 pb-4 overflow-hidden aspect-square flex items-center justify-center">
        {/* Background Radar (Default State) */}
        <SkillRadar 
          memberId={member.id} 
          className={`transition-opacity duration-300 ${member.image ? 'group-hover:opacity-0' : 'opacity-100'}`} 
        />

        {/* Real Operative Photo (Reveal State) */}
        {member.image && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center p-4">
            <div className="w-4/5 h-4/5 relative overflow-hidden">
               <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 border border-cyan-500/30"
              />
              {/* Scanline overlay for photo */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1/4 w-full animate-scanline pointer-events-none" />
            </div>
          </div>
        )}

        <div className="absolute top-0 left-0 text-[8px] font-black text-cyan-500/50 uppercase tracking-widest">
          UNIT_METRICS // REV_7
        </div>
        <div className="absolute bottom-4 right-0 text-[10px] font-mono text-cyan-500/30">
          ID_{member.code}
        </div>
      </div>

      {/* Operative Info */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse" />
            <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">SYSTEM_ONLINE</span>
          </div>
          <h3 className="text-xl font-black tracking-tight uppercase text-white italic leading-none">
            {member.name.split('_').join(' ')}
          </h3>
          <p className="text-[10px] font-black uppercase text-cyan-500 mt-2 tracking-tighter">
            // {member.role}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {member.specialty.map((s, i) => (
            <span key={i} className="text-[8px] font-black uppercase border border-cyan-500/30 text-cyan-500/70 px-2 py-0.5">
              {s}
            </span>
          ))}
        </div>

        <p className="text-[11px] font-bold leading-relaxed text-gray-400 h-16 overflow-y-auto custom-scrollbar pr-2 italic">
          {member.bio}
        </p>

        <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-500 text-[9px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-2 tracking-widest">
          <span>ACCESS_DATA_STREAM</span>
          <span className="text-xs">&raquo;</span>
        </button>
      </div>
      
      {/* Decorative corner brackets for tech feel */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30" />

      <style>{`
        @keyframes local-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .animate-scanline {
          animation: local-scanline 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MemberCard;
