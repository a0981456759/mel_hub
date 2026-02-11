import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface CommunityEvent {
    id: string;
    title: string;
    description: string;
    eventType: 'meetup' | 'workshop' | 'hackathon';
    eventDate: string;
    location: string;
    maxAttendees: number;
    imageUrl?: string;
    isActive: boolean;
}

export function useCommunityEvents() {
    const [data, setData] = useState<CommunityEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            const { data: rows, error: err } = await supabase
                .from('community_events')
                .select('*')
                .eq('is_active', true)
                .order('event_date', { ascending: true });

            if (err) {
                setError(err.message);
            } else if (rows) {
                setData(rows.map((r: any) => ({
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    eventType: r.event_type,
                    eventDate: r.event_date,
                    location: r.location,
                    maxAttendees: r.max_attendees,
                    imageUrl: r.image_url,
                    isActive: r.is_active,
                })));
            }
            setLoading(false);
        };
        fetch();
    }, []);

    const submitRsvp = async (eventId: string, name: string, email: string): Promise<{ success: boolean; error?: string }> => {
        const { error: err } = await supabase
            .from('event_rsvps')
            .insert({ event_id: eventId, name, email });

        if (err) {
            if (err.code === '23505') return { success: false, error: 'ALREADY_REGISTERED' };
            return { success: false, error: err.message };
        }
        return { success: true };
    };

    return { data, loading, error, submitRsvp };
}
