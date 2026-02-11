
import React, { useState } from 'react';
import { useResearchArchive } from '../hooks/useResearchArchive';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const ArchivePage: React.FC = () => {
  const { data: archiveData, loading, error } = useResearchArchive();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSector, setActiveSector] = useState<string>('ALL');

  const sectors = ['ALL', 'DeFi', 'L1/L2', 'Infrastructure', 'NFT', 'Macro'];

  if (loading) return <LoadingState label="DECRYPTING_ARCHIVE" />;
  if (error) return <ErrorState message={error} />;

  const filteredData = archiveData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.fileId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = activeSector === 'ALL' || item.sector === activeSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="w-full space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-[#0F172A] pb-6 gap-6">
        <div>
          <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-widest mb-2">/// CORE_RESEARCH_FILES ///</div>
          <h1 className="heading-xl text-6xl text-[#0F172A]">ARCHIVE.</h1>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="INPUT_QUERY..."
            className="w-full bg-[#E5E7EB] border-2 border-[#0F172A] outline-none px-4 py-3 text-sm font-black placeholder:text-[#475569]/40 text-[#0F172A] uppercase italic focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setActiveSector(sector)}
            className={`px-4 py-2 text-[10px] font-black uppercase transition-all border-2 ${
              activeSector === sector
              ? 'bg-[#2563EB] text-white border-[#2563EB]'
              : 'border-[#0F172A] text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="border-2 border-[#0F172A] p-0 group flex flex-col md:flex-row bg-[#E5E7EB] hover:border-[#2563EB] transition-all cursor-pointer shadow-[4px_4px_0px_0px_#0F172A] hover:shadow-[4px_4px_0px_0px_#2563EB]"
          >
            <div className="md:w-32 bg-[#0F172A] border-b-2 md:border-b-0 md:border-r-2 border-[#0F172A] p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[9px] text-white/40 font-black mb-1 italic">{item.date}</span>
              <span className="text-sm font-black text-[#2563EB] italic">{item.fileId}</span>
            </div>

            <div className="flex-1 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black uppercase bg-[#2563EB] text-white px-2 py-0.5">
                  {item.sector}
                </span>
                <span className="text-[8px] font-black uppercase text-[#475569]">ACCESS: {item.readTime}</span>
              </div>

              <h3 className="text-2xl font-black tracking-tight uppercase italic leading-none text-[#0F172A]">
                {item.title}
              </h3>

              <p className="text-[11px] leading-tight font-bold text-[#475569] max-w-2xl">
                {item.excerpt}
              </p>
            </div>

            <div className="p-6 flex items-center justify-end">
              <button className="px-6 py-3 bg-[#0F172A] text-white text-[10px] font-black uppercase hover:bg-[#2563EB] transition-all italic">
                DOWNLOAD_INTEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivePage;
