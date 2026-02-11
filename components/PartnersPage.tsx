
import React from 'react';
import { usePartners } from '../hooks/usePartners';
import { useTranslation } from '../lib/i18n';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { Partner } from '../types';

const SocialIcon: React.FC<{ type: 'x' | 'instagram' | 'linkedin'; url: string }> = ({ type, url }) => {
    const icons: Record<string, string> = {
        x: '𝕏',
        instagram: '📷',
        linkedin: 'in',
    };

    const labels: Record<string, string> = {
        x: 'X',
        instagram: 'IG',
        linkedin: 'LI',
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/social flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[#0F172A] bg-[#F1F5F9] hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all"
        >
            <span className="text-xs text-[#0F172A] group-hover/social:text-[#2563EB] transition-colors">
                {icons[type]}
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#475569] group-hover/social:text-[#2563EB] transition-colors">
                {labels[type]}
            </span>
        </a>
    );
};

const PartnerCard: React.FC<{ partner: Partner; index: number }> = ({ partner, index }) => {
    return (
        <div className="group relative border-2 border-[#0F172A] bg-white hover:border-[#2563EB] transition-all duration-300 overflow-hidden">
            {/* Index Tag */}
            <div className="absolute top-0 left-0 bg-[#0F172A] text-white px-3 py-1.5 z-10">
                <span className="text-[10px] font-black tracking-wider">NODE_{String(index + 1).padStart(2, '0')}</span>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]"></span>
                <span className="text-[9px] font-black text-[#475569] uppercase tracking-wider">LINKED</span>
            </div>

            {/* Logo Area */}
            <div className="pt-12 pb-6 px-6 flex justify-center">
                <div className="w-24 h-24 border-2 border-[#0F172A] group-hover:border-[#2563EB] transition-colors overflow-hidden bg-[#F1F5F9] flex items-center justify-center">
                    <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>
            </div>

            {/* Info */}
            <div className="px-6 pb-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                    {partner.name}
                </h3>
                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide mt-1 leading-relaxed line-clamp-2">
                    {partner.description}
                </p>
            </div>

            {/* Divider */}
            <div className="mx-6 h-[2px] bg-[#0F172A]/10 group-hover:bg-[#2563EB]/30 transition-colors" />

            {/* Social Links */}
            <div className="px-6 py-4 flex items-center gap-2 flex-wrap">
                {partner.website && (
                    <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 border border-[#0F172A] bg-[#0F172A] text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all"
                    >
                        <span className="text-[9px] font-black uppercase tracking-wider">WEB ↗</span>
                    </a>
                )}
                {partner.socialX && <SocialIcon type="x" url={partner.socialX} />}
                {partner.socialInstagram && <SocialIcon type="instagram" url={partner.socialInstagram} />}
                {partner.socialLinkedin && <SocialIcon type="linkedin" url={partner.socialLinkedin} />}
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-[#0F172A] group-hover:bg-[#2563EB] transition-colors" />
        </div>
    );
};

const PartnersPage: React.FC = () => {
    const { t } = useTranslation();
    const { data: partners, loading, error } = usePartners();

    if (loading) return <LoadingState label={t.partners.loading} />;
    if (error) return <ErrorState message={error} />;

    return (
        <div className="w-full space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#0F172A] pb-6">
                <div className="space-y-2">
                    <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em]">{t.partners.subtitle}</div>
                    <h1 className="heading-xl text-6xl text-[#0F172A]">{t.partners.title}</h1>
                </div>
                <div className="mt-6 md:mt-0 text-right">
                    <div className="text-[10px] text-[#475569] font-black uppercase">{t.partners.networkStatus}</div>
                    <div className="text-xl font-black italic text-[#2563EB] uppercase tracking-tighter">
                        {t.partners.activeNodes} {partners.length}
                    </div>
                </div>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {partners.map((partner, idx) => (
                    <PartnerCard key={partner.id} partner={partner} index={idx} />
                ))}

                {/* CTA Card */}
                <div className="border-4 border-dashed border-[#0F172A] flex flex-col items-center justify-center p-8 bg-transparent group cursor-pointer hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all animate-pulse-border min-h-[280px]">
                    <span className="text-5xl font-black text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors italic">🤝</span>
                    <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest group-hover:text-[#2563EB] italic text-center">
                        {t.partners.becomePartner}
                    </span>
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

export default PartnersPage;
