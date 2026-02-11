
import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';

interface FAQItem {
    q: string;
    a: string;
}

const FAQAccordion: React.FC<{ item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }> = ({ item, index, isOpen, onToggle }) => {
    return (
        <div className="border-2 border-[#0F172A] bg-white hover:border-[#2563EB] transition-all overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
            >
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-[#2563EB] tracking-wider">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-black uppercase tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                        {item.q}
                    </span>
                </div>
                <span className={`text-lg font-black text-[#2563EB] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 border-t border-[#0F172A]/10">
                    <p className="text-[12px] font-bold text-[#475569] leading-relaxed pt-4 whitespace-pre-line">
                        {item.a}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const categories = [
        { title: t.faq.aboutTitle, items: t.faq.aboutItems },
        { title: t.faq.cryptoTitle, items: t.faq.cryptoItems },
        { title: t.faq.joinTitle, items: t.faq.joinItems },
    ];

    let globalIndex = 0;

    return (
        <div className="w-full space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#0F172A] pb-6">
                <div className="space-y-2">
                    <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em]">{t.faq.subtitle}</div>
                    <h1 className="heading-xl text-4xl md:text-6xl text-[#0F172A]">{t.faq.title}</h1>
                </div>
            </div>

            {/* FAQ Sections */}
            {categories.map((cat, catIdx) => {
                const sectionStart = globalIndex;
                globalIndex += cat.items.length;
                return (
                    <div key={catIdx} className="space-y-4">
                        <div className="text-[10px] font-black text-[#2563EB] uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-[#2563EB]"></span>
                            {cat.title}
                        </div>
                        <div className="space-y-3">
                            {cat.items.map((item: FAQItem, i: number) => {
                                const idx = sectionStart + i;
                                return (
                                    <FAQAccordion
                                        key={idx}
                                        item={item}
                                        index={idx}
                                        isOpen={openIndex === idx}
                                        onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FAQPage;
