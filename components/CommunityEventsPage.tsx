
import React, { useState } from 'react';
import { useCommunityEvents, CommunityEvent } from '../hooks/useCommunityEvents';
import { useTranslation } from '../lib/i18n';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
    meetup: { bg: 'bg-[#2563EB]', text: 'text-white', label: 'MEETUP' },
    workshop: { bg: 'bg-[#FACC15]', text: 'text-black', label: 'WORKSHOP' },
    hackathon: { bg: 'bg-[#22C55E]', text: 'text-black', label: 'HACKATHON' },
};

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
};

const getDaysUntil = (dateStr: string) => {
    const now = new Date();
    const event = new Date(dateStr);
    const diff = Math.ceil((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
};

const RsvpModal: React.FC<{
    event: CommunityEvent;
    onClose: () => void;
    onSubmit: (name: string, email: string) => Promise<void>;
    submitting: boolean;
    result: { success?: boolean; error?: string } | null;
}> = ({ event, onClose, onSubmit, submitting, result }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white border-4 border-[#0F172A] max-w-md w-full p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-[#0F172A] font-black text-xl hover:text-red-500">✕</button>

                <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em] mb-2">{t.community.rsvpTitle}</div>
                <h3 className="text-xl font-black uppercase text-[#0F172A] tracking-tight mb-6">{event.title}</h3>

                {result?.success ? (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-4">✓</div>
                        <div className="text-sm font-black text-[#22C55E] uppercase">{t.community.rsvpSuccess}</div>
                    </div>
                ) : (
                    <form onSubmit={e => { e.preventDefault(); onSubmit(name, email); }} className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block mb-1">{t.community.nameLabel}</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                className="w-full border-2 border-[#0F172A] bg-[#F1F5F9] px-4 py-3 text-sm font-bold text-[#0F172A] focus:border-[#2563EB] outline-none"
                                placeholder={t.community.namePlaceholder}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block mb-1">{t.community.emailLabel}</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                required
                                className="w-full border-2 border-[#0F172A] bg-[#F1F5F9] px-4 py-3 text-sm font-bold text-[#0F172A] focus:border-[#2563EB] outline-none"
                                placeholder={t.community.emailPlaceholder}
                            />
                        </div>
                        {result?.error && (
                            <div className="text-xs font-black text-red-500 uppercase">{result.error === 'ALREADY_REGISTERED' ? t.community.alreadyRegistered : result.error}</div>
                        )}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#0F172A] text-[#00F0FF] border-2 border-[#00F0FF] py-3 text-sm font-black uppercase tracking-wider hover:bg-[#00F0FF] hover:text-[#0F172A] transition-all disabled:opacity-50"
                        >
                            {submitting ? t.community.submitting : t.community.submitRsvp}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

const EventCard: React.FC<{ event: CommunityEvent; onRsvp: (e: CommunityEvent) => void }> = ({ event, onRsvp }) => {
    const typeStyle = typeColors[event.eventType] || typeColors.meetup;
    const daysUntil = getDaysUntil(event.eventDate);
    const isPast = daysUntil < 0;
    const { t } = useTranslation();

    return (
        <div className={`group border-2 border-[#0F172A] bg-white hover:border-[#2563EB] transition-all overflow-hidden ${isPast ? 'opacity-60' : ''}`}>
            {/* Type Badge + Countdown */}
            <div className="flex justify-between items-center px-6 pt-5">
                <span className={`${typeStyle.bg} ${typeStyle.text} px-3 py-1 text-[10px] font-black uppercase tracking-wider`}>
                    {typeStyle.label}
                </span>
                {!isPast && (
                    <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-wider animate-pulse">
                        T-{daysUntil}D
                    </span>
                )}
                {isPast && (
                    <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">
                        {t.community.completed}
                    </span>
                )}
            </div>

            {/* Event Info */}
            <div className="px-6 py-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-2">
                    {event.title}
                </h3>
                <p className="text-[11px] font-bold text-[#64748B] leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                </p>

                {/* Date & Location */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">📅</span>
                        <span className="text-[11px] font-black text-[#0F172A] uppercase">{formatDate(event.eventDate)}</span>
                        <span className="text-[11px] font-bold text-[#2563EB]">{formatTime(event.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">📍</span>
                        <span className="text-[11px] font-bold text-[#64748B]">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">👥</span>
                        <span className="text-[11px] font-bold text-[#64748B]">{t.community.maxAttendees}: {event.maxAttendees}</span>
                    </div>
                </div>
            </div>

            {/* RSVP Button */}
            {!isPast && (
                <div className="px-6 pb-5">
                    <button
                        onClick={() => onRsvp(event)}
                        className="w-full bg-[#0F172A] text-[#00F0FF] border-2 border-[#00F0FF] py-3 text-[11px] font-black uppercase tracking-wider hover:bg-[#00F0FF] hover:text-[#0F172A] transition-all"
                    >
                        {t.community.rsvpBtn}
                    </button>
                </div>
            )}

            {/* Bottom accent */}
            <div className={`h-1 ${typeStyle.bg}`} />
        </div>
    );
};

const CommunityEventsPage: React.FC = () => {
    const { t } = useTranslation();
    const { data: events, loading, error, submitRsvp } = useCommunityEvents();
    const [rsvpEvent, setRsvpEvent] = useState<CommunityEvent | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [rsvpResult, setRsvpResult] = useState<{ success?: boolean; error?: string } | null>(null);

    if (loading) return <LoadingState label={t.community.loading} />;
    if (error) return <ErrorState message={error} />;

    const handleRsvp = async (name: string, email: string) => {
        if (!rsvpEvent) return;
        setSubmitting(true);
        const result = await submitRsvp(rsvpEvent.id, name, email);
        setRsvpResult(result);
        setSubmitting(false);
    };

    const upcoming = events.filter(e => getDaysUntil(e.eventDate) >= 0);
    const past = events.filter(e => getDaysUntil(e.eventDate) < 0);

    return (
        <div className="w-full space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#0F172A] pb-6">
                <div className="space-y-2">
                    <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em]">{t.community.subtitle}</div>
                    <h1 className="heading-xl text-4xl md:text-6xl text-[#0F172A]">{t.community.title}</h1>
                </div>
                <div className="mt-6 md:mt-0 text-right">
                    <div className="text-[10px] text-[#475569] font-black uppercase">{t.community.upcomingLabel}</div>
                    <div className="text-xl font-black italic text-[#2563EB] uppercase tracking-tighter">
                        {upcoming.length} {t.community.scheduled}
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            {upcoming.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {upcoming.map(event => (
                        <EventCard key={event.id} event={event} onRsvp={setRsvpEvent} />
                    ))}
                </div>
            )}

            {/* Past Events */}
            {past.length > 0 && (
                <>
                    <div className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] border-b border-[#94A3B8]/30 pb-2">
                        {t.community.pastEvents}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {past.map(event => (
                            <EventCard key={event.id} event={event} onRsvp={setRsvpEvent} />
                        ))}
                    </div>
                </>
            )}

            {/* RSVP Modal */}
            {rsvpEvent && (
                <RsvpModal
                    event={rsvpEvent}
                    onClose={() => { setRsvpEvent(null); setRsvpResult(null); }}
                    onSubmit={handleRsvp}
                    submitting={submitting}
                    result={rsvpResult}
                />
            )}
        </div>
    );
};

export default CommunityEventsPage;
