import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SentimentIndicator } from '../types';

export function useSentiment() {
  const [data, setData] = useState<SentimentIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error: err } = await supabase
        .from('market_sentiment')
        .select('*')
        .order('id');

      if (err) {
        setError(err.message);
      } else if (rows) {
        setData(rows.map((r: any) => ({
          id: r.id,
          indicatorType: r.indicator_type,
          value: r.value,
          classification: r.classification,
          change24h: r.change_24h,
          signal: r.signal,
          updatedAt: r.updated_at
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
}
