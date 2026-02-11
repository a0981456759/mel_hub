
import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#D1D5DB]">
      {/* HUD Corner Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-[#2563EB]" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-4 border-r-4 border-[#2563EB]" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-4 border-l-4 border-[#2563EB]" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-[#2563EB]" />
      
      {/* Central Crosshair Decal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 flex items-center justify-center">
         <div className="w-full h-[1px] bg-[#0F172A]" />
         <div className="h-full w-[1px] bg-[#0F172A] absolute" />
         <div className="w-8 h-8 border-2 border-[#0F172A] rounded-full absolute" />
      </div>

      {/* Side Tech Info */}
      <div className="absolute left-[2%] top-1/2 -translate-y-1/2 vertical-text text-[10px] font-bold text-[#2563EB]/40 uppercase tracking-widest">
        MOBILE_SUIT_RESEARCH_UNIT // MODEL_MEL_01
      </div>
      
      {/* Bottom Technical Strips */}
      <div className="absolute bottom-[12%] left-0 w-full h-[1px] bg-[#2563EB] opacity-20" />
      <div className="absolute bottom-[10%] left-0 w-full h-[40px] bg-[#2563EB]/5 skew-y-1" />
    </div>
  );
};

export default GridBackground;
