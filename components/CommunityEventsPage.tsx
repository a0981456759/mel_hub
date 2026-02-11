
import React, { useState, useMemo } from 'react';
import { useCommunityEvents, CommunityEvent } from '../hooks/useCommunityEvents';
import { useTranslation } from '../lib/i18n';
import { useTheme } from '../lib/theme';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
    meetup: { bg: 'bg-[#2563EB]', text: 'text-white', label: 'MEETUP' },
    workshop: { bg: 'bg-[#FACC15]', text: 'text-black', label: 'WORKSHOP' },
    hackathon: { bg: 'bg-[#22C55E]', text: 'text-black', label: 'HACKATHON' },
};

const dotColors: Record<string, string> = {
    meetup: 'bg-[#2563EB]',
    workshop: 'bg-[#FACC15]',
    hackathon: 'bg-[#22C55E]',
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
    const { isDark } = useTheme();

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className={`border-4 max-w-md w-full p-8 relative ${isDark ? 'bg-[#1E293B] border-[#00F0FF]' : 'bg-white border-[#0F172A]'}`} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className={`absolute top-4 right-4 font-black text-xl hover:text-red-500 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>✕</button>

                <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em] mb-2">{t.community.rsvpTitle}</div>
                <h3 className={`text-xl font-black uppercase tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{event.title}</h3>

                {result?.success ? (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-4">✓</div>
                        <div className="text-sm font-black text-[#22C55E] uppercase">{t.community.rsvpSuccess}</div>
                    </div>
                ) : (
                    <form onSubmit={e => { e.preventDefault(); onSubmit(name, email); }} className="space-y-4">
                        <div>
                            <label className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>{t.community.nameLabel}</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                className={`w-full border-2 px-4 py-3 text-sm font-bold outline-none ${isDark ? 'border-[#334155] bg-[#0F172A] text-white focus:border-[#00F0FF]' : 'border-[#0F172A] bg-[#F1F5F9] text-[#0F172A] focus:border-[#2563EB]'}`}
                                placeholder={t.community.namePlaceholder}
                            />
                        </div>
                        <div>
                            <label className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>{t.community.emailLabel}</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                required
                                className={`w-full border-2 px-4 py-3 text-sm font-bold outline-none ${isDark ? 'border-[#334155] bg-[#0F172A] text-white focus:border-[#00F0FF]' : 'border-[#0F172A] bg-[#F1F5F9] text-[#0F172A] focus:border-[#2563EB]'}`}
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
    const { isDark } = useTheme();

    return (
        <div className={`group border-2 hover:border-[#2563EB] transition-all overflow-hidden ${isPast ? 'opacity-60' : ''} ${isDark ? 'border-[#334155] bg-[#1E293B]' : 'border-[#0F172A] bg-white'}`}>
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

            <div className="px-6 py-4">
                <h3 className={`text-lg font-black uppercase tracking-tight group-hover:text-[#2563EB] transition-colors mb-2 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                    {event.title}
                </h3>
                <p className={`text-[11px] font-bold leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    {event.description}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">📅</span>
                        <span className={`text-[11px] font-black uppercase ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{formatDate(event.eventDate)}</span>
                        <span className="text-[11px] font-bold text-[#2563EB]">{formatTime(event.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">📍</span>
                        <span className={`text-[11px] font-bold ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">👥</span>
                        <span className={`text-[11px] font-bold ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>{t.community.maxAttendees}: {event.maxAttendees}</span>
                    </div>
                </div>
            </div>

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

            <div className={`h-1 ${typeStyle.bg}`} />
        </div>
    );
};

// Calendar View Component
const CalendarView: React.FC<{ events: CommunityEvent[]; onRsvp: (e: CommunityEvent) => void }> = ({ events, onRsvp }) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [calMonth, setCalMonth] = useState(new Date().getMonth());
    const [calYear, setCalYear] = useState(new Date().getFullYear());

    const eventsByDate = useMemo(() => {
        const map: Record<string, CommunityEvent[]> = {};
        events.forEach(ev => {
            const d = new Date(ev.eventDate);
            const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            if (!map[key]) map[key] = [];
            map[key].push(ev);
        });
        return map;
    }, [events]);

    const firstDay = new Date(calYear, calMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();

    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];
    // fill blanks before first day (Mon-based: convert Sun=0 to 6)
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < startOffset; i++) week.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        week.push(d);
        if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }

    const prevMonth = () => {
        if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
        else setCalMonth(calMonth - 1);
    };
    const nextMonth = () => {
        if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
        else setCalMonth(calMonth + 1);
    };

    return (
        <div className={`border-2 p-4 md:p-6 ${isDark ? 'border-[#334155] bg-[#1E293B]' : 'border-[#0F172A] bg-white'}`}>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className={`text-xl font-black px-3 py-1 hover:text-[#00F0FF] transition-colors ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>◀</button>
                <div className="text-center">
                    <div className="text-xl md:text-2xl font-black uppercase tracking-tight">
                        {t.months[calMonth]} {calYear}
                    </div>
                </div>
                <button onClick={nextMonth} className={`text-xl font-black px-3 py-1 hover:text-[#00F0FF] transition-colors ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>▶</button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {t.weekDays.map(d => (
                    <div key={d} className="text-center text-[10px] font-black text-[#94A3B8] uppercase tracking-wider py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {weeks.flat().map((day, i) => {
                    if (day === null) return <div key={`e-${i}`} className="aspect-square" />;
                    const key = `${calYear}-${calMonth}-${day}`;
                    const dayEvents = eventsByDate[key] || [];
                    const isToday = today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === day;

                    return (
                        <div
                            key={`d-${day}`}
                            className={`aspect-square border flex flex-col items-center justify-start pt-1 relative group cursor-default transition-colors
                              ${isToday ? 'border-[#00F0FF] bg-[#00F0FF]/10' : isDark ? 'border-[#1E293B] hover:border-[#334155]' : 'border-[#E2E8F0] hover:border-[#94A3B8]'}
                              ${dayEvents.length > 0 ? (isDark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]') : ''}
                            `}
                        >
                            <span className={`text-[11px] font-black ${isToday ? 'text-[#00F0FF]' : isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                                {day}
                            </span>
                            {/* Event dots */}
                            {dayEvents.length > 0 && (
                                <div className="flex gap-[2px] mt-1 flex-wrap justify-center">
                                    {dayEvents.map((ev, ei) => (
                                        <span key={ei} className={`w-[6px] h-[6px] rounded-full ${dotColors[ev.eventType] || 'bg-[#2563EB]'}`} />
                                    ))}
                                </div>
                            )}
                            {/* Tooltip on hover */}
                            {dayEvents.length > 0 && (
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 hidden group-hover:block w-48 p-2 shadow-lg border text-[10px] ${isDark ? 'bg-[#0F172A] border-[#00F0FF] text-white' : 'bg-white border-[#0F172A] text-[#0F172A]'}`}>
                                    {dayEvents.map((ev, ei) => (
                                        <div key={ei} className="mb-1 last:mb-0">
                                            <div className="font-black uppercase truncate">{ev.title}</div>
                                            <div className="text-[#94A3B8]">{formatTime(ev.eventDate)} • {ev.location}</div>
                                            {getDaysUntil(ev.eventDate) >= 0 && (
                                                <button
                                                    onClick={() => onRsvp(ev)}
                                                    className="text-[#00F0FF] font-black uppercase mt-1 hover:underline"
                                                >
                                                    RSVP →
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 justify-center">
                {Object.entries(typeColors).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${val.bg}`} />
                        <span className={`text-[9px] font-black uppercase ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>{val.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CommunityEventsPage: React.FC = () => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const { data: events, loading, error, submitRsvp } = useCommunityEvents();
    const [rsvpEvent, setRsvpEvent] = useState<CommunityEvent | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [rsvpResult, setRsvpResult] = useState<{ success?: boolean; error?: string } | null>(null);
    const [view, setView] = useState<'cards' | 'calendar'>('cards');

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
            <div className={`flex flex-col md:flex-row md:items-end justify-between border-b-4 pb-6 ${isDark ? 'border-[#00F0FF]' : 'border-[#0F172A]'}`}>
                <div className="space-y-2">
                    <div className="text-[10px] text-[#2563EB] font-black uppercase tracking-[0.2em]">{t.community.subtitle}</div>
                    <h1 className="heading-xl text-4xl md:text-6xl">{t.community.title}</h1>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-4">
                    {/* View Toggle */}
                    <div className={`flex border ${isDark ? 'border-[#334155]' : 'border-[#0F172A]'}`}>
                        <button
                            onClick={() => setView('cards')}
                            className={`px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${view === 'cards' ? 'bg-[#00F0FF] text-black' : isDark ? 'text-[#94A3B8] hover:text-white' : 'text-[#475569] hover:text-[#0F172A]'}`}
                        >
                            ▦ CARDS
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${view === 'calendar' ? 'bg-[#00F0FF] text-black' : isDark ? 'text-[#94A3B8] hover:text-white' : 'text-[#475569] hover:text-[#0F172A]'}`}
                        >
                            📅 CALENDAR
                        </button>
                    </div>
                    <div className="text-right">
                        <div className={`text-[10px] font-black uppercase ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>{t.community.upcomingLabel}</div>
                        <div className="text-xl font-black italic text-[#2563EB] uppercase tracking-tighter">
                            {upcoming.length} {t.community.scheduled}
                        </div>
                    </div>
                </div>
            </div>

            {view === 'calendar' ? (
                <CalendarView events={events} onRsvp={setRsvpEvent} />
            ) : (
                <>
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
