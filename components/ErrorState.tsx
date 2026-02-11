import React from 'react';

const ErrorState: React.FC<{ message?: string }> = ({ message = 'UNKNOWN_ERROR' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 font-mono">
      <div className="text-red-500 text-4xl font-black mb-4">!</div>
      <div className="text-[11px] text-red-500 font-black uppercase tracking-[0.3em] mb-2">
        SYSTEM_ERROR
      </div>
      <div className="text-[10px] text-white/50 uppercase tracking-widest max-w-md text-center">
        {message}
      </div>
      <div className="mt-6 px-4 py-2 border border-red-500/30 bg-red-500/10 text-[9px] text-red-400 uppercase tracking-widest">
        [ RETRY_OR_CONTACT_ADMIN ]
      </div>
    </div>
  );
};

export default ErrorState;
