import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { NewsFlashItem } from '../types';

export function useNewsFlash() {
  const [data, setData] = useState<NewsFlashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('news_flash_items')
        .select('*')
        .order('time', { ascending: false });

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          time: r.time,
          category: r.category,
          headline: r.headline,
          summary: r.summary,
          source: r.source,
          isAlert: r.is_alert,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
