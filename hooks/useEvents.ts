import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { EventItem } from '../types';

export function useEvents() {
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('event_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          eventId: r.event_id,
          title: r.title,
          day: r.day,
          month: r.month,
          year: r.year,
          location: r.location,
          type: r.type,
          speaker: r.speaker,
          status: r.status,
          missionReport: r.mission_report,
          visualLogs: r.visual_logs,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
