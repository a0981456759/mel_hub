import React from 'react';

const LoadingState: React.FC<{ label?: string }> = ({ label = 'LOADING_DATA' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 font-mono">
      <div className="w-10 h-10 border-2 border-white/10 border-t-cyan-500 rounded-full animate-spin mb-6" />
      <div className="text-[11px] text-cyan-500 font-black uppercase tracking-[0.4em] animate-pulse">
        {label}...
      </div>
      <div className="mt-4 flex gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-cyan-500/40 animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
