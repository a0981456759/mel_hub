
import React from 'react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { useSentiment } from '../hooks/useSentiment';
import { SentimentIndicator } from '../types';
import { useTranslation } from '../lib/i18n';

// --- Helper functions ---
const getFearGreedColor = (value: number): string => {
    if (value <= 24) return '#DC2626';
    if (value <= 49) return '#F97316';
    if (value <= 54) return '#FACC15';
    if (value <= 74) return '#84CC16';
    return '#22C55E';
};

const getSignalColor = (signal?: string): string => {
    switch (signal) {
        case 'BULLISH': return '#22C55E';
        case 'BEARISH': return '#DC2626';
        default: return '#FACC15';
    }
};

const getFlowIcon = (classification?: string): string => {
    if (classification === 'Outflow') return '↓';
    if (classification === 'Inflow') return '↑';
    return '→';
};

// --- Sub-components ---

const FearGreedCard: React.FC<{ indicator: SentimentIndicator }> = ({ indicator }) => {
    const { t } = useTranslation();
    const numValue = parseInt(indicator.value) || 0;
    const color = getFearGreedColor(numValue);
    const getFearGreedLabel = (value: number): string => {
        if (value <= 24) return t.sentiment.extremeFear;
        if (value <= 49) return t.sentiment.fear;
        if (value <= 54) return t.sentiment.neutral;
        if (value <= 74) return t.sentiment.greed;
        return t.sentiment.extremeGreed;
    };
    const label = getFearGreedLabel(numValue);

    return (
        <div className="bg-[#0F172A] border border-slate-700 rounded-sm p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: color }} />
            <div className="flex items-center justify-between mb-4">
                <div className="text-[9px] text-slate-500 font-black tracking-widest uppercase">
                    {t.sentiment.fearGreed}
                </div>
                <div className="text-[9px] px-2 py-0.5 border rounded-sm font-black tracking-wider"
                    style={{ borderColor: getSignalColor(indicator.signal), color: getSignalColor(indicator.signal) }}>
                    {indicator.signal || 'N/A'}
                </div>
            </div>
            <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl font-black" style={{ color }}>{numValue}</span>
                <span className="text-lg text-slate-500 font-bold">/100</span>
            </div>
            <div className="text-sm font-black tracking-tighter mb-4" style={{ color }}>
                [{label}]
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${numValue}%`, backgroundColor: color }} />
            </div>
            <div className="flex justify-between text-[8px] text-slate-600 font-bold">
                <span>{t.sentiment.extremeFear}</span>
                <span>{t.sentiment.neutral}</span>
                <span>{t.sentiment.extremeGreed}</span>
            </div>
            {indicator.change24h && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                    <span className="opacity-50">{t.sentiment.delta24h}</span>{' '}
                    <span className={indicator.change24h.startsWith('+') ? 'text-green-400' : indicator.change24h.startsWith('-') ? 'text-red-400' : 'text-slate-400'}>
                        {indicator.change24h}
                    </span>
                </div>
            )}
        </div>
    );
};

const DominanceCard: React.FC<{ indicator: SentimentIndicator }> = ({ indicator }) => {
    const { t } = useTranslation();
    const numValue = parseFloat(indicator.value) || 0;

    return (
        <div className="bg-[#0F172A] border border-slate-700 rounded-sm p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#F7931A]" />
            <div className="flex items-center justify-between mb-4">
                <div className="text-[9px] text-slate-500 font-black tracking-widest uppercase">
                    {t.sentiment.btcDom}
                </div>
                <div className="text-[9px] px-2 py-0.5 border rounded-sm font-black tracking-wider"
                    style={{ borderColor: getSignalColor(indicator.signal), color: getSignalColor(indicator.signal) }}>
                    {indicator.signal || 'N/A'}
                </div>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-black text-[#F7931A]">{indicator.value}</span>
                <span className="text-lg text-slate-500 font-bold">%</span>
            </div>
            <div className="text-[10px] text-slate-400 font-bold tracking-tight mb-4">
                {t.sentiment.btcMarketCap}
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-2 flex">
                <div className="h-full bg-[#F7931A] rounded-l-full transition-all duration-1000" style={{ width: `${numValue}%` }} />
                <div className="h-full bg-[#627EEA] rounded-r-full flex-1" />
            </div>
            <div className="flex justify-between text-[8px] text-slate-600 font-bold">
                <span className="text-[#F7931A]">BTC {numValue}%</span>
                <span className="text-[#627EEA]">ALTS {(100 - numValue).toFixed(1)}%</span>
            </div>
            {indicator.change24h && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                    <span className="opacity-50">{t.sentiment.delta24h}</span>{' '}
                    <span className={indicator.change24h.startsWith('+') ? 'text-green-400' : indicator.change24h.startsWith('-') ? 'text-red-400' : 'text-slate-400'}>
                        {indicator.change24h}
                    </span>
                </div>
            )}
        </div>
    );
};

const NetflowCard: React.FC<{ indicator: SentimentIndicator; token: string; tokenColor: string }> = ({ indicator, token, tokenColor }) => {
    const { t } = useTranslation();
    const isOutflow = indicator.classification === 'Outflow' || indicator.value.startsWith('-');
    const flowDirection = isOutflow ? t.sentiment.outflow : t.sentiment.inflow;
    const flowColor = isOutflow ? '#22C55E' : '#DC2626';

    return (
        <div className="bg-[#0F172A] border border-slate-700 rounded-sm p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: tokenColor }} />
            <div className="flex items-center justify-between mb-4">
                <div className="text-[9px] text-slate-500 font-black tracking-widest uppercase">
          // {token}_{t.sentiment.netflow}
                </div>
                <div className="text-[9px] px-2 py-0.5 border rounded-sm font-black tracking-wider"
                    style={{ borderColor: getSignalColor(indicator.signal), color: getSignalColor(indicator.signal) }}>
                    {indicator.signal || 'N/A'}
                </div>
            </div>
            <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl font-black" style={{ color: flowColor }}>
                    {getFlowIcon(indicator.classification)}
                </span>
                <span className="text-4xl font-black text-white">${indicator.value.replace(/[+-]/g, '')}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <div className="text-sm font-black tracking-tighter" style={{ color: flowColor }}>
                    [{flowDirection}]
                </div>
                <div className="text-[10px] text-slate-500">
                    {isOutflow ? t.sentiment.supplyLeaving : t.sentiment.supplyEntering}
                </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-4 flex-1 rounded-sm transition-all"
                        style={{ backgroundColor: i < (isOutflow ? 7 : 4) ? flowColor : '#1E293B', opacity: 0.3 + (i * 0.07) }} />
                ))}
            </div>
            <div className="flex justify-between text-[8px] text-slate-600 font-bold mt-1">
                <span>{t.sentiment.low}</span>
                <span>{t.sentiment.volumeIntensity}</span>
                <span>{t.sentiment.high}</span>
            </div>
            {indicator.change24h && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                    <span className="opacity-50">{t.sentiment.delta24h}</span>{' '}
                    <span className={indicator.change24h.startsWith('+') ? 'text-red-400' : indicator.change24h.startsWith('-') ? 'text-green-400' : 'text-slate-400'}>
                        {indicator.change24h}
                    </span>
                </div>
            )}
        </div>
    );
};

// --- Main Component ---
const SentimentPage: React.FC = () => {
    const { t } = useTranslation();
    const { data: sentimentData, loading, error } = useSentiment();

    if (loading) return <LoadingState label={t.sentiment.loading} />;
    if (error) return <ErrorState message={error} />;

    const fearGreed = sentimentData.find(d => d.indicatorType === 'FEAR_GREED');
    const btcDom = sentimentData.find(d => d.indicatorType === 'BTC_DOMINANCE');
    const btcFlow = sentimentData.find(d => d.indicatorType === 'BTC_NETFLOW');
    const ethFlow = sentimentData.find(d => d.indicatorType === 'ETH_NETFLOW');

    const lastUpdate = sentimentData[0]?.updatedAt
        ? new Date(sentimentData[0].updatedAt).toLocaleString('en-US', { hour12: false })
        : 'N/A';

    return (
        <div className="w-full space-y-6 font-mono">
            {/* Header */}
            <div className="border-b-2 border-cyan-500/30 pb-4 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
                    <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em]">
                        {t.sentiment.subtitle}
                    </div>
                </div>
                <h1 className="text-4xl font-black text-[#0F172A] italic tracking-tighter uppercase">
                    {t.sentiment.title}
                </h1>
            </div>

            {/* Status Bar */}
            <div className="bg-[#0F172A] rounded-sm border border-slate-800 px-4 py-2 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22C55E]" />
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest">{t.sentiment.feedStatus}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold">
                    {t.sentiment.lastSync} <span className="text-cyan-500">{lastUpdate}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold">
                    {t.sentiment.source} <span className="text-[#FACC15]">ALTERNATIVE.ME</span> / <span className="text-[#FACC15]">COINGECKO</span>
                </div>
            </div>

            {/* Indicator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fearGreed && <FearGreedCard indicator={fearGreed} />}
                {btcDom && <DominanceCard indicator={btcDom} />}
                {btcFlow && <NetflowCard indicator={btcFlow} token="BTC" tokenColor="#F7931A" />}
                {ethFlow && <NetflowCard indicator={ethFlow} token="ETH" tokenColor="#627EEA" />}
            </div>

            {/* Interpretation Legend */}
            <div className="bg-[#0F172A] rounded-sm border border-slate-800 p-4">
                <div className="text-[9px] text-slate-500 font-black tracking-widest mb-3 uppercase">
                    {t.sentiment.signalGuide}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] font-bold">
                    <div className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-sm bg-green-500 mt-0.5 shrink-0" />
                        <div>
                            <div className="text-green-400 mb-1">{t.sentiment.bullishSignal}</div>
                            <div className="text-slate-500">{t.sentiment.bullishDesc}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-sm bg-red-500 mt-0.5 shrink-0" />
                        <div>
                            <div className="text-red-400 mb-1">{t.sentiment.bearishSignal}</div>
                            <div className="text-slate-500">{t.sentiment.bearishDesc}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-3 h-3 rounded-sm bg-yellow-500 mt-0.5 shrink-0" />
                        <div>
                            <div className="text-yellow-400 mb-1">{t.sentiment.neutralSignal}</div>
                            <div className="text-slate-500">{t.sentiment.neutralDesc}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terminal Footer */}
            <div className="flex items-center gap-2 px-4 text-slate-500 text-sm opacity-50">
                <span>$</span>
                <span className="animate-pulse">_</span>
                <span className="text-[10px] tracking-widest ml-2 uppercase">{t.sentiment.refreshNote}</span>
            </div>

            <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }
      `}</style>
        </div>
    );
};

export default SentimentPage;
