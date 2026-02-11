
import React from 'react';
import StatsBar from './StatsBar';
import MemberCard from './MemberCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useTranslation } from '../lib/i18n';

const TeamPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: teamMembers, loading, error } = useTeamMembers();

  if (loading) return <LoadingState label={t.team.loading} />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="w-full space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#0F172A] pb-6">
        <div className="space-y-2">
          <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em]">{t.team.subtitle}</div>
          <h1 className="heading-xl text-6xl text-[#0F172A]">{t.team.title}</h1>
        </div>
        <div className="mt-6 md:mt-0 text-right">
          <div className="text-[10px] text-[#475569] font-black uppercase">{t.team.nodeLabel}</div>
          <div className="text-xl font-black italic text-[#2563EB] uppercase tracking-tighter">{t.team.activeEntities} 42</div>
        </div>
      </div>

      <StatsBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}

        {/* Recruitment Card */}
        <div className="border-4 border-dashed border-[#0F172A] flex flex-col items-center justify-center p-8 bg-transparent group cursor-pointer hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all animate-pulse-border">
          <span className="text-6xl font-black text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors italic">+</span>
          <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest group-hover:text-[#2563EB] italic">{t.team.recruit}</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-border {
          0%, 100% { opacity: 1; border-color: #0F172A; }
          50% { opacity: 0.5; border-color: #2563EB; }
        }
        .animate-pulse-border {
          animation: pulse-border 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
